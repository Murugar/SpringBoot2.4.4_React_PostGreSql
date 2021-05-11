DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
    id  serial  PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    price INTEGER not NULL,
    code integer,
    expdate VARCHAR(128),
    avadate VARCHAR(128) 
);
