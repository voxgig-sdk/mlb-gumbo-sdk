// Typed models for the MlbGumbo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/mlb-gumbo-sdk/go/core"
)

// GameData is the typed data model for the game_data entity.
type GameData struct {
	GameData *map[string]any `json:"gameData,omitempty"`
	LiveData *map[string]any `json:"liveData,omitempty"`
	Timestamps *[]any `json:"timestamps,omitempty"`
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
	People *[]any `json:"people,omitempty"`
}

// PlayerLoadMatch is the typed request payload for Player.LoadTyped.
type PlayerLoadMatch struct {
	PlayerId int `json:"player_id"`
}

// Schedule is the typed data model for the schedule entity.
type Schedule struct {
	Date *string `json:"date,omitempty"`
	Games *[]any `json:"games,omitempty"`
}

// ScheduleListMatch is the typed request payload for Schedule.ListTyped.
type ScheduleListMatch struct {
	Date *string `json:"date,omitempty"`
	Games *[]any `json:"games,omitempty"`
}

// Team is the typed data model for the team entity.
type Team struct {
	JerseyNumber *string `json:"jerseyNumber,omitempty"`
	Person *map[string]any `json:"person,omitempty"`
	Position *map[string]any `json:"position,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Teams *[]any `json:"teams,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
