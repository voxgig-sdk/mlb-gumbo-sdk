<?php
declare(strict_types=1);

// Typed models for the MlbGumbo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GameData entity data model. */
class GameData
{
    public ?array $game_data = null;
    public ?array $live_data = null;
    public ?array $timestamp = null;
}

/** Request payload for GameData#load. */
class GameDataLoadMatch
{
    public string $game_pk;
}

/** Request payload for GameData#list. */
class GameDataListMatch
{
    public string $game_pk;
}

/** Player entity data model. */
class Player
{
    public ?array $person = null;
}

/** Request payload for Player#load. */
class PlayerLoadMatch
{
    public int $player_id;
}

/** Schedule entity data model. */
class Schedule
{
    public ?string $date = null;
    public ?array $game = null;
}

/** Match filter for Schedule#list (any subset of Schedule fields). */
class ScheduleListMatch
{
    public ?string $date = null;
    public ?array $game = null;
}

/** Team entity data model. */
class Team
{
    public ?string $jersey_number = null;
    public ?array $person = null;
    public ?array $position = null;
    public ?array $status = null;
    public ?array $team = null;
}

/** Request payload for Team#load. */
class TeamLoadMatch
{
    public int $id;
}

/** Request payload for Team#list. */
class TeamListMatch
{
    public int $id;
}

