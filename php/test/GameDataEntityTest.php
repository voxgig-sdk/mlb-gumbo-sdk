<?php
declare(strict_types=1);

// GameData entity test

require_once __DIR__ . '/../mlbgumbo_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GameDataEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MlbGumboSDK::test(null, null);
        $ent = $testsdk->GameData(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = game_data_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "game_data." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MLBGUMBO_TEST_GAME_DATA_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $game_data_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.game_data")));
        $game_data_ref01_data = null;
        if (count($game_data_ref01_data_raw) > 0) {
            $game_data_ref01_data = Helpers::to_map($game_data_ref01_data_raw[0][1]);
        }

        // LIST
        $game_data_ref01_ent = $client->GameData(null);
        $game_data_ref01_match = [
            "game_pk" => $setup["idmap"]["game_pk01"],
        ];

        [$game_data_ref01_list_result, $err] = $game_data_ref01_ent->list($game_data_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($game_data_ref01_list_result);

        // LOAD
        $game_data_ref01_match_dt0 = [];
        [$game_data_ref01_data_dt0_loaded, $err] = $game_data_ref01_ent->load($game_data_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($game_data_ref01_data_dt0_loaded);

    }
}

function game_data_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/game_data/GameDataTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MlbGumboSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["game_data01", "game_data02", "game_data03", "game01", "game02", "game03", "game_pk01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MLBGUMBO_TEST_GAME_DATA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MLBGUMBO_TEST_GAME_DATA_ENTID" => $idmap,
        "MLBGUMBO_TEST_LIVE" => "FALSE",
        "MLBGUMBO_TEST_EXPLAIN" => "FALSE",
        "MLBGUMBO_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MLBGUMBO_TEST_GAME_DATA_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MLBGUMBO_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["MLBGUMBO_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new MlbGumboSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["MLBGUMBO_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MLBGUMBO_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
