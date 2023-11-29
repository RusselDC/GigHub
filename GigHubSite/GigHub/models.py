from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.




class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    



class User(AbstractBaseUser, PermissionsMixin):
    image = models.ImageField(default="placeholder.png")
    USER_ROLES = [
        ('A','Admin'),
        ('JS','Job Seeker'),
        ('JP','Job Provider')
    ]
    role = models.CharField(max_length=2, choices=USER_ROLES)
    password = models.CharField(max_length=255, default="GigHub2023")
    fName = models.CharField(max_length=255)
    lName = models.CharField(max_length=255)
    mName = models.CharField(max_length=255,null=True)
    email = models.EmailField(unique=True)
    contactNo = models.CharField(max_length=13)
    civilStatus = models.CharField(max_length=20)
    GENDER_CHOICES = [
        ('M','Male'),
        ('F','Female')
    ]
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    sex = models.CharField(max_length=1,choices=GENDER_CHOICES)
    birthDate = models.DateField('date_born')
    houseNo = models.CharField(max_length=255, null=True)
    street = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    province = models.CharField(max_length=255, null=True)
    REQUIRED_FIELDS = ['password']
    USERNAME_FIELD = 'email'
    def __str__(self) -> str:
        return self.email



class Company(models.Model):
    employerID = models.ForeignKey(User, on_delete=models.CASCADE,limit_choices_to={'role': 'JP'})
    companyName = models.CharField(max_length=255)
    companyAddress = models.CharField(max_length=255)
    companyEmail = models.CharField(max_length=255)
    contactNumber = models.CharField(max_length=20)
    isActive = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.companyName

class JobPostings(models.Model):
    companyID = models.ForeignKey(Company, on_delete=models.Case)
    jobTitle = models.CharField(max_length=255) #input field
    jobDescription = models.TextField() #text field na malaki
    jobRequirements = models.CharField(max_length=255, blank=True, null=True) #multiple input fields na may same names like requirements[] para mareturn sila as array sa backend
    jobLocation = models.CharField(max_length=255) # input field
    salaryRange = models.CharField(max_length=255, blank=True, null=True) # dalawang input fields na may name na salary1 and salary2
    deadLine = models.DateField("application_deadline")


    def setJobRequirements(self, values):
        self.jobRequirements = ','.join(map(str,values))

    def getJobRequirements(self):
        if self.jobRequirements:
            return self.jobRequirements.split(',')
        else:
            return []
        
    def setSalary(self, values):
        self.salaryRange = ','.join(map(str, values))

    def getSalary(self):
        if self.salaryRange:
            return self.salaryRange.split(',')
        else:
            return []
        

        
class JobApplication(models.Model):
    applicantID = models.ForeignKey(User, on_delete=models.CASCADE)
    jobID = models.ForeignKey(JobPostings, on_delete=models.CASCADE)
    date = models.DateField("application_date")
    STATUS_CHOICES = [
        ('applied','Applied'),
        ('in_progress','In Progress'),
        ('rejected','Rejected'),
        ('hired','Hired')
    ]
    applicationStatus = models.CharField(max_length=30, choices=STATUS_CHOICES)

    

    
    

       



