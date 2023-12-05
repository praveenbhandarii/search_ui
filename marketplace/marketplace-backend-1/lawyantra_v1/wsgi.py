"""
WSGI config for lawyantra_v1 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""
# from app.serializers  import UserStatusSerializer
# from app.models import user_status
import os

from django.core.wsgi import get_wsgi_application
# from django.contrib.auth import get_user_model 
# import pandas as pd

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lawyantra_v1.settings')
application = get_wsgi_application()


# csvData=pd.read_csv("status.csv")
# user = user_status.objects.all()
# dataa=  UserStatusSerializer(user)
# for i in csvData["id"]:
#     if user_status.objects.filter(id=i).exists() == False:
#         saveData =  UserStatusSerializer(data ={"id":str(i),"user_status":csvData.loc[i-1][1]})
#         if saveData.is_valid():
#             saveData.save() 

