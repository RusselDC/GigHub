from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from GigHub.models import Profile, collegeTaken, Institution, Majors, Degrees, JobPostings, Awards, Certificates, JobApplication, EmploymentHistory, Room, Activities,Message
from GigHub import utils
from django.contrib.auth.models import User
from datetime import date, datetime
from django.contrib.auth.hashers import check_password
from django.db.models import Count, Q

import json
# Create your views here.


def searchResult(request):
    template="searchResult.html"
    profile = Profile.objects.get(userID=request.user)
    if request.method == "GET":


        jobs = JobApplication.objects.filter(applicantID=profile)



        return render(request, template,{'user':profile,'jobs':jobs})
    
def profileSettings(request):
    template = 'userSettings.html'
    if request.method == "GET":
        
        profile=Profile.objects.get(userID=request.user)
       
        colleges_queryset = collegeTaken.objects.filter(userID=profile)
        awards_queryset = Awards.objects.filter(user=profile)
        college_data_list = []
        certificate_data_list = []
        certificates_queryset = Certificates.objects.filter(user=profile)
        ins = Institution.objects.all()
        deg = Degrees.objects.all()


        awards_data_list = []

        employment_queryset = EmploymentHistory.objects.filter(user=profile)
        employment_data_list = []

        for employment in employment_queryset:
            employment_data = {
                'id':employment.id,
                'name':employment.companyName,
                'position':employment.position,
                'start':employment.date_started.strftime('%B %Y'),
                'end':employment.date_ended.strftime('%B %Y') if employment.date_ended is not None else 'Present',
                'duties':employment.getDuties()
            }

            employment_data_list.append(employment_data)
        
        for college in colleges_queryset:
            institutions = [institution.name for institution in college.institution.all()]
            degrees = [degree.name for degree in college.degree.all()]
            majors = [major.name for major in college.major.all()]

            college_data = {
                'id':college.id,
                'institutions': institutions,
                'degrees': degrees,
                'majors': majors,
                'award':college.award if college.award is not None else '',
                'yearGraduated': college.yearGraduated,
            }

            college_data_list.append(college_data)

        for award in awards_queryset:

            award_data = {
                'title':award.title,
                'from':award.awardForm,
                'date':award.date
            }

            awards_data_list.append(award_data)

        for certiifcate in certificates_queryset:

            certiifcate_data = {
                'title':certiifcate.title,
                'from':certiifcate.certificateForm,
                'date':certiifcate.date
            }

            certificate_data_list.append(certiifcate_data)


        
        

        bdate = profile.birthDate
        today = date.today()
        age = today.year - bdate.year - ((today.month, today.day) < (bdate.month, bdate.day))
        return render(request, template, {'employment':employment_data_list,'certis':certificate_data_list,'awards':awards_data_list,'user':profile, 'age':age, 'statuses':profile.STATUS_CHOICES, 'pageName':'profileSettings', 'pagePart': 1, 'colleges':college_data_list, 'degrees':deg,'insitutions':ins})
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
        certificates_queryset = Certificates.objects.filter(user=profile)
        colleges_queryset = collegeTaken.objects.filter(userID=profile)
        
        awards_queryset = Awards.objects.filter(user=profile)

        certificate_data_list = []
        awards_data_list = []
        ins = Institution.objects.all()
        deg = Degrees.objects.all()


        employment_queryset = EmploymentHistory.objects.filter(user=profile)
        employment_data_list = []

        for employment in employment_queryset:
            employment_data = {
                'id':employment.id,
                'name':employment.companyName,
                'position':employment.position,
                'start':employment.date_started.strftime('%B %Y'),
                'end':employment.date_ended.strftime('%B %Y') if employment.date_ended is not None else 'Present',
                'duties':employment.getDuties()
            }

            employment_data_list.append(employment_data)

        college_data_list = []
        for college in colleges_queryset:
            institutions = [institution.name for institution in college.institution.all()]
            degrees = [degree.name for degree in college.degree.all()]
            majors = [major.name for major in college.major.all()]

            

            college_data = {
                'id':college.id,
                'institutions': institutions,
                'degrees': degrees,
                'majors': majors,
                'award':college.award if college.award is not None else '',
                'yearGraduated': college.yearGraduated,
            }

            college_data_list.append(college_data)

        for award in awards_queryset:

            award_data = {
                'title':award.title,
                'from':award.awardForm,
                'date':award.date
            }

            awards_data_list.append(award_data)

        for certiifcate in certificates_queryset:

            certiifcate_data = {
                'title':certiifcate.title,
                'from':certiifcate.certificateForm,
                'date':certiifcate.date
            }

            certificate_data_list.append(certiifcate_data)
        
        

        bdate = profile.birthDate
        today = date.today()
        age = today.year - bdate.year - ((today.month, today.day) < (bdate.month, bdate.day))
        return render(request, template, {'employment':employment_data_list,'certis':certificate_data_list,'awards':awards_data_list,'user':profile, 'age':age, 'statuses':profile.STATUS_CHOICES, 'pageName':'profileSettings', 'prompt':'Profile has been saved', 'pagePart': 1, 'colleges':college_data_list, 'degrees':deg,'insitutions':ins})
    

