from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from GigHub.models import Profile, collegeTaken, Institution, Majors, Degrees, JobPostings, Awards, Certificates, JobApplication, EmploymentHistory, Room, Activities,Message
from GigHub import utils
from django.contrib.auth.models import User
from datetime import date, datetime
from django.contrib.auth.hashers import check_password
from django.db.models import Count, Q

# Create your views here.


def index(request):
    template = "adminJobPostings.html"
    user = Profile.objects.get(userID=request.user)
    posts = JobPostings.objects.filter(isApproved=False)

    return render(request, template, {'user':user,'posts':posts})


def accept(request, postingID):
    jobPosting = JobPostings.objects.get(id=postingID)
    jobPosting.isApproved = True
    jobPosting.save()


    return JsonResponse({'status':True})


def jobProviders(request):
    template = "adminJobProviders.html"

    user = Profile.objects.get(userID=request.user)
    posts = Profile.objects.filter(role="JP")

    return render(request, template, {'user':user,'posts':posts})

def disableProvider(request, personID):
    user = Profile.objects.get(id=personID)

    user.is_active = False
    user.save()

    return redirect('gigAdmin:jobProviders')

def enableProvider(request, personID):
    user = Profile.objects.get(id=personID)

    user.is_active = False
    user.save()

    return redirect('gigAdmin:jobProviders')


def jobSeekers(request):
    template = "adminJobSeekers.html"

    user = Profile.objects.get(userID=request.user)
    posts = Profile.objects.filter(role="JS")

    return render(request, template, {'user':user,'posts':posts})


def disableSeeker(request, personID):
    user = Profile.objects.get(id=personID)

    user.is_active = False
    user.save()

    return redirect('gigAdmin:jobSeekers')

def enableSeeker(request, personID):
    user = Profile.objects.get(id=personID)

    user.is_active = True
    user.save()

    return redirect('gigAdmin:jobSeekers')