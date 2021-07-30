from django import forms
from django.db.models import fields
from django.forms import widgets
from .models import Comment


class CommentForm(forms.ModelForm):
    blog_page_slug = forms.SlugField(widget=forms.HiddenInput())

    class Meta:
        model = Comment
        fields = ('comment_text',)
        widgets = {
            'comment_text': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': '1'
            })
        }


class SubscribeCategoryForm(forms.Form):
    def __init__(self, *args, **kwargs):
        self.categories = kwargs.pop(
            'categories')
        self.user = kwargs.pop('user')
        self.category_subscription = self.user.subscriptions.category_subscription
        assert(self.categories)
        assert(self.user)
        super().__init__(*args, **kwargs)

        for category in self.categories:
            checked = self.category_subscription.filter(
                name=str(category)).exists()
            self.fields[str(category)] = forms.BooleanField(
                initial=checked,
                required=False,
                widget=forms.CheckboxInput(
                    attrs={
                        'checked': checked,
                    }
                )
            )

    def save(self):
        if self.cleaned_data:
            for category_name in self.fields.keys():
                category = self.categories.get(name=category_name)
                if self.cleaned_data[category_name]:
                    self.category_subscription.add(
                        category
                    )
                else:
                    self.category_subscription.remove(
                        category)


class ContactForm(forms.Form):
    subject = forms.CharField()
    description = forms.CharField(widget=forms.Textarea)

    def __init__(self, *args, **kwargs):
        super(forms.Form, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
