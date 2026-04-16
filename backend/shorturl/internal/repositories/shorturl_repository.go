package repositories

import (
	"github.com/fernandocruzcavina/shorturl/internal/models"
	"github.com/fernandocruzcavina/shorturl/pkg/database"
)

type ShorturlRepository interface {
	GetUrl(string) (*models.Shorturl, error) 
	CreateShorturl(models.Shorturl) (error)
}

type shorturlRepository struct {}

func NewShorturlRepository() ShorturlRepository {
	return shorturlRepository{}
}

func (st shorturlRepository) GetUrl(id string) (*models.Shorturl, error){
	session := database.GetDatabaseConnection()
	
	shorturl := &models.Shorturl{}

	err := session.Query(`SELECT id, url FROM shorturl WHERE id = ? LIMIT 1`, id).Scan(&shorturl.Id, &shorturl.Url)
	
	if err != nil {
		return nil, err
	}

	return shorturl, nil
}

func (st shorturlRepository) CreateShorturl(shorturl models.Shorturl) (error) {
	session := database.GetDatabaseConnection()

	err := session.Query(`INSERT INTO shorturl (id,url) VALUES (?,?)`, shorturl.Id, shorturl.Url).Exec()

	if err != nil {
		return err
	}

	return nil
}