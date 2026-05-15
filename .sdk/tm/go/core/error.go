package core

type MlbGumboError struct {
	IsMlbGumboError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMlbGumboError(code string, msg string, ctx *Context) *MlbGumboError {
	return &MlbGumboError{
		IsMlbGumboError: true,
		Sdk:              "MlbGumbo",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MlbGumboError) Error() string {
	return e.Msg
}
