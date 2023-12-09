from django.urls import path
from . import views

app_name="jobSeeker"

urlpatterns = [
    path('settings/',views.profileSettings,name="userSettings"),
    path('education/',views.profileEducation, name="profileEducation"),
    path('awards/',views.addAward, name="profileAward"),
    path('certificates/',views.addCertis, name="profileCerties"),
    path('account/email/',views.accountEmail, name="accountEmail"),
    path('account/password/',views.accountPassword,name="accountPassword"),
    path('dashboard/',views.dashboard,name="dashboard"),
    path('job/',views.job,name="job")
]