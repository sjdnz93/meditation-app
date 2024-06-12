from .common import MeditationSerializer
from genres.serializers.common import GenreSerializer

class PopulatedMeditationSerializer(MeditationSerializer):
  genre = GenreSerializer(many=True)