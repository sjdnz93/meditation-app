from functools import wraps

def exceptions(func):
    @wraps(func)

    def wrapper(*args, **kwargs):
        try:
            print('WRAPPER FUNCTION EXECUTED. ATTEMPTING TO EXECUTE CONTROLLER')
            return func(**args, **kwargs)
        except:
            print('EXCEPTION OCCURED')

    return wrapper