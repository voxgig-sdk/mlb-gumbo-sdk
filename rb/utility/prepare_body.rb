# MlbGumbo SDK utility: prepare_body
require_relative 'media'
module MlbGumboUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MlbGumboUtilities.raw_body(ctx.reqdata) if MlbGumboUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
