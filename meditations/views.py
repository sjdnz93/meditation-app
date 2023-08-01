from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import MeditationSerializer
from .models import Meditation



from lib.exceptions import exceptions
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your views here.

#!NEED TO ADD AUTHORIZATIONS IN!!!!!!!!!!

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
    
class MeditationDetailView(APIView):
    
    #GET A SPECIFIC MEDITATION
    #endpoint: /api/videos/<int:id>
    @exceptions
    def get(self, request, id):
        print('GET SINGLE MEDITATION ROUTE HIT')
        meditation = Meditation.objects.get(id=id)
        serialized_meditation = MeditationSerializer(meditation)
        return Response(serialized_meditation.data)
    
    #UPDATE A SPECIFIC MEDITATION
    #endpoint: /api/videos/<int:id>

    def put(self, request, id):
        print('UPDATE MEDITATION ROUTE HIT')
        meditation = Meditation.objects.get(id=id)
        serialized_meditation = MeditationSerializer(meditation, request.data, partial=True)
        serialized_meditation.is_valid(raise_exception=True)
        serialized_meditation.save()
        return Response(serialized_meditation.data)
    
    #DELETE A SPECIFIC MEDITATION
    #endpoint: /api/videos/<int:id>
    @exceptions
    def delete(self, request, id):
        print('DELETE SINGLE MEDITATION ROUTE HIT')
        meditation = Meditation.objects.get(id=id)
        meditation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

