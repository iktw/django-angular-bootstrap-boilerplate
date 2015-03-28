from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from .managers import UserProfileManager


class UserProfile(AbstractBaseUser, PermissionsMixin):
    date_of_birth = models.DateField(blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        name = u'{0} {1}'.format(self.first_name, self.last_name)
        return name.strip()

    def get_short_name(self):
        return u'{0}'.format(self.email)

    def __unicode__(self):
        return u'{0}'.format(self.email)