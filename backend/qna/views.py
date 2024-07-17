# qna/views.py

from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt  # Import csrf_exempt decorator
import json
import os
from groq import Groq

@csrf_exempt
def get_groq_response(request):
    if request.method == 'OPTIONS':
        # Handle CORS preflight requests
        response = JsonResponse({"message": "Options request"})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "content-type"
        return response

    if request.method != 'POST':
        return HttpResponseBadRequest("Invalid request method")

    try:
        data = json.loads(request.body.decode('utf-8'))
        user_question = data.get('question')
        if not user_question:
            return HttpResponseBadRequest("No question provided")

        # Initialize Groq client with API key from environment variable
        client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

        # Example: Query Groq for a response
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": user_question}],
            model="llama3-8b-8192",
        )
        
        # Retrieve response from Groq and return as JSON
        response_content = chat_completion.choices[0].message.content
        return JsonResponse({'response': response_content})
    
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON")
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
