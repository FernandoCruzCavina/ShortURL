package handlers

import (
	"net/http"

	"github.com/fernandocruzcavina/shorturl/internal/dto"
	"github.com/fernandocruzcavina/shorturl/internal/models"
	"github.com/fernandocruzcavina/shorturl/internal/services"
	"github.com/gin-gonic/gin"
)

type ShorturlHandler interface {
	GetUrl(*gin.Context)
	CreateShorturl(*gin.Context)
	UpdateShortUrl(*gin.Context)
	DeleteShortUrl(*gin.Context)
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

func (serv *shorturlHandler) CreateShorturl(ctx *gin.Context) {
	var url dto.CreateShorturlRequest
	err := ctx.BindJSON(&url)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "expected object format {url: 'https://example.com/'}")
		return
	}

	shorturl, err := serv.shorturlService.CreateShortUrl(url.URL) 

	if err != nil {
		ctx.JSON(http.StatusForbidden, "System error")
		return
	}

	ctx.JSON(http.StatusCreated, shorturl)
}

func (serv *shorturlHandler) UpdateShortUrl(ctx *gin.Context) {
	var shorturl models.Shorturl
	err := ctx.BindJSON(&shorturl)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, "expected object format { id: 'code', url: 'link' }")
	}

	updatedShorturl, err := serv.shorturlService.UpdateShortUrl(shorturl)

	if err != nil {
		ctx.JSON(http.StatusForbidden, "system error")
	}

	ctx.JSON(http.StatusAccepted, updatedShorturl)
}

func (serv *shorturlHandler) DeleteShortUrl(ctx *gin.Context) {
	id, isGetId := ctx.Params.Get("id")
	if !isGetId {
		ctx.JSON(http.StatusBadRequest, "the id wasn't retrivied")
	}

	err := serv.shorturlService.DeleteShortUrl(id)

	if err != nil {
		ctx.JSON(http.StatusForbidden, "system error")
	}

	ctx.JSON(http.StatusOK, "the shorturl with id = " + id + " was deleted")
}