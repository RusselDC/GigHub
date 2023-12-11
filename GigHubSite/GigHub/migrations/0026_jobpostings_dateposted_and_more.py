# Generated by Django 4.2.7 on 2023-12-10 05:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GigHub', '0025_jobpostings_deadline_alter_passwordotp_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobpostings',
            name='datePosted',
            field=models.DateField(default=datetime.datetime(2023, 12, 10, 5, 3, 22, 709282, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='jobapplication',
            name='applicationStatus',
            field=models.CharField(choices=[('applied', 'Applied'), ('in_progress', 'In Progress'), ('cancelled', 'Cancelled'), ('rejected', 'Rejected'), ('hired', 'Hired')], default='Applied', max_length=30),
        ),
        migrations.AlterField(
            model_name='jobapplication',
            name='date',
            field=models.DateField(default=datetime.datetime(2023, 12, 10, 5, 3, 22, 710285, tzinfo=datetime.timezone.utc), verbose_name='application_date'),
        ),
        migrations.AlterField(
            model_name='passwordotp',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 10, 13, 3, 22, 710285)),
        ),
    ]