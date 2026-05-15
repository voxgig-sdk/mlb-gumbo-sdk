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

func TestTeamEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Team(nil)
		if ent == nil {
			t.Fatal("expected non-nil TeamEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := teamBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "team." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set MLBGUMBO_TEST_TEAM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		teamRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.team", setup.data)))
		var teamRef01Data map[string]any
		if len(teamRef01DataRaw) > 0 {
			teamRef01Data = core.ToMapAny(teamRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = teamRef01Data

		// LIST
		teamRef01Ent := client.Team(nil)
		teamRef01Match := map[string]any{
			"team_id": setup.idmap["team01"],
		}

		teamRef01ListResult, err := teamRef01Ent.List(teamRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, teamRef01ListOk := teamRef01ListResult.([]any)
		if !teamRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", teamRef01ListResult)
		}

		// LOAD
		teamRef01MatchDt0 := map[string]any{}
		teamRef01DataDt0Loaded, err := teamRef01Ent.Load(teamRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if teamRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func teamBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "team", "TeamTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read team test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse team test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"team01", "team02", "team03"},
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
	entidEnvRaw := os.Getenv("MLBGUMBO_TEST_TEAM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MLBGUMBO_TEST_TEAM_ENTID": idmap,
		"MLBGUMBO_TEST_LIVE":      "FALSE",
		"MLBGUMBO_TEST_EXPLAIN":   "FALSE",
		"MLBGUMBO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MLBGUMBO_TEST_TEAM_ENTID"])
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
