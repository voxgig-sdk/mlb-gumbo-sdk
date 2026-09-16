# MlbGumbo SDK feature factory

from mlbgumbo_sdk.feature.base_feature import MlbGumboBaseFeature
from mlbgumbo_sdk.feature.ratelimit_feature import MlbGumboRatelimitFeature
from mlbgumbo_sdk.feature.retry_feature import MlbGumboRetryFeature
from mlbgumbo_sdk.feature.test_feature import MlbGumboTestFeature
from mlbgumbo_sdk.feature.timeout_feature import MlbGumboTimeoutFeature


_FEATURES = {
    "base": lambda: MlbGumboBaseFeature(),
    "ratelimit": lambda: MlbGumboRatelimitFeature(),
    "retry": lambda: MlbGumboRetryFeature(),
    "test": lambda: MlbGumboTestFeature(),
    "timeout": lambda: MlbGumboTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
