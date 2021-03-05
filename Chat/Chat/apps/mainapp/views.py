from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.generic import View, TemplateView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse

from .models import Message

class SignUpApi(APIView):
    def post(self, request):           
        username, email, password = request.data.get("username"), request.data.get("email"), request.data.get("password")
        user = User.objects.create_user(username, email, password)
        if user:
            return Response({"message": "OK"}, status=200)
        else:
            return Response({"message": "ERR"}, status=401)


class SignInApi(APIView):
    def post(self, request):
        username, password = request.data.get("username"), request.data.get("password")
        
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({"message": "OK"}, status=200)
        else:
            return Response({"message": "ERR"}, status=401)


class MessageApi(APIView):
    def get(self, request):
        messages = Message.objects.all().order_by('-date_created')
        messages_list = {}
        for i in messages:
            messages_list.update({str(i.id):{"message_text": i.message_text, "creator": str(i.creator.username) }})

        return Response({"messages": messages_list}, status=200)

    def post(self, request):
        data = {'message_text': request.data.get("message_text"), 'creator': request.user}
        message = Message.objects.create(message_text=request.data.get("message_text"), creator=request.user)
        if message:
            return Response({"message": message.message_text}, status=200)
        else:
            return Response({"message": "ERR"}, status=401)
        

class ChatView(TemplateView):
    template_name = 'Chat/chat.html'

class SignInView(TemplateView):
    template_name = 'Chat/sign_in.html'

class SignUpView(TemplateView):
    template_name = 'Chat/sign_up.html'

class SignOutView(View):
    def get(self, request):
        logout(request)
        return HttpResponse('You are logged out of your account')

