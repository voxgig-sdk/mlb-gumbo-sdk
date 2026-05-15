# MlbGumbo SDK configuration

module MlbGumboConfig
  def self.make_config
    {
      "main" => {
        "name" => "MlbGumbo",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://statsapi.mlb.com/api/v1.1",
        "auth" => {
          "prefix" => "Bearer",
        },
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
              "name" => "game_data",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "live_data",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "timestamp",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "game_data",
          "op" => {
            "list" => {
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
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/game/{game_pk}/feed/live/timestamps",
                  "parts" => [
                    "game",
                    "{game_pk}",
                    "feed",
                    "live",
                    "timestamps",
                  ],
                  "select" => {
                    "exist" => [
                      "game_pk",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
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
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "stats,team",
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "20240315_123456",
                        "kind" => "query",
                        "name" => "timecode",
                        "orig" => "timecode",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/game/{game_pk}/feed/live",
                  "parts" => [
                    "game",
                    "{game_pk}",
                    "feed",
                    "live",
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
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
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
              "name" => "person",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
          ],
          "name" => "player",
          "op" => {
            "load" => {
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
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "example" => "stats,currentTeam",
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/people/{playerId}",
                  "parts" => [
                    "people",
                    "{player_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "playerId" => "player_id",
                    },
                  },
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
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
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
              "name" => "date",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "game",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "schedule",
          "op" => {
            "list" => {
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
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "R",
                        "kind" => "query",
                        "name" => "game_type",
                        "orig" => "game_type",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "sport_id",
                        "orig" => "sport_id",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/schedule",
                  "parts" => [
                    "schedule",
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
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "team" => {
          "fields" => [
            {
              "name" => "jersey_number",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "person",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "position",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "status",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "team",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "team",
          "op" => {
            "list" => {
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
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/teams/{teamId}/roster",
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
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
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
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "hydrate",
                        "orig" => "hydrate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 2024,
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/teams/{teamId}",
                  "parts" => [
                    "teams",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "teamId" => "id",
                    },
                  },
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
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
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
