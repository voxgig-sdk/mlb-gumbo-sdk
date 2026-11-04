// Typed models for the MlbGumbo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GameData {
  gameData?: Record<string, any>
  liveData?: Record<string, any>
  timestamps?: any[]
}

export interface GameDataLoadMatch {
  game_pk: string
  field?: string
  hydrate?: string
  timecode?: string
}

export interface GameDataListMatch {
  game_pk: string
}

export interface Player {
  batSide?: Record<string, any>
  birthDate?: string
  currentAge?: number
  firstName?: string
  fullName?: string
  height?: string
  id?: number
  lastName?: string
  pitchHand?: Record<string, any>
  primaryNumber?: string
  primaryPosition?: Record<string, any>
  weight?: number
}

export interface PlayerListMatch {
  player_id: number
  hydrate?: string
  season?: number
}

export interface Schedule {
  date?: string
  games?: any[]
}

export interface ScheduleListMatch {
  date?: string
  game_type?: string
  hydrate?: string
  season?: number
  sport_id?: number
}

export interface Team {
  abbreviation?: string
  division?: Record<string, any>
  id?: number
  league?: Record<string, any>
  locationName?: string
  name?: string
  teamName?: string
}

export interface TeamListMatch {
  team_id: number
  hydrate?: string
  season?: number

  // Selects a custom action instead of the plain list:
  //   'roster'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

