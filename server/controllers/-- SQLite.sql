-- SQLite
-- SQLite

CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	name TEXT,
	user_name TEXT UNIQUE,
	password TEXT UNIQUE,
	email TEXT UNIQUE,
	address TEXT,
	telephone TEXT UNIQUE
);

INSERT INTO users (name,user_name,password,email,address,telephone)
values ('Pablo', 'pablo07','dnalsdsnadlkasdnas','pablo@gmail.com','lacretatumama','8098098');

CREATE TABLE orders(
	order_id INTEGER PRIMARY KEY,
	user_id INTEGER,
	name TEXT,
	price INTEGER,
	rating INTEGER,
	manufacturer TEXT,
	item_info TEXT,
    quantity INTEGER,
	FOREIGN KEY (user_id)
		REFERENCES users(id)
);

CREATE TABLE paymentMethods(
	id INTEGER PRIMARY KEY,
	user_id INTEGER,
	company TEXT,
	card_number TEXT UNIQUE,
    valid_until TEXT,
    cvv INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE messages(
	id INTEGER PRIMARY KEY,
	sender INTEGER,
	receiver INTEGER,
	message TEXT,
	FOREIGN KEY (sender) REFERENCES users(id),
	FOREIGN KEY (receiver) REFERENCES users(id)
);


