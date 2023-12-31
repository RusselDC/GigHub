from django.urls import path
from . import views


app_name = "GigHub"

urlpatterns = [
    path('',views.index,name="index"),
    path('login/',views.login, name="login"),
    path('register/',views.register, name="register"),
    path('privacy_policy/',views.privacy_policy, name="privacy_policy"),
    path('forgot/',views.forgot, name="forgot"),
    path('verify/',views.verify, name="verify"),
    path('changePass/',views.changePass, name="changePass"),
    path('logout/', views.logout, name="logout"),
    path('changeProfile/', views.Profilechange, name="changeProfile"),
    path('aboutUs/', views.aboutUs, name="aboutUs"),
    path('addSkills/', views.addSkills, name="addSkills"),
    path('addCollege/',views.addCollege, name="addCollege"),
    path('addCompany/',views.addCompany, name="addCompany"),
    path('addPosting/',views.addJobPosting, name="addJobPosting"),
    path('register_education/', views.register_education, name="register_education"),
    path('register_skills/', views.register_skills, name="register_skills"),
    path('register_moreInfo/', views.register_moreInfo, name="register_moreInfo"),
    path('getMajors/<str:degreeName>/', views.getMajors, name="getMajors"),
    path('disabled/',views.disabled,name="disabled")
]