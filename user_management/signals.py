from blog.models import BlogPage
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from wagtail.core.signals import page_published
from blog_extension.models import Subscriptions
User = get_user_model()


@receiver(post_save, sender=User)
def create_subscription_model(sender, **kwargs):
    instance = kwargs.get('instance')
    if isinstance(instance, User) and kwargs['created']:
        Subscriptions.objects.create(user=instance)


@receiver(page_published, sender=BlogPage)
def send_email(sender, **kwargs):
    instance = kwargs['instance']
    emails = User.objects.filter(
        subscriptions__category_subscription__pages__page=instance).values_list('email', flat=True)
    send_mail(
        f'getHarsh(): {instance.title}',
        f'Visit {instance.full_url} to read the latest article at getHarsh(). \
            You are recieving this message because you have subscribed to the category\
            {""}',
        from_email='hi@getharsh.in',
        recipient_list=emails
    )
