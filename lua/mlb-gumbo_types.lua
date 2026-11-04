-- Typed models for the MlbGumbo SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GameData
---@field gameData? table
---@field liveData? table
---@field timestamps? table

---@class GameDataLoadMatch
---@field game_pk string
---@field field? string
---@field hydrate? string
---@field timecode? string

---@class GameDataListMatch
---@field game_pk string

---@class Player
---@field batSide? table
---@field birthDate? string
---@field currentAge? number
---@field firstName? string
---@field fullName? string
---@field height? string
---@field id? number
---@field lastName? string
---@field pitchHand? table
---@field primaryNumber? string
---@field primaryPosition? table
---@field weight? number

---@class PlayerListMatch
---@field player_id number
---@field hydrate? string
---@field season? number

---@class Schedule
---@field date? string
---@field games? table

---@class ScheduleListMatch
---@field date? string
---@field game_type? string
---@field hydrate? string
---@field season? number
---@field sport_id? number

---@class Team
---@field abbreviation? string
---@field division? table
---@field id? number
---@field league? table
---@field locationName? string
---@field name? string
---@field teamName? string

---@class TeamListMatch
---@field team_id number
---@field hydrate? string
---@field season? number

local M = {}

return M
