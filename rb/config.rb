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
            "now" => "`$FUNCTION`",
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
              "title" => "Game Data",
              "type" => "`$OBJECT`",
              "short" => "Metadata about the game including teams, venue, and game status",
            },
            {
              "name" => "liveData",
              "title" => "Live Data",
              "type" => "`$OBJECT`",
              "short" => "Real-time game data including plays, boxscore, and current state",
            },
            {
              "name" => "timestamps",
              "title" => "Timestamps",
              "type" => "`$ARRAY`",
              "short" => "Array of timestamp strings in format yyyymmdd_######",
            },
          ],
          "name" => "game_data",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                  "parts" => [
                    "game",
                    "{game_pk}",
                    "feed",
                    "live",
                    "timestamps",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.timestamps`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "game_pk",
                        "orig" => "game_pk",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "716463",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "game_pk",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
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
                  "parts" => [
                    "game",
                    "{game_pk}",
                    "feed",
                    "live",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "game_pk",
                        "orig" => "game_pk",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "716463",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "field",
                        "orig" => "fields",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "stats,team",
                      },
                      {
                        "name" => "timecode",
                        "orig" => "timecode",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "20240315_123456",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "game_pk",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "player" => {
          "fields" => [
            {
              "name" => "people",
              "title" => "People",
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
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/people/{playerId}",
                  "segments" => [
                    {
                      "lit" => "people",
                    },
                    {
                      "var" => "player_id",
                    },
                  ],
                  "parts" => [
                    "people",
                    "{player_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "playerId" => "player_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "player_id",
                        "orig" => "playerId",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 660271,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "stats,currentTeam",
                      },
                      {
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 2024,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "player_id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "schedule" => {
          "fields" => [
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "format" => "date",
            },
            {
              "name" => "games",
              "title" => "Games",
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
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/schedule",
                  "segments" => [
                    {
                      "lit" => "schedule",
                    },
                  ],
                  "parts" => [
                    "schedule",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.dates`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "03/15/2024",
                        "field" => true,
                      },
                      {
                        "name" => "game_type",
                        "orig" => "gameType",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "R",
                      },
                      {
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 2024,
                      },
                      {
                        "name" => "sport_id",
                        "orig" => "sportId",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
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
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "teams",
              "title" => "Teams",
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
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/teams/{teamId}/roster",
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
                  "parts" => [
                    "teams",
                    "{id}",
                    "roster",
                  ],
                  "rename" => {
                    "param" => {
                      "teamId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.roster`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "teamId",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 119,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 2024,
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "roster",
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/teams/{teamId}",
                  "segments" => [
                    {
                      "lit" => "teams",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "teams",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "teamId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "teamId",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 119,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 2024,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
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
