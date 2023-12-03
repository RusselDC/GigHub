from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from GigHub.models import Profile
from django.contrib.auth.models import User
# Create your views here.


def profileSettings(request):
    template = 'userSettings.html'
    user = request.session['user_profile']
    
    if request.method == "GET":
        return render(request, template, {'user':user})