# MlbGumbo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MlbGumboFeatures
  def self.make_feature(name)
    case name
    when "base"
      MlbGumboBaseFeature.new
    when "ratelimit"
      MlbGumboRatelimitFeature.new
    when "retry"
      MlbGumboRetryFeature.new
    when "test"
      MlbGumboTestFeature.new
    when "timeout"
      MlbGumboTimeoutFeature.new
    else
      MlbGumboBaseFeature.new
    end
  end
end
