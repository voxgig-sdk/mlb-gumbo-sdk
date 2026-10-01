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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GameDataEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MLB_GUMBO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MLB_GUMBO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MlbGumboSDK.test();
        const ent = testsdk.GameData();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MLB_GUMBO_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'game_data.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "gameData": { "a": true, "h": "Game Data", "n": "gameData", "r": false, "sh": "Metadata about the game including teams, venue, and game status", "t": "`$OBJECT`", "key$": "gameData", "index$": 0 }, "liveData": { "a": true, "h": "Live Data", "n": "liveData", "r": false, "sh": "Real-time game data including plays, boxscore, and current state", "t": "`$OBJECT`", "key$": "liveData", "index$": 1 }, "timestamps": { "a": true, "h": "Timestamps", "n": "timestamps", "r": false, "sh": "Array of timestamp strings in format yyyymmdd_######", "t": "`$ARRAY`", "key$": "timestamps", "index$": 2 } }, "name": "game_data", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /game/{game_pk}/feed/live/timestamps", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "716463", "k": "param", "n": "game_pk", "or": "game_pk", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/game/{game_pk}/feed/live/timestamps", "q": { "exist": ["game_pk"] }, "r": {}, "s": [{ "lit": "game" }, { "var": "game_pk" }, { "lit": "feed" }, { "lit": "live" }, { "lit": "timestamps" }], "t": { "req": "`reqdata`", "res": "`body.timestamps`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /game/{game_pk}/feed/live", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "716463", "k": "param", "n": "game_pk", "or": "game_pk", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "stats,team", "k": "query", "n": "hydrate", "or": "hydrate", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "20240315_123456", "k": "query", "n": "timecode", "or": "timecode", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/game/{game_pk}/feed/live", "q": { "exist": ["field", "game_pk", "hydrate", "timecode"] }, "r": {}, "s": [{ "lit": "game" }, { "var": "game_pk" }, { "lit": "feed" }, { "lit": "live" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "game_data", "name__orig": "game_data", "Name": "GameData", "name_": "game_data", "name-": "game-data", "NAME": "GAME_DATA", "index$": 0 }, { "active": true, "entity": "game_data", "key$": "BasicGameDataFlow", "kind": "basic", "name": "BasicGameDataFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "game_pk": "game_pk01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "game_data_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "game_data_ref01", "srcdatavar": "game_data_ref01_data", "suffix": "_dt0" }, "m": { "id": "game_data01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-game_data_ref01" } }], "index$": 1 }] }, 'GameData', { "GET /game/{game_pk}/feed/live/timestamps": { "protocol": "http", "parameters": [{ "name": "game_pk", "in": "path", "description": "The unique identifier (primary key) for the specific game", "required": true, "schema": { "type": "string", "example": "716463" }, "index$": 0 }] }, "GET /game/{game_pk}/feed/live": { "protocol": "http", "parameters": [{ "name": "game_pk", "in": "path", "description": "The unique identifier (primary key) for the specific game", "required": true, "schema": { "type": "string", "example": "716463" }, "index$": 0 }, { "name": "timecode", "in": "query", "description": "Retrieve game state at a specific timestamp in format yyyymmdd_######", "required": false, "schema": { "type": "string", "pattern": "^\\d{8}_\\d{6}$", "example": "20240315_123456" }, "index$": 1 }, { "name": "hydrate", "in": "query", "description": "Add additional data to the response (e.g., stats, team)", "required": false, "schema": { "type": "string", "example": "stats,team" }, "index$": 2 }, { "name": "fields", "in": "query", "description": "Limit the response to specific fields", "required": false, "schema": { "type": "string" }, "index$": 3 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let game_data_ref01_data = Object.values(setup.data.existing.game_data)[0];
        // LIST
        const game_data_ref01_ent = client.GameData();
        const game_data_ref01_match = {};
        game_data_ref01_match['game_pk'] = setup.idmap['game_pk01'];
        const game_data_ref01_list = (await game_data_ref01_ent.list(game_data_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/game_data/GameDataTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MlbGumboSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['game_data01', 'game_data02', 'game_data03', 'game_pk01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MLB_GUMBO_TEST_GAME_DATA_ENTID': idmap,
        'MLB_GUMBO_TEST_LIVE': 'FALSE',
        'MLB_GUMBO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MLB_GUMBO_TEST_GAME_DATA_ENTID'];
    const live = 'TRUE' === env.MLB_GUMBO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MLB_GUMBO_TEST_GAME_DATA_ENTID'];
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
//# sourceMappingURL=GameDataEntity.test.js.map