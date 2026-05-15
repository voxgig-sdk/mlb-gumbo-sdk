# MlbGumbo SDK utility: feature_add
module MlbGumboUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
