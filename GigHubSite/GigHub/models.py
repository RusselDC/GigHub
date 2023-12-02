from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import random
# Create your models here.


class Skills(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.name}"

class Institution(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.name}"

class Degrees(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.name}"
    
class Majors(models.Model):
    degree = models.ForeignKey(Degrees, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.name}"


class Profile(models.Model):
    userID = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to='profiles/', default='profiles/placeholder.png')
    USER_ROLES = [
        ('A','Admin'),
        ('JS','Job Seeker'),
        ('JP','Job Provider')
    ]
    role = models.CharField(max_length=2, choices=USER_ROLES)   
    fName = models.CharField(max_length=255)
    lName = models.CharField(max_length=255)
    mName = models.CharField(max_length=255,null=True)
    contactNo = models.CharField(max_length=13)
    STATUS_CHOICES = [
        ('S','Single'),
        ('M','Married'),
        ('D','Divorced')
    ]
    civilStatus = models.CharField(max_length=20,choices=STATUS_CHOICES, null=True)
    GENDER_CHOICES = [
        ('M','Male'),
        ('F','Female')
    ]
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    sex = models.CharField(max_length=1,choices=GENDER_CHOICES,  null=True)
    birthDate = models.DateField('date_born',  null=True)
    houseNo = models.CharField(max_length=255, null=True)
    baranggay = models.CharField(max_length=255, null=True)
    street = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    province = models.CharField(max_length=255, null=True)
    skills = models.ManyToManyField(Skills)
    is_verified = models.BooleanField(default=False)


    def __str__(self) -> str:
        return f"{self.userID.username} : {self.fName} {self.lName}"



class Company(models.Model):
    employerID = models.ForeignKey(Profile, on_delete=models.CASCADE,limit_choices_to={'role': 'JP'})
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
    jobLocation = models.CharField(max_length=255) # input field
    salaryRange = models.CharField(max_length=255, blank=True, null=True) # dalawang input fields na may name na salary1 and salary2
    deadLine = models.DateField("application_deadline")
    jobRequirements = models.ManyToManyField(Skills) #multiple input fields na may same names like requirements[] para mareturn sila as array sa backend

    #def setJobRequirements(self, values):
    #    self.jobRequirements = ','.join(map(str,values))

    #def getJobRequirements(self):
    #    if self.jobRequirements:
    #        return self.jobRequirements.split(',')
    #    else:
    #        return []
        
    def setSalary(self, values):
        return ','.join(map(str, values))

    def getSalary(self):
        if self.salaryRange:
            return self.salaryRange.split(',')
        else:
            return []
        
    def __str__(self) -> str:
        return f"{self.companyID.companyName} : {self.jobTitle} - {self.deadLine}"
               
class JobApplication(models.Model):
    applicantID = models.ForeignKey(Profile, on_delete=models.CASCADE)
    jobID = models.ForeignKey(JobPostings, on_delete=models.CASCADE)
    date = models.DateField("application_date")
    STATUS_CHOICES = [
        ('applied','Applied'),
        ('in_progress','In Progress'),
        ('rejected','Rejected'),
        ('hired','Hired')
    ]
    applicationStatus = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Applied')

    
class passwordOTP(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    isActivated = models.BooleanField(default=False)
    code = models.CharField(max_length=10)
    date = models.DateTimeField(default=datetime.now())
    def save(self, *args, **kwargs):
        if not self.date:
            self.date = datetime.now()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.userID.username}"


class collegeTaken(models.Model):
    userID = models.ForeignKey(Profile, on_delete=models.CASCADE)
    institution = models.ManyToManyField(Institution)
    degree = models.ManyToManyField(Degrees)
    major = models.ManyToManyField(Majors, blank=True)
    yearGraduated = models.CharField(max_length=4)

    

    
    

       



