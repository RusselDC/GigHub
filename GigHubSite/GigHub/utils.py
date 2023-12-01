from django.core.mail import send_mail



def send_email(subject, message, recipient):
    from_email = 'dencare2023@gmail.com'
    send_mail(subject, message, from_email, [recipient])
    return True
