from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from GigHub.models import Profile, collegeTaken, Institution, Majors, Degrees
from GigHub import utils
from django.contrib.auth.models import User
from datetime import date, datetime
from django.contrib.auth.hashers import check_password

import json
# Create your views here.


def profileSettings(request):
    template = 'userSettings.html'
    
    
    if request.method == "GET":
        
        profile=Profile.objects.get(userID=request.user)
       
        colleges_queryset = collegeTaken.objects.filter(userID=profile)
        ins = Institution.objects.all()
        deg = Degrees.objects.all()
    
        college_data_list = []
        for college in colleges_queryset:
            institutions = [institution.name for institution in college.institution.all()]
            degrees = [degree.name for degree in college.degree.all()]
            majors = [major.name for major in college.major.all()]

            college_data = {
                'institutions': institutions,
                'degrees': degrees,
                'majors': majors,
                'award':college.award,
                'yearGraduated': college.yearGraduated,
            }

            college_data_list.append(college_data)
        
        

        bdate = profile.birthDate
        today = date.today()
        age = today.year - bdate.year - ((today.month, today.day) < (bdate.month, bdate.day))
        return render(request, template, {'user':profile, 'age':age, 'statuses':profile.STATUS_CHOICES, 'pageName':'profileSettings', 'pagePart': 1, 'colleges':college_data_list, 'degrees':deg,'insitutions':ins})
    elif request.method == "POST":
        
        profile = Profile.objects.get(userID=request.user)
        
        profile.fName = request.POST['fName']
        profile.lName = request.POST['lName']
        profile.mName = request.POST['mName']
        profile.suffix = request.POST['suffix']
        profile.civilStatus = request.POST['status']
        profile.sex = request.POST['sex']
        profile.birthDate = request.POST['birthday']
        profile.baranggay = request.POST['barangay']
        profile.city = request.POST['city']
        profile.province = request.POST['province']
        if request.FILES.get('profileImg') is not None:
            profile.image = request.FILES.get('profileImg')

        profile.save()
        
        profile=Profile.objects.get(userID=request.user)
       
        colleges_queryset = collegeTaken.objects.filter(userID=profile)
        ins = Institution.objects.all()
        deg = Degrees.objects.all()
    
        college_data_list = []
        for college in colleges_queryset:
            institutions = [institution.name for institution in college.institution.all()]
            degrees = [degree.name for degree in college.degree.all()]
            majors = [major.name for major in college.major.all()]

            college_data = {
                'institutions': institutions,
                'degrees': degrees,
                'majors': majors,
                'award':college.award,
                'yearGraduated': college.yearGraduated,
            }

            college_data_list.append(college_data)
        
        

        bdate = profile.birthDate
        today = date.today()
        age = today.year - bdate.year - ((today.month, today.day) < (bdate.month, bdate.day))
        return render(request, template, {'user':profile, 'age':age, 'statuses':profile.STATUS_CHOICES, 'pageName':'profileSettings', 'prompt':'Profile has been saved', 'pagePart': 1, 'colleges':college_data_list, 'degrees':deg,'insitutions':ins})
    

def profileEducation(request):
    #guest = utils.checkAuth(request)
    #if guest != True:
    #    return redirect(f"{guest}")
    
    profile = Profile.objects.get(userID=request.user)
    institution_name = request.POST['uni']
    degree_name = request.POST['deg']
    major_name = request.POST['maj']
    date_string = request.POST['graduated']
    parsed_date = datetime.strptime(date_string, "%Y-%m-%d")
    award = request.POST['award']
    year = str(parsed_date.year)

    ins, created = Institution.objects.get_or_create(name__iexact=institution_name)
    if created or not ins.name:
        ins.name = institution_name
        ins.save()
    deg, createds = Degrees.objects.get_or_create(name__iexact=degree_name)
    if createds or not deg.name:
        deg.name = degree_name
        deg.save()

    if major_name != "":
        maj, createdss = Majors.objects.get_or_create(degree=deg, name__iexact=major_name)
        if createdss or not maj.name:
            maj.name = major_name
            maj.save()
   
    college_taken_instance = collegeTaken.objects.create(userID=profile, yearGraduated=year, award=award)
    college_taken_instance.institution.add(ins)
    college_taken_instance.degree.add(deg)
    if major_name != "":
        college_taken_instance.major.add(maj)
    college_taken_instance.save()

    return JsonResponse({'message':'Data has been saved','data':[institution_name,degree_name,major_name,year,award]})


def accountEmail(request):
    email = request.POST['email']
    password = request.POST['currentPassword']
    user = User.objects.get(id=request.user.id)

    passwordCheck = check_password(password, request.user.password)

    if passwordCheck:
        #user.set_password(password)
        user.username = email
        user.save()
        return JsonResponse({'status':True,'message':'Email has been changed'})

    return JsonResponse({'status':False,'message':'Inserted password is wrong'})

def accountPassword(request):
    oldPass = request.POST['currentpassword']
    newPass = request.POST['newpassword']
    user = User.objects.get(id=request.user.id)

    passwordCheck = check_password(oldPass, user.password)

    if passwordCheck:
        user.set_password(newPass)
        user.save()
        return JsonResponse({'status':True,'message':'Password has been changed'})
    
    return JsonResponse({'status':False,'message':'Your inserted password is wrong'})
    
    
def dashboard(request):
    template ="dashboard.html"
    if request.method == "GET":
        profile=Profile.objects.get(userID=request.user)
        
        return render(request, template, {'user':profile})
