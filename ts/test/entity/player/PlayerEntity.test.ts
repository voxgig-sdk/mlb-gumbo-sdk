

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


describe('PlayerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MLB_GUMBO_TEST_LIVE=TRUE.
  afterEach(liveDelay('MLB_GUMBO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MlbGumboSDK.test()
    const ent = testsdk.Player()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MLB_GUMBO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'player.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"people":{"a":true,"h":"People","n":"people","r":false,"t":"`$ARRAY`","key$":"people","index$":0}},"name":"player","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /people/{playerId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":660271,"k":"param","n":"player_id","or":"playerId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"stats,currentTeam","k":"query","n":"hydrate","or":"hydrate","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":2024,"k":"query","n":"season","or":"season","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/people/{playerId}","q":{"exist":["hydrate","player_id","season"]},"r":{"param":{"playerId":"player_id"}},"s":[{"lit":"people"},{"var":"player_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"player","name__orig":"player","Name":"Player","name_":"player","name-":"player","NAME":"PLAYER","index$":1}, {"active":true,"entity":"player","key$":"BasicPlayerFlow","kind":"basic","name":"BasicPlayerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"player_ref01","srcdatavar":"player_ref01_data","suffix":"_dt0"},"m":{"id":"player01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-player_ref01"}}],"index$":0}]}, 'Player', {"GET /people/{playerId}":{"protocol":"http","parameters":[{"name":"playerId","in":"path","description":"The unique identifier for the player (e.g., 660271 for Shohei Ohtani)","required":true,"schema":{"type":"integer","example":660271},"index$":0},{"name":"season","in":"query","description":"Specify a season year for player information","required":false,"schema":{"type":"integer","example":2024},"index$":1},{"name":"hydrate","in":"query","description":"Add additional data to the response (e.g., stats, currentTeam)","required":false,"schema":{"type":"string","example":"stats,currentTeam"},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let player_ref01_data = Object.values(setup.data.existing.player)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const player_ref01_ent = client.Player()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/player/PlayerTestData.json')

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
    ['player01','player02','player03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MLB_GUMBO_TEST_PLAYER_ENTID': idmap,
    'MLB_GUMBO_TEST_LIVE': 'FALSE',
    'MLB_GUMBO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MLB_GUMBO_TEST_PLAYER_ENTID']

  const live = 'TRUE' === env.MLB_GUMBO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MLB_GUMBO_TEST_PLAYER_ENTID']
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
  
