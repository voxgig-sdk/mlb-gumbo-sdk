# MlbGumbo SDK exists test

require "minitest/autorun"
require_relative "../MlbGumbo_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MlbGumboSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
