from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation, hashers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        print('DATA BEFORE CUSTOM VALIDATION ->', data)

        password = data.pop('password')
        print('PASSWORD', password)

        password_confirmation = data.pop('password_confirmation')
        print('PASSWORD_CONFIRMATION', password_confirmation)

        if password!= password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Does not match password'})
        
        password_validation.validate_password(password)
        
        data['password'] = hashers.make_password(password)

        print('DATA AFTER CUSTOM VALIDATION', data)

        return data
    

    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'first_name', 'videos', 'streak_count')