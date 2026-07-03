
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://statsapi.mlb.com/api/v1.1',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      game_data: {
      },

      player: {
      },

      schedule: {
      },

      team: {
      },

    }
  }


  entity = {
    "game_data": {
      "fields": [
        {
          "active": true,
          "name": "game_data",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "live_data",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "timestamp",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 2
        }
      ],
      "name": "game_data",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "716463",
                    "kind": "param",
                    "name": "game_pk",
                    "orig": "game_pk",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/game/{game_pk}/feed/live/timestamps",
              "parts": [
                "game",
                "{game_pk}",
                "feed",
                "live",
                "timestamps"
              ],
              "select": {
                "exist": [
                  "game_pk"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "716463",
                    "kind": "param",
                    "name": "game_pk",
                    "orig": "game_pk",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "field",
                    "orig": "field",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "stats,team",
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "20240315_123456",
                    "kind": "query",
                    "name": "timecode",
                    "orig": "timecode",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/game/{game_pk}/feed/live",
              "parts": [
                "game",
                "{game_pk}",
                "feed",
                "live"
              ],
              "select": {
                "exist": [
                  "field",
                  "game_pk",
                  "hydrate",
                  "timecode"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "game"
          ]
        ]
      }
    },
    "player": {
      "fields": [
        {
          "active": true,
          "name": "person",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        }
      ],
      "name": "player",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": 660271,
                    "kind": "param",
                    "name": "player_id",
                    "orig": "player_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "example": "stats,currentTeam",
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/people/{playerId}",
              "parts": [
                "people",
                "{player_id}"
              ],
              "rename": {
                "param": {
                  "playerId": "player_id"
                }
              },
              "select": {
                "exist": [
                  "hydrate",
                  "player_id",
                  "season"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "person"
          ]
        ]
      }
    },
    "schedule": {
      "fields": [
        {
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "game",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        }
      ],
      "name": "schedule",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "03/15/2024",
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "R",
                    "kind": "query",
                    "name": "game_type",
                    "orig": "game_type",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "sport_id",
                    "orig": "sport_id",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/schedule",
              "parts": [
                "schedule"
              ],
              "select": {
                "exist": [
                  "date",
                  "game_type",
                  "hydrate",
                  "season",
                  "sport_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "team": {
      "fields": [
        {
          "active": true,
          "name": "jersey_number",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "person",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "position",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 3
        },
        {
          "active": true,
          "name": "team",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 4
        }
      ],
      "name": "team",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": 119,
                    "kind": "param",
                    "name": "id",
                    "orig": "team_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/teams/{teamId}/roster",
              "parts": [
                "teams",
                "{id}",
                "roster"
              ],
              "rename": {
                "param": {
                  "teamId": "id"
                }
              },
              "select": {
                "$action": "roster",
                "exist": [
                  "hydrate",
                  "id",
                  "season"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": 119,
                    "kind": "param",
                    "name": "id",
                    "orig": "team_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/teams/{teamId}",
              "parts": [
                "teams",
                "{id}"
              ],
              "rename": {
                "param": {
                  "teamId": "id"
                }
              },
              "select": {
                "exist": [
                  "hydrate",
                  "id",
                  "season"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

