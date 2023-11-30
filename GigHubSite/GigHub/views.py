from venv import logger
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.shortcuts import get_object_or_404
from .models import Profile, passwordOTP
from django.test import Client
from .utils import send_email
from django.contrib.auth.models import User
import random
from django.core.exceptions import ObjectDoesNotExist


# Create your views here.
def index(request):
    template = "index.html"
    if request.user.is_authenticated:
        if 'user_profile' in request.session:
            
            session_arr = request.session['user_profile']
            return render(request, template, context={'session_arr': session_arr})
        else:
            return render(request, template, context={'error_message': 'User profile not found in session'})
    else:
        return render(request, template)

def login(request):
    template = "login.html"
    if request.method == "GET":
        if(request.user.is_authenticated):
            return redirect('GigHub:index')
        else:
            return render(request, template)
        
    elif request.method == "POST":
        remember_me = request.POST.get('remember', False)
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
            userData = request.session['user_profile'] = {
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
           
            
            return redirect('GigHub:index')
        else:
            return render(request, template, context={'errorMsg' : 'Invalid Credentials'})

        
        
        
    
def forgot(request):
    if request.method == "GET":
        template = "forgotPassword.html"
        return render(request, template)
    elif request.method == "POST":
        email = request.POST['email']
        user = User.objects.filter(username=email).first()
        if user is None:
            return render(request, "forgotPassword.html", {'errorMsg': 'No Email Found' , 'creds':{'email':request.POST['email'],'password':''}})

        if user.is_active:
            otp = random.randint(100000, 999999)
            request.session['passwordOTP'] = {
                'email': email,
                'otp': otp
            }
            password = passwordOTP(userID=user, code=otp)
            password.save()
            send_email('Reset Password', f"Your password otp is {otp}", user.username)
            return redirect('GigHub:verify')
        else:
            template = "forgotPassword.html"
            context = {'errorMsg': "No Email Found"}
            return render(request, template, context)

        

    
def verify(request):
    if request.method == "GET":
        template = "verify.html"
        return render(request, template, context={'creds':request.session['passwordOTP']})
    elif request.method == "POST":
        otpArr = request.POST.getlist('otp[]')      
        email = request.POST['email']
        otpString = ''.join(otpArr)
        
        user = User.objects.filter(username=email).first()
        if user is None:
            return render(request, "verify.html", {'errorMSG':'No user found with that email' , 'creds':{'email':request.POST['email'],'password':''}})
        checkotp = passwordOTP.objects.filter(userID=user,isActivated=False,code=otpString)
        if not checkotp.exists():
            return render(request, "verify.html", {'errorMSG':'You inserted the wrong otp', 'creds':{'email':request.POST['email'],'password':''}})
        else:
            otp = passwordOTP.objects.get(userID=user,isActivated=False,code=otpString)
            otp.isActivated = True
            otp.save()
            return redirect('GigHub:changePass')
        
            
        
def changePass(request):
    if request.method == "GET":
        template = "newPassword.html"
        return render(request, template, context={'creds':request.session['passwordOTP']})
    if request.method == "POST":
        template = "newPassword.html"
        user = User.objects.get(username=request.POST['email'])
        user.set_password(request.POST['password'])
        user.save()
        user = authenticate(request, username=user.username, password=request.POST['password'])
        if user is not None:
            auth_login(request, user)
            profile = Profile.objects.get(userID=user)
            image_url = profile.image.url if profile.image else ''
            birth_date_str = profile.birthDate.strftime('%Y-%m-%d') if profile.birthDate else ''
            userData = request.session['user_profile'] = {
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
            return redirect('GigHub:index')
        
        
    
def logout(request):
    #send_email('Logout',f"{request.session['user_profile']['fName']} logged out",'delacruzruss12@gmail.com')
    if request.user.is_authenticated:
        if 'user_profile' in request.session:
            del request.session['user_profile']
        auth_logout(request)
    return redirect('GigHub:index')



