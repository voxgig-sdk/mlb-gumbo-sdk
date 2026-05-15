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

func TestScheduleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Schedule(nil)
		if ent == nil {
			t.Fatal("expected non-nil ScheduleEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := scheduleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "schedule." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set MLBGUMBO_TEST_SCHEDULE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		scheduleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.schedule", setup.data)))
		var scheduleRef01Data map[string]any
		if len(scheduleRef01DataRaw) > 0 {
			scheduleRef01Data = core.ToMapAny(scheduleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = scheduleRef01Data

		// LIST
		scheduleRef01Ent := client.Schedule(nil)
		scheduleRef01Match := map[string]any{}

		scheduleRef01ListResult, err := scheduleRef01Ent.List(scheduleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, scheduleRef01ListOk := scheduleRef01ListResult.([]any)
		if !scheduleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", scheduleRef01ListResult)
		}

	})
}

func scheduleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "schedule", "ScheduleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read schedule test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse schedule test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"schedule01", "schedule02", "schedule03"},
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
	entidEnvRaw := os.Getenv("MLBGUMBO_TEST_SCHEDULE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MLBGUMBO_TEST_SCHEDULE_ENTID": idmap,
		"MLBGUMBO_TEST_LIVE":      "FALSE",
		"MLBGUMBO_TEST_EXPLAIN":   "FALSE",
		"MLBGUMBO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MLBGUMBO_TEST_SCHEDULE_ENTID"])
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
