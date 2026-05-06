from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name="index" ),
    path("get_song/",views.get_song,name="song"),
    path("add_favourite/",views.add_favourite,name="favourite"),
    path("uploadImage/",views.uploadImage,name="uploadImage")
]
