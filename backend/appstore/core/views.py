from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from core.serializers import (
    UserSerializer,
    ApplicationSerializer,
    RegisterSerializer,
    ExtendedTokenObtainPairSerializer
)
from core.models import Application
from django.forms.models import model_to_dict


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        result = RefreshToken.for_user(user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "refresh": str(result),
            "access": str(result.access_token)
        })


class ExtendedTokenObtainPairView(TokenObtainPairView):
    serializer_class = ExtendedTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permissions = permissions.IsAuthenticatedOrReadOnly

    def create(self, validated_data):
        data = validated_data.data
        author = User.objects.get(pk=data['author_id'])
        data['author'] = data['author_id']

        app = Application(
            name=data['name'],
            description=data['description'],
            image_src=data['image_src'],
            is_game=data['is_game'],
            author=author
        )

        app.save()
        result = model_to_dict(app)
        result['pk'] = app.id
        result['created'] = app.created
        result['updated'] = app.updated
        result['author_name'] = author.username
        result['author_id'] = author.id

        return Response(result, status=status.HTTP_201_CREATED)
