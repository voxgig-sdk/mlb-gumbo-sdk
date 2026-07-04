-- Typed models for the MlbGumbo SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GameData
---@field game_data? table
---@field live_data? table
---@field timestamp? table

---@class GameDataLoadMatch
---@field game_pk string

---@class GameDataListMatch
---@field game_pk string

---@class Player
---@field person? table

---@class PlayerLoadMatch
---@field player_id number

---@class Schedule
---@field date? string
---@field game? table

---@class ScheduleListMatch

---@class Team
---@field jersey_number? string
---@field person? table
---@field position? table
---@field status? table
---@field team? table

---@class TeamLoadMatch
---@field id number

---@class TeamListMatch
---@field id number

local M = {}

return M
