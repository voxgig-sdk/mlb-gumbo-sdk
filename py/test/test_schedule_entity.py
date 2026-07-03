# Schedule entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from mlbgumbo_sdk import MlbGumboSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestScheduleEntity:

    def test_should_create_instance(self):
        testsdk = MlbGumboSDK.test(None, None)
        ent = testsdk.Schedule(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _schedule_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "schedule." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MLBGUMBO_TEST_SCHEDULE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        schedule_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.schedule")))
        schedule_ref01_data = None
        if len(schedule_ref01_data_raw) > 0:
            schedule_ref01_data = helpers.to_map(schedule_ref01_data_raw[0][1])

        # LIST
        schedule_ref01_ent = client.Schedule(None)
        schedule_ref01_match = {}

        schedule_ref01_list_result, err = schedule_ref01_ent.list(schedule_ref01_match, None)
        assert err is None
        assert isinstance(schedule_ref01_list_result, list)



def _schedule_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/schedule/ScheduleTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MlbGumboSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["schedule01", "schedule02", "schedule03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MLBGUMBO_TEST_SCHEDULE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MLBGUMBO_TEST_SCHEDULE_ENTID": idmap,
        "MLBGUMBO_TEST_LIVE": "FALSE",
        "MLBGUMBO_TEST_EXPLAIN": "FALSE",
        "MLBGUMBO_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("MLBGUMBO_TEST_SCHEDULE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("MLBGUMBO_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("MLBGUMBO_APIKEY"),
            },
            extra or {},
        ])
        client = MlbGumboSDK(helpers.to_map(merged_opts))

    _live = env.get("MLBGUMBO_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MLBGUMBO_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
