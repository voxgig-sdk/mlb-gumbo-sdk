

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


describe('ScheduleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MLB_GUMBO_TEST_LIVE=TRUE.
  afterEach(liveDelay('MLB_GUMBO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MlbGumboSDK.test()
    const ent = testsdk.Schedule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MLB_GUMBO_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'schedule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"date","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"games","req":false,"type":"`$ARRAY`","index$":1}],"name":"schedule","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"03/15/2024","kind":"query","name":"date","orig":"date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"R","kind":"query","name":"game_type","orig":"game_type","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"hydrate","orig":"hydrate","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":2024,"kind":"query","name":"season","orig":"season","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"example":1,"kind":"query","name":"sport_id","orig":"sport_id","reqd":false,"type":"`$INTEGER`","index$":4}]},"contract":{"id":"GET /schedule","json":"{\"operationId\":\"getSchedule\",\"parameters\":[{\"description\":\"Sport identifier (1 = Major League Baseball)\",\"in\":\"query\",\"name\":\"sportId\",\"required\":false,\"schema\":{\"default\":1,\"example\":1,\"type\":\"integer\"}},{\"description\":\"The season year\",\"in\":\"query\",\"name\":\"season\",\"required\":false,\"schema\":{\"example\":2024,\"type\":\"integer\"}},{\"description\":\"Type of games to include (R = Regular Season, P = Postseason, S = Spring Training)\",\"in\":\"query\",\"name\":\"gameType\",\"required\":false,\"schema\":{\"enum\":[\"R\",\"P\",\"S\"],\"example\":\"R\",\"type\":\"string\"}},{\"description\":\"Specific date for schedule (format: MM/DD/YYYY)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"example\":\"03/15/2024\",\"type\":\"string\"}},{\"description\":\"Add additional data to the response\",\"in\":\"query\",\"name\":\"hydrate\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"dates\":{\"items\":{\"properties\":{\"date\":{\"format\":\"date\",\"type\":\"string\"},\"games\":{\"items\":{\"properties\":{\"gameDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"gamePk\":{\"description\":\"Unique game identifier\",\"type\":\"integer\"},\"teams\":{\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved schedule\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/schedule","segments":[{"lit":"schedule"}],"select":{"exist":["date","game_type","hydrate","season","sport_id"]},"transform":{"req":"`reqdata`","res":"`body.dates`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"schedule","name__orig":"schedule","Name":"Schedule","name_":"schedule","name-":"schedule","NAME":"SCHEDULE","index$":2}, {"active":true,"entity":"schedule","key$":"BasicScheduleFlow","kind":"basic","name":"BasicScheduleFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"schedule_ref01"}}],"index$":0}]}, 'Schedule')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let schedule_ref01_data = Object.values(setup.data.existing.schedule)[0] as any

    // LIST
    const schedule_ref01_ent = client.Schedule()
    const schedule_ref01_match: any = {}

    const schedule_ref01_list = (await schedule_ref01_ent.list(schedule_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/schedule/ScheduleTestData.json')

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
    ['schedule01','schedule02','schedule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MLB_GUMBO_TEST_SCHEDULE_ENTID': idmap,
    'MLB_GUMBO_TEST_LIVE': 'FALSE',
    'MLB_GUMBO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MLB_GUMBO_TEST_SCHEDULE_ENTID']

  const live = 'TRUE' === env.MLB_GUMBO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MLB_GUMBO_TEST_SCHEDULE_ENTID']
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
  
