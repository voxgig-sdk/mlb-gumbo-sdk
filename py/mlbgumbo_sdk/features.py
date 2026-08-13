# MlbGumbo SDK feature factory

from mlbgumbo_sdk.feature.base_feature import MlbGumboBaseFeature
from mlbgumbo_sdk.feature.test_feature import MlbGumboTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MlbGumboBaseFeature(),
        "test": lambda: MlbGumboTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
