from venv import logger
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login as auth_login, logout 
from django.shortcuts import get_object_or_404
from .models import Profile



# Create your views here.



def index(request):
    template = "index.html"
    return render(request, template)


def login(request):
    if request.method == "GET":
        template = "login.html"
        return render(request, template)
    elif request.method == "POST":
        if request.user.is_authenticated:
            if 'user_profile' in request.session:
                del request.session['user_profile']
            logout(request)
        user = authenticate(request, username=request.POST['email'], password=request.POST['password'])
        if user is not None and user.is_active:
            auth_login(request, user)
            profile = Profile.objects.get(userID=user)
            image_url = profile.image.url if profile.image else ''
            birth_date_str = profile.birthDate.strftime('%Y-%m-%d') if profile.birthDate else ''
            request.session['user_profile'] = {
                'user_id' : profile.id,
                'image' : image_url,
                'role' : profile.role,
                'fName' : profile.fName,
                'lName' : profile.lName,
                'mName' : profile.mName,
                'contact' : profile.contactNo,
                'civilStatus' : profile.civilStatus,
                'sex' : profile.sex,
                'active' : profile.is_active,
                'bDay' : birth_date_str,
                'house' : profile.houseNo,
                'street':profile.street,
                'city':profile.city,
                'province':profile.province
            }
            return HttpResponse("succesfully logged in")
        else:
            return HttpResponse("Invalid credentials")

        
        
        
    
def forgot(request):
    if request.method == "GET":
        template = "forgotPassword.html"
        return render(request, template)
    
def verify(request):
    if request.method == "GET":
        template = "verify.html"
        return render(request, template)
    
def changePass(request):
    if request.method == "GET":
        template = "newPassword.html"
        return render(request, template)