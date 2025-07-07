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
        db_table = 'user'
        managed = False

    def __str__(self):
        return self.nombre or self.email

class Brand(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'brand'
        managed = False

    def __str__(self):
        return self.name

class Category(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'category'
        managed = False

    def __str__(self):
        return self.name

class Collection(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'collection'
        managed = False

    def __str__(self):
        return self.name

class Tag(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'tag'
        managed = False

    def __str__(self):
        return self.name

class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='category_id')
    price = models.FloatField(blank=True, null=True)
    # Campo originalPrice eliminado
    brand = models.ForeignKey(Brand, models.DO_NOTHING, db_column='brand_id')
    color = models.CharField(max_length=100, blank=True, null=True)
    size = models.CharField(max_length=20, blank=True, null=True)
    collection = models.ForeignKey(Collection, models.DO_NOTHING, db_column='collection_id', blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, db_table='product_tag', blank=True)

    class Meta:
        db_table = 'product'
        managed = False

    def __str__(self):
        return self.name

class Order(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    order_date = models.DateTimeField(blank=True, null=True)
    total = models.FloatField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    shipping_address = models.CharField(max_length=255, blank=True, null=True)
    shipping_city = models.CharField(max_length=100, blank=True, null=True)
    shipping_district = models.CharField(max_length=100, blank=True, null=True)
    shipping_postal_code = models.CharField(max_length=20, blank=True, null=True)
    shipping_country = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'orders'
        managed = False

    def __str__(self):
        return f"Order #{self.id} - {self.user.email if self.user else 'Sin usuario'}"

class OrderItem(models.Model):
    id = models.BigAutoField(primary_key=True)
    order = models.ForeignKey(Order, models.DO_NOTHING, db_column='order_id')
    product = models.ForeignKey('Product', models.DO_NOTHING, db_column='product_id')
    quantity = models.IntegerField(blank=True, null=True)
    price = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = 'order_item'
        managed = False

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"