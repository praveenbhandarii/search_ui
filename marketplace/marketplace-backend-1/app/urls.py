
from django.urls import path
from . import views
urlpatterns=[
    path("contact_us",views.contact_us),
    path('user/email_otp', views.email_otp),
    path('user', views.user_view),
    path('user/login', views.user_login),
    path('user/logout', views.user_logout),
    path('categories', views.categories),
    path('sub_categories', views.sub_categories),
    path('language', views.languages),
    path('user/language', views.user_language),
    path('user/category_sub_category', views.user_categories_sub_categories),
    path('user/user_search', views.user_search),
    path('user/case', views.case_create),
    path('user/cases', views.cases),
    path('user/case/<int:case_id>', views.case_view),
    path('user/case/<int:case_id>/hearing_records', views.hearing_records_view),
    # path('user/case_invite', views.create_client_case_lawyer_search),
    

    path('user/case/<int:case_id>/case_categories_subcategories', views.case_categories_subcategories_view),
    path('notiff', views.notifications),
    # path('user/case/invite', views.case_invite),
    path('test', views.test_view),
    path('accept_file',views.accept_file)
]
