from django.db import models


class Actualizacion(models.Model):
    lugar_real = models.CharField(max_length=200)
    ubicacion_real = models.CharField(max_length=200)
    estado = models.CharField(max_length=200)