def profileEducation(request):
    #guest = utils.checkAuth(request)
    #if guest != True:
    #    return redirect(f"{guest}")
    
    profile = Profile.objects.get(userID=request.user)
    institution_name = request.POST['uni']
    degree_name = request.POST['deg']
    major_name = request.POST['maj']
    date_string = request.POST['graduated']
    award = request.POST['award']
    year = date_string

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
        acts = Activities.objects.filter(viewer=profile).order_by('-dateandtime')
        apps = len(JobApplication.objects.filter(applicantID=profile))
        pending = len(JobApplication.objects.filter(applicantID=profile,applicationStatus="applied"))
        review = len(JobApplication.objects.filter(applicantID=profile,applicationStatus="in_progress"))
        hired = len(JobApplication.objects.filter(applicantID=profile,applicationStatus="hired"))
        rejected = len(JobApplication.objects.filter(applicantID=profile,applicationStatus="rejected"))
        


        activeJobApps = len(JobPostings.objects.filter(isApproved=True))        

        
        return render(request, template, {'user':profile,'pageName':'dashBoard','acts':acts,'appsNO':apps,'activeJobApps':activeJobApps,'statuses':{'pending':pending,'review':review,'hired':hired,'rejected':rejected}})
    
    
    
def job(request):
    template ="job.html"
    if request.method == "GET":
        profile=Profile.objects.get(userID=request.user)
        user_skills = Profile.objects.get(userID=request.user).skills.all()
        user_application = JobApplication.objects.filter(applicantID=profile)
        topRecommended = JobPostings.objects.filter(jobRequirements__in=user_skills,isApproved=True).exclude(Q(id__in=user_application.values('jobID'))).annotate(common_skills_count=Count('jobRequirements'))\
        .filter(common_skills_count__gte=3)\
        .distinct()[:3]

        
        recommended = JobPostings.objects.filter(isApproved=True)\
        .exclude(Q(id__in=user_application.values('jobID')))\
        .exclude(id__in=topRecommended.values('id'))\
        .distinct()
        
        

        
        recommended_data_all = []
        topRecommended_data_all = []


        for topReco in topRecommended:
            skills = [skills.name for skills in topReco.jobRequirements.all()]

            topReco_data = {
                'id': topReco.id,
                'company' : topReco.companyID.companyName,
                'title' : topReco.jobTitle,
                'desc' : topReco.jobDescription,
                'requirements' : skills
            }

            topRecommended_data_all.append(topReco_data)
        
        
        
        for reco in recommended:
            skills = [skills.name for skills in reco.jobRequirements.all()]
            recommended_data = {
                'id': reco.id,
                'company' : reco.companyID.companyName,
                'title' : reco.jobTitle,
                'desc' : reco.jobDescription,
                'requirements' : skills
            }
            recommended_data_all.append(recommended_data)

        

        return render(request, template, {'user':profile,'pageName':'job','recommended':recommended_data_all,'topRecommended':topRecommended_data_all})
    else:
        #return JsonResponse({'message':"HI",'data':request.POST})
        profile = Profile.objects.get(userID=request.user)
        jobPost = JobPostings.objects.get(id=request.POST['id'])

        jobAppl = JobApplication.objects.create(applicantID=profile, jobID=jobPost)
        Room.objects.create(jobApp=jobAppl)
        company_profiles = jobPost.companyID.employerID.all()
        activity = Activities(
        content=f"{profile.fName} {profile.lName} has sent an application on your {jobPost.jobTitle} : {jobPost.companyID.companyName} posting",
        )
        activity.save()
        activity.viewer.set(company_profiles)
        activity.save()

        return JsonResponse({'status':True,'message':'Application has been sent'})


def addAward(request):

    profile = Profile.objects.get(userID=request.user)
    Awards.objects.create(user=profile,title=request.POST['title'],awardForm=request.POST['from'],date=request.POST['year'])

    return JsonResponse({'status':True,'message':'The award has been saved','container':'awardContainer'})

def addCertis(request):
    profile = Profile.objects.get(userID=request.user)
    Certificates.objects.create(user=profile,title=request.POST['title'],certificateForm=request.POST['from'],date=request.POST['year'])

    return JsonResponse({'status':True,'message':'The certificate has been saved','container':'certisContainer'})


def addEmployment(request):
    profile = Profile.objects.get(userID=request.user)
    duties = request.POST.getlist('duties[]')
    name = request.POST['name']
    position = request.POST['position']
    start = request.POST['start']
    end = request.POST['end']

    if end == '':
        end = None

    emp = EmploymentHistory(
        user=profile,
        companyName=name,
        position=position,
        date_started=start,
        date_ended = end,
        duties=duties
    )

    emp.duties = emp.setDuties(emp.duties)
    emp.save()

    return JsonResponse({'status':True,'message':'Employment history has been saved'})



def getMessage(request, appID):
    app = JobApplication.objects.get(id=appID)
    room = Room.objects.get(jobApp=app)
    messages = Message.objects.filter(message=room)


    message_data_list = []
    for message in messages:
        message_data = {
            'content':message.messageContent,
            'sender':message.sender.image.url,
            'role':message.sender.role,
            'date':message.date.strftime("%B %d, %Y %I:%M %p")
            
        }

        message_data_list.append(message_data)
    return JsonResponse({'messages':message_data_list})


def sendMessage(request):
    profile = Profile.objects.get(userID=request.user)
    room = Room.objects.get(id=request.POST['id'])

    Message.objects.create(
        message=room,
        messageContent=request.POST['content'],
        sender=profile,
        senderRole = profile.role
    )
    return JsonResponse({'status':True})

def deleteEducation(request,educID):
    college = collegeTaken.objects.filter(id=educID)
    if college is not None:
        college.delete()
    return JsonResponse({'status':True})

def deleteWork(request,workID):
    work = EmploymentHistory.objects.filter(id=workID)
    if work is not None:
        work.delete()
    return JsonResponse({'status':True})


