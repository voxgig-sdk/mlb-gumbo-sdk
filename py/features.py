# MlbGumbo SDK feature factory

from feature.base_feature import MlbGumboBaseFeature
from feature.test_feature import MlbGumboTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MlbGumboBaseFeature(),
        "test": lambda: MlbGumboTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
