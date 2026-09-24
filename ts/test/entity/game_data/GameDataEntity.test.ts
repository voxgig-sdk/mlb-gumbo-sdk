

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"gameData":{"a":true,"h":"Game Data","n":"gameData","r":false,"sh":"Metadata about the game including teams, venue, and game status","t":"`$OBJECT`","key$":"gameData","index$":0},"liveData":{"a":true,"h":"Live Data","n":"liveData","r":false,"sh":"Real-time game data including plays, boxscore, and current state","t":"`$OBJECT`","key$":"liveData","index$":1},"timestamps":{"a":true,"h":"Timestamps","n":"timestamps","r":false,"sh":"Array of timestamp strings in format yyyymmdd_######","t":"`$ARRAY`","key$":"timestamps","index$":2}},"name":"game_data","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /game/{game_pk}/feed/live/timestamps","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"716463","k":"param","n":"game_pk","or":"game_pk","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/game/{game_pk}/feed/live/timestamps","q":{"exist":["game_pk"]},"r":{},"s":[{"lit":"game"},{"var":"game_pk"},{"lit":"feed"},{"lit":"live"},{"lit":"timestamps"}],"t":{"req":"`reqdata`","res":"`body.timestamps`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /game/{game_pk}/feed/live","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"716463","k":"param","n":"game_pk","or":"game_pk","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"field","or":"field","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"stats,team","k":"query","n":"hydrate","or":"hydrate","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"20240315_123456","k":"query","n":"timecode","or":"timecode","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/game/{game_pk}/feed/live","q":{"exist":["field","game_pk","hydrate","timecode"]},"r":{},"s":[{"lit":"game"},{"var":"game_pk"},{"lit":"feed"},{"lit":"live"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"game_data","name__orig":"game_data","Name":"GameData","name_":"game_data","name-":"game-data","NAME":"GAME_DATA","index$":0}, {"active":true,"entity":"game_data","key$":"BasicGameDataFlow","kind":"basic","name":"BasicGameDataFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"game_pk":"game_pk01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"game_data_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"game_data_ref01","srcdatavar":"game_data_ref01_data","suffix":"_dt0"},"m":{"id":"game_data01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-game_data_ref01"}}],"index$":1}]}, 'GameData', {"GET /game/{game_pk}/feed/live/timestamps":{"protocol":"http","operationId":"getGameTimestamps","responses":{"200":{"description":"Successfully retrieved list of timestamps","content":{"application/json":{"schema":{"type":"object","properties":{"timestamps":{"description":"Array of timestamp strings in format yyyymmdd_######","items":{"type":"string"},"key$":"timestamps","type":"array"}},"index$":0}}}},"404":{"description":"Game not found"}},"parameters":[{"name":"game_pk","in":"path","description":"The unique identifier (primary key) for the specific game","required":true,"schema":{"type":"string","example":"716463"},"index$":0}],"securitySource":"unspecified"},"GET /game/{game_pk}/feed/live":{"protocol":"http","operationId":"getLiveGameFeed","responses":{"200":{"description":"Successfully retrieved live game feed","content":{"application/json":{"schema":{"type":"object","properties":{"gameData":{"description":"Metadata about the game including teams, venue, and game status","key$":"gameData","type":"object"},"liveData":{"description":"Real-time game data including plays, boxscore, and current state","key$":"liveData","type":"object"}},"index$":0}}}},"404":{"description":"Game not found"}},"parameters":[{"name":"game_pk","in":"path","description":"The unique identifier (primary key) for the specific game","required":true,"schema":{"type":"string","example":"716463"},"index$":0},{"name":"timecode","in":"query","description":"Retrieve game state at a specific timestamp in format yyyymmdd_######","required":false,"schema":{"type":"string","pattern":"^\\d{8}_\\d{6}$","example":"20240315_123456"},"index$":1},{"name":"hydrate","in":"query","description":"Add additional data to the response (e.g., stats, team)","required":false,"schema":{"type":"string","example":"stats,team"},"index$":2},{"name":"fields","in":"query","description":"Limit the response to specific fields","required":false,"schema":{"type":"string"},"index$":3}],"securitySource":"unspecified"}})
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
    ['game_data01','game_data02','game_data03','game_pk01'],
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
  
