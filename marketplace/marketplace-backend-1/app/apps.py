from django.apps import AppConfig
import sys

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    
    def ready(self):
        if 'runserver' not in sys.argv:
            return True
        