export interface GameData {
    gameData?: Record<string, any>;
    liveData?: Record<string, any>;
    timestamps?: any[];
}
export interface GameDataLoadMatch {
    game_pk: string;
    field?: string;
    hydrate?: string;
    timecode?: string;
}
export interface GameDataListMatch {
    game_pk: string;
}
export interface Player {
    batSide?: Record<string, any>;
    birthDate?: string;
    currentAge?: number;
    firstName?: string;
    fullName?: string;
    height?: string;
    id?: number;
    lastName?: string;
    pitchHand?: Record<string, any>;
    primaryNumber?: string;
    primaryPosition?: Record<string, any>;
    weight?: number;
}
export interface PlayerListMatch {
    player_id: number;
    hydrate?: string;
    season?: number;
}
export interface Schedule {
    date?: string;
    games?: any[];
}
export interface ScheduleListMatch {
    date?: string;
    game_type?: string;
    hydrate?: string;
    season?: number;
    sport_id?: number;
}
export interface Team {
    abbreviation?: string;
    division?: Record<string, any>;
    id?: number;
    league?: Record<string, any>;
    locationName?: string;
    name?: string;
    teamName?: string;
}
export interface TeamListMatch {
    team_id: number;
    hydrate?: string;
    season?: number;
    $action?: string;
    [action: string]: any;
}
