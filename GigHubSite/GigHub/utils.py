from django.core.mail import send_mail
from django.shortcuts import redirect


def send_email(subject, message, recipient):
    from_email = 'dencare2023@gmail.com'
    send_mail(subject, message, from_email, [recipient])
    return True


def checkVerification(profile):
    level = profile.verificationLevel

    if level == 1:
        return 'GigHub:register_education'
    elif level == 2:
        return 'GigHub:register_skills'
    elif level == 3:
        return 'GigHub:register_moreInfo'
    elif level == 4:
        return True


def checkGuest(request):
    if request.user.is_authenticated:
        'GigHub:index'
    else:
        return True
    

def checkAuth(request):
    if request.user.is_authenticated:
        return True
    else:
        'GigHub:index'
