from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class user_status(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_status = models.CharField(max_length=100)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        # user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self.create_user(email, **extra_fields)


class User(AbstractBaseUser):
    id = models.BigAutoField(primary_key=True, unique=True)
    email_id = models.CharField(max_length=100, null=False)
    password = models.CharField(max_length=30, null=True, default=None)
    title = models.CharField(max_length=7, null=True, default=None)
    first_name = models.CharField(max_length=50, null=True, default=None)
    last_name = models.CharField(max_length=50, null=True, default=None)
    middle_name = models.CharField(max_length=50, null=True, default=None, blank=True)
    gender = models.CharField(max_length=10, null=True, default=None)
    date_of_birth = models.DateField(null=True, default=None)
    address = models.CharField(max_length=1000, null=True, default=None)
    pincode = models.CharField(max_length=6, null=True, default=None)
    city = models.CharField(max_length=100, null=True, default=None)
    state = models.CharField(max_length=100, null=True, default=None)
    phone = models.BigIntegerField(null=True, default=None)
    user_aggrement = models.BooleanField(default=False)
    advocate_no = models.BigIntegerField(null=True, default=None)
    enrollment_yr = models.DateField(null=True, default=None)
    state_bar_council_member = models.CharField(max_length=100, null=True, default=None, unique=True)
    user_status = models.ForeignKey(user_status, on_delete=models.CASCADE, null=True, default=None)
    kyc_status = models.BigIntegerField(null=True, default=0)
    user_type = models.CharField(max_length=100, choices=[('lawyer', 'lawyer'), ('client', 'client')], null=False,)  
    advocate_id_card_file_path = models.CharField(max_length=100, null=True,)  
    practice_certificate_file_path = models.CharField(max_length=100, null=True,)  
    pan_number = models.CharField(max_length=10, null=True,)
    pan_number_img = models.CharField(max_length=100, null=True,)
    pan_verified = models.BooleanField(default=True)
    aadhar_number = models.CharField(max_length=10, null=True, default=None)
    aadhar_number_img = models.CharField(max_length=100, null=True,)
    aadhar_verified = models.BooleanField(default=False)
    profile_picture = models.CharField(max_length=100, null=True, default=None)
    cost_per_hour = models.FloatField(null=True, default=None)

    class Meta(object):
        managed = True
        db_table = "user"

    objects = CustomUserManager()

    USERNAME_FIELD = "id"

    def __str__(self):
        return self.email_id
    
    def get_languages(self):
        return [ul.lang_id.language for ul in self.user_languages.all()]


class Case(models.Model):
    case_id = models.BigAutoField(primary_key=True)
    client_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="client")
    lawyer_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="lawyer")
    case_name = models.CharField(max_length=1000)
    filing_number = models.BigIntegerField()
    date_of_filing = models.DateField(max_length=100)
    counsel_name = models.CharField(max_length=100)
    counsel_changes = models.CharField(max_length=100)
    name_of_judges_presiding = models.CharField(max_length=100)
    claim_value = models.BigIntegerField()
    intern_relif = models.CharField(max_length=250, null=True, default=None)
    lower_court = models.CharField(max_length=100, null=True, default=None)
    # 0 means pending, 1 means disposed
    case_status = models.BooleanField(default=False)
    disposed_date = models.DateField()
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="added_by", null=True)
    payment_status = models.CharField(max_length=100, null=True, default=None)
    paid_amount = models.FloatField(default=0)
    accepted_date = models.DateField(null=True, default=None)




class hearing_records(models.Model):
    hearing_id = models.BigAutoField(primary_key=True)
    case_id = models.ForeignKey(Case, on_delete=models.CASCADE)
    case_date = models.DateTimeField(max_length=100)
    coram = models.CharField(max_length=200)
    purpose_of_hearing = models.CharField(max_length=100)
    presentee = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True, null=True)


