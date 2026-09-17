# MlbGumbo SDK configuration

module MlbGumboConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "MlbGumbo",
        "slug" => "mlb-gumbo",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://statsapi.mlb.com/api/v1.1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "game_data" => {},
          "player" => {},
          "schedule" => {},
          "team" => {},
        },
      },
      "entity" => {
        "game_data" => {
          "fields" => [
            {
              "name" => "gameData",
              "short" => "Metadata about the game including teams, venue, and game status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "liveData",
              "short" => "Real-time game data including plays, boxscore, and current state",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "timestamps",
              "short" => "Array of timestamp strings in format yyyymmdd_######",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "game_data",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "716463",
                        "kind" => "param",
                        "name" => "game_pk",
                        "orig" => "game_pk",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/game/{game_pk}/feed/live/timestamps",
                  "segments" => [
                    {
                      "lit" => "game",
                    },
                    {
                      "var" => "game_pk",
                    },
                    {
                      "lit" => "feed",
                    },
                    {
                      "lit" => "live",
                    },
                    {
                      "lit" => "timestamps",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "game_pk",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.timestamps`",
                  },
                  "parts" => [
                    "game",
                    "{game_pk}",
                    "feed",
                    "live",
                    "timestamps",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "716463",
                        "kind" => "param",
                        "name" => "game_pk",
                        "orig" => "game_pk",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "stats,team",
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "20240315_123456",
                        "kind" => "query",
                        "name" => "timecode",
                        "orig" => "timecode",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/game/{game_pk}/feed/live",
                  "segments" => [
                    {
                      "lit" => "game",
                    },
                    {
                      "var" => "game_pk",
                    },
                    {
                      "lit" => "feed",
                    },
                    {
                      "lit" => "live",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                      "game_pk",
                      "hydrate",
                      "timecode",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "game",
                    "{game_pk}",
                    "feed",
                    "live",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "game",
              ],
            ],
          },
        },
        "player" => {
          "fields" => [
            {
              "name" => "people",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "player",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 660271,
                        "kind" => "param",
                        "name" => "player_id",
                        "orig" => "player_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "stats,currentTeam",
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/people/{playerId}",
                  "rename" => {
                    "param" => {
                      "playerId" => "player_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "people",
                    },
                    {
                      "var" => "player_id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "hydrate",
                      "player_id",
                      "season",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "people",
                    "{player_id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "person",
              ],
            ],
          },
        },
        "schedule" => {
          "fields" => [
            {
              "format" => "date",
              "name" => "date",
              "type" => "`$STRING`",
            },
            {
              "name" => "games",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "schedule",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "03/15/2024",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "R",
                        "kind" => "query",
                        "name" => "game_type",
                        "orig" => "game_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "sport_id",
                        "orig" => "sport_id",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/schedule",
                  "segments" => [
                    {
                      "lit" => "schedule",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                      "game_type",
                      "hydrate",
                      "season",
                      "sport_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.dates`",
                  },
                  "parts" => [
                    "schedule",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "team" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "teams",
              "type" => "`$ARRAY`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "team",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 119,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "team_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/teams/{teamId}/roster",
                  "rename" => {
                    "param" => {
                      "teamId" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "teams",
                    },
                    {
                      "var" => "id",
                    },
                    {
                      "lit" => "roster",
                    },
                  ],
                  "select" => {
                    "$action" => "roster",
                    "exist" => [
                      "hydrate",
                      "id",
                      "season",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.roster`",
                  },
                  "parts" => [
                    "teams",
                    "{id}",
                    "roster",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 119,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "team_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/teams/{teamId}",
                  "rename" => {
                    "param" => {
                      "teamId" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "teams",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "hydrate",
                      "id",
                      "season",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "teams",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MlbGumboFeatures.make_feature(name)
  end
end
