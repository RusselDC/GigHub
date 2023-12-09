from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from GigHub.models import Profile, collegeTaken, Institution, Majors, Degrees, JobPostings, Awards, Certificates, Company, Industry, companyStaff
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