from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class RegisterView(APIView):
    
    #REGISTER ROUTE
    #Endpoint: /api/auth/register
    def post(self, request):
        print('REQUEST DATA ->', request.data)
        return Response('HIT REGISTER END POINT')
