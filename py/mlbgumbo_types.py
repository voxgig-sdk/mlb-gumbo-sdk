# Typed models for the MlbGumbo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GameData:
    game_data: Optional[dict] = None
    live_data: Optional[dict] = None
    timestamp: Optional[list] = None


@dataclass
class GameDataLoadMatch:
    game_pk: str


@dataclass
class GameDataListMatch:
    game_pk: str


@dataclass
class Player:
    person: Optional[list] = None


@dataclass
class PlayerLoadMatch:
    player_id: int


@dataclass
class Schedule:
    date: Optional[str] = None
    game: Optional[list] = None


@dataclass
class ScheduleListMatch:
    date: Optional[str] = None
    game: Optional[list] = None


@dataclass
class Team:
    jersey_number: Optional[str] = None
    person: Optional[dict] = None
    position: Optional[dict] = None
    status: Optional[dict] = None
    team: Optional[list] = None


@dataclass
class TeamLoadMatch:
    id: int


@dataclass
class TeamListMatch:
    id: int

