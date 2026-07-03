package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MlbGumbo",
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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"active": true,
						"name": "game_data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "live_data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "timestamp",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 2,
					},
				},
				"name": "game_data",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "716463",
											"kind": "param",
											"name": "game_pk",
											"orig": "game_pk",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
											"active": true,
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "stats,team",
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "20240315_123456",
											"kind": "query",
											"name": "timecode",
											"orig": "timecode",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "person",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
				},
				"name": "player",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
											"active": true,
											"example": "stats,currentTeam",
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "date",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "game",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 1,
					},
				},
				"name": "schedule",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "03/15/2024",
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "R",
											"kind": "query",
											"name": "game_type",
											"orig": "game_type",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 1,
											"kind": "query",
											"name": "sport_id",
											"orig": "sport_id",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"team": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "jersey_number",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "person",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "position",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "team",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 4,
					},
				},
				"name": "team",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
											"active": true,
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
											"active": true,
											"kind": "query",
											"name": "hydrate",
											"orig": "hydrate",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 2024,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
