from django.contrib import admin
from .models import User, Product, Brand, Category, Collection, Tag, Order, OrderItem
from django.utils.html import format_html

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'nombre', 'contraseña', 'celular', 'direccion', 'dni')
    search_fields = ('email', 'nombre')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'brand', 'category', 'price', 'collection', 'gender', 'image_tag')
    search_fields = ('name',)
    list_filter = ('brand', 'category', 'collection', 'gender', 'size')

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "-"
    image_tag.short_description = 'Image'

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'order_date', 'total', 'status', 'shipping_address', 'shipping_city', 'shipping_district', 'shipping_postal_code', 'shipping_country')
    search_fields = ('user__email', 'shipping_address', 'shipping_city', 'shipping_district', 'shipping_postal_code', 'shipping_country')
    list_filter = ('status', 'shipping_city', 'shipping_district', 'shipping_country')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity', 'price')
    search_fields = ('order__id', 'product__name')
    list_filter = ('product',)
