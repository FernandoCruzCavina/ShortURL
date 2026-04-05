-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS shorturl WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table
CREATE TABLE IF NOT EXISTS shorturl.shorturl (
id text PRIMARY KEY,
url text,
created_at timestamp
);

-- Insert some data
INSERT INTO shorturl.shorturl
(id, url, created_at)
VALUES ('das', 'site_url', toTimeStamp(now()));
