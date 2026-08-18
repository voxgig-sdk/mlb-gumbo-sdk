
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'MlbGumbo',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://statsapi.mlb.com/api/v1.1",

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
          "name": "gameData",
          "type": "`$OBJECT`"
        },
        {
          "name": "liveData",
          "type": "`$OBJECT`"
        },
        {
          "name": "timestamps",
          "type": "`$ARRAY`"
        }
      ],
      "name": "game_data",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "716463",
                    "kind": "param",
                    "name": "game_pk",
                    "orig": "game_pk",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
                "res": "`body.timestamps`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
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
                    "kind": "query",
                    "name": "field",
                    "orig": "field",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "stats,team",
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "20240315_123456",
                    "kind": "query",
                    "name": "timecode",
                    "orig": "timecode",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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
          "name": "people",
          "type": "`$ARRAY`"
        }
      ],
      "name": "player",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
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
                    "example": "stats,currentTeam",
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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
          "name": "date",
          "type": "`$STRING`"
        },
        {
          "name": "games",
          "type": "`$ARRAY`"
        }
      ],
      "name": "schedule",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "03/15/2024",
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "R",
                    "kind": "query",
                    "name": "game_type",
                    "orig": "game_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "sport_id",
                    "orig": "sport_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
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
                "res": "`body.dates`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "team": {
      "fields": [
        {
          "name": "jerseyNumber",
          "type": "`$STRING`"
        },
        {
          "name": "person",
          "type": "`$OBJECT`"
        },
        {
          "name": "position",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "type": "`$OBJECT`"
        },
        {
          "name": "teams",
          "type": "`$ARRAY`"
        }
      ],
      "name": "team",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
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
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
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
                "res": "`body.roster`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
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
                    "kind": "query",
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 2024,
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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

