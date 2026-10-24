package core

import "encoding/json"

type MlbGumboError struct {
	IsMlbGumboError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
	// The HTTP status, -1 when there was no response.
	Status int
}

func NewMlbGumboError(code string, msg string, ctx *Context) *MlbGumboError {
	return &MlbGumboError{
		IsMlbGumboError: true,
		Sdk:                "MlbGumbo",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
		Status:             -1,
	}
}

func (e *MlbGumboError) NotFound() bool {
	return 404 == e.Status
}

func (e *MlbGumboError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *MlbGumboError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"status":  e.Status,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *MlbGumboError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
