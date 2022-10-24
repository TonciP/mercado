from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User, Group
from django.utils.crypto import pbkdf2
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response


class GrupoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ['name']


class GrupoViewset(viewsets.ModelViewSet):
    serializer_class = GrupoSerializer
    queryset = Group.objects.all()
    #permission_classes = [IsAuthenticated]
