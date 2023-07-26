from rest_framework.serializers import ModelSerializer
from ..models import Meditation

class MeditationSerializer(ModelSerializer):
    class Meta:
        model = Meditation
        fields = '__all__'
