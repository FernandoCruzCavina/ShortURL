package services

import (
	"github.com/fernandocruzcavina/shorturl/internal/repositories"
)

type ShorturlService interface {
	GetUrl(string) (*string, error)
}

type shorturlService struct {
	shorturlRepository repositories.ShorturlRepository
}

func NewShorturlService(shorturlRepository repositories.ShorturlRepository) ShorturlService {
	return &shorturlService {
		shorturlRepository: shorturlRepository,
	}
}

func CreateShorturl(url string) {

}

func (repo *shorturlService) GetUrl(id string) (*string, error){
	shorturl, err := repo.shorturlRepository.GetUrl(id)
	
	if err != nil {
		return nil, err
	}
	
	return &shorturl.Url, nil
}

func generateBase62(word string) {
	
}