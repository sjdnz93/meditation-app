from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, NotFound
from django.core.exceptions import ImproperlyConfigured

def exceptions(func):
    @wraps(func)

    def wrapper(*args, **kwargs):
        try:
            print('WRAPPER FUNCTION EXECUTED. ATTEMPTING TO EXECUTE CONTROLLER')
            return func(*args, **kwargs)
            
        except (ValidationError, ImproperlyConfigured) as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

        except Exception as e:
            print('EXCEPTION OCCURED')
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_500_INTERNAL_SERVER_ERROR)

    return wrapper