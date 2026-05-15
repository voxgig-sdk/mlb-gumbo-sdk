<?php
declare(strict_types=1);

// MlbGumbo SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MlbGumboFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MlbGumboBaseFeature();
            case "test":
                return new MlbGumboTestFeature();
            default:
                return new MlbGumboBaseFeature();
        }
    }
}
