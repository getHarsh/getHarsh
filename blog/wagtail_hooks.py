from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register, ModelAdminGroup)
from blog.models import BlogCategory, BlogPage, Project


class ProjectAdmin(ModelAdmin):
    model = Project
    menu_label = 'GetHarsh Projects'
    exclude_from_explorer = True

    # add_to_settings_menu = True


class CategoryAdmin(ModelAdmin):
    model = BlogCategory
    menu_label = 'GetHarsh Settings'
    exclude_from_explorer = True


class BlogAdmin(ModelAdmin):
    model = BlogPage
    menu_label = 'GetHarsh Blogs'


class GetHarshAdminGroup(ModelAdminGroup):
    menu_label = 'GetHarsh'
    menu_icon = 'snippet'
    menu_order = 100
    items = (ProjectAdmin, CategoryAdmin, BlogAdmin)


modeladmin_register(GetHarshAdminGroup)
