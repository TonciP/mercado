# Generated by Django 4.0.5 on 2022-07-08 01:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mercado', '0002_pedido_producto_lcategory'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='lcategory',
            new_name='lcategoria',
        ),
    ]