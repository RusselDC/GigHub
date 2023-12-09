from django.urls import path
from . import views


app_name = "jobProvider"

urlpatterns = [
    path('company/',views.companies, name="companies"),
    path('settings/',views.settings, name="settings"),
    path('getCompany/<int:coID>/',views.getCompany, name="getCompany"),
    path('/editCompany/',views.editCompany,name="editCompany")
]