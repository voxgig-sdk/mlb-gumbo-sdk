<?php
declare(strict_types=1);

// MlbGumbo SDK utility: prepare_body

class MlbGumboPrepareBody
{
    public static function call(MlbGumboContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
