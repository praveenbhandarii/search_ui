from rest_framework import serializers
from .models import (User,
                     contact_us,
                     Categories,
                     Case,
                     user_otp,
                     SubCategories,
                     language,
                     user_langs,
                     user_categories_subcategories,
                     Notifications,
                     user_status,
                     client_case_lawyer_search,
                     recommended_lawyer,
                     case_categories_subcategories,
                     hearing_records
                     )


# class UserSerializers(serializers.ModelSerializer):
#     class Meta(object):
#         model = User
#         fields = '__all__'


class ContactUsSerializers(serializers.ModelSerializer):
    class Meta(object):
        model = contact_us
        fields = [
            'name',
            'email_id',
            'phone',
            'query',
        ]


class CategoriesSerializers(serializers.ModelSerializer):
    class Meta(object):
        model = Categories
        fields = [
            'category_name'
        ]

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = [
            "case_id",
            "client_id",
            "lawyer_id",   
            "case_name" ,
            "filing_number",
            "date_of_filing" ,
            "counsel_name", 
            "counsel_changes", 
            "name_of_judges_presiding", 
            "claim_value", 
            "intern_relif", 
            "lower_court", 
            "case_status", 
            "disposed_date",
            "added_by",
        ]

class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_status
        fields = [
            "id",
            "user_status", 
        ]



class OTPUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_otp
        fields = ('id', 'email_id', 'otp')
class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = [
            'id',
            'category_name'
        ]

class SubCategoriesSerializers(serializers.ModelSerializer):
    class Meta:
        model = SubCategories
        fields = [
            'id',
            'category_id',
            'subcategory_name'
        ]


class UserCategoriesSubCategoriesSerializers(serializers.ModelSerializer):
    class Meta:
        model = user_categories_subcategories
        fields = [
            'user_id',
            # 'category_id',
            'subcategory_id',
        ]



class CaseCategoriesSubCategoriesSerializers(serializers.ModelSerializer):
    class Meta:
        model = case_categories_subcategories
        fields = '__all__'


class HearingRecordsSerializers(serializers.ModelSerializer):
    class Meta:
        model = hearing_records
        fields = '__all__'
    

class languageSerializers(serializers.ModelSerializer):
    class Meta:
        model = language
        fields = [
            'id',
            'language'
        ]

class UserLangsSerializers(serializers.ModelSerializer):
    class Meta:
        model = user_langs
        fields = [
            'user_id',
            'lang_id',
        ]


class UserSerializers(serializers.ModelSerializer):
    languages = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def get_languages(self, obj):
        return obj.get_languages()



class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = '__all__'


class client_case_lawyer_search_serializer(serializers.ModelSerializer):
    class Meta:
        model = client_case_lawyer_search
        fields = '__all__'


class recommended_lawyer_serializer(serializers.ModelSerializer):
    ClientCaseLawyerSearch = client_case_lawyer_search_serializer(many=True)
    
    
    class Meta:
        model = recommended_lawyer
        fields = '__all__'
