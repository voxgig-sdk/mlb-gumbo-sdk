

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MlbGumboSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GameDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MLB_GUMBO_TEST_LIVE=TRUE.
  afterEach(liveDelay('MLB_GUMBO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MlbGumboSDK.test()
    const ent = testsdk.GameData()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MLB_GUMBO_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'game_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"gameData","req":false,"short":"Metadata about the game including teams, venue, and game status","type":"`$OBJECT`","index$":0},{"active":true,"name":"liveData","req":false,"short":"Real-time game data including plays, boxscore, and current state","type":"`$OBJECT`","index$":1},{"active":true,"name":"timestamps","req":false,"short":"Array of timestamp strings in format yyyymmdd_######","type":"`$ARRAY`","index$":2}],"name":"game_data","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"716463","kind":"param","name":"game_pk","orig":"game_pk","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /game/{game_pk}/feed/live/timestamps","json":"{\"operationId\":\"getGameTimestamps\",\"parameters\":[{\"description\":\"The unique identifier (primary key) for the specific game\",\"in\":\"path\",\"name\":\"game_pk\",\"required\":true,\"schema\":{\"example\":\"716463\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"timestamps\":{\"description\":\"Array of timestamp strings in format yyyymmdd_######\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved list of timestamps\"},\"404\":{\"description\":\"Game not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/game/{game_pk}/feed/live/timestamps","segments":[{"lit":"game"},{"var":"game_pk"},{"lit":"feed"},{"lit":"live"},{"lit":"timestamps"}],"select":{"exist":["game_pk"]},"transform":{"req":"`reqdata`","res":"`body.timestamps`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"716463","kind":"param","name":"game_pk","orig":"game_pk","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"stats,team","kind":"query","name":"hydrate","orig":"hydrate","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"20240315_123456","kind":"query","name":"timecode","orig":"timecode","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /game/{game_pk}/feed/live","json":"{\"operationId\":\"getLiveGameFeed\",\"parameters\":[{\"description\":\"The unique identifier (primary key) for the specific game\",\"in\":\"path\",\"name\":\"game_pk\",\"required\":true,\"schema\":{\"example\":\"716463\",\"type\":\"string\"}},{\"description\":\"Retrieve game state at a specific timestamp in format yyyymmdd_######\",\"in\":\"query\",\"name\":\"timecode\",\"required\":false,\"schema\":{\"example\":\"20240315_123456\",\"pattern\":\"^\\\\d{8}_\\\\d{6}$\",\"type\":\"string\"}},{\"description\":\"Add additional data to the response (e.g., stats, team)\",\"in\":\"query\",\"name\":\"hydrate\",\"required\":false,\"schema\":{\"example\":\"stats,team\",\"type\":\"string\"}},{\"description\":\"Limit the response to specific fields\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"gameData\":{\"description\":\"Metadata about the game including teams, venue, and game status\",\"type\":\"object\"},\"liveData\":{\"description\":\"Real-time game data including plays, boxscore, and current state\",\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved live game feed\"},\"404\":{\"description\":\"Game not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/game/{game_pk}/feed/live","segments":[{"lit":"game"},{"var":"game_pk"},{"lit":"feed"},{"lit":"live"}],"select":{"exist":["field","game_pk","hydrate","timecode"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["game"]]},"key$":"game_data","name__orig":"game_data","Name":"GameData","name_":"game_data","name-":"game-data","NAME":"GAME_DATA","index$":0}, {"active":true,"entity":"game_data","key$":"BasicGameDataFlow","kind":"basic","name":"BasicGameDataFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"game_pk":"game_pk01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"game_data_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"game_data_ref01","srcdatavar":"game_data_ref01_data","suffix":"_dt0"},"match":{"id":"game_data01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-game_data_ref01"}}],"index$":1}]}, 'GameData')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let game_data_ref01_data = Object.values(setup.data.existing.game_data)[0] as any

    // LIST
    const game_data_ref01_ent = client.GameData()
    const game_data_ref01_match: any = {}
    game_data_ref01_match['game_pk'] = setup.idmap['game_pk01']

    const game_data_ref01_list = (await game_data_ref01_ent.list(game_data_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/game_data/GameDataTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MlbGumboSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['game_data01','game_data02','game_data03','game01','game02','game03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MLB_GUMBO_TEST_GAME_DATA_ENTID': idmap,
    'MLB_GUMBO_TEST_LIVE': 'FALSE',
    'MLB_GUMBO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MLB_GUMBO_TEST_GAME_DATA_ENTID']

  const live = 'TRUE' === env.MLB_GUMBO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MLB_GUMBO_TEST_GAME_DATA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MlbGumboSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
