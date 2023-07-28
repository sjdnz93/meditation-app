from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import MeditationSerializer

from lib.exceptions import exceptions


# Create your views here.

class MeditationView(APIView):
    
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