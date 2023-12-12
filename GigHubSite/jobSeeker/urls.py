from django.urls import path
from . import views

app_name="jobSeeker"

urlpatterns = [
    path('settings/',views.profileSettings,name="userSettings"),
    path('education/',views.profileEducation, name="profileEducation"),
    path('awards/',views.addAward, name="profileAward"),
    path('certificates/',views.addCertis, name="profileCerties"),
    path('account/email/',views.accountEmail, name="accountEmail"),
    path('account/password/',views.accountPassword,name="accountPassword"),
    path('dashboard/',views.dashboard,name="dashboard"),
    path('job/',views.job,name="job"),
    path('searchResult/',views.searchResult,name="searchResult"),
    path('employment/',views.addEmployment,name="employment"),
    path('getMessage/<int:appID>/',views.getMessage,name="getMessage"),
    path('sendMessage/',views.sendMessage,name="sendMessage"),
    path('deleteEducation/<int:educID>/',views.deleteEducation,name="deleteEducation"),
    path('deleteWork/<int:workID>/',views.deleteWork,name="deleteWork")

]