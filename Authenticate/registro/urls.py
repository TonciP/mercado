from django.urls import include, path
from rest_framework import routers

from registro.api import UserViewset
from registro.api.grupo_viewset import GrupoViewset

router = routers.DefaultRouter()

router.register(r'user', UserViewset)
router.register(r'grupo', GrupoViewset)
urlpatterns = [
    path('', include(router.urls)),
]
