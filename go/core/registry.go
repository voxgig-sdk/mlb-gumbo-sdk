package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGameDataEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntityBase

var NewPlayerEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntityBase

var NewScheduleEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntityBase

var NewTeamEntityFunc func(client *MlbGumboSDK, entopts map[string]any) MlbGumboEntityBase

