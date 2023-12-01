from rest_framework import serializers
from .models import ExamTakers

class UserSerializer(serializers.ModelSerializer):
        class Meta:
                model = ExamTakers
                fields = ('__all__')