from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'nombre', 'contraseña', 'celular', 'direccion', 'dni')
    search_fields = ('email', 'nombre')
