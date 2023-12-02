from django.contrib import admin
from .models import Profile,Company,JobApplication,JobPostings,passwordOTP,collegeTaken,Skills,Institution,Degrees,Majors

# Register your models here.

admin.site.register(Profile)
admin.site.register(Company)
admin.site.register(JobApplication)
admin.site.register(JobPostings)
admin.site.register(passwordOTP)
admin.site.register(collegeTaken)
admin.site.register(Skills)
admin.site.register(Institution)
admin.site.register(Degrees)
admin.site.register(Majors)