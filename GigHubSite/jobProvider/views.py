from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from GigHub.models import Profile, collegeTaken, Institution, Majors, Degrees, JobPostings, Awards, Certificates, Company, Industry, companyStaff, JobApplication, Skills, EmploymentHistory,Room,Message
from GigHub import utils
from django.contrib.auth.models import User
from datetime import date, datetime
from django.contrib.auth.hashers import check_password
from django.db.models import Count
# Create your views here.


def companies(request):
    template = 'company.html'
    if request.method == "GET":
        
        profile = Profile.objects.get(userID=request.user)
        companies = Company.objects.filter(employerID=profile)
        companies_data_list = []
        for co in companies:
            company_data = {
                'id':co.id,
                'name':co.companyName,
                'industry':co.industry.name,
                'empRange':co.empRange,
                'location':f"{co.bldgNo} , {co.strt} {co.baranggay} {co.city}, {co.province}"
            }

            companies_data_list.append(company_data)
        return render(request, template, {'pageName':'companies','user':profile, 'companies':companies_data_list})
    else:
        
        profile = Profile.objects.get(userID=request.user)

        coName = request.POST['name']
        coInd = request.POST['industry']
        empRange = request.POST['empRange']
        province = request.POST['province']
        city = request.POST['city']
        brgy = request.POST['baranggay']
        street = request.POST['street']
        bldg = request.POST['bldg']

        industry, created = Industry.objects.get_or_create(name__iexact=coInd)
        if created or not industry.name:
            industry.name = coInd
            industry.save()

        company = Company.objects.create(companyName=coName,empRange=empRange, industry=industry,
                                         province=province,city=city,baranggay=brgy,
                                         strt=street,bldgNo=bldg)
        company.employerID.add(profile)

        
        company.save()

        companyStaff.objects.create(company=company,staff=profile,designation=request.POST['designation'])

        return JsonResponse({'status':True,'message':'Company Added'})

def editCompany(request):
    
        
    coName = request.POST['name']
    coInd = request.POST['industry']
    empRange = request.POST['employees']
    province = request.POST['province']
    city = request.POST['city']
    brgy = request.POST['barangay']
    street = request.POST['street']
    bldg = request.POST['bldg']

    industry, created = Industry.objects.get_or_create(name__iexact=coInd)
    if created or not industry.name:
        industry.name = coInd
        industry.save()

    company = Company.objects.get(id=request.POST['companyID'])

    company.companyName = coName
    company.empRange = empRange
    company.industry = industry
    company.province = province
    company.city = city
    company.baranggay = brgy
    company.strt = street
    company.bldgNo = bldg
    company.save()


    staff = companyStaff.objects.get(company=company,staff=Profile.objects.get(userID=request.user))
    desi = request.POST.get('designation',None)
    if desi is not None:
        staff.designation = request.POST['designation']
        staff.save()

    return redirect('jobProvider:companies')


    

    

