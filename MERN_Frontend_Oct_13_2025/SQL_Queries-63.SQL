SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);

SELECT *
FROM products
WHERE price > (
    SELECT MIN(price)
    FROM orders
);


SELECT *
FROM customers
WHERE customer_id IN (
    SELECT customer_id
    FROM orders
);

SELECT 
    c.customer_id,
    c.name,
    (
        SELECT COUNT(*)
        FROM orders o
        WHERE o.customer_id = c.customer_id
    ) AS order_count
FROM customers c;


SELECT *
FROM employees e
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
    WHERE department_id = e.department_id
);



SELECT *
FROM products p
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.product_id = p.product_id
);

