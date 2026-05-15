# GameData entity test

require "minitest/autorun"
require "json"
require_relative "../MlbGumbo_sdk"
require_relative "runner"

class GameDataEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MlbGumboSDK.test(nil, nil)
    ent = testsdk.GameData(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = game_data_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "game_data." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MLBGUMBO_TEST_GAME_DATA_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    game_data_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.game_data")))
    game_data_ref01_data = nil
    if game_data_ref01_data_raw.length > 0
      game_data_ref01_data = Helpers.to_map(game_data_ref01_data_raw[0][1])
    end

    # LIST
    game_data_ref01_ent = client.GameData(nil)
    game_data_ref01_match = {
      "game_pk" => setup[:idmap]["game_pk01"],
    }

    game_data_ref01_list_result, err = game_data_ref01_ent.list(game_data_ref01_match, nil)
    assert_nil err
    assert game_data_ref01_list_result.is_a?(Array)

    # LOAD
    game_data_ref01_match_dt0 = {}
    game_data_ref01_data_dt0_loaded, err = game_data_ref01_ent.load(game_data_ref01_match_dt0, nil)
    assert_nil err
    assert !game_data_ref01_data_dt0_loaded.nil?

  end
end

def game_data_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "game_data", "GameDataTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MlbGumboSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["game_data01", "game_data02", "game_data03", "game01", "game02", "game03", "game_pk01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["MLBGUMBO_TEST_GAME_DATA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MLBGUMBO_TEST_GAME_DATA_ENTID" => idmap,
    "MLBGUMBO_TEST_LIVE" => "FALSE",
    "MLBGUMBO_TEST_EXPLAIN" => "FALSE",
    "MLBGUMBO_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["MLBGUMBO_TEST_GAME_DATA_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MLBGUMBO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["MLBGUMBO_APIKEY"],
      },
      extra || {},
    ])
    client = MlbGumboSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MLBGUMBO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MLBGUMBO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
