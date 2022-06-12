from django.urls import path, include
from rest_framework import routers
from core.views import (
    UserViewSet,
    ApplicationViewSet,
    RegisterAPI,
    ExtendedTokenObtainPairView
)
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/token/', ExtendedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
]
