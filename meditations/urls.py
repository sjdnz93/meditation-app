from django.urls import path
from .views import MeditationView


urlpatterns = [
    path('', MeditationView.as_view())
]