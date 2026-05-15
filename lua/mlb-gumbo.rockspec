package = "voxgig-sdk-mlb-gumbo"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/mlb-gumbo-sdk.git"
}
description = {
  summary = "MlbGumbo SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["mlb-gumbo_sdk"] = "mlb-gumbo_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
