from .common import UserSerializer
from meditations.serializers.common import MeditationSerializer

class PopulatedUserSerializer(UserSerializer):
    videos = MeditationSerializer(many=True, default=0)
