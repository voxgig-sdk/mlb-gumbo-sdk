import { MlbGumboEntityBase } from '../MlbGumboEntityBase';
import type { MlbGumboSDK } from '../MlbGumboSDK';
import type { Control } from '../types';
import type { Team, TeamLoadMatch, TeamListMatch } from '../MlbGumboTypes';
declare class TeamEntity extends MlbGumboEntityBase<Team> {
    constructor(client: MlbGumboSDK, entopts: any);
    make(this: TeamEntity): TeamEntity;
    load(this: any, reqmatch?: TeamLoadMatch, ctrl?: Control): Promise<TeamEntity>;
    list(this: any, reqmatch?: TeamListMatch, ctrl?: Control): Promise<TeamEntity[]>;
}
export { TeamEntity };
