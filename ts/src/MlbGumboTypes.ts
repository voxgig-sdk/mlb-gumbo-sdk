// Typed models for the MlbGumbo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GameData {
  game_data?: Record<string, any>
  live_data?: Record<string, any>
  timestamp?: any[]
}

export interface GameDataLoadMatch {
  game_pk: string
}

export interface GameDataListMatch {
  game_pk: string
}

export interface Player {
  person?: any[]
}

export interface PlayerLoadMatch {
  player_id: number
}

export interface Schedule {
  date?: string
  game?: any[]
}

export type ScheduleListMatch = Partial<Schedule>

export interface Team {
  jersey_number?: string
  person?: Record<string, any>
  position?: Record<string, any>
  status?: Record<string, any>
  team?: any[]
}

export interface TeamLoadMatch {
  id: number
}

export interface TeamListMatch {
  id: number
}

