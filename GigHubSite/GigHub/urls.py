from django.urls import path
from . import views


app_name = "GigHub"

urlpatterns = [
    path('',views.index,name="index")
]