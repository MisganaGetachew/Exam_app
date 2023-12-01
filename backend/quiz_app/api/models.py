from django.db import models
import uuid


class ExamTakers(models.Model):
    user_name = models.CharField(max_length=100, default='')
    user_email = models.CharField(max_length=100, unique=True)
    user_password = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user_name}"


class Exam(models.Model):

    EXAM_TYPE = [
        ("choice", "Multiple Choice"),
        ("text", "Essay"),
        ("true_false", "True or False "),
        ("code", "Coding Problem"),
        ("other", "Other Type")
    ]
    # user_name = models.CharField(max_length=100, default="Exam Giver")
    # user_email = models.EmailField(max_length=254)
    # question_id = models.IntegerField(unique=True)

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    question_type = models.CharField(max_length=20, choices=EXAM_TYPE)
    question = models.TextField(default="")
    question_choices = models.CharField(max_length=500, default="")
    # question_choices = models.

    def __str__(self):
        return f" {self.question}  "


class Choice(models.Model):
    choice = models.CharField(max_length=300)
