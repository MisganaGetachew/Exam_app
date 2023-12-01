# from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
# imported the model Examtaker so that we can make some queries
from .models import ExamTakers, Exam
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
import requests
import random
import json


# Create your views here.


def index(request):
    return render(request, 'index.html')


class findUsers(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return ExamTakers.objects.all()


@api_view(['GET'])
def check_user_exists(request, email):

    try:
        # print(request)
        data = ExamTakers.objects.get(user_email=email.lower())
        return Response({'user_exists': True,
                         'user_name': data.user_name,
                         'message': "succefully Logged in"})

    except ExamTakers.DoesNotExist:
        return Response({'user_exists': False,
                         'message': "user doesn't exist"})


@api_view(['POST'])
def add_user(request):
    if request.method == "POST":
        try:
            user = ExamTakers.objects.get(
                user_email=request.data["user_email"])
            print('User already exists')
            return Response({'message': 'User already exists'})
        except ExamTakers.DoesNotExist:
            # do the saving to the data base here
            instance = ExamTakers(user_name=request.data["user_name"],
                                  user_email=request.data["user_email"].lower(
            ),
                user_password=request.data["password"])
            instance.save()
            return Response({'message': 'Signedup succesfully! Go to login page?'})


@api_view(['GET'])
def g_knowledge(request):
    # if request.method == 'GET':  doesn't need to specfiy for GET it is similar to leave!
    api_URL = 'https://opentdb.com/api.php?amount=1&category=9&difficulty=easy'
    req = requests.get(api_URL)
    data = req.json()
    question = data['results'][0]  # Assuming I always get a single question
    answers = [question['correct_answer']] + question['incorrect_answers']
    random.shuffle(answers)  # other problem! the choices are not random hahaha
    context = {
        'question': question['question'],
        'answers': answers,
        'current_url': 'g_knowledge'


    }

    return Response(context)


@api_view(['GET', 'POST'])
def add_question(request):

    if request.method == "POST":

        if request.data["type"] == 'choice':
            try:
                exam = Exam.objects.get(question=request.data["question"])
                # print("Question already Exists")

                return Response({'message': "question already exits,  Use a different one"})
            except Exam.DoesNotExist:
                print(request.data)
                print(request.data["question"])
                print(request.method)
                # choices_list = json.loads(request.data["choice_list"])
                exam = Exam.objects.create(
                    question_type=request.data["type"], question=request.data["question"], question_choices=request.data["choice_list"])
                exam.save()
                return Response({'message': "question saved succesfully! "})

        elif request.data["type"] == 'choice':
            try:
                exam = Exam.objects.get(question=request.data["question"])
                # print("Question already Exists")

                return Response({'message': "question already exits,  Use a different one"})
            except Exam.DoesNotExist:
                exam = Exam.objects.create(
                    question_type=request.data["type"], question=request.data["question"])
                exam.save()
                return Response({'message': "question saved succesfully! "})


@api_view(['GET', 'POST'])
def get_question(request):
    return Response({'message': "question asked properlly"})
