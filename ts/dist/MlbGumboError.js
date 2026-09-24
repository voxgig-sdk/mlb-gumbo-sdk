"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MlbGumboError = void 0;
class MlbGumboError extends Error {
    isMlbGumboError = true;
    sdk = 'MlbGumbo';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MlbGumboError = MlbGumboError;
//# sourceMappingURL=MlbGumboError.js.map