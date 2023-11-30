from django.urls import path
from . import views


app_name = "GigHub"

urlpatterns = [
    path('',views.index,name="index"),
    path('login/',views.login, name="login"),
    path('forgot/',views.forgot, name="forgot"),
    path('verify/',views.verify, name="verify"),
    path('changePass/',views.changePass, name="changePass"),
    path('logout/', views.logout, name="logout")
]