# Generated by Django 3.1.2 on 2022-06-06 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='version',
            field=models.CharField(default='0.1', max_length=255),
        ),
        migrations.AlterField(
            model_name='application',
            name='image_src',
            field=models.CharField(default='https://www.kindpng.com/picc/m/80-802054_ios-7-contacts-app-icon-iphone-camera-roll.png', max_length=400),
        ),
    ]
