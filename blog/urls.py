from blog.views import toggle_subscription
from django.urls import path, include
urlpatterns = [
    path(
        'api/',
        include([
            'toggle_subscription/<int:page_pk>/<category_pk>',
        ])
    )
]
