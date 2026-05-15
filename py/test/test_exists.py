# ProjectName SDK exists test

import pytest
from mlbgumbo_sdk import MlbGumboSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MlbGumboSDK.test(None, None)
        assert testsdk is not None
