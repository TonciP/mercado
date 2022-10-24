from django.db import models


class Empresa(models.Model):
    #logo = models.CharField(max_length=200)
    image = models.ImageField(default=
    'gallery/static/images/no-img.jpg')
    nombre = models.CharField(max_length=200)
    latitud = models.CharField(max_length=200, null=True)
    longitud = models.CharField(max_length=200, null=True)