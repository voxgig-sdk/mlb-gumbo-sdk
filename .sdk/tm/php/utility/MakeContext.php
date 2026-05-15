<?php
declare(strict_types=1);

// MlbGumbo SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MlbGumboMakeContext
{
    public static function call(array $ctxmap, ?MlbGumboContext $basectx): MlbGumboContext
    {
        return new MlbGumboContext($ctxmap, $basectx);
    }
}
