<?php
declare(strict_types=1);

// MlbGumbo SDK utility: result_body

class MlbGumboResultBody
{
    public static function call(MlbGumboContext $ctx): ?MlbGumboResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
