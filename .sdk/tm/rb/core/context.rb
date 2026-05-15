# MlbGumbo SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class MlbGumboContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = MlbGumboHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = MlbGumboHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = MlbGumboControl.new
    ctrl_raw = MlbGumboHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = MlbGumboHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = MlbGumboHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = MlbGumboHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = MlbGumboHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = MlbGumboHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = MlbGumboHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = MlbGumboHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = MlbGumboHelpers.to_map(MlbGumboHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = MlbGumboHelpers.to_map(MlbGumboHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = MlbGumboHelpers.to_map(MlbGumboHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = MlbGumboHelpers.to_map(MlbGumboHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = MlbGumboHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = MlbGumboHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(MlbGumboSpec) ? sp : basectx&.spec

    r = MlbGumboHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(MlbGumboResult) ? r : basectx&.result

    rp = MlbGumboHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(MlbGumboResponse) ? rp : basectx&.response

    opname = MlbGumboHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    return @opmap[opname] if @opmap[opname]
    return MlbGumboOperation.new({}) if opname.empty?

    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = MlbGumboOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[opname] = op
    op
  end

  def make_error(code, msg)
    MlbGumboError.new(code, msg, self)
  end
end
