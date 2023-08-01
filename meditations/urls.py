from django.urls import path
from .views import MeditationView, MeditationDetailView


urlpatterns = [
    path('', MeditationView.as_view()),
    path('<int:id>/', MeditationDetailView.as_view())
]