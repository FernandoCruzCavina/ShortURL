package services

import (
	"crypto/sha256"
	"sort"
	"sync"
	"github.com/fernandocruzcavina/shorturl/internal/models"
	"github.com/fernandocruzcavina/shorturl/internal/repositories"
)

var (
	mutex sync.RWMutex
	idSeq = 62000
	key   = "secretKey"
)

type ShorturlService interface {
	GetUrl(string) (*string, error)
	CreateShorturl(string) (*models.Shorturl, error)
}

type shorturlService struct {
	shorturlRepository repositories.ShorturlRepository
}

func NewShorturlService(shorturlRepository repositories.ShorturlRepository) ShorturlService {
	return &shorturlService {
		shorturlRepository: shorturlRepository,
	}
}

func (repo *shorturlService)CreateShorturl(url string) (*models.Shorturl, error){
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

func decodeBase62(str string, alphabet string) int {
	base := len(alphabet)
	index := make(map[rune]int)

	for i, c := range alphabet {
		index[c] = i
	}

	num := 0
	for _, c := range str {
		num = num*base + index[c]
	}

	return num
}