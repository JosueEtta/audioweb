from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name="index" ),
    path("get_song/",views.get_song,name="song"),
    path("add_favourite/",views.add_favourite,name="favourite"),
    path("uploadImage/",views.uploadImage,name="uploadImage"),
    path("get_all_favourite/",views.get_favourite,name="all_favourites"),
    path("get_all_songs/",views.get_all_songs_view,name="get_all_songs")
]
