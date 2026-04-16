package handlers

import (
	"net/http"

	"github.com/fernandocruzcavina/shorturl/internal/services"
	"github.com/gin-gonic/gin"
)

type ShorturlHandler interface {
	GetUrl(*gin.Context)
	CreateShorturl(*gin.Context)
}

type shorturlHandler struct {
	shorturlService services.ShorturlService
}

func NewShorturlHandler(shorturlService services.ShorturlService) ShorturlHandler {
	return &shorturlHandler{
		shorturlService: shorturlService,
	}
}

type CreateShorturlRequest struct {
	URL string `json:"url"`
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

func (serv *shorturlHandler) CreateShorturl(ctx *gin.Context) {
	var url CreateShorturlRequest
	err := ctx.BindJSON(&url)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "waited object format {url: 'https://example.com/'}")
		return
	}

	shorturl, err := serv.shorturlService.CreateShorturl(url.URL) 

	if err != nil {
		ctx.JSON(http.StatusBadGateway, "System error")
		return
	}

	ctx.JSON(http.StatusCreated, shorturl)
}