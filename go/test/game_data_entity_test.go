package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/mlb-gumbo-sdk"
	"github.com/voxgig-sdk/mlb-gumbo-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGameDataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GameData(nil)
		if ent == nil {
			t.Fatal("expected non-nil GameDataEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := game_dataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "game_data." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MLBGUMBO_TEST_GAME_DATA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		gameDataRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.game_data", setup.data)))
		var gameDataRef01Data map[string]any
		if len(gameDataRef01DataRaw) > 0 {
			gameDataRef01Data = core.ToMapAny(gameDataRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = gameDataRef01Data

		// LIST
		gameDataRef01Ent := client.GameData(nil)
		gameDataRef01Match := map[string]any{
			"game_pk": setup.idmap["game_pk01"],
		}

		gameDataRef01ListResult, err := gameDataRef01Ent.List(gameDataRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, gameDataRef01ListOk := gameDataRef01ListResult.([]any)
		if !gameDataRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", gameDataRef01ListResult)
		}

		// LOAD
		gameDataRef01MatchDt0 := map[string]any{}
		gameDataRef01DataDt0Loaded, err := gameDataRef01Ent.Load(gameDataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if gameDataRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func game_dataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "game_data", "GameDataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read game_data test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse game_data test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"game_data01", "game_data02", "game_data03", "game01", "game02", "game03", "game_pk01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MLBGUMBO_TEST_GAME_DATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MLBGUMBO_TEST_GAME_DATA_ENTID": idmap,
		"MLBGUMBO_TEST_LIVE":      "FALSE",
		"MLBGUMBO_TEST_EXPLAIN":   "FALSE",
		"MLBGUMBO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MLBGUMBO_TEST_GAME_DATA_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MLBGUMBO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MLBGUMBO_APIKEY"],
			},
			extra,
		})
		client = sdk.NewMlbGumboSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MLBGUMBO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MLBGUMBO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
