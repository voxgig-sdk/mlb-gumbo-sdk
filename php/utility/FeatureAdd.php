<?php
declare(strict_types=1);

// MlbGumbo SDK utility: feature_add

class MlbGumboFeatureAdd
{
    public static function call(MlbGumboContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
