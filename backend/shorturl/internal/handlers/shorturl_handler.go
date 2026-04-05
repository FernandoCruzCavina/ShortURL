package handlers

import (
	"net/http"

	"github.com/fernandocruzcavina/shorturl/internal/services"
	"github.com/gin-gonic/gin"
)

type ShorturlHandler interface {
	GetUrl(*gin.Context)
}

type shorturlHandler struct {
	shorturlService services.ShorturlService
}

func NewShorturlHandler(shorturlService services.ShorturlService) ShorturlHandler {
	return &shorturlHandler{
		shorturlService: shorturlService,
	}
}

func (serv shorturlHandler) GetUrl(ctx *gin.Context)  {
	id, isGetID := ctx.Params.Get("id")

	if !isGetID {
		ctx.JSON(http.StatusBadRequest, "don't exist this id")
	}

	url, err := serv.shorturlService.GetUrl(id)
	
	if err != nil {
		ctx.Errors.JSON()
	}

	ctx.JSON(http.StatusOK, url)
}