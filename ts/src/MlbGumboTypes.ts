// Typed models for the MlbGumbo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GameData {
  gameData?: Record<string, any>
  liveData?: Record<string, any>
  timestamps?: any[]
}

export interface GameDataLoadMatch {
  game_pk: string
}

export interface GameDataListMatch {
  game_pk: string
}

export interface Player {
  people?: any[]
}

export interface PlayerLoadMatch {
  player_id: number
}

export interface Schedule {
  date?: string
  games?: any[]
}

export interface ScheduleListMatch {
  date?: string
  games?: any[]
}

export interface Team {
  id?: string
  jerseyNumber?: string
  person?: Record<string, any>
  position?: Record<string, any>
  status?: Record<string, any>
  teams?: any[]
}

export interface TeamLoadMatch {
  id: number
}

export interface TeamListMatch {
  id: number

  // Selects a custom action instead of the plain list:
  //   'roster'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

