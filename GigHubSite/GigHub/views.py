from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

# Create your views here.



def index(request):
    template = "index.html"
    return render(request, template)


def login(request):
    if request.method == "GET":
        template = "login.html"
        return render(request, template)
    
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