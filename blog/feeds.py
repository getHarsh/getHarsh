from django.contrib.syndication.views import Feed
from django.utils.feedgenerator import Atom1Feed
from blog.models import BlogCategory, BlogPage


class RssFeed(Feed):
    title = "getHarsh.in"
    link = "/"
    description = "A blog by Harsh Joshi"
    feed_url = '/rss/'
    author_name = 'Harsh Joshi'
    categories = ("raw-thoughts", "blog")
    feed_copyright = 'Copyright (c) 2021, hetharsh.in'

    language = 'en'

    def items(self):
        return BlogPage.objects.order_by('-date')[:5]

    def item_title(self, item):
        return item.title

    # # return a short description of article
    # def item_description(self, item):
    #     return item.intro

    # return the URL of the article
    def item_link(self, item):
        return item.full_url

    # return the date the article was published
    def item_pubdate(self, item):
        return item.first_published_at

    # return the date of the last update of the article
    def item_updateddate(self, item):
        return item.last_published_at

    # return the categories of the article
    def item_categories(self, item):
        return BlogCategory.objects.filter(pages__page=item).all()


class AtomFeed(RssFeed):
    feed_type = Atom1Feed
    link = "/atom/"
    subtitle = RssFeed.description
