package services

import (
	"crypto/sha256"
	"os"
	"sort"
	"sync"
	"github.com/fernandocruzcavina/shorturl/internal/models"
	"github.com/fernandocruzcavina/shorturl/internal/repositories"
)

var (
	mutex sync.RWMutex
	idSeq = 62000
	key   = os.Getenv("secret_key")
)

type ShorturlService interface {
	GetUrl(string) (*string, error)
	CreateShortUrl(string) (*models.Shorturl, error)
	UpdateShortUrl(models.Shorturl) (*models.Shorturl, error)
	DeleteShortUrl(string) (error)
}

type shorturlService struct {
	shorturlRepository repositories.ShorturlRepository
}

func NewShorturlService(shorturlRepository repositories.ShorturlRepository) ShorturlService {
	return &shorturlService {
		shorturlRepository: shorturlRepository,
	}
}

func (repo *shorturlService)CreateShortUrl(url string) (*models.Shorturl, error){
	mutex.Lock()
	id := idSeq
	idSeq++
	mutex.Unlock()

	alphabet := generateAlphabet(key)
	code := encodeBase62(id, alphabet)

	shorturl := models.Shorturl {
		Id: code,
		Url: url,
	}

	err := repo.shorturlRepository.CreateShorturl(shorturl)
	
	if err != nil {
		return nil, err
	}

	return &shorturl, nil
}

func (repo *shorturlService) GetUrl(id string) (*string, error){
	shorturl, err := repo.shorturlRepository.GetUrl(id)
	
	if err != nil {
		return nil, err
	}
	
	return &shorturl.Url, nil
}

func (repo *shorturlService) UpdateShortUrl(shorturl models.Shorturl) (*models.Shorturl, error){
	_, err := repo.shorturlRepository.GetUrl(shorturl.Id)
	if err != nil {
		return nil, err
	}

	err = repo.shorturlRepository.UpdateShortUrl(shorturl)

	if err != nil {
		return nil, err
	}

	return &shorturl, nil
}

func (repo *shorturlService) DeleteShortUrl(id string) (error) {
	_, err := repo.shorturlRepository.GetUrl(id)
	if err != nil {
		return err
	}

	err = repo.shorturlRepository.DeleteShortUrl(id)
	if err != nil {
		return err
	}

	return nil
}

const base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func generateAlphabet(key string) string {
	hash := sha256.Sum256([]byte(key))

	type pair struct {
		char rune
		val  byte
	}

	pairs := make([]pair, len(base62))

	for i, c := range base62 {
		pairs[i] = pair{c, hash[i%len(hash)]}
	}

	sort.SliceStable(pairs, func(i, j int) bool {
		return pairs[i].val < pairs[j].val
	})

	result := make([]rune, len(base62))
	for i, p := range pairs {
		result[i] = p.char
	}

	return string(result)
}

func encodeBase62(num int, alphabet string) string {
	if num == 0 {
		return string(alphabet[0])
	}

	result := ""
	base := len(alphabet)

	for num > 0 {
		result = string(alphabet[num%base]) + result
		num /= base
	}

	return result
}