class contact_us(models.Model):
    name = models.CharField(max_length=100)
    email_id = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    query = models.CharField(max_length=100)
    created_on = models.DateTimeField(null=True,auto_now_add=True)
    is_delete = models.SmallIntegerField(null=True,default=0)


class user_otp(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user", null=True)
    email_id = models.CharField(max_length=100, null=False)
    otp = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)
    is_delete = models.SmallIntegerField(null=True)



class Categories(models.Model):
    id = models.BigAutoField(primary_key=True)
    category_name = models.CharField(max_length=100)
    date_added = models.DateTimeField(null=True)
    is_active = models.SmallIntegerField(null=True)
    is_delete = models.SmallIntegerField(null=True)

    def __str__(self):
        return self.name

class SubCategories(models.Model):
    id = models.BigAutoField(primary_key=True)
    category_id = models.ForeignKey(Categories, on_delete=models.CASCADE)
    subcategory_name = models.CharField(max_length=100)
    date_added = models.DateTimeField(null=True)
    is_active = models.SmallIntegerField(null=True)
    is_delete = models.SmallIntegerField(null=True)

    def __str__(self):
        return self.name

class user_categories_subcategories(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Categories, on_delete=models.CASCADE)
    subcategory_id = models.ForeignKey(SubCategories, on_delete=models.CASCADE)
    class Meta(object):
        managed = True
        db_table = "user_categories_subcategories"

class case_categories_subcategories(models.Model):
    id = models.BigAutoField(primary_key=True)
    case_id = models.ForeignKey(Case, on_delete=models.CASCADE)
    # category_id = models.ForeignKey(Categories, on_delete=models.CASCADE)
    subcategory_id = models.ForeignKey(SubCategories, on_delete=models.CASCADE, null=True, default=None)

class language(models.Model):
    id = models.BigAutoField(primary_key=True)
    language = models.CharField(max_length=100, unique=True)

class user_langs(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_languages')
    lang_id = models.ForeignKey(language, on_delete=models.CASCADE)


class Notifications(models.Model):
    id = models.BigAutoField(primary_key=True)
    to = models.ForeignKey(User, on_delete=models.CASCADE)
    msg = models.CharField(max_length=100, null=False)
    read_date = models.DateTimeField(null=False)
    delivered_date = models.DateField(null=False)

    def __str__(self):
            return self.name


class client_case_lawyer_search(models.Model):
    id = models.BigAutoField(primary_key=True)
    client_id = models.ForeignKey(User, on_delete=models.CASCADE)
    client_input  = models.CharField(max_length=300)
    recommended_categories = models.CharField(max_length=300,null=True, default=None)
    # recommended_sub_categories = models.CharField(max_length=300,null=True, default=None)
    other_conditions = models.CharField(max_length=500,null=True, default=None)
    created_on = models.DateTimeField(auto_now_add=True)
    is_delete = models.SmallIntegerField(null=True,default=0)


class recommended_lawyer(models.Model):
    id = models.BigAutoField(primary_key=True)
    search_id = models.ForeignKey(client_case_lawyer_search, on_delete=models.CASCADE)
    lawyer_id = models.ForeignKey(User, on_delete=models.CASCADE)
    invited_date = models.DateField(null=True,default=None)
    lawyer_meet_date = models.DateTimeField(null=True, default=None) # when lawyer meet time
    lawyer_meet_date_created = models.DateTimeField(null=True, default=None) # when lawyer meet time was created
    lawyer_meet_reject = models.DateTimeField(null=True, default=None)
    lawyer_meet_reject_reason = models.CharField(max_length=300,null=True, default=None)
    
    retainer_agreement_path = models.CharField(max_length=100,null=True, default=None) 
    retainer_agreement_upload_date = models.DateTimeField(null=True, default=None)
    lawyer_post_meet_reject = models.DateTimeField(null=True, default=None)
    lawyer_post_meet_reject_reason = models.CharField(max_length=300,null=True, default=None)
    client_reject_reason = models.CharField(max_length=300,null=True, default=None)
    client_reject = models.DateTimeField(null=True, default=None)
    

