# frozen_string_literal: true

# Typed models for the MlbGumbo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
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
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] hydrate
#   @return [String, nil]
#
# @!attribute [rw] timecode
#   @return [String, nil]
GameDataLoadMatch = Struct.new(
  :game_pk,
  :field,
  :hydrate,
  :timecode,
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
# @!attribute [rw] batSide
#   @return [Hash, nil]
#
# @!attribute [rw] birthDate
#   @return [String, nil]
#
# @!attribute [rw] currentAge
#   @return [Integer, nil]
#
# @!attribute [rw] firstName
#   @return [String, nil]
#
# @!attribute [rw] fullName
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastName
#   @return [String, nil]
#
# @!attribute [rw] pitchHand
#   @return [Hash, nil]
#
# @!attribute [rw] primaryNumber
#   @return [String, nil]
#
# @!attribute [rw] primaryPosition
#   @return [Hash, nil]
#
# @!attribute [rw] weight
#   @return [Integer, nil]
Player = Struct.new(
  :batSide,
  :birthDate,
  :currentAge,
  :firstName,
  :fullName,
  :height,
  :id,
  :lastName,
  :pitchHand,
  :primaryNumber,
  :primaryPosition,
  :weight,
  keyword_init: true
)

# Request payload for Player#list.
#
# @!attribute [rw] player_id
#   @return [Integer]
#
# @!attribute [rw] hydrate
#   @return [String, nil]
#
# @!attribute [rw] season
#   @return [Integer, nil]
PlayerListMatch = Struct.new(
  :player_id,
  :hydrate,
  :season,
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
# @!attribute [rw] game_type
#   @return [String, nil]
#
# @!attribute [rw] hydrate
#   @return [String, nil]
#
# @!attribute [rw] season
#   @return [Integer, nil]
#
# @!attribute [rw] sport_id
#   @return [Integer, nil]
ScheduleListMatch = Struct.new(
  :date,
  :game_type,
  :hydrate,
  :season,
  :sport_id,
  keyword_init: true
)

# Team entity data model.
#
# @!attribute [rw] abbreviation
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] league
#   @return [Hash, nil]
#
# @!attribute [rw] locationName
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] teamName
#   @return [String, nil]
Team = Struct.new(
  :abbreviation,
  :division,
  :id,
  :league,
  :locationName,
  :name,
  :teamName,
  keyword_init: true
)

# Request payload for Team#list.
#
# @!attribute [rw] team_id
#   @return [Integer]
#
# @!attribute [rw] hydrate
#   @return [String, nil]
#
# @!attribute [rw] season
#   @return [Integer, nil]
TeamListMatch = Struct.new(
  :team_id,
  :hydrate,
  :season,
  keyword_init: true
)

