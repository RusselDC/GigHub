from django.contrib import admin
from .models import Profile,Company,JobApplication,JobPostings,passwordOTP

# Register your models here.

admin.site.register(Profile)
admin.site.register(Company)
admin.site.register(JobApplication)
admin.site.register(JobPostings)
admin.site.register(passwordOTP)