import { Context } from './Context';
declare class MlbGumboError extends Error {
    isMlbGumboError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MlbGumboError };
