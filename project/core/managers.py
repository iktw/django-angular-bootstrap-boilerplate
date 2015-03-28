from django.contrib.auth.models import BaseUserManager
from django.utils import timezone


class UserProfileManager(BaseUserManager):
    def initialize_user_creation(self, email, password, is_staff, is_superuser, **extra_fields):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self.initialize_user_creation(
            email=email,
            password=password,
            is_staff=False,
            is_superuser=False,
            **extra_fields
        )

    def create_superuser(self, email, password, **extra_fields):
        return self.initialize_user_creation(
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
            **extra_fields
        )