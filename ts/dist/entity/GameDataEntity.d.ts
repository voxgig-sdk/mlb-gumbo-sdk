import { MlbGumboEntityBase } from '../MlbGumboEntityBase';
import type { MlbGumboSDK } from '../MlbGumboSDK';
import type { Control } from '../types';
import type { GameData, GameDataLoadMatch, GameDataListMatch } from '../MlbGumboTypes';
declare class GameDataEntity extends MlbGumboEntityBase<GameData> {
    constructor(client: MlbGumboSDK, entopts: any);
    make(this: GameDataEntity): GameDataEntity;
    load(this: any, reqmatch?: GameDataLoadMatch, ctrl?: Control): Promise<GameDataEntity>;
    list(this: any, reqmatch?: GameDataListMatch, ctrl?: Control): Promise<GameDataEntity[]>;
}
export { GameDataEntity };
