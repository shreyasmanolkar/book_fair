-- DDL Commands

CREATE DATABASE Bookfair;

CREATE TABLE sellers (
    seller_id SERIAL PRIMARY KEY,
    "full_name" VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

CREATE TABLE buyers (
    buyer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE shops (
    shop_id SERIAL PRIMARY KEY,
    seller_id INT,
    shop_name VARCHAR(255)
    CONSTRAINT fk_seller FOREIGN KEY(seller_id) REFERENCES sellers(seller_id)
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    stock INT,
    image_url TEXT;
    seller_id INT,
    price INT,
    "description" TEXT,
    CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);

CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    buyer_id INT,
    CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    cart_id INT,
    book_id INT,
    quantity INT,
    CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books(book_id)
);

ALTER TABLE "public"."orders"
ADD COLUMN shop_id INT,
ADD CONSTRAINT fk_shop_id FOREIGN KEY (shop_id) REFERENCES shops(shop_id);

ALTER TABLE "public"."orders"
ADD COLUMN seller_id INT,
ADD CONSTRAINT fk_seller_id FOREIGN KEY (seller_id) REFERENCES sellers(seller_id);

ALTER TABLE "public"."orders"
DROP COLUMN seller_id;