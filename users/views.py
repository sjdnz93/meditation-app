from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import UserSerializer

from lib.exceptions import exceptions

# Create your views here.

class RegisterView(APIView):
    
    #REGISTER ROUTE
    #Endpoint: /api/auth/register
    @exceptions
    def post(self, request):
        print('REQUEST DATA ->', request.data)
        user_to_add = UserSerializer(data = request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response('HIT REGISTER END POINT')
    

#YOU ARE UP TO SETTING UP VALIDATION METHOD IN AUTHENTICATION PART OF NOTES
