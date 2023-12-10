from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone

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
    
class Industry(models.Model):
    name = models.CharField(max_length=255)



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
    suffix = models.CharField(max_length=10,null=True, blank=True)
    contactNo = models.CharField(max_length=13)
    STATUS_CHOICES = [
        ('S','Single'),
        ('M','Married'),
        ('D','Divorced'),
        ('W','Widowed'),
        ('SE','Separated')
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
    verificationLevel = models.IntegerField(default=0)


    def __str__(self) -> str:
        return f"{self.userID.username} : {self.fName} {self.lName}"



class Company(models.Model):
    employerID = models.ManyToManyField(Profile)
    companyName = models.CharField(max_length=255)
    industry = models.ForeignKey(Industry, on_delete=models.DO_NOTHING, null=True)
    empRange = models.CharField(max_length=50, null=True)
    province = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    baranggay = models.CharField(max_length=255, null=True)
    strt = models.CharField(max_length=255, null=True)
    bldgNo = models.CharField(max_length=255, null=True)
    isActive = models.BooleanField(default=True)


    def __str__(self) -> str:
        return self.companyName

class JobPostings(models.Model):
    companyID = models.ForeignKey(Company, on_delete=models.Case)
    jobTitle = models.CharField(max_length=255) #input field
    jobDescription = models.TextField() #text field na malaki
    jobRequirements = models.ManyToManyField(Skills) #multiple input fields na may same names like requirements[] para mareturn sila as array sa backend
    category = models.CharField(max_length=100, null=True)
    scope = models.CharField(max_length=100, null=True)
    timeline = models.CharField(max_length=100, null=True)
    isApproved = models.BooleanField(default=False)
    datePosted = models.DateField(default=timezone.now())
    deadLine = models.DateField(null=True)

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
    date = models.DateField("application_date", default=timezone.now())
    STATUS_CHOICES = [
        ('applied','Applied'),
        ('in_progress','In Progress'),
        ('cancelled','Cancelled'),
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
    award =  models.CharField(max_length=100, blank=True, null=True)
    yearGraduated = models.CharField(max_length=4)

    def __str__(self) -> str:
        institutions = ", ".join([institution.name for institution in self.institution.all()])
        degrees = ", ".join([degree.name for degree in self.degree.all()])
        return f"{self.userID.userID.username} : {institutions} : {degrees} : {self.yearGraduated}"
    

class companyStaff(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    staff = models.ForeignKey(Profile, on_delete=models.CASCADE)
    designation = models.CharField(max_length=255)


    def __str__(self) -> str:
        return f"{self.company.companyName} : {self.designation}"


class Awards(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    awardForm = models.CharField(max_length=255)
    date = models.CharField(max_length=5)


class Certificates(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    certificateForm = models.CharField(max_length=255)
    date = models.CharField(max_length=5)




class EmploymentHistory(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    companyName = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    date_started = models.DateField()
    date_ended = models.DateField(null=True)
    duties = models.TextField(null=True)

    def setDuties(self, values):
        return ','.join(map(str, values))

    def getDuties(self):
        if self.duties:
            return self.duties.split(',')
        else:
            return []
    
    

       



