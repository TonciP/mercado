from django.db import models


class Compra(models.Model):
    lusuario = models.IntegerField()
    lproducto = models.ForeignKey('Producto', on_delete=models.CASCADE)
