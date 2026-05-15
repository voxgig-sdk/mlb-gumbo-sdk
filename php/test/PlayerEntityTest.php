<?php
declare(strict_types=1);

// Player entity test

require_once __DIR__ . '/../mlbgumbo_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PlayerEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MlbGumboSDK::test(null, null);
        $ent = $testsdk->Player(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = player_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "player." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MLBGUMBO_TEST_PLAYER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $player_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.player")));
        $player_ref01_data = null;
        if (count($player_ref01_data_raw) > 0) {
            $player_ref01_data = Helpers::to_map($player_ref01_data_raw[0][1]);
        }

        // LOAD
        $player_ref01_ent = $client->Player(null);
        $player_ref01_match_dt0 = [];
        [$player_ref01_data_dt0_loaded, $err] = $player_ref01_ent->load($player_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($player_ref01_data_dt0_loaded);

    }
}

function player_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/player/PlayerTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MlbGumboSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["player01", "player02", "player03", "person01", "person02", "person03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MLBGUMBO_TEST_PLAYER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MLBGUMBO_TEST_PLAYER_ENTID" => $idmap,
        "MLBGUMBO_TEST_LIVE" => "FALSE",
        "MLBGUMBO_TEST_EXPLAIN" => "FALSE",
        "MLBGUMBO_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MLBGUMBO_TEST_PLAYER_ENTID"]);
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
