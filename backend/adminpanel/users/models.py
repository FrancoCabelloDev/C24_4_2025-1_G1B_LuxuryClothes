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