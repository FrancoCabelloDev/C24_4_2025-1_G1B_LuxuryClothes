from django.db import models

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    contraseña = models.CharField(max_length=255, blank=True, null=True)
    celular = models.CharField(max_length=30, blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    dni = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        db_table = 'user'  # 👈 Apunta a la tabla existente en MySQL
        managed = False    # 👈 Evita que Django intente crearla o migrarla

    def __str__(self):
        return self.nombre or self.email
