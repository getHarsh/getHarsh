from blog_extension.forms import ContactForm
from django.db import models
from django.db.models.fields import URLField
from django.utils import timezone
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase
from wagtail.admin.edit_handlers import (FieldPanel, InlinePanel,
                                         StreamFieldPanel)
from wagtail.core import blocks
from wagtail.core.blocks.field_block import CharBlock, RichTextBlock, URLBlock
from wagtail.core.blocks.list_block import ListBlock
from wagtail.core.fields import RichTextField, StreamField
from wagtail.core.models import Page
from wagtail.embeds.blocks import EmbedBlock
from wagtail.images.blocks import ImageChooserBlock
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet

# Particular Projects shown on the Website Homepage


class Project(models.Model):
    image = models.ForeignKey(
        'wagtailimages.Image', null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=40)
    description = RichTextField()
    carousel_images = StreamField([
        ('image', ImageChooserBlock()),
        ('video', EmbedBlock())
    ], null=True, blank=True)
    website_url = URLField(null=True)
    discord_url = URLField(null=True)
    youtube_url = URLField(null=True)

    def __str__(self):
        return self.title
    panels = [
        ImageChooserPanel('image'),
        FieldPanel('title'),
        FieldPanel('description'),
        StreamFieldPanel('carousel_images'),
        FieldPanel('website_url'),
        FieldPanel('discord_url'),
        FieldPanel('youtube_url')
    ]

# A Page for Blog Indexes or BROAD Categories in General


class BlogIndexPage(Page):
    'BLOG INDEX PAGE CONTAINING THE LIST OF ALL THE BLOG PAGES (ARTICLES) THAT ARE CHILDREN OF THIS PAGE'
    intro = RichTextField(blank=True)
    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        context['all_categories'] = BlogCategory.objects.filter(
            blog_type=self)

        blogs = BlogPage.objects.live().descendant_of(
            self).order_by('-date')

        context['blogs_by_category'] = {
            category: blogs.filter(
                categories__blog_category=category) for category in context['all_categories']
        }

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
        return context


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey(
        'BlogPage',
        related_name='tagged_items',
        on_delete=models.CASCADE
    )


