import { MlbGumboEntityBase } from '../MlbGumboEntityBase';
import type { MlbGumboSDK } from '../MlbGumboSDK';
import type { Control } from '../types';
import type { Player, PlayerLoadMatch } from '../MlbGumboTypes';
declare class PlayerEntity extends MlbGumboEntityBase<Player> {
    constructor(client: MlbGumboSDK, entopts: any);
    make(this: PlayerEntity): PlayerEntity;
    load(this: any, reqmatch?: PlayerLoadMatch, ctrl?: Control): Promise<PlayerEntity>;
}
export { PlayerEntity };
