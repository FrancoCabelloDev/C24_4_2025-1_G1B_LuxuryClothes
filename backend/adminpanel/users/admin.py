from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'nombre', 'name', 'contraseña')
    search_fields = ('email', 'nombre')
