from django.db import models


class Feedback(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'feedback'


class Genres(models.Model):
    genre_id = models.AutoField(primary_key=True)
    genre_name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'genres'


class Platforms(models.Model):
    platform_id = models.AutoField(primary_key=True)
    platform_name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'platforms'


class ProductGenres(models.Model):
    pk = models.CompositePrimaryKey('product_id', 'genre_id')
    product = models.ForeignKey('Products', models.DO_NOTHING)
    genre = models.ForeignKey(Genres, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_genres'


class ProductPlatforms(models.Model):
    pk = models.CompositePrimaryKey('product_id', 'platform_id')
    product = models.ForeignKey('Products', models.DO_NOTHING)
    platform = models.ForeignKey(Platforms, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_platforms'


class Products(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    old_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percent = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    # This field type is a guess.
    action_tags = models.TextField(blank=True, null=True)
    # This field type is a guess.
    screenshot_urls = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'products'


class Screenshots(models.Model):
    screenshot_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(
        Products, models.DO_NOTHING, blank=True, null=True)
    image_url = models.CharField(max_length=255)
    display_order = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'screenshots'


class PopularProducts(models.Model):
    product = models.OneToOneField('Products', models.DO_NOTHING, primary_key=True)

    class Meta:
        managed = False
        db_table = 'popular_products'
