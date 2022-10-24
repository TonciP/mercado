from rest_framework import serializers, viewsets


from mercado.auth import CustomerAccessPermission
from mercado.auth.normal_auth import CustomerAccessPermissionNormal
from mercado.models import Compra
from mercado.models.empresa import Empresa


class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'

class CompraViewSet(viewsets.ModelViewSet):
    serializer_class = CompraSerializer
    queryset = Compra.objects.all()
    permission_classes = [CustomerAccessPermissionNormal]

