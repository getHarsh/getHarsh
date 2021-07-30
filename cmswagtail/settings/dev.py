from .base import *
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'd%2l8ot4nkr%&-do=cicv-msy*g1)zwfm6dd*9duf3*z(y0ja8'
# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*'] 
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
try:
    from .local import *
except ImportError:
    pass
