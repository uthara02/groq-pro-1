# qna/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('get_response/', views.get_groq_response, name='get_groq_response'),
]