@register_snippet
class BlogCategory(models.Model):
    name = models.CharField(max_length=255)
    blog_type = ParentalKey(
        'blog.BlogIndexPage', on_delete=models.CASCADE, related_name='blog_type_categories')
    slug = models.SlugField(unique=True, max_length=80)
    panels = [
        FieldPanel('name'),
        FieldPanel('blog_type'),
        FieldPanel('slug'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class BlogPageBlogCategory(models.Model):
    page = ParentalKey(
        'blog.BlogPage', on_delete=models.CASCADE, related_name='categories')
    blog_category = models.ForeignKey(
        'blog.BlogCategory', on_delete=models.CASCADE, related_name='pages')

    panels = [
        SnippetChooserPanel('blog_category'),
    ]

    class Meta:
        unique_together = ('page', 'blog_category')

    def __str__(self):
        return self.blog_category.name


class BlogTagIndexPage(Page):
    def get_context(self, request):
        # Filter by tag
        tag = request.GET.get('tag')
        blogs = BlogPage.objects.filter(tags__name=tag)
        # Update template context
        context = super().get_context(request)
        context['tag'] = tag
        context['blog_pages'] = blogs
        return context


# Blog Page with the full content


class BlogPage(Page):
    'BLOG PAGE WHICH IS THE MAIN OF THE ARTICLE CONTAINING OF THE ARTICLE'
    date = models.DateField("Post date", default=timezone.now, editable=True)
    read_time = models.CharField(max_length=20)
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    body = RichTextField(features=[
        'h2', 'h3', 'bold', 'italic', 'link',
        'ol', 'ul', 'hr', 'document-link', 'image', 'embed', 'code', 'blockquote'
    ])
    player_embed = models.URLField(blank=True)
    search_fields = Page.search_fields + [
        index.SearchField('body'),
        index.RelatedFields('owner', [
            index.SearchField('last_name'),
            index.SearchField('first_name'),
        ]),

    ]
    content_panels = [
        FieldPanel('title'),
        FieldPanel('body'),
        InlinePanel('categories', label='category'),
        FieldPanel('tags'),
        FieldPanel('date'),
        FieldPanel('read_time'),
    ]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context['all_categories'] = self.get_parent(
        ).specific.blog_type_categories.all()
        context['categories'] = BlogCategory.objects.filter(pages__page=self)
        # if request.user.is_anonymous:
        #     context['form1'] = BlogLoginForm()
        #     context['form2'] = BlogSignUpForm()
        # else:
        #     context['comment_form'] = CommentForm(
        #         initial={'blog_page_slug': self.slug})
        context['prev_blog'] = self.get_prev_siblings(
        ).live().type(BlogPage).first()
        context['next_blog'] = self.get_next_siblings(
        ).live().type(BlogPage).first()
        return context

# About Page

# Tab / Wagtail StructBlock for Legal Content like Terms, Privacy Policy


class LegalTab(blocks.StructBlock):
    name = CharBlock()
    body = RichTextBlock()

    class Meta:
        label = 'Legal Info Tab. Tab for legal Information such as Privacy Policy and Terms and Conditions'
        template = 'blog/blocks/legal_block.html'

# Tab / Wagtail StructBlock for Clients Carousel

    class Meta:
        label = 'Client Tab. Tab to show the clients'


# Tab / Wagtail StructBlock for Contact Us form
class ContactTab(blocks.StructBlock):
    name = CharBlock()
    subject_prefix = CharBlock()

    class Meta:
        template = 'blog/blocks/contact_block.html'
        label = 'Contact Us Tab. A Tab for Contact including the name of the tab'
        'And the subject prefixed before the contact\'s subject'


# Tab / Wagtail StructBlock for Team Carousel
class TeamTab(blocks.StructBlock):
    name = CharBlock()
    children = blocks.ListBlock(
        blocks.StructBlock([
            ('name', CharBlock()),
            ('role', CharBlock()),
            ('project_description', CharBlock()),
            ('personal_description', CharBlock()),
            ('image', ImageChooserBlock()),
            ('twitter', URLBlock(required=False)),
            ('linkedin', URLBlock(required=False)),
            ('instagram', URLBlock(required=False)),
            ('github', URLBlock(required=False)),
            ('youtube', URLBlock(required=False))
        ]),

    )

    class Meta:
        template = 'blog/blocks/team_block.html'
        label = 'Team Tab. A tab to show the team members and contributors '


# Tab / Wagtail for Appointment related Third Party Iframe [pure static html]
class AppointmentTab(blocks.StructBlock):
    name = CharBlock()

    class Meta:
        template = 'blog/blocks/appointment_block.html'
        label = 'Appointment Tab. A tab for iframe such as calendly for Appointments, The Iframe can only be changed in code for security reasons.'

# About Page containing all the above coded Tabs


class AboutPage(Page):
    description = RichTextField(null=True)
    body = RichTextField(features=[
        'h2', 'h3', 'bold', 'italic', 'link',
        'ol', 'ul', 'hr', 'document-link', 'image', 'embed', 'code', 'blockquote'
    ])
    tabs = StreamField([
        ('legal', LegalTab()),
        ('team', TeamTab()),
        ('contact_us', ContactTab()),
        ('appointment', AppointmentTab())
    ])
    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('body'),
        StreamFieldPanel('tabs')
    ]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context['contact_form'] = ContactForm()
        return context


class LegalPage(Page):
    description = RichTextField()
    tabs = StreamField([
        ('legal', LegalTab()),
    ])
    content_panels = Page.content_panels + [
        FieldPanel('description'),
        StreamFieldPanel('tabs')
    ]


class FooterLink(models.Model):
    link_name = models.CharField(default="", max_length=40)
    link = URLField()

    def __str__(self):
        return self.link_name
