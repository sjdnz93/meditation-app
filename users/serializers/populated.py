from .common import UserSerializer
from meditations.serializers.common import MeditationSerializer

class PopulatedUserSerializer(UserSerializer):
    videos = MeditationSerializer(many=True, default=0)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('streak_count', 'videos')
        

    


# class PopulatedUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'first_name', 'videos', 'streak_count')