-- Typed models for the MlbGumbo SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GameData
---@field gameData? table
---@field liveData? table
---@field timestamps? table

---@class GameDataLoadMatch
---@field game_pk string

---@class GameDataListMatch
---@field game_pk string

---@class Player
---@field people? table

---@class PlayerLoadMatch
---@field player_id number

---@class Schedule
---@field date? string
---@field games? table

---@class ScheduleListMatch
---@field date? string
---@field games? table

---@class Team
---@field id? string
---@field jerseyNumber? string
---@field person? table
---@field position? table
---@field status? table
---@field teams? table

---@class TeamLoadMatch
---@field id number

---@class TeamListMatch
---@field id number

local M = {}

return M
