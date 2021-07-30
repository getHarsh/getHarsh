from blog.models import BlogCategory, BlogPage
from django.http.response import HttpResponseForbidden, JsonResponse
from django.shortcuts import redirect, render
from blog_extension.forms import ContactForm
from .forms import CommentForm, SubscribeCategoryForm
from django.core.mail import send_mail


def submit_comment(request):
    if request.POST:
        form = CommentForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            blog_page = BlogPage.objects.get(
                slug=form.cleaned_data['blog_page_slug'])
            model = form.save(commit=False)
            model.blog_page = blog_page
            model.comment_by = request.user
            model.save()
            return redirect(blog_page.url)
    return HttpResponseForbidden()


def toggle_subscription(request):
    if request.POST and request.is_ajax:
        category_subscription = request.user.subscriptions.category_subscription
        categories = BlogCategory.objects.all()
        form = SubscribeCategoryForm(
            request.POST, categories=categories, user=request.user)
        if form.is_valid():
            model = form.save()
            print(request.user.subscriptions)
            return JsonResponse(
                {'data': form.cleaned_data,
                 'current_subscriptions': tuple(map(str, request.user.subscriptions.category_subscription.all()))
                 }
            )
        else:
            print(form.errors)
        return JsonResponse({
            'error': form.errors
        })


def contact_view(request):
    if request.POST and request.is_ajax:
        form = ContactForm(request.POST)
        if form.is_valid() and request.user.is_authenticated:
            prefix = request.POST.get('subject_prefix') if request.POST.get(
                'subject_prefix') else ''
            subject = prefix + form.cleaned_data['subject']
            description = form.cleaned_data['description']
            send_mail(
                f'{subject}',
                f'{description} \
                \nname:{request.user.get_full_name()}\nemail:{request.user.email}',
                from_email='sender@sender.in',
                recipient_list=['hi@getharsh.in']
            )
        return JsonResponse(
            {
                'success': True,
                'submitted': True
            }
        )
    else:
        return HttpResponseForbidden()
