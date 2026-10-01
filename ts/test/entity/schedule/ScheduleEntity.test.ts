

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":0},"games":{"a":true,"h":"Games","n":"games","r":false,"t":"`$ARRAY`","key$":"games","index$":1}},"name":"schedule","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /schedule","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"03/15/2024","k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"R","k":"query","n":"game_type","or":"gameType","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"hydrate","or":"hydrate","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":2024,"k":"query","n":"season","or":"season","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":1,"k":"query","n":"sport_id","or":"sportId","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/schedule","q":{"exist":["date","game_type","hydrate","season","sport_id"]},"r":{},"s":[{"lit":"schedule"}],"t":{"req":"`reqdata`","res":"`body.dates`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"schedule","name__orig":"schedule","Name":"Schedule","name_":"schedule","name-":"schedule","NAME":"SCHEDULE","index$":2}, {"active":true,"entity":"schedule","key$":"BasicScheduleFlow","kind":"basic","name":"BasicScheduleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"schedule_ref01"}}],"index$":0}]}, 'Schedule', {"GET /schedule":{"protocol":"http","parameters":[{"name":"sportId","in":"query","description":"Sport identifier (1 = Major League Baseball)","required":false,"schema":{"type":"integer","example":1,"default":1},"index$":0},{"name":"season","in":"query","description":"The season year","required":false,"schema":{"type":"integer","example":2024},"index$":1},{"name":"gameType","in":"query","description":"Type of games to include (R = Regular Season, P = Postseason, S = Spring Training)","required":false,"schema":{"type":"string","enum":["R","P","S"],"example":"R"},"index$":2},{"name":"date","in":"query","description":"Specific date for schedule (format: MM/DD/YYYY)","required":false,"schema":{"type":"string","example":"03/15/2024"},"index$":3},{"name":"hydrate","in":"query","description":"Add additional data to the response","required":false,"schema":{"type":"string"},"index$":4}]}})
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
  
