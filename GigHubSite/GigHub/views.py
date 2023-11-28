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