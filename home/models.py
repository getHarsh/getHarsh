from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db import models
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.fields import RichTextField
from wagtail.core.models import Page
from blog.models import BlogIndexPage, BlogPage
from blog.models import Project, FooterLink

class HomePage(Page):
    content_panels = Page.content_panels + [
    ]

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        
        context = super().get_context(request)
        context['getharsh_projects'] = Project.objects.all()
        context['footer_links'] = FooterLink.objects.all()
        if request.GET.get('show_all'):
            blogs = BlogPage.objects.all().live().order_by('-first_published_at')
            context['show_all'] = True
        else:
            blogs = BlogPage.objects.all().live().order_by(
                '-first_published_at')[:4]
        # paginator = Paginator(blogs, 20)
        # # Try to get the ?page=x value
        # page = request.GET.get("page")
        # try:
        #     # If the page exists and the ?page=x is an int
        #     posts = paginator.page(page)
        # except PageNotAnInteger:
        #     # If the ?page=x is not an int; show the first page
        #     posts = paginator.page(1)
        # except EmptyPage:
        #     # If the ?page=x is out of range (too high most likely)
        #     # Then return the last page
        #     posts = paginator.page(paginator.num_pages)
        context['blogs'] = blogs
        # context[blogs]
        return context
