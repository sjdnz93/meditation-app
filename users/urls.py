from django.urls import path
from .views import RegisterView, LoginView, ProfileView, UpdateMeditationStreakView


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('<int:id>/', ProfileView.as_view()),
    path('<int:id>/increase-streak/', UpdateMeditationStreakView.as_view())
]