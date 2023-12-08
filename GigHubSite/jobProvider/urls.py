from django.urls import path
from . import views


app_name = "jobProvider"

urlpatterns = [
    path('company/',views.companies, name="companies")
]