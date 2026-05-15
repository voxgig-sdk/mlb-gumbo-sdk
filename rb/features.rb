# MlbGumbo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MlbGumboFeatures
  def self.make_feature(name)
    case name
    when "base"
      MlbGumboBaseFeature.new
    when "test"
      MlbGumboTestFeature.new
    else
      MlbGumboBaseFeature.new
    end
  end
end
