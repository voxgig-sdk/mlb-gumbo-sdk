// Typed models for the MlbGumbo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GameData is the typed data model for the game_data entity.
type GameData struct {
	GameData *map[string]any `json:"game_data,omitempty"`
	LiveData *map[string]any `json:"live_data,omitempty"`
	Timestamp *[]any `json:"timestamp,omitempty"`
}

// GameDataLoadMatch is the typed request payload for GameData.LoadTyped.
type GameDataLoadMatch struct {
	GamePk string `json:"game_pk"`
}

// GameDataListMatch is the typed request payload for GameData.ListTyped.
type GameDataListMatch struct {
	GamePk string `json:"game_pk"`
}

// Player is the typed data model for the player entity.
type Player struct {
	Person *[]any `json:"person,omitempty"`
}

// PlayerLoadMatch is the typed request payload for Player.LoadTyped.
type PlayerLoadMatch struct {
	PlayerId int `json:"player_id"`
}

// Schedule is the typed data model for the schedule entity.
type Schedule struct {
	Date *string `json:"date,omitempty"`
	Game *[]any `json:"game,omitempty"`
}

// ScheduleListMatch mirrors the schedule fields as an all-optional match
// filter (Go analog of Partial<Schedule>).
type ScheduleListMatch struct {
	Date *string `json:"date,omitempty"`
	Game *[]any `json:"game,omitempty"`
}

// Team is the typed data model for the team entity.
type Team struct {
	JerseyNumber *string `json:"jersey_number,omitempty"`
	Person *map[string]any `json:"person,omitempty"`
	Position *map[string]any `json:"position,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Team *[]any `json:"team,omitempty"`
}

// TeamLoadMatch is the typed request payload for Team.LoadTyped.
type TeamLoadMatch struct {
	Id int `json:"id"`
}

// TeamListMatch is the typed request payload for Team.ListTyped.
type TeamListMatch struct {
	Id int `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
