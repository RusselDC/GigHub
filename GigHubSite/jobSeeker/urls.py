from django.urls import path
from . import views

app_name="jobSeeker"

urlpatterns = [
    path('settings/',views.profileSettings,name="userSettings"),
    path('education/',views.profileEducation, name="profileEducation"),
    path('account/email/',views.accountEmail, name="accountEmail"),
    path('account/password/',views.accountPassword,name="accountPassword")
]