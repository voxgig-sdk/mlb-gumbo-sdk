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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"short": "Metadata about the game including teams, venue, and game status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "liveData",
						"short": "Real-time game data including plays, boxscore, and current state",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "timestamps",
						"short": "Array of timestamp strings in format yyyymmdd_######",
						"type": "`$ARRAY`",
					},
				},
				"name": "game_data",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "716463",
											"kind": "param",
											"name": "game_pk",
											"orig": "game_pk",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/game/{game_pk}/feed/live/timestamps",
								"parts": []any{
									"game",
									"{game_pk}",
									"feed",
									"live",
									"timestamps",
								},
								"select": map[string]any{
									"exist": []any{
										"game_pk",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.timestamps`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "716463",
											"kind": "param",
											"name": "game_pk",
											"orig": "game_pk",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "stats,team",
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "20240315_123456",
											"kind": "query",
											"name": "timecode",
											"orig": "timecode",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/game/{game_pk}/feed/live",
								"parts": []any{
									"game",
									"{game_pk}",
									"feed",
									"live",
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"game_pk",
										"hydrate",
										"timecode",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"game",
						},
					},
				},
			},
			"player": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "people",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 660271,
											"kind": "param",
											"name": "player_id",
											"orig": "player_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "stats,currentTeam",
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/people/{playerId}",
								"parts": []any{
									"people",
									"{player_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playerId": "player_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"hydrate",
										"player_id",
										"season",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"person",
						},
					},
				},
			},
			"schedule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "games",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "03/15/2024",
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "R",
											"kind": "query",
											"name": "game_type",
											"orig": "game_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "sport_id",
											"orig": "sport_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/schedule",
								"parts": []any{
									"schedule",
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"game_type",
										"hydrate",
										"season",
										"sport_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.dates`",
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
						"name": "jerseyNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "person",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "position",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "teams",
						"type": "`$ARRAY`",
					},
				},
				"name": "team",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 119,
											"kind": "param",
											"name": "id",
											"orig": "team_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/teams/{teamId}/roster",
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
								"select": map[string]any{
									"$action": "roster",
									"exist": []any{
										"hydrate",
										"id",
										"season",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.roster`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 119,
											"kind": "param",
											"name": "id",
											"orig": "team_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/teams/{teamId}",
								"parts": []any{
									"teams",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"teamId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"hydrate",
										"id",
										"season",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
