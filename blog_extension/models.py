from django.db import models
from wagtail.snippets.models import register_snippet
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()


@register_snippet
class Like(models.Model):
    blog_page = models.ForeignKey('blog.BlogPage', on_delete=models.CASCADE)
    liked_by = models.ForeignKey(
        'user_management.User', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'like'
        verbose_name_plural = 'likes'


@register_snippet
class Comment(models.Model):
    comment_text = models.TextField()
    blog_page = models.ForeignKey('blog.BlogPage', on_delete=models.CASCADE)
    comment_by = models.ForeignKey(
        'user_management.User', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey(
        'self', blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'comment'
        verbose_name_plural = 'comments'
        ordering = ['created_on']


class Subscriptions(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    category_subscription = models.ManyToManyField(
        'blog.BlogCategory', related_name='subscribers', blank=True
    )

    def __str__(self):
        return self.user.email
