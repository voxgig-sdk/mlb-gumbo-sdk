# frozen_string_literal: true

# Typed models for the MlbGumbo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GameData entity data model.
#
# @!attribute [rw] game_data
#   @return [Hash, nil]
#
# @!attribute [rw] live_data
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [Array, nil]
GameData = Struct.new(
  :game_data,
  :live_data,
  :timestamp,
  keyword_init: true
)

# Request payload for GameData#load.
#
# @!attribute [rw] game_pk
#   @return [String]
GameDataLoadMatch = Struct.new(
  :game_pk,
  keyword_init: true
)

# Request payload for GameData#list.
#
# @!attribute [rw] game_pk
#   @return [String]
GameDataListMatch = Struct.new(
  :game_pk,
  keyword_init: true
)

# Player entity data model.
#
# @!attribute [rw] person
#   @return [Array, nil]
Player = Struct.new(
  :person,
  keyword_init: true
)

# Request payload for Player#load.
#
# @!attribute [rw] player_id
#   @return [Integer]
PlayerLoadMatch = Struct.new(
  :player_id,
  keyword_init: true
)

# Schedule entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] game
#   @return [Array, nil]
Schedule = Struct.new(
  :date,
  :game,
  keyword_init: true
)

# Match filter for Schedule#list (any subset of Schedule fields).
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] game
#   @return [Array, nil]
ScheduleListMatch = Struct.new(
  :date,
  :game,
  keyword_init: true
)

# Team entity data model.
#
# @!attribute [rw] jersey_number
#   @return [String, nil]
#
# @!attribute [rw] person
#   @return [Hash, nil]
#
# @!attribute [rw] position
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] team
#   @return [Array, nil]
Team = Struct.new(
  :jersey_number,
  :person,
  :position,
  :status,
  :team,
  keyword_init: true
)

# Request payload for Team#load.
#
# @!attribute [rw] id
#   @return [Integer]
TeamLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Team#list.
#
# @!attribute [rw] id
#   @return [Integer]
TeamListMatch = Struct.new(
  :id,
  keyword_init: true
)

