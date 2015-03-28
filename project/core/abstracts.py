from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now_add=True, auto_now=True, null=True)

    def __unicode__(self):
        return str(self.pk)

    class Meta:
        abstract = True