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
    people?: any[];
}
export interface PlayerLoadMatch {
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
    id?: string;
    teams?: any[];
}
export interface TeamLoadMatch {
    id: number;
    hydrate?: string;
    season?: number;
}
export interface TeamListMatch {
    id: number;
    hydrate?: string;
    season?: number;
    $action?: string;
    [action: string]: any;
}
