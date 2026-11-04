<?php
declare(strict_types=1);

// Typed models for the MlbGumbo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GameData entity data model. */
class GameData
{
    public ?array $gameData = null;
    public ?array $liveData = null;
    public ?array $timestamps = null;
}

/** Request payload for GameData#load. */
class GameDataLoadMatch
{
    public string $game_pk;
    public ?string $field = null;
    public ?string $hydrate = null;
    public ?string $timecode = null;
}

/** Request payload for GameData#list. */
class GameDataListMatch
{
    public string $game_pk;
}

/** Player entity data model. */
class Player
{
    public ?array $batSide = null;
    public ?string $birthDate = null;
    public ?int $currentAge = null;
    public ?string $firstName = null;
    public ?string $fullName = null;
    public ?string $height = null;
    public ?int $id = null;
    public ?string $lastName = null;
    public ?array $pitchHand = null;
    public ?string $primaryNumber = null;
    public ?array $primaryPosition = null;
    public ?int $weight = null;
}

/** Request payload for Player#list. */
class PlayerListMatch
{
    public int $player_id;
    public ?string $hydrate = null;
    public ?int $season = null;
}

/** Schedule entity data model. */
class Schedule
{
    public ?string $date = null;
    public ?array $games = null;
}

/** Request payload for Schedule#list. */
class ScheduleListMatch
{
    public ?string $date = null;
    public ?string $game_type = null;
    public ?string $hydrate = null;
    public ?int $season = null;
    public ?int $sport_id = null;
}

/** Team entity data model. */
class Team
{
    public ?string $abbreviation = null;
    public ?array $division = null;
    public ?int $id = null;
    public ?array $league = null;
    public ?string $locationName = null;
    public ?string $name = null;
    public ?string $teamName = null;
}

/** Request payload for Team#list. */
class TeamListMatch
{
    public int $team_id;
    public ?string $hydrate = null;
    public ?int $season = null;
}

