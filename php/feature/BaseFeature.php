<?php
declare(strict_types=1);

// MlbGumbo SDK base feature

class MlbGumboBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MlbGumboContext $ctx, array $options): void {}
    public function PostConstruct(MlbGumboContext $ctx): void {}
    public function PostConstructEntity(MlbGumboContext $ctx): void {}
    public function SetData(MlbGumboContext $ctx): void {}
    public function GetData(MlbGumboContext $ctx): void {}
    public function GetMatch(MlbGumboContext $ctx): void {}
    public function SetMatch(MlbGumboContext $ctx): void {}
    public function PrePoint(MlbGumboContext $ctx): void {}
    public function PreSpec(MlbGumboContext $ctx): void {}
    public function PreRequest(MlbGumboContext $ctx): void {}
    public function PreResponse(MlbGumboContext $ctx): void {}
    public function PreResult(MlbGumboContext $ctx): void {}
    public function PreDone(MlbGumboContext $ctx): void {}
    public function PreUnexpected(MlbGumboContext $ctx): void {}
}
