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
# @!attribute [rw] gameData
#   @return [Hash, nil]
#
# @!attribute [rw] liveData
#   @return [Hash, nil]
#
# @!attribute [rw] timestamps
#   @return [Array, nil]
GameData = Struct.new(
  :gameData,
  :liveData,
  :timestamps,
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
# @!attribute [rw] people
#   @return [Array, nil]
Player = Struct.new(
  :people,
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
# @!attribute [rw] games
#   @return [Array, nil]
Schedule = Struct.new(
  :date,
  :games,
  keyword_init: true
)

# Request payload for Schedule#list.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] games
#   @return [Array, nil]
ScheduleListMatch = Struct.new(
  :date,
  :games,
  keyword_init: true
)

# Team entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] jerseyNumber
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
# @!attribute [rw] teams
#   @return [Array, nil]
Team = Struct.new(
  :id,
  :jerseyNumber,
  :person,
  :position,
  :status,
  :teams,
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

