from django.db import models

from mercado.models import Categoria, Empresa


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    foto = models.ImageField(default=
    'gallery/static/images/no-img.jpg')
    precio = models.DecimalField( max_digits=10, decimal_places=2)
    lcategoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, null=True)
    lempresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)