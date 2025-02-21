from rest_framework import serializers
from .models import Chat
from message.serializers import MessageSerializer

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id','name','created_at','updated_at','type']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ChatDetailsSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True,read_only=True)
    class Meta:
        model = Chat
        fields = ['id','name','created_at','updated_at','messages','type']
        