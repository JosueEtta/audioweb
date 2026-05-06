import os

from django.shortcuts import render,render
from django.http import JsonResponse
from .models import Song
import mutagen
import json
import time


# Create your views here.
def get_all_songs():
    songs = Song.objects.all()
    info = {
       "all_songs":songs
       }
    return info


def index(request):
   context = get_all_songs()
   if request.method == "POST" and request.FILES:
       file = request.FILES.get("file")
       
       audio_file = mutagen.File(file)
       Song.objects.create(name=file.name,duration=audio_file.info.length,album_song=file)
   return render(request,"app/index.html",context)

def  add_favourite(request):
    if request.method == "POST":
        data = json.loads(request.body)
        song_name = data.get("song_name")
        song = Song.objects.get(name=song_name)
        if song:
            song.isfavourite = not song.isfavourite
            song.save()
            return JsonResponse({"message": "Favourite status toggled", "isFavourite": song.isfavourite})
        else:
            return JsonResponse({"error": "Song not found"}, status=404)
        

def get_song(request):
    if request.method == "GET" and request.headers.get('Accept') == 'application/json':
    # 1. Get data from the URL parameters, not the body
        song_name = request.GET.get('song_name')
        
        # 2. Use .filter().first() to avoid crashing if not found
        single_song = Song.objects.filter(name=song_name).first()
        
        if single_song:
            data = {
                "image":single_song.album_image.url if single_song.album_image else None,
                "name": single_song.name,
                "url": single_song.album_song.url,
                "isFavourite": single_song.isfavourite,
                "duration" : single_song.duration
            }

            return JsonResponse(data)
        else:
            return JsonResponse({"error": "Song not found"}, status=404)

def uploadImage(request):
    if request.method == "POST":
        file = request.FILES.get("file")
        file_name = file.name
        song_name = os.path.basename(request.POST.get("song_name"))
        print(song_name)
        song = Song.objects.filter(name=song_name).first()
        song.album_image = file
        song.save()
        return JsonResponse({"imageUrl": song.album_image.url})
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)
