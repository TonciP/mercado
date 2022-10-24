from django.db import models


class Entrega(models.Model):
    ubication_destino = models.CharField(max_length=200)
    lusuario = models.IntegerField()