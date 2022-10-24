from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.utils.crypto import pbkdf2
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password']


class UserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    #permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        request.data['password'] = make_password(request.data['password'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)