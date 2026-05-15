package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGameDataEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntity

var NewPlayerEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntity

var NewScheduleEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntity

var NewTeamEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntity

