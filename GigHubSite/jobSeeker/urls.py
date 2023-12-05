from django.urls import path
from . import views

app_name="jobSeeker"

urlpatterns = [
    path('settings/',views.profileSettings,name="userSettings"),
    path('education/',views.profileEducation, name="profileEducation")
]