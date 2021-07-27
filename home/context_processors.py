from .models import HomePage
from blog.models import AboutPage, BlogCategory, Project
from blog_extension.forms import SubscribeCategoryForm
from user_management.forms import BlogLoginForm, BlogSignUpForm


def get_pages(request):
    if HomePage.objects.all().exists():
        pages = HomePage.objects.first().get_children().filter(
            live=True, show_in_menus=True)
    else:
        pages = None
    return {
        'menuitems': pages
    }




def login_subscribe_forms(request):
    context = {}
    if request.user.is_anonymous:
        context['form1'] = BlogLoginForm()
        context['form2'] = BlogSignUpForm()
    else:
        if BlogCategory.objects.all().exists():
            context['subscribe_form'] = SubscribeCategoryForm(
                categories=BlogCategory.objects.all(), user=request.user)
    return context
