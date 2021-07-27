from django.apps import AppConfig


class UserManagementConfig(AppConfig):
    name = 'user_management'

    def ready(self) -> None:
        import user_management.signals
        return super().ready()
