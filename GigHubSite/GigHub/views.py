from venv import logger
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.shortcuts import get_object_or_404
from .models import Profile, passwordOTP, Skills,collegeTaken, Institution, Degrees, Majors, Company, JobPostings
from django.test import Client
from .utils import send_email
from django.contrib.auth.models import User
from datetime import datetime
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


def Profilechange(request):
    if request.method == "GET":
        user = User.objects.get(id=request.user.id)
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
        #return render(request, template, context={'profile':request.session['user_profile']})
        return HttpResponse(request.session['user_profile'])
    elif request.method == "POST":
        user = User.objects.get(id=request.user.id)
        profile = Profile.objects.get(userID=user)
        profile.role = "JS"
        profile.fName = "Jose"
        profile.lName = "Santos"
        profile.mName = "Dela Cruz"
        profile.contactNo = "09215774055"
        profile.civilStatus = "Married"
        profile.sex = "M"
        profile.birthDate = "2002-05-03"
        profile.houseNo = "0666"
        profile.street = "Purok 666"
        profile.city = "Malolos"
        profile.province = "Bulacan"
        profile.save()
        #return render(request, template="edit.html",context={'success':'Profile has been saved'})

def register(request):
    if request.method == "GET":
        return render(request, "register.html")
    else :
        imgSave = ""
        placeholder = 'profiles/placeholder.jpg'
        if request.user.is_authenticated:
            auth_logout(request)
        img = request.FILES.get('picture')
        lname = request.POST['lName']
        mname = request.POST['mName']
        fname = request.POST['fName']
        contact = request.POST['mobile']
        email = request.POST['email']
        password = request.POST['password']
        role = request.POST['role']
        sex = request.POST['sex']
        bdate = request.POST['bdate']
        user_check  = User.objects.filter(username=email)
        
        if img:
            imgSave = img
        else:
            imgSave = placeholder

        if user_check.exists():
            return render(request, "register.html", {'errorMSG': 'Email Already Used'})
        user = User.objects.create_user(username=email, password=password)
        profile = Profile.objects.create(userID=user,image=imgSave,role=role,fName=fname,mName=mname,lName=lname,contactNo=contact,sex=sex,birthDate=bdate)
        return redirect('GigHub:login')


def addSkills(request):
    if not request.user.is_authenticated:
        return redirect('GigHub:index')
    else:
        skill_names = ['Python','PHP','Java','C#']
        profile = Profile.objects.get(userID=request.user)

        for skill_name in skill_names:
            skill, created = Skills.objects.get_or_create(name__iexact=skill_name)
            if created or not skill.name:
            # If created or if the existing record has an empty name, set the name
                skill.name = skill_name
                skill.save()
            profile.skills.add(skill)

def addCollege(request):
    profile = Profile.objects.get(userID=request.user)
    institution_name = "Bulacan State University"
    degree_name = "Bachelor of Science in Information Technology"
    major_name = "Web and Mobile Application Development"
    year = "2024"

    ins, created = Institution.objects.get_or_create(name__iexact=institution_name)
    if created or not ins.name:
        ins.name = institution_name
        ins.save()
    deg, createds = Degrees.objects.get_or_create(name__iexact=degree_name)
    if createds or not deg.name:
        deg.name = degree_name
        deg.save()
    maj, createdss = Majors.objects.get_or_create(degree=deg, name__iexact=major_name)
    if createdss or not maj.name:
        maj.name = major_name
        maj.save()
   
    college_taken_instance = collegeTaken.objects.create(userID=profile, yearGraduated=year)
    college_taken_instance.institution.add(ins)
    college_taken_instance.degree.add(deg)
    college_taken_instance.major.add(maj)
    college_taken_instance.save()

def addCompany(request):
    profile = Profile.objects.get(userID=request.user)
    coName = "DenCare"
    coAddress = "Hagonoy, Bulacan"
    coEmail = "dencare2023@gmail.com"
    coNumber = "09215774058"
    Company.objects.create(employerID=profile, companyName=coName, companyAddress=coAddress, companyEmail=coEmail, contactNumber=coNumber)

def addJobPosting(request):
    profile = Profile.objects.get(userID=request.user)
    company = Company.objects.get(employerID=profile)
    jTitle = "Backend Developer"
    jDesc = 'We are seeking a highly skilled Backend Developer to join our team at [Your Company Name]. As a Backend Developer, you will play a crucial role in designing, implementing, and maintaining the server-side logic that powers our innovative [industry/domain]-focused solutions. Your responsibilities will include crafting robust APIs, managing databases, and collaborating with cross-functional teams to deliver high-performance software. In this role, you will be responsible for designing and developing server-side solutions, creating RESTful APIs, and optimizing database schemas. You will work closely with front-end developers to ensure seamless communication between the server and client. Code quality is paramount, and you will actively participate in code reviews, contributing to a culture of excellence and continuous improvement.'
    jLocation = "Hagonoy, Bulacan"
    sRange = ['50.000.00','100.000.00']
    dLine = '2024-01-01'
    jRequirements = ['PHP','Backend','Rest API','Postman','PHPUnit']

    newJ = JobPostings()
    newJ.companyID = company
    newJ.jobTitle = jTitle
    newJ.jobDescription = jDesc
    newJ.jobLocation = jLocation
    newJ.salaryRange = newJ.setSalary(sRange)
    newJ.deadLine = dLine

    newJ.save()

    for skill_name in jRequirements:
            skill, created = Skills.objects.get_or_create(name__iexact=skill_name)
            if created or not skill.name:
                skill.name = skill_name
                skill.save()
            newJ.jobRequirements.add(skill)
            newJ.save()






def register_education(request):
    return render(request, "register_education.html")


