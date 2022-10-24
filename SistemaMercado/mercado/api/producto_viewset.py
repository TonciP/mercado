from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from mercado.models import Producto
from mercado.models.pedido import Pedido


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    @action(detail=True, methods=['get'], url_path='categoria')
    def get_producto_categoria(self, request, pk):
        listaproducto = Producto.objects.order_by('lcategoria').filter(lempresa_id=pk)
        #listaproducto = []
        #for productos in listaproducto:
        #    pelicula = Producto.objects.filter(pk=productos..pk).get()
        #    listaproducto.append(pelicula)
        serializer = ProductoSerializer(listaproducto, many=True)
        return Response(serializer.data)
