/* CS340 Project Step 2 Draft
Group 146 
Jenny Zhong and Arberim Ame
*/

-- Disabling foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create Customers Table

CREATE OR REPLACE TABLE Customers (
    customerID int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phoneNumber varchar(12),
    PRIMARY KEY (customerID)
);
-- Record phoneNumber as 123-456-7890

-- Create Orders Table
CREATE OR REPLACE TABLE Orders (
    orderID int NOT NULL AUTO_INCREMENT,
    customerID int,
    orderDate datetime,
    FOREIGN KEY (customerID) REFERENCES Customers (customerID) ON DELETE CASCADE,
    PRIMARY KEY (orderID)
);
-- Records when a Customer places an Order

-- Create Records Table
CREATE OR REPLACE TABLE Records (
    recordID int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    artist varchar(255) NOT NULL,
    qtyStock int NOT NULL,
    price float(10, 2) NOT NULL,
    PRIMARY KEY (recordID)
);

-- Create Genres Table
CREATE OR REPLACE TABLE Genres (
    genreID int NOT NULL AUTO_INCREMENT, 
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    PRIMARY KEY (genreID)
);

-- Create RecordOrders table
CREATE OR REPLACE TABLE RecordOrders (
    orderID int,
    recordID int,
    qtyOrdered int,
    FOREIGN KEY (orderID) REFERENCES Orders (orderID) ON DELETE CASCADE,
    FOREIGN KEY (recordID) REFERENCES Records (recordID) ON DELETE CASCADE,
    PRIMARY KEY (orderID, recordID)
);
-- Records what Record a Customer purchased and how many
-- An Order can have multiple Records associated with it

-- Create GenreRecords Table
CREATE OR REPLACE TABLE GenreRecords (
    recordID int,
    genreID int,
    FOREIGN KEY (recordID) REFERENCES Records (recordID) ON DELETE CASCADE,
    FOREIGN KEY (genreID) REFERENCES Genres (genreID) ON DELETE CASCADE,
    PRIMARY KEY (recordID, genreID)
);
-- a Record can have multiple Genres and a Genre can have many Records associated with it

-- Insert sample data
INSERT INTO Customers(firstName, lastName, email, phoneNumber)
VALUES("Jane", "Smith", "jsmith@gmail.com", "856-555-2230"),
("Michael", "Jones", "mjones@gmail.com", "609-555-2251"),
("Corey", "Rodriguez", "crodriguez@gmail.com", "215-555-7326");

INSERT INTO Orders (customerID, orderDate)
VALUES ((SELECT customerID FROM Customers WHERE email = 'jsmith@gmail.com'), '20240208'),
((SELECT customerID FROM Customers WHERE email = 'crodriguez@gmail.com'), '20240206'),
((SELECT customerID FROM Customers WHERE email = 'mjones@gmail.com'), '20240207');

INSERT INTO Records (title, artist, qtyStock, price)
VALUES('Be the Cowboy', 'Mitski', 100, 30.00),
('Rumors', 'Fleetwod Mac', 100, 50.00),
("Over The Garden Wall Original Soundtrack LP", "Sam Wolfe Connelly", 25, 100.00);

INSERT INTO Genres (name, description)
VALUES ('Indie', 'Alternative Music'), ('Soundtrack', 'Original Soundtrack for TV/Film'),
('Classic Rock', 'Rock music from the 1960s - 1990s');

INSERT INTO RecordOrders (orderID, recordID, qtyOrdered)
VALUES ((SELECT orderID from Orders WHERE customerID = (SELECT customerID FROM Customers WHERE email = 'crodriguez@gmail.com')), 
(SELECT recordID FROM Records WHERE title = 'Be the Cowboy'), 1), 
((SELECT orderID FROM Orders WHERE customerID = (SELECT customerID FROM Customers WHERE email = 'mjones@gmail.com')), 
(SELECT recordID FROM Records WHERE title = 'Over The Garden Wall Original Soundtrack LP'), 1),
((SELECT orderID FROM Orders WHERE customerID = (SELECT customerID FROM Customers WHERE email = 'jsmith@gmail.com')),
(SELECT recordID FROM Records WHERE title = 'Rumors'), 1),
((SELECT orderID FROM Orders WHERE customerID = (SELECT customerID FROM Customers WHERE email = 'jsmith@gmail.com')),
(SELECT recordID FROM Records WHERE title = 'Be the Cowboy'), 1);

INSERT INTO GenreRecords (recordID, genreID)
VALUES ((SELECT recordID FROM Records WHERE title = 'Be the Cowboy'), (SELECT genreID FROM Genres WHERE name = 'Indie')),
((SELECT recordID FROM Records WHERE title = 'Rumors'), (SELECT genreID FROM Genres WHERE name = 'Classic Rock')),
((SELECT recordID FROM Records WHERE title = 'Over The Garden Wall Original Soundtrack LP'), 
(SELECT genreID FROM Genres WHERE name = 'Soundtrack'));


-- Enabling foreign key checks
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
