from rest_framework import serializers, viewsets, status, mixins
from rest_framework.decorators import permission_classes, action
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from mercado.auth import CustomerAccessPermission
from mercado.models.empresa import Empresa


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class EmpresaListaViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = EmpresaSerializer
    queryset = Empresa.objects.all()

class EmpresaViewSet(viewsets.ModelViewSet):
    serializer_class = EmpresaSerializer
    queryset = Empresa.objects.all()
    permission_classes = [CustomerAccessPermission]

