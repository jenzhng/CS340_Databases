/* CS340 Project Step 3
Group 146 
Jenny Zhong and Arberim Ame
Data Manipulation Queries
*/

/* SELECT QUERIES */

-- Customers
SELECT * FROM Customers;

-- Orders
SELECT * FROM Orders;

-- Records
SELECT * FROM Records;

-- Genres
SELECT * FROM Genres;

-- RecordOrders: get totalSpent for all Customers
SELECT Customers.customerID, Customers.firstName, Customers.lastName, SUM(Records.price * RecordOrders.qtyOrdered) as totalSpent
FROM Customers
JOIN Orders ON Customers.customerID = Orders.customerID
JOIN RecordOrders ON Orders.orderID = RecordOrders.orderID
JOIN Records ON RecordOrders.recordID = Records.recordID
GROUP BY Customers.customerID
ORDER BY totalSpent DESC;

-- GenreRecords: get a list of all Records along with their associated Genre
SELECT Records.recordID, Records.title, Records.artist, Records.qtyStock as Stock, Genres.name AS genre, Genres.description
FROM Records
JOIN GenreRecords ON Records.recordID = GenreRecords.recordID
JOIN Genres ON GenreRecords.genreID = Genres.genreID;

-- Get a list of all Records a Customer has ordered
SELECT Records.recordID, Records.title, Records.artist
FROM Customers
JOIN Orders ON Customers.customerID = Orders.customerID
JOIN RecordOrders ON Orders.orderID = RecordOrders.orderID
JOIN Records ON RecordOrders.recordID = Records.recordID
WHERE Customers.customerID = (SELECT customerID FROM Customers WHERE email = :emailInput:);

-- Get totalSpent for a specific Customer
SELECT Customers.customerID, Customers.firstName, Customers.lastName, SUM(Records.price * RecordOrders.qtyOrdered) as totalSpent
FROM Customers
JOIN Orders ON Customers.customerID = Orders.customerID
JOIN RecordOrders ON Orders.orderID = RecordOrders.orderID
JOIN Records ON RecordOrders.recordID = Records.recordID
WHERE Customers.customerID = (SELECT customerID FROM Customers WHERE email = :emailInput:);

/* INSERT QUERIES */

-- Customers
INSERT INTO Customers (firstName, lastName, email, phoneNumber)
VALUES(:firstName:, :lastName:, :email:, :phoneNumber);

-- Orders
INSERT INTO Orders (customerID, orderDate)
VALUES ((SELECT customerID FROM Customers WHERE email = :desiredCustomerEmail:), :currentDate:);

-- Records
INSERT INTO Records (title, artist, qtyStock, price)
VALUES (:titleInput:, :artistInput:, :qtyStockInput:, :priceInput:);

-- Genres
INSERT INTO Genres (name, description)
VALUES (:genreInput:, :descriptionInput:);

-- RecordOrders
INSERT INTO RecordOrders (orderID, recordID, qtyOrdered)
VALUES ((SELECT orderID from Orders WHERE customerID = (SELECT customerID FROM Customers WHERE email = :emailInput:) AND orderDate = :orderDateInput:), 
(SELECT recordID FROM Records WHERE title = :titleInput), :qtyOrderedInput:);

-- GenreRecords
INSERT INTO GenreRecords (recordID, genreID)
VALUES ((SELECT recordID FROM Records WHERE title = :titleInput:), (SELECT genreID FROM Genres WHERE name = :genreNameInput:));

-- UPDATE QUERY
UPDATE Records SET title = :titleInput:, artist = :artistInput:, qtyStock = :qtyStockInput:, price = :priceInput:
WHERE recordID = :recordId_from_form:;

-- DELETE QUERY
DELETE FROM Genres WHERE id = :genreID_from_form:

-- DELETE (M:M)
DELETE FROM GenreRecords WHERE recordID = :recordID_from_form: AND genreId = :genreID_from_form;