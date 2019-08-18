from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('app/', include('app.urls')),
    path('admin/', admin.site.urls),
    path('account/', include("account.urls")),
    path('home/', include("home.urls")),
    path('myprofile/', include("myprofile.urls")),
    url(r'^(?P<username>[-\w.]+)/$', views.url_username),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
