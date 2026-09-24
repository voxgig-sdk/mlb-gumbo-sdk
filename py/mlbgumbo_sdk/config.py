# MlbGumbo SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MlbGumbo",
            "slug": "mlb-gumbo",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://statsapi.mlb.com/api/v1.1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "game_data": {},
                "player": {},
                "schedule": {},
                "team": {},
            },
        },
        "entity": {
      "game_data": {
        "fields": [
          {
            "name": "gameData",
            "title": "Game Data",
            "type": "`$OBJECT`",
            "short": "Metadata about the game including teams, venue, and game status",
          },
          {
            "name": "liveData",
            "title": "Live Data",
            "type": "`$OBJECT`",
            "short": "Real-time game data including plays, boxscore, and current state",
          },
          {
            "name": "timestamps",
            "title": "Timestamps",
            "type": "`$ARRAY`",
            "short": "Array of timestamp strings in format yyyymmdd_######",
          },
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
                    "lit": "game",
                  },
                  {
                    "var": "game_pk",
                  },
                  {
                    "lit": "feed",
                  },
                  {
                    "lit": "live",
                  },
                  {
                    "lit": "timestamps",
                  },
                ],
                "parts": [
                  "game",
                  "{game_pk}",
                  "feed",
                  "live",
                  "timestamps",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.timestamps`",
                },
                "args": {
                  "params": [
                    {
                      "name": "game_pk",
                      "orig": "game_pk",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "716463",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "game_pk",
                  ],
                },
              },
            ],
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
                    "lit": "game",
                  },
                  {
                    "var": "game_pk",
                  },
                  {
                    "lit": "feed",
                  },
                  {
                    "lit": "live",
                  },
                ],
                "parts": [
                  "game",
                  "{game_pk}",
                  "feed",
                  "live",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "game_pk",
                      "orig": "game_pk",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "716463",
                    },
                  ],
                  "query": [
                    {
                      "name": "field",
                      "orig": "field",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "hydrate",
                      "orig": "hydrate",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "stats,team",
                    },
                    {
                      "name": "timecode",
                      "orig": "timecode",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "20240315_123456",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "field",
                    "game_pk",
                    "hydrate",
                    "timecode",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "player": {
        "fields": [
          {
            "name": "people",
            "title": "People",
            "type": "`$ARRAY`",
          },
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
                    "lit": "people",
                  },
                  {
                    "var": "player_id",
                  },
                ],
                "parts": [
                  "people",
                  "{player_id}",
                ],
                "rename": {
                  "param": {
                    "playerId": "player_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "player_id",
                      "orig": "player_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 660271,
                    },
                  ],
                  "query": [
                    {
                      "name": "hydrate",
                      "orig": "hydrate",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "stats,currentTeam",
                    },
                    {
                      "name": "season",
                      "orig": "season",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2024,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "hydrate",
                    "player_id",
                    "season",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "schedule": {
        "fields": [
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "format": "date",
          },
          {
            "name": "games",
            "title": "Games",
            "type": "`$ARRAY`",
          },
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
                    "lit": "schedule",
                  },
                ],
                "parts": [
                  "schedule",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.dates`",
                },
                "args": {
                  "query": [
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "03/15/2024",
                    },
                    {
                      "name": "game_type",
                      "orig": "game_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "R",
                    },
                    {
                      "name": "hydrate",
                      "orig": "hydrate",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "season",
                      "orig": "season",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2024,
                    },
                    {
                      "name": "sport_id",
                      "orig": "sport_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "date",
                    "game_type",
                    "hydrate",
                    "season",
                    "sport_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "team": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "teams",
            "title": "Teams",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "teams",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "roster",
                  },
                ],
                "parts": [
                  "teams",
                  "{id}",
                  "roster",
                ],
                "rename": {
                  "param": {
                    "teamId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.roster`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "team_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 119,
                    },
                  ],
                  "query": [
                    {
                      "name": "hydrate",
                      "orig": "hydrate",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "season",
                      "orig": "season",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2024,
                    },
                  ],
                },
                "select": {
                  "$action": "roster",
                  "exist": [
                    "hydrate",
                    "id",
                    "season",
                  ],
                },
              },
            ],
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
                    "lit": "teams",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "teams",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "teamId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "team_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 119,
                    },
                  ],
                  "query": [
                    {
                      "name": "hydrate",
                      "orig": "hydrate",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "season",
                      "orig": "season",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2024,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "hydrate",
                    "id",
                    "season",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
