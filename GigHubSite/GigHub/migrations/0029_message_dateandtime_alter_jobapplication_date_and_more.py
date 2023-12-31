# Generated by Django 4.2.7 on 2023-12-11 02:26

import datetime
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('GigHub', '0028_alter_jobapplication_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='dateandtime',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='jobapplication',
            name='date',
            field=models.DateField(default=datetime.datetime(2023, 12, 11, 2, 26, 40, 446925, tzinfo=datetime.timezone.utc), verbose_name='application_date'),
        ),
        migrations.AlterField(
            model_name='jobpostings',
            name='datePosted',
            field=models.DateField(default=datetime.datetime(2023, 12, 11, 2, 26, 40, 445925, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='passwordotp',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 11, 10, 26, 40, 447925)),
        ),
    ]
