-- MlbGumbo SDK error

local MlbGumboError = {}
MlbGumboError.__index = MlbGumboError


function MlbGumboError.new(code, msg, ctx)
  local self = setmetatable({}, MlbGumboError)
  self.is_sdk_error = true
  self.sdk = "MlbGumbo"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MlbGumboError:error()
  return self.msg
end


function MlbGumboError:__tostring()
  return self.msg
end


return MlbGumboError
