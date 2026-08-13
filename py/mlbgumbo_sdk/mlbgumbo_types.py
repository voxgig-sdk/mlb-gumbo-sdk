# Typed models for the MlbGumbo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
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


class GameDataLoadMatch(TypedDict):
    game_pk: str


class GameDataListMatch(TypedDict):
    game_pk: str


class Player(TypedDict, total=False):
    people: list


class PlayerLoadMatch(TypedDict):
    player_id: int


class Schedule(TypedDict, total=False):
    date: str
    games: list


class ScheduleListMatch(TypedDict, total=False):
    date: str
    games: list


class Team(TypedDict, total=False):
    jerseyNumber: str
    person: dict
    position: dict
    status: dict
    teams: list


class TeamLoadMatch(TypedDict):
    id: int


class TeamListMatch(TypedDict):
    id: int
