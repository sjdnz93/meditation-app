from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied
from django.core.exceptions import ImproperlyConfigured, ObjectDoesNotExist

from meditations.models import Meditation

from django.contrib.auth import get_user_model
User = get_user_model()

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
        
        except (User.DoesNotExist, PermissionDenied) as e:
            print(e.__class__.__name__)
            print(e)
            return Response({'detail': 'Unauthorized'}, status.HTTP_401_UNAUTHORIZED)
        
        except (Meditation.DoesNotExist) as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print('EXCEPTION OCCURED')
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_500_INTERNAL_SERVER_ERROR)

    return wrapper