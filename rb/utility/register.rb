# MlbGumbo SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MlbGumboUtility.registrar = ->(u) {
  u.clean = MlbGumboUtilities::Clean
  u.done = MlbGumboUtilities::Done
  u.make_error = MlbGumboUtilities::MakeError
  u.feature_add = MlbGumboUtilities::FeatureAdd
  u.feature_hook = MlbGumboUtilities::FeatureHook
  u.feature_init = MlbGumboUtilities::FeatureInit
  u.fetcher = MlbGumboUtilities::Fetcher
  u.make_fetch_def = MlbGumboUtilities::MakeFetchDef
  u.make_context = MlbGumboUtilities::MakeContext
  u.make_options = MlbGumboUtilities::MakeOptions
  u.make_request = MlbGumboUtilities::MakeRequest
  u.make_response = MlbGumboUtilities::MakeResponse
  u.make_result = MlbGumboUtilities::MakeResult
  u.make_point = MlbGumboUtilities::MakePoint
  u.make_spec = MlbGumboUtilities::MakeSpec
  u.make_url = MlbGumboUtilities::MakeUrl
  u.param = MlbGumboUtilities::Param
  u.prepare_auth = MlbGumboUtilities::PrepareAuth
  u.prepare_body = MlbGumboUtilities::PrepareBody
  u.prepare_headers = MlbGumboUtilities::PrepareHeaders
  u.prepare_method = MlbGumboUtilities::PrepareMethod
  u.prepare_params = MlbGumboUtilities::PrepareParams
  u.prepare_path = MlbGumboUtilities::PreparePath
  u.prepare_query = MlbGumboUtilities::PrepareQuery
  u.result_basic = MlbGumboUtilities::ResultBasic
  u.result_body = MlbGumboUtilities::ResultBody
  u.result_headers = MlbGumboUtilities::ResultHeaders
  u.transform_request = MlbGumboUtilities::TransformRequest
  u.transform_response = MlbGumboUtilities::TransformResponse
}
