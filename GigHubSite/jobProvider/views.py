from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from GigHub.models import Profile,Company, companyStaff, Industry
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

        

        