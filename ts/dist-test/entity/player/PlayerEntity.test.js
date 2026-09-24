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
(0, node_test_1.describe)('PlayerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MLB_GUMBO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MLB_GUMBO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MlbGumboSDK.test();
        const ent = testsdk.Player();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MLB_GUMBO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'player.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "people": { "a": true, "h": "People", "n": "people", "r": false, "t": "`$ARRAY`", "key$": "people", "index$": 0 } }, "name": "player", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /people/{playerId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 660271, "k": "param", "n": "player_id", "or": "player_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": "stats,currentTeam", "k": "query", "n": "hydrate", "or": "hydrate", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 2024, "k": "query", "n": "season", "or": "season", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/people/{playerId}", "q": { "exist": ["hydrate", "player_id", "season"] }, "r": { "param": { "playerId": "player_id" } }, "s": [{ "lit": "people" }, { "var": "player_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "player", "name__orig": "player", "Name": "Player", "name_": "player", "name-": "player", "NAME": "PLAYER", "index$": 1 }, { "active": true, "entity": "player", "key$": "BasicPlayerFlow", "kind": "basic", "name": "BasicPlayerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "player_ref01", "srcdatavar": "player_ref01_data", "suffix": "_dt0" }, "m": { "id": "player01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-player_ref01" } }], "index$": 0 }] }, 'Player', { "GET /people/{playerId}": { "protocol": "http", "operationId": "getPlayer", "responses": { "200": { "description": "Successfully retrieved player information", "content": { "application/json": { "schema": { "type": "object", "properties": { "people": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer" }, "fullName": { "type": "string" }, "firstName": { "type": "string" }, "lastName": { "type": "string" }, "primaryNumber": { "type": "string" }, "birthDate": { "type": "string", "format": "date" }, "currentAge": { "type": "integer" }, "height": { "type": "string" }, "weight": { "type": "integer" }, "primaryPosition": { "type": "object", "properties": { "code": { "type": "string" }, "name": { "type": "string" }, "type": { "type": "string" } } }, "batSide": { "type": "object" }, "pitchHand": { "type": "object" } } }, "key$": "people" } }, "index$": 0 } } } }, "404": { "description": "Player not found" } }, "parameters": [{ "name": "playerId", "in": "path", "description": "The unique identifier for the player (e.g., 660271 for Shohei Ohtani)", "required": true, "schema": { "type": "integer", "example": 660271 }, "index$": 0 }, { "name": "season", "in": "query", "description": "Specify a season year for player information", "required": false, "schema": { "type": "integer", "example": 2024 }, "index$": 1 }, { "name": "hydrate", "in": "query", "description": "Add additional data to the response (e.g., stats, currentTeam)", "required": false, "schema": { "type": "string", "example": "stats,currentTeam" }, "index$": 2 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let player_ref01_data = Object.values(setup.data.existing.player)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const player_ref01_ent = client.Player();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/player/PlayerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MlbGumboSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['player01', 'player02', 'player03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MLB_GUMBO_TEST_PLAYER_ENTID': idmap,
        'MLB_GUMBO_TEST_LIVE': 'FALSE',
        'MLB_GUMBO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MLB_GUMBO_TEST_PLAYER_ENTID'];
    const live = 'TRUE' === env.MLB_GUMBO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MLB_GUMBO_TEST_PLAYER_ENTID'];
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
//# sourceMappingURL=PlayerEntity.test.js.map