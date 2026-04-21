package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/fernandocruzcavina/shorturl/internal/repositories"
	"github.com/fernandocruzcavina/shorturl/internal/services"
	"github.com/fernandocruzcavina/shorturl/internal/handlers"
)

func InitRoutes() {
	r := gin.Default()

	repo := repositories.NewShorturlRepository()
	serv := services.NewShorturlService(repo)
	hand := handlers.NewShorturlHandler(serv)

	r.GET("/:id", hand.GetUrl)
	r.POST("/", hand.CreateShorturl)
	r.PUT("/", hand.UpdateShortUrl)
	r.DELETE("/:id", hand.DeleteShortUrl)
	//r.SetTrustedProxies([]string{"192.168.1.2"})
	r.Run(":9000")
}