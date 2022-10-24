from django.db import models


class Pedido(models.Model):
    ubicacion_origen = models.CharField(max_length=200)
    ubicacion_destino = models.CharField(max_length=200)
    detalle = models.CharField(max_length=200)