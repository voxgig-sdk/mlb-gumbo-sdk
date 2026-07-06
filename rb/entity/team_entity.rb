# MlbGumbo SDK Team entity

require_relative '../utility/struct/voxgig_struct'
require_relative '../core/helpers'

class TeamEntity
  def initialize(client, entopts = nil)
    entopts ||= {}
    if entopts["active"].nil?
      entopts["active"] = true
    elsif entopts["active"] == false
      # keep false
    else
      entopts["active"] = true
    end

    @_name = "team"
    @_client = client
    @_utility = client.get_utility
    @_entopts = entopts
    @_data = {}
    @_match = {}

    @_entctx = @_utility.make_context.call({
      "entity" => self,
      "entopts" => entopts,
    }, client.get_root_ctx)

    @_utility.feature_hook.call(@_entctx, "PostConstructEntity")
  end

  def get_name
    @_name
  end

  def make
    opts = @_entopts.dup
    TeamEntity.new(@_client, opts)
  end

  def data_set(args)
    if args
      @_data = MlbGumboHelpers.to_map(VoxgigStruct.clone(args)) || {}
      @_utility.feature_hook.call(@_entctx, "SetData")
    end
  end

  # @return [Team, Hash] the current Team data
  def data_get
    @_utility.feature_hook.call(@_entctx, "GetData")
    VoxgigStruct.clone(@_data)
  end

  def match_set(args)
    if args
      @_match = MlbGumboHelpers.to_map(VoxgigStruct.clone(args)) || {}
      @_utility.feature_hook.call(@_entctx, "SetMatch")
    end
  end

  # @return [Hash] the current match filter (any subset of Team fields)
  def match_get
    @_utility.feature_hook.call(@_entctx, "GetMatch")
    VoxgigStruct.clone(@_match)
  end

  
  # Load a single Team.
  #
  # @param reqmatch [TeamLoadMatch, Hash, nil] match criteria (id/query fields);
  #   optional — an entity with no id-like key loads with no match (nil is treated
  #   as an empty match, so client.Team.load works with no args).
  # @param ctrl [Object, nil] optional per-call control
  # @return [Team, Hash] the loaded Team; raises MlbGumboError on failure
  def load(reqmatch = nil, ctrl = nil)
    utility = @_utility
    ctx = utility.make_context.call({
      "opname" => "load",
      "ctrl" => ctrl,
      "match" => @_match,
      "data" => @_data,
      "reqmatch" => reqmatch,
    }, @_entctx)

    _run_op(ctx) do
      if ctx.result
        @_match = ctx.result.resmatch if ctx.result.resmatch
        if ctx.result.resdata
          @_data = MlbGumboHelpers.to_map(VoxgigStruct.clone(ctx.result.resdata)) || {}
        end
      end
    end
  end



  
  # List Team items matching the given filter.
  #
  # @param reqmatch [TeamListMatch, Hash, nil] match filter (any subset of
  #   Team fields); defaults to nil, treated as an empty match that lists all.
  # @param ctrl [Object, nil] optional per-call control
  # @return [Array<Team>, Array] the matching Team items; raises MlbGumboError on failure
  def list(reqmatch = nil, ctrl = nil)
    utility = @_utility
    ctx = utility.make_context.call({
      "opname" => "list",
      "ctrl" => ctrl,
      "match" => @_match,
      "data" => @_data,
      "reqmatch" => reqmatch,
    }, @_entctx)

    records = _run_op(ctx) do
      if ctx.result
        @_match = ctx.result.resmatch if ctx.result.resmatch
      end
    end

    # list yields the BARE Array of records — each an accessible Hash — so
    # callers can index item["id"] directly, matching py/lua/go. make_result
    # wraps each entry as an Entity instance for internal use; unwrap those
    # back to their bare record Hashes here (load/create/etc. are unaffected).
    if records.is_a?(Array)
      records = records.map do |item|
        item.respond_to?(:data_get) ? item.data_get : item
      end
    end

    records
  end



  

  

  

  private

  def _run_op(ctx, &post_done)
    utility = @_utility

    # #PrePoint-Hook

    point, err = utility.make_point.call(ctx)
    ctx.out["point"] = point
    return utility.make_error.call(ctx, err) if err

    # #PreSpec-Hook

    spec, err = utility.make_spec.call(ctx)
    ctx.out["spec"] = spec
    return utility.make_error.call(ctx, err) if err

    # #PreRequest-Hook

    resp, err = utility.make_request.call(ctx)
    ctx.out["request"] = resp
    return utility.make_error.call(ctx, err) if err

    # #PreResponse-Hook

    resp2, err = utility.make_response.call(ctx)
    ctx.out["response"] = resp2
    return utility.make_error.call(ctx, err) if err

    # #PreResult-Hook

    result, err = utility.make_result.call(ctx)
    ctx.out["result"] = result
    return utility.make_error.call(ctx, err) if err

    # #PreDone-Hook

    post_done.call

    utility.done.call(ctx)
  end
end
