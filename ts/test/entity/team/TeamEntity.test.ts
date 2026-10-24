

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MlbGumboSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('TeamEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MLB_GUMBO_TEST_LIVE=TRUE.
  afterEach(liveDelay('MLB_GUMBO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MlbGumboSDK.test()
    const ent = testsdk.Team()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MlbGumboSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Team().list({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MLB_GUMBO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'team.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"teams":{"a":true,"h":"Teams","n":"teams","r":false,"t":"`$ARRAY`","key$":"teams","index$":1}},"id":{"field":"id","name":"id"},"name":"team","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /teams/{teamId}/roster","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":119,"k":"param","n":"id","or":"teamId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"hydrate","or":"hydrate","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":2024,"k":"query","n":"season","or":"season","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/teams/{teamId}/roster","q":{"$action":"roster","exist":["id"]},"r":{"param":{"teamId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"teams"},{"var":"id"},{"lit":"roster"}],"t":{"req":"`reqdata`","res":"`body.roster`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /teams/{teamId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":119,"k":"param","n":"id","or":"teamId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"hydrate","or":"hydrate","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":2024,"k":"query","n":"season","or":"season","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/teams/{teamId}","q":{"exist":["id"]},"r":{"param":{"teamId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"teams"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"team","name__orig":"team","Name":"Team","name_":"team","name-":"team","NAME":"TEAM","index$":3}, {"active":true,"entity":"team","key$":"BasicTeamFlow","kind":"basic","name":"BasicTeamFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"team_id":"team01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"team_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"team_ref01","srcdatavar":"team_ref01_data","suffix":"_dt0"},"m":{"id":"team01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-team_ref01"}}],"index$":0}]}, 'Team', {"GET /teams/{teamId}/roster":{"protocol":"http","parameters":[{"name":"teamId","in":"path","description":"The unique identifier for the team (e.g., 119 for LA Dodgers)","required":true,"schema":{"type":"integer","example":119},"index$":0},{"name":"season","in":"query","description":"The season year for the roster","required":false,"schema":{"type":"integer","example":2024},"index$":1},{"name":"hydrate","in":"query","description":"Add additional data to the response","required":false,"schema":{"type":"string"},"index$":2}]},"GET /teams/{teamId}":{"protocol":"http","parameters":[{"name":"teamId","in":"path","description":"The unique identifier for the team (e.g., 119 for LA Dodgers)","required":true,"schema":{"type":"integer","example":119},"index$":0},{"name":"season","in":"query","description":"Specify a season year for team information","required":false,"schema":{"type":"integer","example":2024},"index$":1},{"name":"hydrate","in":"query","description":"Add additional data to the response","required":false,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let team_ref01_data = Object.values(setup.data.existing.team)[0] as any

    // LOAD
    const team_ref01_ent = client.Team()
    const team_ref01_match_dt0: any = {}
    team_ref01_match_dt0.id = team_ref01_data.id
    const team_ref01_data_dt0 = (await team_ref01_ent.load(team_ref01_match_dt0)).data()
    assert(team_ref01_data_dt0.id === team_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/team/TeamTestData.json')

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
    ['team01','team02','team03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MLB_GUMBO_TEST_TEAM_ENTID': idmap,
    'MLB_GUMBO_TEST_LIVE': 'FALSE',
    'MLB_GUMBO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MLB_GUMBO_TEST_TEAM_ENTID']

  const live = 'TRUE' === env.MLB_GUMBO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MLB_GUMBO_TEST_TEAM_ENTID']
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
  
