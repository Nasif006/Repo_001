CREATE TABLE `users` (
  `in` int,
  `name` varchar(50),
  `contact_no` varchar(15),
  `email` varchar(50),
  `gender` varchar(15),
  `nid` varchar(25),
  `dob` date,
  `address` varchar(100),
  `password` varchar(30)
);
CREATE TABLE `admins` (
  `id` int,
  `name` varchar(50),
  `contact_no` varchar(15),
  `email` varchar(50),
  `gender` varchar(15),
  `nid` varchar(50),
  `dob` date,
  `address` varchar(100),
  `password` varchar(30)
);
CREATE TABLE `sliders`(
  `id` int,
  `title` varchar(250),
  `description` text,
  `image` varchar(255)
)
CREATE TABLE `categories` (
  `id` int,
  `name` varchar(50),
  `description` varchar(255)
)

CREATE TABLE `author` (
  `id` int
  `name` varchar(250),
  `description` text,
)
CREATE TABLE `books` (
  `id` int,
  `category_id` int,
  `name` varchar(50),
  `author_id` int,
  `is_featured` boolean,
  `is_populer` boolean,
  `price` decimal(10,2),
  `offer_price` decimal(10,2),
  `description` varchar(255),
  `image` varchar(255)
);

CREATE TABLE `publisher`(
  `id` int
  `name` varchar(250),
  `contact_no` varchar(15),
  `email` varchar(50),
  `address` varchar(15),
)

CREATE TABLE `book_purchase` (
  `id` int,
  `publisher_id` int,
  `purchase_date` datetime,
  `price` decimal(7,2)
  `quantity` int,
  `status` int
  `payment_status` int
)
CREATE TABLE `book_purchase_items` (
  `id` int,
  `book_purchase_id` int,
  `book_id` int,
  `quantity` int,
  `price` decimal(7,2)
)

CREATE TABLE `store_books` (
  `id` int,
  `book_id` int,
  `price` decimal(7,2),
  `stock_quantity` int
);

CREATE TABLE `orders` (
  `id` int,
  `user_id` int,
  `total_amount` decimal(7,2),
  `order_date` datetime
  `status` int
  `payment_status` int
);

CREATE TABLE `order_items` (
  `id` int,
  `order_id` int,
  `book_id` int,
  `quantity` int,
  `is_returned` boolean,
  `price_per_unit` decimal(7,2),
  `refund_amount` decimal(7,2)
);
