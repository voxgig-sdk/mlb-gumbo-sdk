
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MlbGumbo',
        slug: "mlb-gumbo",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Game Data",
          "type": "`$OBJECT`",
          "short": "Metadata about the game including teams, venue, and game status"
        },
        {
          "name": "liveData",
          "title": "Live Data",
          "type": "`$OBJECT`",
          "short": "Real-time game data including plays, boxscore, and current state"
        },
        {
          "name": "timestamps",
          "title": "Timestamps",
          "type": "`$ARRAY`",
          "short": "Array of timestamp strings in format yyyymmdd_######"
        }
      ],
      "name": "game_data",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/game/{game_pk}/feed/live/timestamps",
              "segments": [
                {
                  "lit": "game"
                },
                {
                  "var": "game_pk"
                },
                {
                  "lit": "feed"
                },
                {
                  "lit": "live"
                },
                {
                  "lit": "timestamps"
                }
              ],
              "parts": [
                "game",
                "{game_pk}",
                "feed",
                "live",
                "timestamps"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.timestamps`"
              },
              "args": {
                "params": [
                  {
                    "name": "game_pk",
                    "orig": "game_pk",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "716463"
                  }
                ]
              },
              "select": {
                "exist": [
                  "game_pk"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/game/{game_pk}/feed/live",
              "segments": [
                {
                  "lit": "game"
                },
                {
                  "var": "game_pk"
                },
                {
                  "lit": "feed"
                },
                {
                  "lit": "live"
                }
              ],
              "parts": [
                "game",
                "{game_pk}",
                "feed",
                "live"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "game_pk",
                    "orig": "game_pk",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "716463"
                  }
                ],
                "query": [
                  {
                    "name": "field",
                    "orig": "field",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "stats,team"
                  },
                  {
                    "name": "timecode",
                    "orig": "timecode",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "20240315_123456"
                  }
                ]
              },
              "select": {
                "exist": [
                  "field",
                  "game_pk",
                  "hydrate",
                  "timecode"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "player": {
      "fields": [
        {
          "name": "people",
          "title": "People",
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
              "kind": "http",
              "method": "GET",
              "orig": "/people/{playerId}",
              "segments": [
                {
                  "lit": "people"
                },
                {
                  "var": "player_id"
                }
              ],
              "parts": [
                "people",
                "{player_id}"
              ],
              "rename": {
                "param": {
                  "playerId": "player_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "player_id",
                    "orig": "player_id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 660271
                  }
                ],
                "query": [
                  {
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "stats,currentTeam"
                  },
                  {
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 2024
                  }
                ]
              },
              "select": {
                "exist": [
                  "hydrate",
                  "player_id",
                  "season"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "schedule": {
      "fields": [
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "format": "date"
        },
        {
          "name": "games",
          "title": "Games",
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
              "kind": "http",
              "method": "GET",
              "orig": "/schedule",
              "segments": [
                {
                  "lit": "schedule"
                }
              ],
              "parts": [
                "schedule"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.dates`"
              },
              "args": {
                "query": [
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "03/15/2024"
                  },
                  {
                    "name": "game_type",
                    "orig": "game_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "R"
                  },
                  {
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 2024
                  },
                  {
                    "name": "sport_id",
                    "orig": "sport_id",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  }
                ]
              },
              "select": {
                "exist": [
                  "date",
                  "game_type",
                  "hydrate",
                  "season",
                  "sport_id"
                ]
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
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "teams",
          "title": "Teams",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "team",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/teams/{teamId}/roster",
              "segments": [
                {
                  "lit": "teams"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "roster"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body.roster`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "team_id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 119
                  }
                ],
                "query": [
                  {
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 2024
                  }
                ]
              },
              "select": {
                "$action": "roster",
                "exist": [
                  "hydrate",
                  "id",
                  "season"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/teams/{teamId}",
              "segments": [
                {
                  "lit": "teams"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "teams",
                "{id}"
              ],
              "rename": {
                "param": {
                  "teamId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "team_id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 119
                  }
                ],
                "query": [
                  {
                    "name": "hydrate",
                    "orig": "hydrate",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 2024
                  }
                ]
              },
              "select": {
                "exist": [
                  "hydrate",
                  "id",
                  "season"
                ]
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
  config,
  FEATURE_PLUGINS,
}

