from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import MeditationSerializer
from users.serializers.populated import PopulatedUserSerializer


from lib.exceptions import exceptions
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your views here.

class MeditationView(APIView):
    
    #!NEED TO ADD AUTHORIZATIONS IN!!!!!!!!!!
    
    #GET USER'S MEDITATIONS
    #endpoint: /api/profile

    @exceptions
    def get(self, request, id):
        print('GET USER MEDITATIONS ROUTE HIT')
        print('USER ID => ', id)
        user = User.objects.get(id=id)
        print('LOGGED IN USER', user)
        serialized_user = PopulatedUserSerializer(user)
        print('SERIALIZED USER => ', serialized_user)
        return Response(serialized_user.data)

    
    #POST NEW MEDITATION
    #endpoint: /api/add/
    @exceptions
    def post(self, request):
        print('ADD MEDITATION ROUTE HIT')
        print('REQUEST DATA => ', request.data)
        meditation = MeditationSerializer(data=request.data)
        print('MEDITATION', meditation)
        meditation.is_valid(raise_exception=True)
        meditation.save()
        print('SAVED MEDITATION => ', meditation.data)

        return Response(meditation.data, status.HTTP_201_CREATED)