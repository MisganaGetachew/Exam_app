from django.contrib import admin
from .models import ExamTakers, Exam, ExamGivers
# Register your models here.


admin.site.register(ExamTakers)
admin.site.register(Exam)
admin.site.register(ExamGivers)
