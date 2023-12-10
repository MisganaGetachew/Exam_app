# from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
# imported the model Examtaker so that we can make some queries
from .models import ExamTakers, Exam, ExamGivers
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


# for Exam Takers or students
@api_view(['GET', 'POST'])
def check_user_exists(request):
    # i changed the request type to (post)  so change the func accordingly
    if request.method == "POST":
        if request.data["user"] == "student":
            try:
                # print(request)
                data = ExamTakers.objects.get(
                    user_email=request.data["user_email"].lower())
                return Response({'user_exists': True,
                                'user_name': data.user_name,
                                 'message': "succefully Logged in"})

            except ExamTakers.DoesNotExist:
                return Response({'user_exists': False,
                                'message': "user doesn't exist"})

        elif request.data["user"] == "teacher":
            try:
                # print(request)
                data = ExamGivers.objects.get(
                    user_email=request.data["user_email"].lower())
                return Response({'user_exists': True,
                                'user_name': data.user_name,
                                 'message': "succefully Logged in"})

            except ExamGivers.DoesNotExist:
                return Response({'user_exists': False,
                                'message': "user doesn't exist"})
        else:
            return Response({'user_exists': False,
                             'message': "please let the program know if you are student or teacher"})


@api_view(['POST'])
def add_user(request):
    if request.method == "POST":
        # makking sure a user key data is sent from frontend with student/teacher users
        if request.data["user"] == "student":
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
        elif request.data["user"] == "teacher":
            try:
                print('error in try exeption')
                user = ExamGivers.objects.get(
                    user_email=request.data["user_email"])
                print('User already exists')
                return Response({'message': 'User already exists'})
            except ExamGivers.DoesNotExist:
                # doing the saving to the data base here
                print('error in the exeption')
                instance = ExamGivers.objects.create(user_name=request.data["user_name"],
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
        print(request.data)
        if request.data["question_type"] == 'choice':
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
                    question_type=request.data["question_type"], question=request.data["question"], question_choices=request.data["choice_list"])
                exam.save()
                return Response({'message': "question saved succesfully! "})
        # make sure the frontend is sending similar key : question_type
        elif request.data["question_type"] == 'text':
            try:
                exam = Exam.objects.get(question=request.data["question"])
                # print("Question already Exists")

                return Response({'message': "question already exits,  Use a different one"})
            except Exam.DoesNotExist:
                exam = Exam.objects.create(
                    question_type=request.data["question_type"], question=request.data["question"])
                exam.save()
                return Response({'message': "question saved succesfully! "})


@api_view(['GET', 'POST'])
def get_question(request):
    questions = list(Exam.objects.values(
        "id", "question_type", "question", "question_choices"))
    choices = list(Exam.objects.values("question_choices"))

    # make some rerearch on how to send python list data over jason file format
    # json_data = json.dumps(questions)
    return Response({'message': "question retrived properlly", "object": questions, "choices": choices})
