package database

import (
	"log"

	gocql "github.com/apache/cassandra-gocql-driver/v2"
)

var cluster *gocql.ClusterConfig
var session *gocql.Session

func configCassandra() (*gocql.Session, error ) {
	cluster = gocql.NewCluster("127.0.0.1")
	cluster.Keyspace = "shorturl"
	cluster.Consistency = gocql.One

	return cluster.CreateSession()
}

func InitCassandraDB() {
	var err error
	session, err = configCassandra()

	if err != nil {
		log.Println(err)
	}

	createKeyspace(session)
	createShorturlTable(session)
}

func GetDatabaseConnection() (*gocql.Session) {
	if session == nil {
		InitCassandraDB()
	}
	
	return session
}

func createKeyspace(session *gocql.Session) {
	log.Println("Create shorturl keyspace......")
	
	if err := session.Query(`
		CREATE KEYSPACE IF NOT EXISTS shorturl WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };
	`).Exec(); err != nil {
		log.Println(err)
	}

	log.Println("Create shorturl keyspace with successfull!")
}

func createShorturlTable(session *gocql.Session) {
	log.Println("Create shorturl table......")
	
	if err := session.Query(`
	CREATE TABLE IF NOT EXISTS shorturl.shorturl (
		id text PRIMARY KEY,
		url text,
		created_at timestamp
	);	
	`).Exec(); err != nil {
		log.Println(err) 
	}

	log.Println("Create shorturl table successfull!")
}