def settings(request):
    template = 'providerSettings.html'
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
        
        for college in colleges_queryset:
            institutions = [institution.name for institution in college.institution.all()]
            degrees = [degree.name for degree in college.degree.all()]
            majors = [major.name for major in college.major.all()]

            college_data = {
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
        return render(request, template, {'certis':certificate_data_list,'awards':awards_data_list,'user':profile, 'age':age, 'statuses':profile.STATUS_CHOICES, 'pageName':'profileSettings', 'pagePart': 1, 'colleges':college_data_list, 'degrees':deg,'insitutions':ins})
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

        college_data_list = []
        for college in colleges_queryset:
            institutions = [institution.name for institution in college.institution.all()]
            degrees = [degree.name for degree in college.degree.all()]
            majors = [major.name for major in college.major.all()]

            

            college_data = {
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
        return render(request, template, {'certis':certificate_data_list,'awards':awards_data_list,'user':profile, 'age':age, 'statuses':profile.STATUS_CHOICES, 'pageName':'profileSettings', 'prompt':'Profile has been saved', 'pagePart': 1, 'colleges':college_data_list, 'degrees':deg,'insitutions':ins})
    

def getCompany(request, coID):
    company = Company.objects.get(id=coID)
    designation = companyStaff.objects.get(company=company,staff=Profile.objects.get(userID=request.user))

    

    companyData = {
        'designation':designation.designation,
        'name': company.companyName,
        'industry': company.industry.name,
        'empRange': company.empRange,
        'province': company.province,
        'city': company.city,
        'baranggay': company.baranggay,
        'strt': company.strt,
        'bldgNo': company.bldgNo
    }



    return JsonResponse({'status':True,'data':companyData})

def jobPostings(request):
    template = "jobPostings.html"
    if request.method == "GET":
        skillsset = Skills.objects.annotate(profile_count=Count('profile')).order_by('-profile_count')[:5]

        user = Profile.objects.get(userID=request.user)
        companies = Company.objects.filter(employerID=user)
        companies_data_list = []

        for co in companies:

            company_data = {
                'id':co.id,
                'name':co.companyName,
            }

            companies_data_list.append(company_data)

        jobs = JobPostings.objects.filter(companyID__in=companies)

        job_data_list = []

        for job in jobs:
            skills = [skills.name for skills in job.jobRequirements.all()][:3]

            job_data = {
                'id':job.id,
                'title':job.jobTitle,
                'desc':job.jobDescription[:310 - 3] + "...",
                'company':job.companyID.companyName,
                'reqs':', '.join(skills),
                'scope':job.scope,
                'timeline':job.timeline,
                'posted':job.datePosted.strftime('%B %Y')
            }

            job_data_list.append(job_data)





        return render(request,template,{'skills':skillsset,'user':user,'companies':companies_data_list,'jobs':job_data_list})
    else:
        
        id = request.POST['companyID']
        title = request.POST['jobTitle']
        overview = request.POST['projectOverview']
        scale = request.POST['projectScale']
        timeline = request.POST['projectTimeline']
        skills = request.POST.getlist('skills[]')
        desc = request.POST['description']
        

        jobPosting = JobPostings.objects.create(
            companyID=Company.objects.get(id=id),
            jobTitle=title,
            jobDescription=desc,
            category=overview,
            scope=scale,
            timeline=timeline
            )

        for skill in skills:
            skl, cre = Skills.objects.get_or_create(name__iexact=skill)
            jobPosting.jobRequirements.add(skl)
            if cre or not skl.name:
                skl.name = skills
                skl.save()
                

        jobPosting.save()

        return redirect('jobProvider:jobPostings')
    
def jobPosting(request,jobID):
    template = "jobPosting.html"
    jobPosting = JobPostings.objects.get(id=jobID)

    applicants = JobApplication.objects.filter(jobID=jobPosting)
    applicants_data_list = []

    for applicant in applicants:
        applicant_data = {
            'id':applicant.id,
            'name' : f"{applicant.applicantID.fName} {applicant.applicantID.lName}",
            'email' : applicant.applicantID.userID.username,
            'date': applicant.date.strftime('%Y-%m-%d'),
            'status':applicant.get_applicationStatus_display
        }
        applicants_data_list.append(applicant_data)


    
    user = Profile.objects.get(userID=request.user) 
    return render(request,template,{'user':user,'applicants':applicants_data_list})

def getApplicant(request, applicantID):
    app = JobApplication.objects.get(id=applicantID)

    name = f"{app.applicantID.fName} {app.applicantID.lName}"
    email = app.applicantID.userID.username
    contact = app.applicantID.contactNo

    education_data_list = []

    for education in collegeTaken.objects.filter(userID=app.applicantID):
        institutions = [institution.name for institution in education.institution.all()]
        degrees = [degree.name for degree in education.degree.all()]
        

        education_data = {
            'school':institutions,
            'course':degrees,
            'year':education.yearGraduated,
            'award':education.award
        }
        
        education_data_list.append(education_data)


    employment_data_list = []

    for employment in EmploymentHistory.objects.filter(user=app.applicantID):

        employment_data = {
            'name':employment.companyName,
            'position':employment.position,
            'start':employment.date_started.strftime('%B %Y'),
            'end':employment.date_ended.strftime('%B %Y') if employment.date_ended is not None else 'Present',
            'duties':employment.getDuties()
        }

        employment_data_list.append(employment_data)

    awards_data_list = []

    for award in Awards.objects.filter(user=app.applicantID):

        award_data = {
            'title':award.title,
            'from':award.awardForm,
            'date':award.date
        }
        awards_data_list.append(award_data)

    certificate_data_list = []

    for certificate in Certificates.objects.filter(user=app.applicantID):

        certiifcate_data = {
            'title':certificate.title,
            'from':certificate.certificateForm,
            'date':certificate.date
        }

        certificate_data_list.append(certiifcate_data)

    skills_data_list = []

    for skill in app.applicantID.skills.all():

        skills_data_list.append(skill.name)

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
    






    return JsonResponse({'name':name,'email':email,'contact':contact,'colleges':education_data_list,'employment':employment_data_list,'awards':awards_data_list,'certificates':certificate_data_list,'skills':skills_data_list,'messages':message_data_list,'room':room.id})

def sendReply(request):
    profile = Profile.objects.get(userID=request.user)
    room = Room.objects.get(id=request.POST['roomID'])

    Message.objects.create(
        message=room,
        messageContent=request.POST['replyInput'],
        sender=profile,
        senderRole = profile.role
    )




    return JsonResponse({"data":request.POST})



def acceptApplication(request,applicantID):

    app = JobApplication.objects.get(id=applicantID)
    app.applicationStatus = "in_progress"
    app.save()




    return JsonResponse({"status":True})

def hireApplication(request,applicantID):
    app = JobApplication.objects.get(id=applicantID)
    app.applicationStatus = "hired"
    app.save()

    
    return JsonResponse({"status":True})

def rejectApplication(request,applicantID):
    app = JobApplication.objects.get(id=applicantID)
    app.applicationStatus = "rejected"
    app.save()
    return JsonResponse({"status":True})