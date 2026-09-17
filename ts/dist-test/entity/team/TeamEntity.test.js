"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TeamEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MLB_GUMBO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MLB_GUMBO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MlbGumboSDK.test();
        const ent = testsdk.Team();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MLB_GUMBO_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'team.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "teams", "req": false, "type": "`$ARRAY`", "index$": 1 }], "id": { "field": "id", "name": "id" }, "name": "team", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 119, "kind": "param", "name": "id", "orig": "team_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "hydrate", "orig": "hydrate", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 2024, "kind": "query", "name": "season", "orig": "season", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /teams/{teamId}/roster", "json": "{\"operationId\":\"getTeamRoster\",\"parameters\":[{\"description\":\"The unique identifier for the team (e.g., 119 for LA Dodgers)\",\"in\":\"path\",\"name\":\"teamId\",\"required\":true,\"schema\":{\"example\":119,\"type\":\"integer\"}},{\"description\":\"The season year for the roster\",\"in\":\"query\",\"name\":\"season\",\"required\":false,\"schema\":{\"example\":2024,\"type\":\"integer\"}},{\"description\":\"Add additional data to the response\",\"in\":\"query\",\"name\":\"hydrate\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"roster\":{\"items\":{\"properties\":{\"jerseyNumber\":{\"type\":\"string\"},\"person\":{\"properties\":{\"fullName\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"}},\"type\":\"object\"},\"position\":{\"properties\":{\"code\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved team roster\"},\"404\":{\"description\":\"Team not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/teams/{teamId}/roster", "rename": { "param": { "teamId": "id" } }, "segments": [{ "lit": "teams" }, { "var": "id" }, { "lit": "roster" }], "select": { "$action": "roster", "exist": ["hydrate", "id", "season"] }, "transform": { "req": "`reqdata`", "res": "`body.roster`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 119, "kind": "param", "name": "id", "orig": "team_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "hydrate", "orig": "hydrate", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 2024, "kind": "query", "name": "season", "orig": "season", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /teams/{teamId}", "json": "{\"operationId\":\"getTeam\",\"parameters\":[{\"description\":\"The unique identifier for the team (e.g., 119 for LA Dodgers)\",\"in\":\"path\",\"name\":\"teamId\",\"required\":true,\"schema\":{\"example\":119,\"type\":\"integer\"}},{\"description\":\"Specify a season year for team information\",\"in\":\"query\",\"name\":\"season\",\"required\":false,\"schema\":{\"example\":2024,\"type\":\"integer\"}},{\"description\":\"Add additional data to the response\",\"in\":\"query\",\"name\":\"hydrate\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"teams\":{\"items\":{\"properties\":{\"abbreviation\":{\"type\":\"string\"},\"division\":{\"type\":\"object\"},\"id\":{\"type\":\"integer\"},\"league\":{\"type\":\"object\"},\"locationName\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"teamName\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved team information\"},\"404\":{\"description\":\"Team not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/teams/{teamId}", "rename": { "param": { "teamId": "id" } }, "segments": [{ "lit": "teams" }, { "var": "id" }], "select": { "exist": ["hydrate", "id", "season"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "team", "name__orig": "team", "Name": "Team", "name_": "team", "name-": "team", "NAME": "TEAM", "index$": 3 }, { "active": true, "entity": "team", "key$": "BasicTeamFlow", "kind": "basic", "name": "BasicTeamFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "team_id": "team01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "team_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "team_ref01", "srcdatavar": "team_ref01_data", "suffix": "_dt0" }, "match": { "id": "team01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-team_ref01" } }], "index$": 1 }] }, 'Team');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let team_ref01_data = Object.values(setup.data.existing.team)[0];
        // LIST
        const team_ref01_ent = client.Team();
        const team_ref01_match = {};
        team_ref01_match['team_id'] = setup.idmap['team01'];
        const team_ref01_list = (await team_ref01_ent.list(team_ref01_match)).map((e) => e.data());
        // LOAD
        const team_ref01_match_dt0 = {};
        team_ref01_match_dt0.id = team_ref01_data.id;
        const team_ref01_data_dt0 = (await team_ref01_ent.load(team_ref01_match_dt0)).data();
        (0, node_assert_1.default)(team_ref01_data_dt0.id === team_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/team/TeamTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MlbGumboSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['team01', 'team02', 'team03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MLB_GUMBO_TEST_TEAM_ENTID': idmap,
        'MLB_GUMBO_TEST_LIVE': 'FALSE',
        'MLB_GUMBO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MLB_GUMBO_TEST_TEAM_ENTID'];
    const live = 'TRUE' === env.MLB_GUMBO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MLB_GUMBO_TEST_TEAM_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MlbGumboSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MLB_GUMBO_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TeamEntity.test.js.map