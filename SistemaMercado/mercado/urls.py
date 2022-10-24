from django.urls import path, include
from rest_framework import routers

from mercado.api.categoria_viewset import CategoriaViewSet
from mercado.api.compra_viewset import CompraViewSet
from mercado.api.empresa_viewset import EmpresaViewSet, EmpresaListaViewSet
from mercado.api.producto_viewset import ProductoViewSet

router = routers.DefaultRouter()
#acceso usuario normal
router.register(r'listempresa', EmpresaListaViewSet)
router.register(r'producto', ProductoViewSet)
router.register(r'categoria', CategoriaViewSet)
router.register(r'compra', CompraViewSet)

#acceso restringido
router.register(r'empresa', EmpresaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
