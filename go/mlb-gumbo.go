package voxgigmlbgumbosdk

import (
	"github.com/voxgig-sdk/mlb-gumbo-sdk/core"
	"github.com/voxgig-sdk/mlb-gumbo-sdk/entity"
	"github.com/voxgig-sdk/mlb-gumbo-sdk/feature"
	_ "github.com/voxgig-sdk/mlb-gumbo-sdk/utility"
)

// Type aliases preserve external API.
type MlbGumboSDK = core.MlbGumboSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MlbGumboEntity = core.MlbGumboEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MlbGumboError = core.MlbGumboError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGameDataEntityFunc = func(client *core.MlbGumboSDK, entopts map[string]any) core.MlbGumboEntity {
		return entity.NewGameDataEntity(client, entopts)
	}
	core.NewPlayerEntityFunc = func(client *core.MlbGumboSDK, entopts map[string]any) core.MlbGumboEntity {
		return entity.NewPlayerEntity(client, entopts)
	}
	core.NewScheduleEntityFunc = func(client *core.MlbGumboSDK, entopts map[string]any) core.MlbGumboEntity {
		return entity.NewScheduleEntity(client, entopts)
	}
	core.NewTeamEntityFunc = func(client *core.MlbGumboSDK, entopts map[string]any) core.MlbGumboEntity {
		return entity.NewTeamEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMlbGumboSDK = core.NewMlbGumboSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
