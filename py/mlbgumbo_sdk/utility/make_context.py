# MlbGumbo SDK utility: make_context

from mlbgumbo_sdk.core.context import MlbGumboContext


def make_context_util(ctxmap, basectx):
    return MlbGumboContext(ctxmap, basectx)
