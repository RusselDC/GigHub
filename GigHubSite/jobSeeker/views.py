from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from GigHub.models import Profile
from django.contrib.auth.models import User
from datetime import date
# Create your views here.


def profileSettings(request):
    template = 'userSettings.html'
    
    
    if request.method == "GET":
        profile=Profile.objects.get(userID=request.user)
        bdate = profile.birthDate
        today = date.today()
        age = today.year - bdate.year - ((today.month, today.day) < (bdate.month, bdate.day))
        
        
        
        return render(request, template, {'user':profile, 'age':age, 'statuses':profile.STATUS_CHOICES})