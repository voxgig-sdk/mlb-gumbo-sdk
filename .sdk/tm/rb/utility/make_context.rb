# MlbGumbo SDK utility: make_context
require_relative '../core/context'
module MlbGumboUtilities
  MakeContext = ->(ctxmap, basectx) {
    MlbGumboContext.new(ctxmap, basectx)
  }
end
