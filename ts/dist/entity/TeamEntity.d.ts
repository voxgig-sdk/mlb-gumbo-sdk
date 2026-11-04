import { MlbGumboEntityBase } from '../MlbGumboEntityBase';
import type { MlbGumboSDK } from '../MlbGumboSDK';
import type { Control } from '../types';
import type { Team, TeamListMatch } from '../MlbGumboTypes';
declare class TeamEntity extends MlbGumboEntityBase<Team> {
    constructor(client: MlbGumboSDK, entopts: any);
    make(this: TeamEntity): TeamEntity;
    list(this: any, reqmatch?: TeamListMatch, ctrl?: Control): Promise<TeamEntity[]>;
}
export { TeamEntity };
