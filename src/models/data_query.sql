-- DQL

SELECT *
FROM "public"."books"
WHERE seller_id = 5;


UPDATE "public"."orders" 
SET shop_id = 3,
    book_id = 6
WHERE order_id = 5;

SELECT * 
FROM "public"."orders"
WHERE shop_id = 3;

SELECT s.shop_name, sl.full_name
FROM "public"."shops" AS "s"
JOIN "public"."sellers" AS "sl"
ON sl.seller_id = s.seller_id;

SELECT * 
FROM "public"."books";