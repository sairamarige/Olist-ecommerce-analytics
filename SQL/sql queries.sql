-- Olist E-Commerce Analytics
-- MySQL Analysis Queries

use Ecommerce analytics;

-- ============================================================
-- 1. Total Revenue
-- ============================================================

SELECT ROUND(SUM(revenue), 2) AS total_revenue
FROM ecommerce_clean;


-- ============================================================
-- 2. Total Orders
-- ============================================================

SELECT COUNT(DISTINCT order_id) AS total_orders
FROM ecommerce_clean;


-- ============================================================
-- 3. Average Order Value (AOV)
-- ============================================================

SELECT ROUND(
    SUM(revenue) / COUNT(DISTINCT order_id),
    2
) AS average_order_value
FROM ecommerce_clean;


-- ============================================================
-- 4. Revenue by Product Category
-- ============================================================

SELECT
    product_category_name_english AS category,
    ROUND(SUM(revenue), 2) AS total_revenue
FROM ecommerce_clean
WHERE product_category_name_english IS NOT NULL
GROUP BY product_category_name_english
ORDER BY total_revenue DESC;


-- ============================================================
-- 5. Top 10 Product Categories by Revenue
-- ============================================================

SELECT
    product_category_name_english AS category,
    ROUND(SUM(revenue), 2) AS total_revenue
FROM ecommerce_clean
WHERE product_category_name_english IS NOT NULL
GROUP BY product_category_name_english
ORDER BY total_revenue DESC
LIMIT 10;


-- ============================================================
-- 6. Revenue by Customer State
-- ============================================================

SELECT
    customer_state AS state,
    ROUND(SUM(revenue), 2) AS total_revenue
FROM ecommerce_clean
GROUP BY customer_state
ORDER BY total_revenue DESC;


-- ============================================================
-- 7. Top 10 States by Revenue
-- ============================================================

SELECT
    customer_state AS state,
    ROUND(SUM(revenue), 2) AS total_revenue
FROM ecommerce_clean
GROUP BY customer_state
ORDER BY total_revenue DESC
LIMIT 10;


-- ============================================================
-- 8. Monthly Revenue
-- ============================================================

SELECT
    order_month,
    ROUND(SUM(revenue), 2) AS monthly_revenue
FROM ecommerce_clean
GROUP BY order_month
ORDER BY order_month;


-- ============================================================
-- 9. Top 10 Customers by Revenue
-- ============================================================

SELECT
    customer_unique_id,
    ROUND(SUM(revenue), 2) AS total_revenue
FROM ecommerce_clean
GROUP BY customer_unique_id
ORDER BY total_revenue DESC
LIMIT 10;


-- ============================================================
-- 10. Order Status Distribution
-- ============================================================

SELECT
    order_status,
    COUNT(DISTINCT order_id) AS total_orders
FROM ecommerce_clean
GROUP BY order_status
ORDER BY total_orders DESC;


-- ============================================================
-- 11. Average Delivery Days
-- ============================================================

SELECT
    ROUND(AVG(delivery_days), 2) AS average_delivery_days
FROM ecommerce_clean
WHERE delivery_days IS NOT NULL;


-- ============================================================
-- 12. Delivered Orders
-- ============================================================

SELECT
    COUNT(DISTINCT order_id) AS delivered_orders
FROM ecommerce_clean
WHERE order_status = 'delivered';


-- ============================================================
-- 13. Late Orders
-- ============================================================

SELECT
    COUNT(DISTINCT order_id) AS late_orders
FROM ecommerce_clean
WHERE late_flag = 1;


-- ============================================================
-- 14. Late Delivery Rate
-- Uses total distinct orders as denominator
-- ============================================================

SELECT
    ROUND(
        COUNT(DISTINCT CASE
            WHEN late_flag = 1 THEN order_id
        END)
        / COUNT(DISTINCT order_id) * 100,
        2
    ) AS late_delivery_rate
FROM ecommerce_clean;


-- ============================================================
-- 15. On-Time vs Late Orders
-- ============================================================

SELECT
    CASE
        WHEN late_flag = 1 THEN 'Late'
        WHEN late_flag = 0 THEN 'On Time'
        ELSE 'Not Evaluated'
    END AS delivery_status,
    COUNT(DISTINCT order_id) AS total_orders
FROM ecommerce_clean
GROUP BY
    CASE
        WHEN late_flag = 1 THEN 'Late'
        WHEN late_flag = 0 THEN 'On Time'
        ELSE 'Not Evaluated'
    END
ORDER BY total_orders DESC;


-- ============================================================
-- 16. Delivery Performance by State
-- ============================================================

SELECT
    customer_state AS state,
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT CASE
        WHEN late_flag = 1 THEN order_id
    END) AS late_orders,
    ROUND(AVG(delivery_days), 2) AS average_delivery_days,
    ROUND(
        COUNT(DISTINCT CASE
            WHEN late_flag = 1 THEN order_id
        END)
        / COUNT(DISTINCT order_id) * 100,
        2
    ) AS late_delivery_rate
FROM ecommerce_clean
WHERE late_flag IN (0, 1)
GROUP BY customer_state
ORDER BY late_delivery_rate DESC;


-- ============================================================
-- 17. Top 10 States by Late Orders
-- ============================================================

SELECT
    customer_state AS state,
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT CASE
        WHEN late_flag = 1 THEN order_id
    END) AS late_orders
FROM ecommerce_clean
WHERE late_flag IN (0, 1)
GROUP BY customer_state
ORDER BY late_orders DESC
LIMIT 10;


-- ============================================================
-- 18. High-Value Customers
-- Customers with revenue greater than 1000
-- ============================================================

SELECT
    customer_unique_id,
    ROUND(SUM(revenue), 2) AS total_revenue
FROM ecommerce_clean
GROUP BY customer_unique_id
HAVING SUM(revenue) > 1000
ORDER BY total_revenue DESC;


-- ============================================================
-- 19. Data Quality - Missing Values
-- ============================================================

SELECT
    COUNT(*) AS total_rows,

    SUM(CASE
        WHEN revenue IS NULL THEN 1
        ELSE 0
    END) AS missing_revenue,

    SUM(CASE
        WHEN delivery_days IS NULL THEN 1
        ELSE 0
    END) AS missing_delivery_days,

    SUM(CASE
        WHEN late_flag IS NULL THEN 1
        ELSE 0
    END) AS missing_late_flag,

    SUM(CASE
        WHEN product_category_name_english IS NULL THEN 1
        ELSE 0
    END) AS missing_category

FROM ecommerce_clean;


-- ============================================================
-- 20. Overall Data Summary
-- ============================================================

SELECT
    COUNT(*) AS total_rows,
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT customer_unique_id) AS total_customers,
    COUNT(DISTINCT product_id) AS total_products,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(AVG(delivery_days), 2) AS average_delivery_days
FROM ecommerce_clean;