from django.urls.conf import path
from .views import submit_comment, toggle_subscription, contact_view
urlpatterns = [
    path('submit_form/', submit_comment, name='submit_comment'),
    path('toggle_subscription/',
         toggle_subscription, name='toggle_subscription'),
    path('contact_form/', contact_view, name='submit_contact_form')
]

app_name = 'blog_extension'
