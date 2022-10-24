from django.db import models


class Carrito(models.Model):
    lempresa = models.ForeignKey('Empresa', on_delete=models.CASCADE)
    lproducto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    lusuario = models.IntegerField()
