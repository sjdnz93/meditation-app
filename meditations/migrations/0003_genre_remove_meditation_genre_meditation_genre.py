# Generated by Django 4.2.3 on 2024-06-11 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meditations', '0002_meditation_owner_alter_meditation_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='meditation',
            name='genre',
        ),
        migrations.AddField(
            model_name='meditation',
            name='genre',
            field=models.ManyToManyField(related_name='meditations', to='meditations.genre'),
        ),
    ]