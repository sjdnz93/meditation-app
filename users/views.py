from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import UserSerializer
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework.exceptions import PermissionDenied

import jwt

from datetime import datetime, timedelta

from lib.exceptions import exceptions

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.

class RegisterView(APIView):
    
    #REGISTER ROUTE
    #Endpoint: /api/auth/register
    @exceptions
    def post(self, request):
        print('REQUEST DATA ->', request.data)
        user_to_add = UserSerializer(data=request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response(user_to_add.data, status.HTTP_201_CREATED)
    

class LoginView(APIView):
    
    #LOGIN ROUTE
    #Endpoint: /api/auth/login
    @exceptions
    def post(self, request):
        print('LOGIN DATA ->', request.data)

        email = request.data['email']

        password = request.data['password']

        user_to_login = User.objects.get(email=email)

        if not user_to_login.check_password(password):
            print('PASSWORDS DONT MATCH')
            raise PermissionDenied('Unauthorized')
        
        
        
        token = jwt.encode({ 'sub': user_to_login.id })




        return Response('HIT LOGIN ROUTE')
