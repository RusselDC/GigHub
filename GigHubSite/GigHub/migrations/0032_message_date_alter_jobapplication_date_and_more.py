# Generated by Django 4.2.7 on 2023-12-11 02:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GigHub', '0031_remove_message_dateandtime_alter_jobapplication_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='jobapplication',
            name='date',
            field=models.DateField(default=datetime.datetime(2023, 12, 11, 2, 29, 33, 42463, tzinfo=datetime.timezone.utc), verbose_name='application_date'),
        ),
        migrations.AlterField(
            model_name='jobpostings',
            name='datePosted',
            field=models.DateField(default=datetime.datetime(2023, 12, 11, 2, 29, 33, 41462, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='passwordotp',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 11, 10, 29, 33, 42463)),
        ),
    ]
