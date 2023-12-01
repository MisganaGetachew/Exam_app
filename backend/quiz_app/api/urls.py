from django.urls import path
from . import views
urlpatterns = [

    path('', views.index, name='index'),
    path('find', views.findUsers.as_view(), name="findUsers"),
    path('find/<str:email>', views.check_user_exists,
         name="check_user_exists"),
    path('add_user', views.add_user, name='add_user'),
    path('add_question', views.add_question, name='add_question')




]
