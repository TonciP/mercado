import jwt
from django.views.defaults import permission_denied
from rest_framework import permissions
from rest_framework_jwt.utils import jwt_decode_handler

from SistemaMercado import settings


class CustomerAccessPermissionNormal(permissions.BasePermission):
    message = 'Adding customers not allowed.'
    default_detail = "No autorizado"
    permission_denied = "No autorizado"

    def has_permission(self, request, view):
        autotizacion = request.headers.get('Authorization')
        code = autotizacion.split(" ", 1)
        if  code[0] == "Bearer":
            # decodificamos
            decodedPayload = jwt.decode(code[1], key=settings.SECRET_KEY, algorithms=['HS256'])
            objrol = list(filter(lambda item: item in 'Usuario Normal',decodedPayload['listaroles']))
            tamano = len(objrol)
            if tamano > 0:
                return True
            else:
                return False

        return False

