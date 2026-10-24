package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MlbGumbo",
			"slug": "mlb-gumbo",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://statsapi.mlb.com/api/v1.1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"game_data": map[string]any{},
				"player": map[string]any{},
				"schedule": map[string]any{},
				"team": map[string]any{},
			},
		},
		"entity": map[string]any{
			"game_data": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "gameData",
						"title": "Game Data",
						"type": "`$OBJECT`",
						"short": "Metadata about the game including teams, venue, and game status",
					},
					map[string]any{
						"name": "liveData",
						"title": "Live Data",
						"type": "`$OBJECT`",
						"short": "Real-time game data including plays, boxscore, and current state",
					},
					map[string]any{
						"name": "timestamps",
						"title": "Timestamps",
						"type": "`$ARRAY`",
						"short": "Array of timestamp strings in format yyyymmdd_######",
					},
				},
				"name": "game_data",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/game/{game_pk}/feed/live/timestamps",
								"segments": []any{
									map[string]any{
										"lit": "game",
									},
									map[string]any{
										"var": "game_pk",
									},
									map[string]any{
										"lit": "feed",
									},
									map[string]any{
										"lit": "live",
									},
									map[string]any{
										"lit": "timestamps",
									},
								},
								"parts": []any{
									"game",
									"{game_pk}",
									"feed",
									"live",
									"timestamps",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.timestamps`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "game_pk",
											"orig": "game_pk",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "716463",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"game_pk",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/game/{game_pk}/feed/live",
								"segments": []any{
									map[string]any{
										"lit": "game",
									},
									map[string]any{
										"var": "game_pk",
									},
									map[string]any{
										"lit": "feed",
									},
									map[string]any{
										"lit": "live",
									},
								},
								"parts": []any{
									"game",
									"{game_pk}",
									"feed",
									"live",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "game_pk",
											"orig": "game_pk",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "716463",
										},
									},
									"query": []any{
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
											"kind": "query",
											"example": "stats,team",
										},
										map[string]any{
											"name": "timecode",
											"orig": "timecode",
											"type": "`$STRING`",
											"kind": "query",
											"example": "20240315_123456",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"game_pk",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"player": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "people",
						"title": "People",
						"type": "`$ARRAY`",
					},
				},
				"name": "player",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/people/{playerId}",
								"segments": []any{
									map[string]any{
										"lit": "people",
									},
									map[string]any{
										"var": "player_id",
									},
								},
								"parts": []any{
									"people",
									"{player_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playerId": "player_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "player_id",
											"orig": "playerId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 660271,
										},
									},
									"query": []any{
										map[string]any{
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
											"kind": "query",
											"example": "stats,currentTeam",
										},
										map[string]any{
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2024,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"player_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"schedule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"format": "date",
					},
					map[string]any{
						"name": "games",
						"title": "Games",
						"type": "`$ARRAY`",
					},
				},
				"name": "schedule",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/schedule",
								"segments": []any{
									map[string]any{
										"lit": "schedule",
									},
								},
								"parts": []any{
									"schedule",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.dates`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "03/15/2024",
											"field": true,
										},
										map[string]any{
											"name": "game_type",
											"orig": "gameType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "R",
										},
										map[string]any{
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2024,
										},
										map[string]any{
											"name": "sport_id",
											"orig": "sportId",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"team": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "teams",
						"title": "Teams",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "team",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/teams/{teamId}/roster",
								"segments": []any{
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "roster",
									},
								},
								"parts": []any{
									"teams",
									"{id}",
									"roster",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"teamId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.roster`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "teamId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 119,
										},
									},
									"query": []any{
										map[string]any{
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2024,
										},
									},
								},
								"select": map[string]any{
									"$action": "roster",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/teams/{teamId}",
								"segments": []any{
									map[string]any{
										"lit": "teams",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"teams",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"teamId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "teamId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 119,
										},
									},
									"query": []any{
										map[string]any{
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2024,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
