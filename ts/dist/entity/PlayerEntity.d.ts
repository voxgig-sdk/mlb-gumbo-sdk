import { MlbGumboEntityBase } from '../MlbGumboEntityBase';
import type { MlbGumboSDK } from '../MlbGumboSDK';
import type { Control } from '../types';
import type { Player, PlayerListMatch } from '../MlbGumboTypes';
declare class PlayerEntity extends MlbGumboEntityBase<Player> {
    constructor(client: MlbGumboSDK, entopts: any);
    make(this: PlayerEntity): PlayerEntity;
    list(this: any, reqmatch?: PlayerListMatch, ctrl?: Control): Promise<PlayerEntity[]>;
}
export { PlayerEntity };
