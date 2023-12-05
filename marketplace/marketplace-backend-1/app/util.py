import re
import phonenumbers
from phonenumbers import PhoneNumberFormat, NumberParseException
import openai
from django.conf import settings


def isValidPanCardNo(panCardNo):
 
    # Regex to check valid
    # PAN Card number
    regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}"
 
    # Compile the ReGex
    p = re.compile(regex)
 
    # If the PAN Card number
    # is empty return false
    if(panCardNo == None):
        return False
 
    # Return if the PAN Card number
    # matched the ReGex
    if(re.search(p, panCardNo) and
       len(panCardNo) == 10):
        return True
    else:
        return False
    



def is_valid_email(email):
    # Regular expression pattern for a valid email address
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    
    # Use the re.match function to check if the email matches the pattern
    if re.match(pattern, email):
        return True
    else:
        return False
    


def is_valid_phone_number(phone_number):
    try:

        parsed_number = phonenumbers.parse(phone_number, "IN")

        if phonenumbers.is_possible_number(parsed_number):
            return True
        else:
            return False
    except NumberParseException:
        return False, None
    


def get_case_category_and_category_lawyers(user_input):
    openai.api_key = settings.OPEN_AI_KEY
    prompt = settings.PROMPT_FOR_CLASSIFICATION
                      
    prompt += user_input

    # Use OpenAI GPT-3 to categorize case details based on the provided prompt
    response = openai.ChatCompletion.create(
        model=settings.MODEL_FOR_CATEGORIZING,
        messages=[{"role": "user", "content": prompt}],
    )

    gpt_output = response['choices'][0]['message']['content']
    categories = settings.CATEGORIES_FOR_CLASSIFICATION
    data = []
    if gpt_output != settings.RESPONSE_OF_GPT:
        for i in categories:
            if i in gpt_output:
                data.append(i)
    else:
        data.append(settings.RESPONSE_OF_GPT)

    return data
