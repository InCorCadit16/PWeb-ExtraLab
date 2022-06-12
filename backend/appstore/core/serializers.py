from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField('_author_name')

    def _author_name(self, app):
        return User.objects.get(pk=app.author_id).username

    class Meta:
        model = Application
        fields = ['pk', 'name', 'description', 'image_src', 'is_game', 'created', 'updated', 'author_name', 'author_id']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user


class ExtendedTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        groups = user.groups.values_list('name', flat=True)
        groups = list(groups)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = 'Publisher' if 'Publisher' in groups else 'User'

        return token
