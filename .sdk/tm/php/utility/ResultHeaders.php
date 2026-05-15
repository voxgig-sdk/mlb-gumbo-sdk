<?php
declare(strict_types=1);

// MlbGumbo SDK utility: result_headers

class MlbGumboResultHeaders
{
    public static function call(MlbGumboContext $ctx): ?MlbGumboResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
