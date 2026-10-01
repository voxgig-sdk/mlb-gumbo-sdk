import { GameDataEntity } from './entity/GameDataEntity';
import { PlayerEntity } from './entity/PlayerEntity';
import { ScheduleEntity } from './entity/ScheduleEntity';
import { TeamEntity } from './entity/TeamEntity';
export type * from './MlbGumboTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MlbGumboEntityBase } from './MlbGumboEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MlbGumboSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GameData(entopts?: Record<string, any>): GameDataEntity;
    Player(entopts?: Record<string, any>): PlayerEntity;
    Schedule(entopts?: Record<string, any>): ScheduleEntity;
    Team(entopts?: Record<string, any>): TeamEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MlbGumboSDK;
    tester(testopts?: any, sdkopts?: any): MlbGumboSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MlbGumboSDK;
export { stdutil, config, BaseFeature, MlbGumboEntityBase, MlbGumboSDK, SDK, };
