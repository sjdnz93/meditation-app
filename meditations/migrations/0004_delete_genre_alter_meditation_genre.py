# Generated by Django 4.2.3 on 2024-06-12 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('genres', '0001_initial'),
        ('meditations', '0003_genre_remove_meditation_genre_meditation_genre'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Genre',
        ),
        migrations.AlterField(
            model_name='meditation',
            name='genre',
            field=models.ManyToManyField(related_name='meditations', to='genres.genre'),
        ),
    ]
