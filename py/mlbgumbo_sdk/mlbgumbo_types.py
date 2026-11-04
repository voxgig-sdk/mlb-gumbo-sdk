# Typed models for the MlbGumbo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GameData(TypedDict, total=False):
    gameData: dict
    liveData: dict
    timestamps: list


class GameDataLoadMatchRequired(TypedDict):
    game_pk: str


class GameDataLoadMatch(GameDataLoadMatchRequired, total=False):
    field: str
    hydrate: str
    timecode: str


class GameDataListMatch(TypedDict):
    game_pk: str


class Player(TypedDict, total=False):
    batSide: dict
    birthDate: str
    currentAge: int
    firstName: str
    fullName: str
    height: str
    id: int
    lastName: str
    pitchHand: dict
    primaryNumber: str
    primaryPosition: dict
    weight: int


class PlayerListMatchRequired(TypedDict):
    player_id: int


class PlayerListMatch(PlayerListMatchRequired, total=False):
    hydrate: str
    season: int


class Schedule(TypedDict, total=False):
    date: str
    games: list


class ScheduleListMatch(TypedDict, total=False):
    date: str
    game_type: str
    hydrate: str
    season: int
    sport_id: int


class Team(TypedDict, total=False):
    abbreviation: str
    division: dict
    id: int
    league: dict
    locationName: str
    name: str
    teamName: str


class TeamListMatchRequired(TypedDict):
    team_id: int


class TeamListMatch(TeamListMatchRequired, total=False):
    hydrate: str
    season: int
