
import { Context } from './Context'


class MlbGumboError extends Error {

  isMlbGumboError = true

  sdk = 'MlbGumbo'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MlbGumboError
}

