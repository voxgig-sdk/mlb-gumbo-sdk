import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "game_data",
    "accessor": "GameData",
    "op": "list",
    "method": "GET",
    "path": "/game/{game_pk}/feed/live/timestamps",
    "args": [
      {
        "name": "game_pk",
        "wire": "game_pk",
        "value": "716463"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "timestamps": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "game_data",
    "accessor": "GameData",
    "op": "load",
    "method": "GET",
    "path": "/game/{game_pk}/feed/live",
    "args": [
      {
        "name": "game_pk",
        "wire": "game_pk",
        "value": "716463"
      }
    ],
    "select": {
      "field": "v1",
      "hydrate": "stats,team",
      "timecode": "20240315_123456"
    },
    "headers": [],
    "query": [
      "timecode",
      "hydrate",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "gameData": {},
      "liveData": {}
    },
    "idField": "id"
  },
  {
    "entity": "player",
    "accessor": "Player",
    "op": "load",
    "method": "GET",
    "path": "/people/{playerId}",
    "args": [
      {
        "name": "player_id",
        "wire": "playerId",
        "value": 660271
      }
    ],
    "select": {
      "hydrate": "stats,currentTeam",
      "season": 2024
    },
    "headers": [],
    "query": [
      "season",
      "hydrate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "people": [
        {
          "id": 1,
          "fullName": "x",
          "firstName": "x",
          "lastName": "x",
          "primaryNumber": "x",
          "birthDate": "2026-01-01",
          "currentAge": 1,
          "height": "x",
          "weight": 1,
          "primaryPosition": {
            "code": "x",
            "name": "x",
            "type": "x"
          },
          "batSide": {},
          "pitchHand": {}
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "schedule",
    "accessor": "Schedule",
    "op": "list",
    "method": "GET",
    "path": "/schedule",
    "args": [],
    "select": {
      "date": "03/15/2024",
      "game_type": "v1",
      "hydrate": "v1",
      "season": 2024,
      "sport_id": "v1"
    },
    "headers": [],
    "query": [
      "sportId",
      "season",
      "gameType",
      "date",
      "hydrate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "dates": [
        {
          "date": "2026-01-01",
          "games": [
            {
              "gameDate": "2026-01-01T00:00:00Z",
              "gamePk": 1,
              "teams": {}
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "team",
    "accessor": "Team",
    "op": "list",
    "method": "GET",
    "path": "/teams/{teamId}/roster",
    "action": "roster",
    "args": [
      {
        "name": "id",
        "wire": "teamId",
        "value": 119
      }
    ],
    "select": {
      "hydrate": "v1",
      "season": 2024
    },
    "headers": [],
    "query": [
      "season",
      "hydrate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "roster": [
        {
          "jerseyNumber": "x",
          "person": {
            "fullName": "x",
            "id": 1
          },
          "position": {
            "code": "x",
            "name": "x",
            "type": "x"
          },
          "status": {}
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "team",
    "accessor": "Team",
    "op": "load",
    "method": "GET",
    "path": "/teams/{teamId}",
    "args": [
      {
        "name": "id",
        "wire": "teamId",
        "value": 119
      }
    ],
    "select": {
      "hydrate": "v1",
      "season": 2024
    },
    "headers": [],
    "query": [
      "season",
      "hydrate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "teams": [
        {
          "id": 1,
          "name": "x",
          "teamName": "x",
          "abbreviation": "x",
          "locationName": "x",
          "division": {},
          "league": {}
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
