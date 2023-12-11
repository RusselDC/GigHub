from django.urls import path
from . import views

app_name = "gigAdmin"


urlpatterns = [
    path('',views.index,name="gigAdmin"),
    path('accept/<int:postingID>/',views.accept, name="acceptPosting"),
    path('jobProviders/',views.jobProviders,name="jobProviders"),
    path('disable/<int:personID>',views.disableProvider,name="disableProvider"),
    path('enable/<int:personID>',views.enableProvider,name="enableProvider"),
    path('jobSeekers/',views.jobSeekers,name="jobSeekers"),
    path('disableSeeker/<int:personID>',views.disableSeeker,name="disableSeeker"),
    path('enableSeeker/<int:personID>',views.enableSeeker,name="enableSeeker"),
]