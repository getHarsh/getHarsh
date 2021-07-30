from django import forms
from allauth.account.forms import LoginForm, SignupForm
class BlogLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for visible in self.visible_fields():
            if not visible.name == 'remember':
                visible.field.widget.attrs['class'] = 'form-control'
class BlogSignUpForm(SignupForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
