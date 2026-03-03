SQL STORED PROCEDURES & FUNCTIONS - COMPLETE MASTERY GUIDE

# **🎯 SQL STORED PROCEDURES & FUNCTIONS - COMPLETE MASTERY GUIDE**

## **📖 THE FUNDAMENTAL DIFFERENCE**

### **Functions** → **RETURN** something

```sql
-- Like a calculator
SELECT calculate_tax(1000) AS tax_amount;
-- Returns: 180 (or whatever)
```

### **Procedures** → **DO** something

```sql
-- Like a worker
CALL update_salary(101, 5000);
-- Doesn't return, but performs actions
```

---

## **🚀 PART 1: FUNCTIONS - THE RETURNERS**

### **Type 1: Scalar Functions (Return Single Value)**

#### **Basic Structure:**

```sql
CREATE FUNCTION function_name(parameters)
RETURNS return_datatype
[DETERMINISTIC/NOT DETERMINISTIC]
[SQL DATA ACCESS characteristics]
BEGIN
    -- Logic here
    RETURN value;
END;
```

#### **Example 1: Simple Tax Calculator**

```sql
CREATE FUNCTION calculate_tax(amount DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE tax_rate DECIMAL(5,2) DEFAULT 0.18;
    DECLARE tax_amount DECIMAL(10,2);

    SET tax_amount = amount * tax_rate;
    RETURN tax_amount;
END;

-- Usage
SELECT calculate_tax(1000) AS tax; -- Returns 180.00
```

#### **Example 2: Customer Category Function**

```sql
CREATE FUNCTION get_customer_category(total_purchases DECIMAL(10,2))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE category VARCHAR(20);

    IF total_purchases > 10000 THEN
        SET category = 'PLATINUM';
    ELSEIF total_purchases > 5000 THEN
        SET category = 'GOLD';
    ELSEIF total_purchases > 1000 THEN
        SET category = 'SILVER';
    ELSE
        SET category = 'STANDARD';
    END IF;

    RETURN category;
END;

-- Usage
SELECT customer_name, get_customer_category(total_spent) AS category
FROM customers;
```

#### **Example 3: Age Calculator Function**

```sql
CREATE FUNCTION calculate_age(birth_date DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE age INT;

    SET age = TIMESTAMPDIFF(YEAR, birth_date, CURDATE());

    -- Adjust if birthday hasn't occurred this year
    IF DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(birth_date, '%m%d') THEN
        SET age = age - 1;
    END IF;

    RETURN age;
END;

-- Usage
SELECT name, calculate_age(birth_date) AS age
FROM employees;
```

### **Type 2: Table-Valued Functions (Return Table)**

#### **Example: Get Employee Hierarchy**

```sql
-- PostgreSQL/SQL Server style
CREATE FUNCTION get_subordinates(manager_id INT)
RETURNS TABLE (
    employee_id INT,
    employee_name VARCHAR(100),
    level INT
)
AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE emp_hierarchy AS (
        SELECT
            e.id,
            e.name,
            1 as level
        FROM employees e
        WHERE e.manager_id = manager_id

        UNION ALL

        SELECT
            e.id,
            e.name,
            eh.level + 1
        FROM employees e
        JOIN emp_hierarchy eh ON e.manager_id = eh.id
    )
    SELECT id, name, level FROM emp_hierarchy;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT * FROM get_subordinates(101);
```

#### **MySQL Alternative (Returns Result Set)**

```sql
CREATE PROCEDURE get_subordinates(IN manager_id INT)
BEGIN
    WITH RECURSIVE emp_hierarchy AS (
        SELECT
            e.id,
            e.name,
            1 as level
        FROM employees e
        WHERE e.manager_id = manager_id

        UNION ALL

        SELECT
            e.id,
            e.name,
            eh.level + 1
        FROM employees e
        JOIN emp_hierarchy eh ON e.manager_id = eh.id
    )
    SELECT * FROM emp_hierarchy;
END;

-- Usage
CALL get_subordinates(101);
```

### **Type 3: Aggregate Functions (Custom Aggregation)**

#### **Example: Custom Concatenation (MySQL doesn't support custom aggregates easily)**

```sql
-- PostgreSQL example
CREATE AGGREGATE comma_concat(VARCHAR) (
    SFUNC = string_agg_transition,
    STYPE = VARCHAR,
    FINALFUNC = string_agg_final,
    INITCOND = ''
);
```

---

## **🚀 PART 2: STORED PROCEDURES - THE DOERS**

### **Basic Structure:**

```sql
CREATE PROCEDURE procedure_name(parameters)
[characteristics]
BEGIN
    -- SQL statements
    -- Can use transactions
    -- Can return multiple result sets
END;
```

### **Example 1: Employee Promotion Procedure**

```sql
DELIMITER $$

CREATE PROCEDURE promote_employee(
    IN emp_id INT,
    IN new_salary DECIMAL(10,2),
    IN new_title VARCHAR(100)
)
BEGIN
    DECLARE old_salary DECIMAL(10,2);
    DECLARE old_title VARCHAR(100);
    DECLARE promotion_date DATE;

    -- Get current values
    SELECT salary, job_title INTO old_salary, old_title
    FROM employees
    WHERE id = emp_id;

    -- Set promotion date
    SET promotion_date = CURDATE();

    -- Start transaction
    START TRANSACTION;

    -- Update employee
    UPDATE employees
    SET salary = new_salary,
        job_title = new_title,
        last_promotion_date = promotion_date
    WHERE id = emp_id;

    -- Log the promotion
    INSERT INTO promotion_history (
        employee_id,
        old_salary,
        new_salary,
        old_title,
        new_title,
        promotion_date
    ) VALUES (
        emp_id,
        old_salary,
        new_salary,
        old_title,
        new_title,
        promotion_date
    );

    -- Send notification (simulated)
    INSERT INTO notifications (
        employee_id,
        message,
        created_at
    ) VALUES (
        emp_id,
        CONCAT('Congratulations on your promotion to ', new_title, '!'),
        NOW()
    );

    -- Commit transaction
    COMMIT;

    -- Return success message
    SELECT 'Promotion successful!' AS result;
END$$

DELIMITER ;

-- Usage
CALL promote_employee(101, 75000, 'Senior Developer');
```

### **Example 2: Monthly Salary Processing**

```sql
DELIMITER $$

CREATE PROCEDURE process_monthly_salary(
    IN processing_month DATE
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE emp_id INT;
    DECLARE emp_salary DECIMAL(10,2);
    DECLARE emp_name VARCHAR(100);

    -- Cursor to loop through active employees
    DECLARE emp_cursor CURSOR FOR
        SELECT id, name, salary
        FROM employees
        WHERE status = 'active'
          AND (termination_date IS NULL OR termination_date > processing_month);

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Create salary record for the month
    INSERT INTO salary_month (month, processed_date, status)
    VALUES (processing_month, CURDATE(), 'processing');

    -- Get the salary month ID
    SET @salary_month_id = LAST_INSERT_ID();

    -- Open cursor
    OPEN emp_cursor;

    emp_loop: LOOP
        FETCH emp_cursor INTO emp_id, emp_name, emp_salary;

        IF done THEN
            LEAVE emp_loop;
        END IF;

        -- Calculate deductions
        SET @tax = emp_salary * 0.10;
        SET @pf = emp_salary * 0.12;
        SET @net_salary = emp_salary - @tax - @pf;

        -- Insert salary slip
        INSERT INTO salary_slips (
            employee_id,
            salary_month_id,
            basic_salary,
            tax_deduction,
            pf_deduction,
            net_salary,
            payment_date
        ) VALUES (
            emp_id,
            @salary_month_id,
            emp_salary,
            @tax,
            @pf,
            @net_salary,
            DATE_ADD(LAST_DAY(processing_month), INTERVAL 1 DAY)
        );

        -- Log each insertion
        INSERT INTO salary_processing_log (
            employee_id,
            salary_month_id,
            processed_at
        ) VALUES (emp_id, @salary_month_id, NOW());

    END LOOP;

    CLOSE emp_cursor;

    -- Update status to completed
    UPDATE salary_month
    SET status = 'completed',
        total_processed = (SELECT COUNT(*) FROM salary_slips WHERE salary_month_id = @salary_month_id)
    WHERE id = @salary_month_id;

    -- Return summary
    SELECT
        @salary_month_id AS month_id,
        COUNT(*) AS employees_processed,
        SUM(net_salary) AS total_payout
    FROM salary_slips
    WHERE salary_month_id = @salary_month_id;

END$$

DELIMITER ;

-- Usage
CALL process_monthly_salary('2024-01-01');
```

### **Example 3: Complex Order Processing**

```sql
DELIMITER $$

CREATE PROCEDURE process_order(
    IN customer_id INT,
    IN product_ids TEXT,  -- Comma-separated product IDs
    IN quantities TEXT    -- Comma-separated quantities
)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE product_count INT;
    DECLARE current_product_id INT;
    DECLARE current_quantity INT;
    DECLARE current_price DECIMAL(10,2);
    DECLARE total_amount DECIMAL(10,2) DEFAULT 0;
    DECLARE order_id INT;

    -- Split product_ids and quantities
    SET product_count = LENGTH(product_ids) - LENGTH(REPLACE(product_ids, ',', '')) + 1;

    -- Start transaction
    START TRANSACTION;

    -- Create order header
    INSERT INTO orders (customer_id, order_date, status)
    VALUES (customer_id, NOW(), 'pending');

    SET order_id = LAST_INSERT_ID();

    -- Process each product
    WHILE i <= product_count DO
        -- Extract product ID and quantity
        SET current_product_id = SUBSTRING_INDEX(SUBSTRING_INDEX(product_ids, ',', i), ',', -1);
        SET current_quantity = SUBSTRING_INDEX(SUBSTRING_INDEX(quantities, ',', i), ',', -1);

        -- Get product price
        SELECT price INTO current_price
        FROM products
        WHERE id = current_product_id
          AND stock >= current_quantity;

        -- Check if product exists and has stock
        IF current_price IS NULL THEN
            -- Rollback and return error
            ROLLBACK;
            SELECT CONCAT('Product ', current_product_id, ' not available or insufficient stock') AS error;
            LEAVE procedure;
        END IF;

        -- Calculate line total
        SET @line_total = current_price * current_quantity;
        SET total_amount = total_amount + @line_total;

        -- Insert order detail
        INSERT INTO order_details (order_id, product_id, quantity, unit_price, line_total)
        VALUES (order_id, current_product_id, current_quantity, current_price, @line_total);

        -- Update product stock
        UPDATE products
        SET stock = stock - current_quantity,
            last_updated = NOW()
        WHERE id = current_product_id;

        SET i = i + 1;
    END WHILE;

    -- Update order total
    UPDATE orders
    SET total_amount = total_amount,
        status = 'confirmed'
    WHERE id = order_id;

    -- Commit transaction
    COMMIT;

    -- Return order summary
    SELECT
        order_id,
        total_amount,
        'Order processed successfully' AS message;

END$$

DELIMITER ;

-- Usage
CALL process_order(101, '1,2,3', '2,1,5');
```

---

## **🔧 PART 3: ADVANCED TECHNIQUES**

### **1. Error Handling in Procedures**

```sql
CREATE PROCEDURE safe_transfer(
    IN from_account INT,
    IN to_account INT,
    IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE from_balance DECIMAL(10,2);
    DECLARE exit_handler BOOLEAN DEFAULT FALSE;

    -- Declare error handler
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE;
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO;
        GET DIAGNOSTICS CONDITION 1 @text = MESSAGE_TEXT;

        SET @error_message = CONCAT('Error ', @errno, ': ', @text);
        SET exit_handler = TRUE;

        -- Custom error logging
        INSERT INTO error_log (error_message, procedure_name, error_time)
        VALUES (@error_message, 'safe_transfer', NOW());
    END;

    START TRANSACTION;

    -- Check balance
    SELECT balance INTO from_balance
    FROM accounts
    WHERE account_id = from_account
    FOR UPDATE;  -- Lock the row

    IF from_balance < amount THEN
        ROLLBACK;
        SELECT 'Insufficient funds' AS result;
        LEAVE procedure;
    END IF;

    -- Deduct from source
    UPDATE accounts
    SET balance = balance - amount,
        last_transaction = NOW()
    WHERE account_id = from_account;

    -- Add to destination
    UPDATE accounts
    SET balance = balance + amount,
        last_transaction = NOW()
    WHERE account_id = to_account;

    -- Record transaction
    INSERT INTO transactions (from_account, to_account, amount, transaction_date)
    VALUES (from_account, to_account, amount, NOW());

    IF exit_handler THEN
        ROLLBACK;
        SELECT @error_message AS result;
    ELSE
        COMMIT;
        SELECT 'Transfer successful' AS result;
    END IF;

END;
```

### **2. Dynamic SQL in Procedures**

```sql
CREATE PROCEDURE dynamic_query(
    IN table_name VARCHAR(100),
    IN where_condition VARCHAR(500)
)
BEGIN
    DECLARE sql_query TEXT;

    -- Validate table name to prevent SQL injection
    IF table_name NOT IN ('employees', 'customers', 'products') THEN
        SELECT 'Invalid table name' AS error;
        LEAVE procedure;
    END IF;

    -- Build dynamic query
    SET sql_query = CONCAT(
        'SELECT * FROM ', table_name,
        ' WHERE ', where_condition,
        ' LIMIT 100'
    );

    -- Prepare and execute
    PREPARE stmt FROM sql_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

END;
```

### **3. Recursive Stored Procedures**

```sql
CREATE PROCEDURE find_management_chain(
    IN employee_id INT,
    INOUT chain TEXT
)
BEGIN
    DECLARE manager_id INT;
    DECLARE manager_name VARCHAR(100);

    -- Get employee's manager
    SELECT e.manager_id, m.name INTO manager_id, manager_name
    FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.id
    WHERE e.id = employee_id;

    IF manager_id IS NOT NULL THEN
        -- Add to chain
        SET chain = CONCAT(manager_name, ' -> ', chain);

        -- Recursive call
        CALL find_management_chain(manager_id, chain);
    END IF;

END;

-- Usage
SET @chain = '';
CALL find_management_chain(105, @chain);
SELECT @chain AS management_chain;
```

### **4. Scheduling with Events**

```sql
-- Create event that calls procedure daily
CREATE EVENT daily_salary_check
ON SCHEDULE EVERY 1 DAY
STARTS '2024-01-01 06:00:00'
DO
BEGIN
    CALL check_late_salaries();
    CALL generate_salary_report(CURDATE() - INTERVAL 1 MONTH);
END;

-- Enable event scheduler
SET GLOBAL event_scheduler = ON;
```

---

## **🎯 PART 4: REAL-WORLD USE CASES**

### **Use Case 1: Data Migration/ETL Procedure**

```sql
CREATE PROCEDURE migrate_customer_data()
BEGIN
    DECLARE batch_size INT DEFAULT 1000;
    DECLARE offset_val INT DEFAULT 0;
    DECLARE total_rows INT;
    DECLARE processed_rows INT DEFAULT 0;

    -- Get total count
    SELECT COUNT(*) INTO total_rows FROM legacy_customers;

    WHILE processed_rows < total_rows DO
        START TRANSACTION;

        -- Migrate batch
        INSERT INTO new_customers (
            customer_id, name, email, created_at
        )
        SELECT
            lc.id,
            CONCAT(lc.first_name, ' ', lc.last_name),
            LOWER(lc.email_address),
            STR_TO_DATE(lc.join_date, '%Y-%m-%d')
        FROM legacy_customers lc
        LEFT JOIN new_customers nc ON lc.id = nc.customer_id
        WHERE nc.customer_id IS NULL
        LIMIT batch_size
        OFFSET offset_val;

        -- Update statistics
        SET @inserted = ROW_COUNT();
        SET processed_rows = processed_rows + @inserted;
        SET offset_val = offset_val + batch_size;

        -- Log progress
        INSERT INTO migration_log (
            process_name,
            records_processed,
            timestamp
        ) VALUES (
            'customer_migration',
            @inserted,
            NOW()
        );

        COMMIT;

        -- Pause to prevent overwhelming the system
        DO SLEEP(1);
    END WHILE;

    -- Final summary
    SELECT
        'Migration completed' AS status,
        processed_rows AS total_migrated,
        NOW() AS completed_at;

END;
```

### **Use Case 2: Report Generation**

```sql
CREATE PROCEDURE generate_monthly_sales_report(
    IN report_month DATE
)
BEGIN
    -- Create temporary table for report data
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_sales_report (
        region VARCHAR(50),
        product_category VARCHAR(50),
        total_sales DECIMAL(15,2),
        total_quantity INT,
        average_price DECIMAL(10,2),
        unique_customers INT
    );

    -- Clear previous data
    DELETE FROM temp_sales_report;

    -- Populate with aggregated data
    INSERT INTO temp_sales_report
    SELECT
        r.name AS region,
        pc.name AS product_category,
        SUM(od.quantity * od.unit_price) AS total_sales,
        SUM(od.quantity) AS total_quantity,
        AVG(od.unit_price) AS average_price,
        COUNT(DISTINCT o.customer_id) AS unique_customers
    FROM orders o
    JOIN order_details od ON o.id = od.order_id
    JOIN products p ON od.product_id = p.id
    JOIN product_categories pc ON p.category_id = pc.id
    JOIN customers c ON o.customer_id = c.id
    JOIN regions r ON c.region_id = r.id
    WHERE DATE_FORMAT(o.order_date, '%Y-%m') = DATE_FORMAT(report_month, '%Y-%m')
      AND o.status = 'completed'
    GROUP BY r.name, pc.name
    ORDER BY total_sales DESC;

    -- Return the report
    SELECT * FROM temp_sales_report;

    -- Also return summary statistics
    SELECT
        'SUMMARY' AS type,
        COUNT(DISTINCT region) AS regions_count,
        COUNT(DISTINCT product_category) AS categories_count,
        SUM(total_sales) AS grand_total_sales,
        SUM(total_quantity) AS grand_total_quantity,
        SUM(unique_customers) AS total_unique_customers
    FROM temp_sales_report;

    -- Cleanup
    DROP TEMPORARY TABLE IF EXISTS temp_sales_report;

END;
```

### **Use Case 3: Audit Trail System**

```sql
CREATE PROCEDURE log_data_change(
    IN table_name VARCHAR(100),
    IN record_id INT,
    IN operation VARCHAR(20),
    IN user_id INT,
    IN old_data JSON,
    IN new_data JSON
)
BEGIN
    DECLARE audit_id INT;

    START TRANSACTION;

    -- Insert audit record
    INSERT INTO audit_trail (
        table_name,
        record_id,
        operation,
        changed_by,
        old_data,
        new_data,
        changed_at,
        ip_address
    ) VALUES (
        table_name,
        record_id,
        operation,
        user_id,
        old_data,
        new_data,
        NOW(),
        -- Get client IP (MySQL specific)
        SUBSTRING_INDEX(USER(), '@', -1)
    );

    SET audit_id = LAST_INSERT_ID();

    -- Check if suspicious activity
    IF operation = 'DELETE' THEN
        INSERT INTO suspicious_activities (
            audit_id,
            table_name,
            record_id,
            user_id,
            flagged_at,
            reason
        ) VALUES (
            audit_id,
            table_name,
            record_id,
            user_id,
            NOW(),
            'DELETE operation detected'
        );
    END IF;

    -- Archive if audit table is too large
    IF (SELECT COUNT(*) FROM audit_trail) > 1000000 THEN
        CALL archive_old_audit_records();
    END IF;

    COMMIT;

    SELECT audit_id AS logged_audit_id;

END;
```

---

## **🔧 PART 5: PERFORMANCE OPTIMIZATION**

### **1. Parameter Sniffing Prevention**

```sql
CREATE PROCEDURE get_employee_data(
    @department_id INT = NULL,
    @hire_date_from DATE = NULL
)
WITH RECOMPILE  -- Prevents parameter sniffing issues
AS
BEGIN
    IF @department_id IS NOT NULL AND @hire_date_from IS NOT NULL
    BEGIN
        SELECT * FROM employees
        WHERE department_id = @department_id
          AND hire_date >= @hire_date_from;
    END
    ELSE IF @department_id IS NOT NULL
    BEGIN
        SELECT * FROM employees
        WHERE department_id = @department_id;
    END
    ELSE IF @hire_date_from IS NOT NULL
    BEGIN
        SELECT * FROM employees
        WHERE hire_date >= @hire_date_from;
    END
    ELSE
    BEGIN
        SELECT * FROM employees;
    END
END;
```

### **2. Batch Processing Optimization**

```sql
CREATE PROCEDURE process_large_dataset()
BEGIN
    DECLARE batch_size INT DEFAULT 5000;
    DECLARE start_id INT DEFAULT 0;
    DECLARE end_id INT;
    DECLARE max_id INT;

    -- Get max ID
    SELECT MAX(id) INTO max_id FROM large_table;

    WHILE start_id <= max_id DO
        SET end_id = start_id + batch_size - 1;

        -- Process batch
        INSERT INTO processed_data
        SELECT *
        FROM large_table
        WHERE id BETWEEN start_id AND end_id
          AND processed = 0;

        -- Mark as processed
        UPDATE large_table
        SET processed = 1,
            processed_at = NOW()
        WHERE id BETWEEN start_id AND end_id;

        -- Commit each batch
        COMMIT;

        -- Update start_id for next batch
        SET start_id = end_id + 1;

        -- Brief pause
        DO SLEEP(0.1);
    END WHILE;
END;
```

### **3. Caching with Materialized Views**

```sql
-- Create stored procedure to refresh materialized view
CREATE PROCEDURE refresh_dashboard_cache()
BEGIN
    -- Drop and recreate materialized view
    DROP TABLE IF EXISTS dashboard_cache;

    CREATE TABLE dashboard_cache AS
    SELECT
        DATE(order_date) AS sale_date,
        product_category,
        SUM(amount) AS daily_sales,
        COUNT(DISTINCT customer_id) AS unique_customers,
        NOW() AS cache_time
    FROM sales
    WHERE order_date >= CURDATE() - INTERVAL 30 DAY
    GROUP BY DATE(order_date), product_category;

    -- Create indexes for fast querying
    CREATE INDEX idx_cache_date ON dashboard_cache(sale_date);
    CREATE INDEX idx_cache_category ON dashboard_cache(product_category);

    -- Update cache metadata
    UPDATE system_cache
    SET last_refreshed = NOW(),
        row_count = (SELECT COUNT(*) FROM dashboard_cache)
    WHERE cache_name = 'dashboard';

END;
```

---

## **🎯 PART 6: SECURITY BEST PRACTICES**

### **1. Parameter Validation & Sanitization**

```sql
CREATE PROCEDURE safe_user_login(
    IN username VARCHAR(100),
    IN password_input VARCHAR(100)
)
BEGIN
    DECLARE user_count INT;
    DECLARE user_id INT;
    DECLARE hashed_password VARCHAR(255);
    DECLARE max_attempts INT DEFAULT 5;
    DECLARE attempt_count INT;

    -- Validate input
    IF username REGEXP '[^a-zA-Z0-9@._-]' THEN
        SELECT 'Invalid username format' AS error;
        LEAVE procedure;
    END IF;

    -- Check login attempts
    SELECT attempts INTO attempt_count
    FROM login_attempts
    WHERE username = username
      AND attempt_time > DATE_SUB(NOW(), INTERVAL 1 HOUR);

    IF attempt_count >= max_attempts THEN
        SELECT 'Account locked. Too many attempts.' AS error;
        LEAVE procedure;
    END IF;

    -- Get user data using parameterized query
    SELECT id, password INTO user_id, hashed_password
    FROM users
    WHERE username = username
      AND active = 1;

    -- Verify password
    IF user_id IS NOT NULL AND hashed_password = SHA2(CONCAT(password_input, salt), 256) THEN
        -- Successful login
        UPDATE users SET last_login = NOW() WHERE id = user_id;
        DELETE FROM login_attempts WHERE username = username;

        -- Generate session token
        SET @session_token = UUID();
        INSERT INTO user_sessions (user_id, token, created_at, expires_at)
        VALUES (user_id, @session_token, NOW(), DATE_ADD(NOW(), INTERVAL 8 HOUR));

        SELECT 'Login successful' AS status, @session_token AS session_token;
    ELSE
        -- Failed login
        INSERT INTO login_attempts (username, attempt_time, ip_address)
        VALUES (username, NOW(), SUBSTRING_INDEX(USER(), '@', -1));

        SELECT 'Invalid credentials' AS error;
    END IF;

END;
```

### **2. Row-Level Security with Procedures**

```sql
CREATE PROCEDURE get_my_documents(
    IN user_id INT
)
BEGIN
    -- Users can only see their own documents
    SELECT d.*
    FROM documents d
    WHERE d.owner_id = user_id
       OR d.shared_with LIKE CONCAT('%,', user_id, ',%')
       OR EXISTS (
           SELECT 1 FROM document_permissions dp
           WHERE dp.document_id = d.id
             AND dp.user_id = user_id
             AND dp.permission = 'read'
       );
END;

-- Usage: Users can only call this with their own ID
CALL get_my_documents(101);
```

---

## **🧪 PART 7: TESTING & DEBUGGING**

### **1. Unit Testing Framework for Procedures**

```sql
CREATE PROCEDURE test_calculate_tax()
BEGIN
    DECLARE test_amount DECIMAL(10,2) DEFAULT 1000;
    DECLARE expected_tax DECIMAL(10,2) DEFAULT 180;
    DECLARE actual_tax DECIMAL(10,2);
    DECLARE test_result VARCHAR(20);

    -- Run the function
    SET actual_tax = calculate_tax(test_amount);

    -- Assert
    IF ABS(actual_tax - expected_tax) < 0.01 THEN
        SET test_result = 'PASS';
    ELSE
        SET test_result = 'FAIL';
    END IF;

    -- Log test result
    INSERT INTO test_results (
        test_name,
        input_value,
        expected_output,
        actual_output,
        result,
        tested_at
    ) VALUES (
        'calculate_tax',
        test_amount,
        expected_tax,
        actual_tax,
        test_result,
        NOW()
    );

    -- Return result
    SELECT test_result AS result;

END;
```

### **2. Debug Logging Procedure**

```sql
CREATE PROCEDURE debug_log(
    IN procedure_name VARCHAR(100),
    IN step_number INT,
    IN message TEXT,
    IN variable_name VARCHAR(100) DEFAULT NULL,
    IN variable_value TEXT DEFAULT NULL
)
BEGIN
    INSERT INTO debug_logs (
        procedure_name,
        step_number,
        message,
        variable_name,
        variable_value,
        logged_at,
        connection_id
    ) VALUES (
        procedure_name,
        step_number,
        message,
        variable_name,
        variable_value,
        NOW(),
        CONNECTION_ID()
    );
END;

-- Example usage in another procedure
CREATE PROCEDURE complex_calculation()
BEGIN
    CALL debug_log('complex_calculation', 1, 'Starting calculation');

    DECLARE total INT DEFAULT 0;
    SET total = 100;
    CALL debug_log('complex_calculation', 2, 'Variable set', 'total', total);

    -- More calculations...

    CALL debug_log('complex_calculation', 99, 'Calculation completed');
END;
```

---

## **📊 PART 8: MONITORING & MAINTENANCE**

### **1. Procedure Performance Monitoring**

```sql
CREATE PROCEDURE monitor_procedure_performance()
BEGIN
    -- Find slow running procedures
    SELECT
        db,
        name AS procedure_name,
        avg_timer_wait / 1000000000 AS avg_execution_time_seconds,
        count_star AS execution_count
    FROM performance_schema.events_statements_summary_by_program
    WHERE object_type = 'PROCEDURE'
      AND avg_timer_wait > 1000000000  -- More than 1 second
    ORDER BY avg_timer_wait DESC;

    -- Find most frequently called procedures
    SELECT
        db,
        name AS procedure_name,
        count_star AS call_count,
        sum_timer_wait / 1000000000 AS total_time_seconds
    FROM performance_schema.events_statements_summary_by_program
    WHERE object_type = 'PROCEDURE'
    ORDER BY count_star DESC
    LIMIT 10;

END;
```

### **2. Dependency Tracking**

```sql
CREATE PROCEDURE find_procedure_dependencies(
    IN procedure_name VARCHAR(100)
)
BEGIN
    -- Find tables accessed by procedure
    SELECT
        TABLE_NAME,
        COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND (CONCAT(' ', UPPER(ROUTINE_DEFINITION), ' ') LIKE
           CONCAT('% ', TABLE_NAME, '.', COLUMN_NAME, ' %')
           OR CONCAT(' ', UPPER(ROUTINE_DEFINITION), ' ') LIKE
           CONCAT('% ', TABLE_NAME, ' %'))
      AND ROUTINE_NAME = procedure_name;

    -- Find other procedures/functions called
    SELECT
        referenced_name,
        referenced_type
    FROM INFORMATION_SCHEMA.ROUTINES r1
    JOIN INFORMATION_SCHEMA.ROUTINES r2
      ON UPPER(r1.ROUTINE_DEFINITION) LIKE CONCAT('%', r2.ROUTINE_NAME, '%')
    WHERE r1.ROUTINE_NAME = procedure_name
      AND r2.ROUTINE_NAME != procedure_name;

END;
```

---

## **🎯 PART 9: THE ULTIMATE CHEAT SHEET**

### **Function vs Procedure Decision Tree**

```
Should it RETURN a value?
├── YES → Use FUNCTION
│   ├── Single value? → Scalar Function
│   └── Multiple rows? → Table-Valued Function
│
└── NO → Use PROCEDURE
    ├── Need to MODIFY data? → DML Procedure
    ├── Need BUSINESS LOGIC? → Business Logic Procedure
    └── Need to RETURN multiple result sets? → Reporting Procedure
```

### **When to Use What:**

- **Functions** for:
  - Calculations (tax, discounts, age)
  - Data validation/formatting
  - Reusable transformations
  - Computed columns logic

- **Procedures** for:
  - Complex business transactions
  - Data migration/ETL
  - Scheduled jobs
  - Batch processing
  - Security enforcement
  - Audit logging

### **Performance Tips:**

1. **Functions** can be inlined in queries
2. **Procedures** can use temp tables for complex logic
3. **Avoid cursors** when possible - use set-based operations
4. **Use WITH RECOMPILE** for volatile data patterns
5. **Parameter sniffing** - use local variables to prevent

### **Security Checklist:**

- [ ] Validate ALL input parameters
- [ ] Use least privilege principle
- [ ] Encrypt sensitive data
- [ ] Log security events
- [ ] Regular security reviews

---

## **🔥 DAILY PRACTICE EXERCISES**

### **Week 1: Functions**

```sql
-- Day 1: Create a function to calculate employee bonus
-- Day 2: Create a function to format phone numbers
-- Day 3: Create a function to calculate shipping cost
-- Day 4: Create a function to validate email format
-- Day 5: Create a function to get next business day
```

### **Week 2: Procedures**

```sql
-- Day 1: Create a procedure to update product prices
-- Day 2: Create a procedure to generate invoices
-- Day 3: Create a procedure for user registration
-- Day 4: Create a procedure for order fulfillment
-- Day 5: Create a procedure for monthly reports
```

### **Week 3: Advanced**

```sql
-- Day 1: Implement error handling in procedures
-- Day 2: Create recursive stored procedures
-- Day 3: Implement audit logging
-- Day 4: Create scheduled events
-- Day 5: Optimize procedure performance
```

---

## **🚀 NEXT STEPS FOR MASTERY**

1. **Practice** with real business scenarios
2. **Profile** your procedures for performance
3. **Document** each procedure with comments
4. **Test** with edge cases
5. **Review** and refactor regularly

**Remember:** Functions and Procedures are your **SQL superpowers**. They turn your database from a dumb storage into an **intelligent business layer**.

**Start today:** Pick one business rule from your domain and implement it as a function or procedure! 🎯

<!-------------------









 ----------------->

# **🎯 SQL TRIGGERS - COMPLETE MASTERY GUIDE**

## **📖 WHAT ARE TRIGGERS?**

**Triggers** are **automated sentinels** that watch your database and react to events. Think of them as **"IF THIS, THEN THAT"** rules for your database.

```
Event Happens → Trigger Fires → Action Executes
(INSERT/UPDATE/DELETE)      (SQL Statements)
```

---

## **🔥 THE 4 TYPES OF TRIGGERS**

### **1. Timing: WHEN it fires**

- **BEFORE** → Before the operation
- **AFTER** → After the operation
- **INSTEAD OF** → Instead of the operation (mainly in views)

### **2. Event: WHAT triggers it**

- **INSERT** → When new data is added
- **UPDATE** → When data is modified
- **DELETE** → When data is removed

---

## **🚀 PART 1: BASIC TRIGGER STRUCTURE**

### **Generic Syntax:**

```sql
CREATE TRIGGER trigger_name
{BEFORE | AFTER | INSTEAD OF}
{INSERT | UPDATE | DELETE}
ON table_name
[FOR EACH ROW]  -- Row-level vs Statement-level
[FOLLOWS | PRECEDES other_trigger]
[WHEN (condition)]
BEGIN
    -- Trigger logic here
END;
```

---

## **🎯 PART 2: ROW-LEVEL vs STATEMENT-LEVEL TRIGGERS**

### **Row-Level Triggers (FOR EACH ROW)**

```sql
-- Fires ONCE FOR EACH ROW affected
CREATE TRIGGER audit_salary_change
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    -- OLD.salary = value before update
    -- NEW.salary = value after update
    IF OLD.salary != NEW.salary THEN
        INSERT INTO salary_audit
        VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
    END IF;
END;
```

**Use when:** You need to access OLD/NEW values for each row

### **Statement-Level Triggers**

```sql
-- Fires ONCE FOR THE ENTIRE STATEMENT
CREATE TRIGGER log_bulk_delete
AFTER DELETE ON orders
FOR EACH STATEMENT  -- Some DBs: omit FOR EACH ROW
BEGIN
    INSERT INTO deletion_log
    VALUES ('orders', NOW(), USER());
END;
```

**Use when:** You don't need row-specific data, just want to log the operation

---

## **🔧 PART 3: THE MAGIC VARIABLES - OLD AND NEW**

### **Accessing Values in Triggers:**

```sql
-- In INSERT triggers: Only NEW exists
NEW.column_name  -- The value being inserted

-- In UPDATE triggers: Both OLD and NEW exist
OLD.column_name  -- Value before update
NEW.column_name  -- Value after update

-- In DELETE triggers: Only OLD exists
OLD.column_name  -- Value being deleted
```

### **Example: Comprehensive Audit Trigger**

```sql
CREATE TRIGGER audit_employee_changes
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    DECLARE change_description TEXT;

    -- Build change description
    SET change_description = CONCAT(
        'Employee ', OLD.id, ' updated: '
    );

    -- Check each field for changes
    IF OLD.name != NEW.name THEN
        SET change_description = CONCAT(
            change_description,
            'Name: ', OLD.name, ' → ', NEW.name, '; '
        );
    END IF;

    IF OLD.salary != NEW.salary THEN
        SET change_description = CONCAT(
            change_description,
            'Salary: ', OLD.salary, ' → ', NEW.salary, '; '
        );
    END IF;

    IF OLD.department_id != NEW.department_id THEN
        SET change_description = CONCAT(
            change_description,
            'Department: ', OLD.department_id, ' → ', NEW.department_id, '; '
        );
    END IF;

    -- Only log if something changed
    IF change_description != CONCAT('Employee ', OLD.id, ' updated: ') THEN
        INSERT INTO audit_log (
            table_name,
            record_id,
            operation,
            old_values,
            new_values,
            changed_by,
            changed_at
        ) VALUES (
            'employees',
            OLD.id,
            'UPDATE',
            JSON_OBJECT(
                'name', OLD.name,
                'salary', OLD.salary,
                'department_id', OLD.department_id
            ),
            JSON_OBJECT(
                'name', NEW.name,
                'salary', NEW.salary,
                'department_id', NEW.department_id
            ),
            CURRENT_USER(),
            NOW()
        );
    END IF;
END;
```

---

## **🎯 PART 4: BEFORE vs AFTER TRIGGERS - WHEN TO USE WHICH**

### **BEFORE Triggers - The "Gatekeepers"**

**Use for:** Validation, modification, prevention

```sql
-- Example 1: Data Validation
CREATE TRIGGER validate_employee_age
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.age < 18 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee must be at least 18 years old';
    END IF;

    IF NEW.age > 70 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee cannot be older than 70';
    END IF;
END;

-- Example 2: Auto-calculate derived columns
CREATE TRIGGER calculate_total_price
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    DECLARE unit_price DECIMAL(10,2);

    -- Get current price from products table
    SELECT price INTO unit_price
    FROM products
    WHERE id = NEW.product_id;

    -- Calculate total
    SET NEW.unit_price = unit_price;
    SET NEW.total_price = unit_price * NEW.quantity;
END;

-- Example 3: Auto-generate values
CREATE TRIGGER generate_order_number
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE next_number INT;

    -- Get next sequence number
    SELECT COALESCE(MAX(order_number), 0) + 1 INTO next_number
    FROM orders
    WHERE YEAR(order_date) = YEAR(NEW.order_date);

    SET NEW.order_number = CONCAT(
        'ORD-',
        YEAR(NEW.order_date),
        '-',
        LPAD(next_number, 6, '0')
    );
END;
```

### **AFTER Triggers - The "Reacters"**

**Use for:** Auditing, notifications, cascading updates

```sql
-- Example 1: Audit logging
CREATE TRIGGER log_salary_changes
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary != NEW.salary THEN
        INSERT INTO salary_history (
            employee_id,
            old_salary,
            new_salary,
            change_date,
            changed_by
        ) VALUES (
            OLD.id,
            OLD.salary,
            NEW.salary,
            NOW(),
            CURRENT_USER()
        );
    END IF;
END;

-- Example 2: Update denormalized data
CREATE TRIGGER update_department_stats
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    UPDATE department_stats ds
    SET employee_count = (
        SELECT COUNT(*)
        FROM employees
        WHERE department_id = NEW.department_id
    ),
    avg_salary = (
        SELECT AVG(salary)
        FROM employees
        WHERE department_id = NEW.department_id
    ),
    last_updated = NOW()
    WHERE ds.department_id = NEW.department_id;
END;

-- Example 3: Send notifications
CREATE TRIGGER notify_inventory_low
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.stock_quantity < NEW.reorder_level
       AND OLD.stock_quantity >= NEW.reorder_level THEN
        -- Stock just fell below reorder level
        INSERT INTO notifications (
            type,
            message,
            recipient,
            created_at
        ) VALUES (
            'inventory_alert',
            CONCAT('Product ', NEW.name, ' is low on stock. Current: ', NEW.stock_quantity),
            'inventory_manager@company.com',
            NOW()
        );
    END IF;
END;
```

---

## **🚀 PART 5: REAL-WORLD TRIGGER PATTERNS**

### **Pattern 1: Audit Trail System**

```sql
-- Master audit trigger (works for any table)
CREATE TRIGGER universal_audit_trigger
AFTER UPDATE ON any_table
FOR EACH ROW
BEGIN
    -- Dynamic table name (MySQL specific)
    SET @table_name = (SELECT TABLE_NAME
                       FROM INFORMATION_SCHEMA.TABLES
                       WHERE TABLE_SCHEMA = DATABASE()
                       LIMIT 1);

    INSERT INTO universal_audit (
        schema_name,
        table_name,
        operation,
        primary_key_value,
        old_data,
        new_data,
        changed_by,
        changed_at
    ) VALUES (
        DATABASE(),
        @table_name,
        'UPDATE',
        OLD.id,  -- Assuming primary key is 'id'
        JSON_OBJECT(
            'column1', OLD.column1,
            'column2', OLD.column2
            -- Add all columns...
        ),
        JSON_OBJECT(
            'column1', NEW.column1,
            'column2', NEW.column2
            -- Add all columns...
        ),
        CURRENT_USER(),
        NOW()
    );
END;
```

### **Pattern 2: Data Synchronization**

```sql
-- Keep summary tables in sync
CREATE TRIGGER sync_daily_sales_summary
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE existing_record INT;

    -- Check if summary exists for this date
    SELECT COUNT(*) INTO existing_record
    FROM daily_sales_summary
    WHERE sale_date = DATE(NEW.order_date);

    IF existing_record = 0 THEN
        -- Create new summary record
        INSERT INTO daily_sales_summary (
            sale_date,
            total_sales,
            order_count,
            last_updated
        ) VALUES (
            DATE(NEW.order_date),
            NEW.total_amount,
            1,
            NOW()
        );
    ELSE
        -- Update existing summary
        UPDATE daily_sales_summary
        SET total_sales = total_sales + NEW.total_amount,
            order_count = order_count + 1,
            last_updated = NOW()
        WHERE sale_date = DATE(NEW.order_date);
    END IF;
END;
```

### **Pattern 3: Complex Business Rules**

```sql
CREATE TRIGGER enforce_order_rules
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE customer_status VARCHAR(20);
    DECLARE total_credit DECIMAL(10,2);
    DECLARE credit_limit DECIMAL(10,2);

    -- Get customer info
    SELECT status, credit_limit INTO customer_status, credit_limit
    FROM customers
    WHERE id = NEW.customer_id;

    -- Rule 1: Check if customer is active
    IF customer_status != 'active' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot place order for inactive customer';
    END IF;

    -- Rule 2: Calculate total credit used
    SELECT COALESCE(SUM(total_amount), 0) INTO total_credit
    FROM orders
    WHERE customer_id = NEW.customer_id
      AND status IN ('pending', 'processing', 'shipped')
      AND payment_method = 'credit';

    -- Rule 3: Check credit limit
    IF NEW.payment_method = 'credit'
       AND (total_credit + NEW.total_amount) > credit_limit THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = CONCAT(
            'Credit limit exceeded. Available: ',
            credit_limit - total_credit
        );
    END IF;

    -- Rule 4: Minimum order amount
    IF NEW.total_amount < 10.00 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Minimum order amount is $10.00';
    END IF;

    -- Rule 5: Auto-assign status based on payment
    IF NEW.payment_method = 'credit' THEN
        SET NEW.status = 'pending_approval';
    ELSE
        SET NEW.status = 'confirmed';
    END IF;
END;
```

### **Pattern 4: Hierarchical Data Management**

```sql
-- Managing nested set model for categories
CREATE TRIGGER maintain_category_tree
AFTER INSERT ON categories
FOR EACH ROW
BEGIN
    DECLARE parent_right INT;

    -- Get parent's right value
    SELECT rgt INTO parent_right
    FROM categories
    WHERE id = NEW.parent_id;

    -- Make space for new node
    UPDATE categories
    SET lft = CASE WHEN lft > parent_right THEN lft + 2 ELSE lft END,
        rgt = rgt + 2
    WHERE rgt >= parent_right;

    -- Set new node's left and right
    UPDATE categories
    SET lft = parent_right,
        rgt = parent_right + 1
    WHERE id = NEW.id;
END;
```

---

## **🔧 PART 6: ADVANCED TRIGGER TECHNIQUES**

### **1. Conditional Triggers with WHEN Clause**

```sql
-- Fire only when specific conditions are met
CREATE TRIGGER log_high_value_transactions
AFTER INSERT ON transactions
FOR EACH ROW
WHEN (NEW.amount > 10000)
BEGIN
    INSERT INTO high_value_transaction_log (
        transaction_id,
        amount,
        customer_id,
        flagged_at,
        reviewed_by
    ) VALUES (
        NEW.id,
        NEW.amount,
        NEW.customer_id,
        NOW(),
        NULL
    );

    -- Auto-notify compliance officer
    INSERT INTO alerts (
        type,
        message,
        priority,
        created_at
    ) VALUES (
        'high_value_transaction',
        CONCAT('Transaction ', NEW.id, ' for $', NEW.amount),
        'high',
        NOW()
    );
END;
```

### **2. INSTEAD OF Triggers (For Views)**

```sql
-- Create a view
CREATE VIEW customer_orders_view AS
SELECT c.name, c.email, o.order_date, o.total_amount
FROM customers c
JOIN orders o ON c.id = o.customer_id;

-- Create INSTEAD OF trigger for the view
CREATE TRIGGER insert_customer_order
INSTEAD OF INSERT ON customer_orders_view
FOR EACH ROW
BEGIN
    DECLARE customer_id INT;

    -- Check if customer exists
    SELECT id INTO customer_id
    FROM customers
    WHERE email = NEW.email;

    IF customer_id IS NULL THEN
        -- Create new customer
        INSERT INTO customers (name, email)
        VALUES (NEW.name, NEW.email);

        SET customer_id = LAST_INSERT_ID();
    END IF;

    -- Insert order
    INSERT INTO orders (customer_id, order_date, total_amount)
    VALUES (customer_id, NEW.order_date, NEW.total_amount);
END;

-- Now you can insert into the view!
INSERT INTO customer_orders_view (name, email, order_date, total_amount)
VALUES ('John Doe', 'john@email.com', '2024-01-15', 199.99);
```

### **3. Compound Triggers (Oracle) / Multiple Actions**

```sql
-- MySQL/PostgreSQL: Multiple triggers for same event
-- Oracle: Single trigger with multiple timing points

-- MySQL example: Multiple BEFORE INSERT triggers
CREATE TRIGGER validate_order_before_insert
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    -- Validation logic
    IF NEW.total_amount <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order amount must be positive';
    END IF;
END;

CREATE TRIGGER set_order_defaults
BEFORE INSERT ON orders
FOR EACH ROW
FOLLOWS validate_order_before_insert  -- Execution order
BEGIN
    -- Set defaults
    IF NEW.order_date IS NULL THEN
        SET NEW.order_date = NOW();
    END IF;

    IF NEW.status IS NULL THEN
        SET NEW.status = 'pending';
    END IF;

    SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END;
```

### **4. Recursive Trigger Prevention**

```sql
-- Prevent infinite loops
CREATE TRIGGER update_product_stats
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    -- Check if this update came from trigger (using session variable)
    IF @updating_from_trigger IS NULL THEN
        SET @updating_from_trigger = 1;

        -- Update related statistics
        UPDATE product_statistics
        SET total_value = total_value + (NEW.price - OLD.price) * NEW.stock,
            last_updated = NOW()
        WHERE product_id = NEW.id;

        SET @updating_from_trigger = NULL;
    END IF;
END;
```

---

## **🎯 PART 7: TRIGGER MANAGEMENT & MAINTENANCE**

### **1. Viewing Existing Triggers**

```sql
-- MySQL
SHOW TRIGGERS;
SHOW TRIGGERS LIKE '%order%';
SHOW CREATE TRIGGER trigger_name;

-- PostgreSQL
SELECT * FROM information_schema.triggers;
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers
WHERE event_object_table = 'orders';

-- SQL Server
SELECT * FROM sys.triggers;
SELECT name, object_name(parent_id) AS table_name
FROM sys.triggers;
```

### **2. Disabling/Enabling Triggers**

```sql
-- MySQL (temporary during session)
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='';
-- Do bulk operation
SET SQL_MODE=@OLD_SQL_MODE;

-- PostgreSQL
ALTER TABLE table_name DISABLE TRIGGER trigger_name;
ALTER TABLE table_name ENABLE TRIGGER trigger_name;

-- SQL Server
DISABLE TRIGGER trigger_name ON table_name;
ENABLE TRIGGER trigger_name ON table_name;
```

### **3. Trigger Dependencies & Impact Analysis**

```sql
-- Find all triggers on a table
SELECT
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'employees'
ORDER BY action_timing, event_manipulation;

-- Find tables affected by a trigger
SELECT
    DISTINCT table_name
FROM information_schema.columns
WHERE table_schema = DATABASE()
  AND EXISTS (
      SELECT 1
      FROM information_schema.triggers t
      WHERE t.action_statement LIKE CONCAT('%', columns.table_name, '%')
        AND t.trigger_name = 'your_trigger_name'
  );
```

### **4. Performance Monitoring for Triggers**

```sql
-- Create trigger performance log
CREATE TABLE trigger_performance_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trigger_name VARCHAR(100),
    table_name VARCHAR(100),
    operation VARCHAR(50),
    rows_affected INT,
    execution_time_ms INT,
    executed_at DATETIME,
    error_message TEXT
);

-- Modified trigger with performance logging
CREATE TRIGGER audit_with_performance
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    DECLARE start_time BIGINT;
    DECLARE end_time BIGINT;
    DECLARE affected_rows INT DEFAULT 0;

    SET start_time = UNIX_TIMESTAMP(NOW(6)) * 1000000;

    BEGIN
        DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        BEGIN
            SET end_time = UNIX_TIMESTAMP(NOW(6)) * 1000000;
            INSERT INTO trigger_performance_log
            VALUES (NULL, 'audit_with_performance', 'employees',
                   'UPDATE', affected_rows,
                   (end_time - start_time)/1000, NOW(),
                   'Error occurred');
        END;

        -- Actual trigger logic
        IF OLD.salary != NEW.salary THEN
            INSERT INTO salary_audit
            VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
            SET affected_rows = affected_rows + 1;
        END IF;

        SET end_time = UNIX_TIMESTAMP(NOW(6)) * 1000000;

        INSERT INTO trigger_performance_log
        VALUES (NULL, 'audit_with_performance', 'employees',
               'UPDATE', affected_rows,
               (end_time - start_time)/1000, NOW(), NULL);
    END;
END;
```

---

## **🚨 PART 8: COMMON PITFALLS & SOLUTIONS**

### **Pitfall 1: Infinite Loops**

```sql
-- BAD: Trigger updates same table causing loop
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();  -- This is OK
    SET NEW.price = NEW.price * 1.1;  -- This causes loop if another update fires
END;

-- SOLUTION: Use session variable to detect recursion
CREATE TRIGGER update_timestamp_safe
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    IF @updating_products IS NULL THEN
        SET @updating_products = 1;

        SET NEW.updated_at = NOW();
        -- Other safe updates...

        SET @updating_products = NULL;
    END IF;
END;
```

### **Pitfall 2: Performance Issues**

```sql
-- BAD: Complex query in row-level trigger on bulk operations
CREATE TRIGGER update_stats_slow
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    -- This runs for EACH ROW in bulk insert!
    UPDATE product_stats
    SET total_sold = total_sold + NEW.quantity,
        last_sale = NOW()
    WHERE product_id = NEW.product_id;
END;

-- SOLUTION: Use statement-level or batch update
CREATE TRIGGER update_stats_fast
AFTER INSERT ON order_items
FOR EACH STATEMENT  -- Or handle in application code
BEGIN
    UPDATE product_stats ps
    JOIN (
        SELECT product_id, SUM(quantity) as total_quantity
        FROM inserted  -- SQL Server: special table
        GROUP BY product_id
    ) t ON ps.product_id = t.product_id
    SET ps.total_sold = ps.total_sold + t.total_quantity,
        ps.last_updated = NOW();
END;
```

### **Pitfall 3: Transaction Issues**

```sql
-- BAD: Trigger that can't rollback properly
CREATE TRIGGER log_order_changes
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    -- This insert happens even if main transaction fails!
    INSERT INTO order_change_log
    VALUES (OLD.id, OLD.status, NEW.status, NOW());
END;

-- SOLUTION: Check transaction state or use same transaction
-- Or better: Use BEFORE trigger
CREATE TRIGGER log_order_changes_safe
BEFORE UPDATE ON orders
FOR EACH ROW
BEGIN
    INSERT INTO order_change_log
    VALUES (OLD.id, OLD.status, NEW.status, NOW());
END;
```

---

## **🎯 PART 9: REAL-WORLD ENTERPRISE TRIGGER PATTERNS**

### **Pattern 1: Multi-Tenancy Data Isolation**

```sql
CREATE TRIGGER enforce_tenant_isolation
BEFORE INSERT ON shared_table
FOR EACH ROW
BEGIN
    DECLARE user_tenant_id INT;

    -- Get tenant_id from current user context
    SELECT tenant_id INTO user_tenant_id
    FROM users
    WHERE username = CURRENT_USER();

    -- Force tenant_id to match user's tenant
    SET NEW.tenant_id = user_tenant_id;

    -- Also validate on SELECT/UPDATE/DELETE via views
END;
```

### **Pattern 2: Soft Delete Implementation**

```sql
CREATE TRIGGER soft_delete_customer
INSTEAD OF DELETE ON customers_view
FOR EACH ROW
BEGIN
    UPDATE customers
    SET deleted_at = NOW(),
        deleted_by = CURRENT_USER(),
        is_active = FALSE
    WHERE id = OLD.id;

    -- Archive related data
    INSERT INTO deleted_customers_archive
    SELECT *, NOW()
    FROM customers
    WHERE id = OLD.id;
END;

-- Also need trigger for SELECT to filter deleted
CREATE TRIGGER filter_deleted_customers
INSTEAD OF SELECT ON customers_view
-- Implementation depends on DBMS
```

### **Pattern 3: Temporal Tables (Auto-history)**

```sql
CREATE TRIGGER maintain_employee_history
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Close previous history record
    UPDATE employee_history
    SET valid_to = NOW()
    WHERE employee_id = OLD.id
      AND valid_to = '9999-12-31';

    -- Insert new history record
    INSERT INTO employee_history (
        employee_id,
        name,
        salary,
        department_id,
        valid_from,
        valid_to
    ) VALUES (
        NEW.id,
        NEW.name,
        NEW.salary,
        NEW.department_id,
        NOW(),
        '9999-12-31'
    );
END;
```

### **Pattern 4: Data Quality Enforcement**

```sql
CREATE TRIGGER ensure_data_quality
BEFORE INSERT OR UPDATE ON customer_data
FOR EACH ROW
BEGIN
    -- Standardize phone numbers
    IF NEW.phone IS NOT NULL THEN
        SET NEW.phone = REGEXP_REPLACE(NEW.phone, '[^0-9]', '');

        IF LENGTH(NEW.phone) != 10 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Phone number must be 10 digits';
        END IF;
    END IF;

    -- Standardize email
    IF NEW.email IS NOT NULL THEN
        SET NEW.email = LOWER(TRIM(NEW.email));

        IF NEW.email NOT LIKE '%@%.%' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid email format';
        END IF;
    END IF;

    -- Auto-correct names
    SET NEW.first_name = CONCAT(
        UPPER(SUBSTRING(NEW.first_name, 1, 1)),
        LOWER(SUBSTRING(NEW.first_name, 2))
    );

    SET NEW.last_name = CONCAT(
        UPPER(SUBSTRING(NEW.last_name, 1, 1)),
        LOWER(SUBSTRING(NEW.last_name, 2))
    );

    -- Set audit columns
    SET NEW.created_at = COALESCE(NEW.created_at, NOW());
    SET NEW.updated_at = NOW();
    SET NEW.created_by = COALESCE(NEW.created_by, CURRENT_USER());
    SET NEW.updated_by = CURRENT_USER();
END;
```

---

## **🔧 PART 10: DEBUGGING & TESTING TRIGGERS**

### **1. Debug Trigger Execution**

```sql
-- Create debug log table
CREATE TABLE trigger_debug_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trigger_name VARCHAR(100),
    event_type VARCHAR(20),
    table_name VARCHAR(100),
    record_id INT,
    old_values JSON,
    new_values JSON,
    executed_at DATETIME(6),
    session_user VARCHAR(100)
);

-- Debug-enabled trigger
CREATE TRIGGER debug_employee_update
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Log trigger execution
    INSERT INTO trigger_debug_log (
        trigger_name,
        event_type,
        table_name,
        record_id,
        old_values,
        new_values,
        executed_at,
        session_user
    ) VALUES (
        'debug_employee_update',
        'UPDATE',
        'employees',
        OLD.id,
        JSON_OBJECT(
            'name', OLD.name,
            'salary', OLD.salary,
            'department_id', OLD.department_id
        ),
        JSON_OBJECT(
            'name', NEW.name,
            'salary', NEW.salary,
            'department_id', NEW.department_id
        ),
        NOW(6),
        CURRENT_USER()
    );

    -- Actual trigger logic here...
END;
```

### **2. Unit Testing Triggers**

```sql
-- Test table
CREATE TABLE trigger_test_results (
    test_name VARCHAR(100),
    expected_value VARCHAR(255),
    actual_value VARCHAR(255),
    test_result VARCHAR(20),
    tested_at DATETIME
);

-- Test procedure for audit trigger
CREATE PROCEDURE test_audit_trigger()
BEGIN
    DECLARE test_id INT;
    DECLARE audit_count_before INT;
    DECLARE audit_count_after INT;

    -- Setup: Create test employee
    INSERT INTO employees (name, salary, department_id)
    VALUES ('Test Employee', 50000, 1);

    SET test_id = LAST_INSERT_ID();

    -- Get baseline
    SELECT COUNT(*) INTO audit_count_before
    FROM salary_audit
    WHERE employee_id = test_id;

    -- Perform update (should trigger audit)
    UPDATE employees
    SET salary = 55000
    WHERE id = test_id;

    -- Check result
    SELECT COUNT(*) INTO audit_count_after
    FROM salary_audit
    WHERE employee_id = test_id;

    -- Assert
    INSERT INTO trigger_test_results
    VALUES (
        'audit_trigger_on_salary_change',
        '1',  -- Expected 1 audit record
        audit_count_after - audit_count_before,
        CASE WHEN (audit_count_after - audit_count_before) = 1
             THEN 'PASS' ELSE 'FAIL' END,
        NOW()
    );

    -- Cleanup
    DELETE FROM salary_audit WHERE employee_id = test_id;
    DELETE FROM employees WHERE id = test_id;

    -- Return results
    SELECT * FROM trigger_test_results
    WHERE test_name = 'audit_trigger_on_salary_change';
END;
```

### **3. Trigger Dependency Testing**

```sql
CREATE PROCEDURE test_trigger_dependencies()
BEGIN
    -- Test that trigger chain works correctly
    DECLARE order_count_before INT;
    DECLARE order_count_after INT;
    DECLARE inventory_count_before INT;
    DECLARE inventory_count_after INT;
    DECLARE notification_count_before INT;
    DECLARE notification_count_after INT;

    -- Get baseline counts
    SELECT COUNT(*) INTO order_count_before FROM orders;
    SELECT stock INTO inventory_count_before FROM products WHERE id = 1;
    SELECT COUNT(*) INTO notification_count_before FROM notifications;

    -- Perform action that should trigger chain
    INSERT INTO orders (customer_id, product_id, quantity)
    VALUES (1, 1, 2);

    -- Get after counts
    SELECT COUNT(*) INTO order_count_after FROM orders;
    SELECT stock INTO inventory_count_after FROM products WHERE id = 1;
    SELECT COUNT(*) INTO notification_count_after FROM notifications;

    -- Verify all triggers fired
    SELECT
        'Order inserted' AS check_point,
        order_count_before + 1 AS expected,
        order_count_after AS actual,
        CASE WHEN order_count_after = order_count_before + 1
             THEN '✓' ELSE '✗' END AS status
    UNION ALL
    SELECT
        'Inventory updated',
        inventory_count_before - 2,
        inventory_count_after,
        CASE WHEN inventory_count_after = inventory_count_before - 2
             THEN '✓' ELSE '✗' END
    UNION ALL
    SELECT
        'Notification sent',
        notification_count_before + 1,
        notification_count_after,
        CASE WHEN notification_count_after > notification_count_before
             THEN '✓' ELSE '✗' END;
END;
```

---

## **📊 PART 11: PERFORMANCE OPTIMIZATION**

### **1. Minimize Trigger Overhead**

```sql
-- BAD: Complex calculations in row-level trigger
CREATE TRIGGER slow_calculation
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    -- Heavy calculation for each row
    SET @discount = calculate_complex_discount(NEW.customer_id, NEW.product_id);
    SET @tax = calculate_tax(NEW.quantity * NEW.price, NEW.customer_state);
    -- ... more calculations
END;

-- GOOD: Batch processing
CREATE TRIGGER fast_calculation
AFTER INSERT ON order_items
FOR EACH STATEMENT  -- Or use scheduled job
BEGIN
    -- Process in batch
    UPDATE order_items oi
    JOIN (
        SELECT customer_id, product_id,
               calculate_complex_discount(customer_id, product_id) as discount
        FROM inserted
        GROUP BY customer_id, product_id
    ) calc ON oi.customer_id = calc.customer_id
           AND oi.product_id = calc.product_id
    SET oi.discount = calc.discount;
END;
```

### **2. Index-Friendly Triggers**

```sql
-- BAD: Trigger that prevents index usage
CREATE TRIGGER bad_validation
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Function on indexed column prevents index usage
    IF UPPER(NEW.email) != NEW.email THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email must be uppercase';
    END IF;
END;

-- GOOD: Store pre-computed values
CREATE TRIGGER good_validation
BEFORE INSERT OR UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Store uppercase version in separate column
    SET NEW.email_upper = UPPER(NEW.email);

    -- Index on email_upper can be used
    IF EXISTS (
        SELECT 1 FROM employees
        WHERE email_upper = NEW.email_upper
          AND id != NEW.id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Duplicate email';
    END IF;
END;
```

### **3. Asynchronous Processing**

```sql
-- For non-critical operations, use queue
CREATE TRIGGER async_notification
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    -- Instead of sending email directly (slow)
    -- Queue it for background processing
    INSERT INTO notification_queue (
        type,
        recipient,
        data,
        status,
        created_at
    ) VALUES (
        'order_confirmation',
        (SELECT email FROM customers WHERE id = NEW.customer_id),
        JSON_OBJECT('order_id', NEW.id, 'amount', NEW.total_amount),
        'pending',
        NOW()
    );
END;
```

---

## **🎯 THE ULTIMATE TRIGGER DECISION GUIDE**

### **Should you use a trigger? Ask these questions:**

1. **Is the logic data-centric?** (YES → Consider trigger)
2. **Do you need it to ALWAYS happen?** (YES → Trigger is good)
3. **Will multiple applications modify this data?** (YES → Centralize in trigger)
4. **Is it performance-critical on bulk operations?** (NO → Trigger might be OK)
5. **Can it be done in application code instead?** (Sometimes better in app)

### **When to AVOID triggers:**

- Complex business logic (better in application layer)
- External system calls (email, APIs)
- Performance-critical bulk operations
- When logic changes frequently
- When you need detailed error handling

### **When to USE triggers:**

- Audit trails
- Data validation
- Denormalized data maintenance
- Auto-generated values
- Referential integrity (when FKs aren't enough)
- Multi-tenant data isolation

---

## **🔥 DAILY PRACTICE EXERCISES**

### **Week 1: Basic Triggers**

```sql
-- Day 1: Create audit trigger for employee updates
-- Day 2: Create validation trigger for email format
-- Day 3: Create trigger to auto-update timestamps
-- Day 4: Create trigger to maintain summary tables
-- Day 5: Create trigger to prevent certain deletions
```

### **Week 2: Intermediate Triggers**

```sql
-- Day 1: Create INSTEAD OF trigger for a view
-- Day 2: Create trigger with conditional logic (WHEN)
-- Day 3: Create trigger that calls stored procedure
-- Day 4: Create recursive trigger (with loop prevention)
-- Day 5: Create multi-event trigger (INSERT/UPDATE)
```

### **Week 3: Advanced Patterns**

```sql
-- Day 1: Implement temporal table pattern
-- Day 2: Create soft delete system with triggers
-- Day 3: Implement data quality framework
-- Day 4: Create multi-tenant isolation triggers
-- Day 5: Build complete audit trail system
```

### **Week 4: Performance & Maintenance**

```sql
-- Day 1: Optimize slow triggers
-- Day 2: Create trigger monitoring system
-- Day 3: Test trigger dependencies
-- Day 4: Handle trigger errors gracefully
-- Day 5: Document trigger architecture
```

---

## **🚀 YOUR TRIGGER IMPLEMENTATION CHECKLIST**

Before deploying any trigger, verify:

### **Design Phase:**

- [ ] Purpose clearly defined
- [ ] Timing (BEFORE/AFTER) chosen correctly
- [ ] Row-level vs statement-level decision made
- [ ] Error handling planned
- [ ] Performance impact assessed

### **Development Phase:**

- [ ] No infinite loops possible
- [ ] Bulk operation friendly
- [ ] Transaction-safe
- [ ] Properly handles NULL values
- [ ] Includes debugging/logging

### **Testing Phase:**

- [ ] Unit tests written
- [ ] Bulk operation tests
- [ ] Concurrent access tests
- [ ] Rollback scenarios tested
- [ ] Performance benchmarks

### **Deployment Phase:**

- [ ] Documentation complete
- [ ] Rollback plan ready
- [ ] Monitoring in place
- [ ] Team trained on behavior
- [ ] Impact analysis done

---

## **💡 GOLDEN RULES OF TRIGGERS**

1. **Keep triggers simple** - They should do ONE thing well
2. **Avoid business logic** in triggers when possible
3. **Test with bulk operations** - Your trigger will be used this way
4. **Document assumptions** - What the trigger expects/guarantees
5. **Monitor performance** - Triggers can become invisible bottlenecks
6. **Have an escape hatch** - Way to disable if needed
7. **Consider alternatives** - Check constraints, computed columns, etc.

---

## **🎯 FINAL THOUGHT: TRIGGERS AS DATABASE MUSCLE MEMORY**

Think of triggers as your database's **muscle memory** - automatic reactions to common situations. Like muscle memory, they should be:

- **Reliable** (always work the same way)
- **Fast** (don't slow you down)
- **Appropriate** (right response for the situation)
- **Unconscious** (you don't have to think about them)

**Start small:** Create one simple audit trigger today. Tomorrow, add validation. Build up your database's "muscle memory" gradually!

**Remember:** With great power (triggers) comes great responsibility. Use them wisely! 🚀

<!------------------------
















 ----------------->

# **🎯 THE 10 IMMORTAL PATTERNS - MASTER THESE, CONQUER ALL SQL**

## **🔥 PATTERN 1: THE "FIND MISSING" PATTERN**

### **Brain Imprint: "LEFT JOIN + NULL Check"**

```sql
SELECT A.*
FROM TableA A
LEFT JOIN TableB B ON A.id = B.a_id
WHERE B.a_id IS NULL;
```

### **Why This Works:**

```
TableA: [1, 2, 3, 4, 5]
TableB: [1, 3, 5]

LEFT JOIN gives:
A.id | B.a_id
1    | 1    ← Has match
2    | NULL ← MISSING!
3    | 3    ← Has match
4    | NULL ← MISSING!
5    | 5    ← Has match

WHERE B.a_id IS NULL → Gets 2 and 4
```

### **Real-World Applications:**

1. **Employees without department**
2. **Products never sold**
3. **Customers with no orders**
4. **Students not enrolled in any course**
5. **Tasks not assigned to anyone**

### **Visual Memory Hook:**

```
A───┐
    ├─→ B  (Connected)
A───┤
    ├─→ NULL  ← MISSING! (This is what we want)
A───┘
```

### **Forever Memory Technique:**

**Story:** Imagine going to a party (TableA). You LEFT JOIN with your friends list (TableB). WHERE friend IS NULL means "people at party not on your friends list" → You found missing connections!

---

## **🔥 PATTERN 2: THE "FIND DUPLICATES" PATTERN**

### **Brain Imprint: "GROUP BY + HAVING COUNT > 1"**

```sql
SELECT column1, column2, COUNT(*)
FROM table
GROUP BY column1, column2
HAVING COUNT(*) > 1;
```

### **Why This Works:**

```
Data: [(A,1), (A,1), (B,2), (A,1), (C,3)]

GROUP BY:
(A,1) → COUNT = 3  ← DUPLICATE!
(B,2) → COUNT = 1
(C,3) → COUNT = 1

HAVING COUNT(*) > 1 → Keeps only (A,1)
```

### **Real-World Applications:**

1. **Duplicate email addresses**
2. **Repeated order numbers**
3. **Multiple phone registrations**
4. **Duplicate product entries**
5. **Repeated transaction IDs**

### **Visual Memory Hook:**

```
📦📦📦 (Group A) → COUNT=3 → Duplicate!
📦 (Group B) → COUNT=1
📦 (Group C) → COUNT=1
```

### **Forever Memory Technique:**

**Analogy:** Like counting identical toys in boxes. GROUP BY = put same toys together, COUNT = count them, HAVING COUNT > 1 = find boxes with duplicates!

---

## **🔥 PATTERN 3: THE "TOP N PER GROUP" PATTERN**

### **Brain Imprint: "ROW_NUMBER + PARTITION BY + Filter"**

```sql
SELECT * FROM (
  SELECT *,
    ROW_NUMBER() OVER(PARTITION BY group_column ORDER BY value_column DESC) as rn
  FROM table
) WHERE rn <= N;
```

### **Why This Works:**

```
Department A: [John:100, Mike:90, Sara:85]
Department B: [Bob:95, Alice:88]

ROW_NUMBER per department (ORDER BY salary DESC):
Dept A: John(rn=1), Mike(rn=2), Sara(rn=3)
Dept B: Bob(rn=1), Alice(rn=2)

WHERE rn <= 2 → Top 2 from each department
```

### **Real-World Applications:**

1. **Top 3 selling products per category**
2. **Highest paid employees per department**
3. **Most recent orders per customer**
4. **Best students per class**
5. **Latest comments per post**

### **Visual Memory Hook:**

```
🏢 Department A
   🥇 Employee1 (rn=1)
   🥈 Employee2 (rn=2)
   🥉 Employee3 (rn=3)

🏢 Department B
   🥇 Employee1 (rn=1)
   🥈 Employee2 (rn=2)

Filter: rn <= 2 → Takes 🥇🥈 from each
```

### **Forever Memory Technique:**

**Story:** Imagine a sports tournament with multiple categories (PARTITION BY category). ROW_NUMBER gives rankings (1st, 2nd, 3rd). WHERE rn <= N means "give me top N from each category."

---

## **🔥 PATTERN 4: THE "RUNNING TOTAL" PATTERN**

### **Brain Imprint: "SUM() OVER(ORDER BY)"**

```sql
SELECT date, amount,
  SUM(amount) OVER(ORDER BY date) as running_total
FROM transactions;
```

### **Why This Works:**

```
Day 1: $100 → Running Total: $100
Day 2: $200 → Running Total: $300 ($100 + $200)
Day 3: $150 → Running Total: $450 ($300 + $150)
```

### **Real-World Applications:**

1. **Cumulative sales**
2. **Bank account balance over time**
3. **Total website visitors**
4. **Inventory accumulation**
5. **Project progress tracking**

### **Visual Memory Hook:**

```
📊 Day1: $100 → 🏦 $100
📊 Day2: $200 → 🏦 $300
📊 Day3: $150 → 🏦 $450
```

**SUM() OVER keeps adding to the piggy bank!**

### **Forever Memory Technique:**

**Analogy:** Like a piggy bank where you add money daily. SUM() OVER(ORDER BY date) = "Keep adding to the total as days pass."

---

## **🔥 PATTERN 5: THE "COMPARE TO PREVIOUS/NEXT" PATTERN**

### **Brain Imprint: "LAG()/LEAD() OVER(ORDER BY)"**

```sql
SELECT month, sales,
  LAG(sales) OVER(ORDER BY month) as prev_month_sales,
  sales - LAG(sales) OVER(ORDER BY month) as growth
FROM monthly_sales;
```

### **Why This Works:**

```
Month | Sales | LAG(sales) | Growth
Jan   | 100   | NULL       | NULL
Feb   | 120   | 100        | 20  (120-100)
Mar   | 110   | 120        | -10 (110-120)

LEAD would look forward:
Jan   | 100   | 120        | -20 (looking ahead to Feb)
```

### **Real-World Applications:**

1. **Month-over-month growth**
2. **Daily price changes**
3. **Temperature variations**
4. **Stock price movements**
5. **Website traffic changes**

### **Visual Memory Hook:**

```
📅 Jan: 100
    ↓ LAG looks back (NULL)
📅 Feb: 120
    ↓ LAG looks back (100) ← COMPARE!
📅 Mar: 110
    ↓ LAG looks back (120) ← COMPARE!
```

### **Forever Memory Technique:**

**Memory Palace:** Imagine a timeline. LAG() = look over your LEFT shoulder (backward). LEAD() = look over your RIGHT shoulder (forward). OVER(ORDER BY) = walk along the timeline.

---

## **🔥 PATTERN 6: THE "MOVING AVERAGE" PATTERN**

### **Brain Imprint: "AVG() OVER(ROWS BETWEEN N PRECEDING)"**

```sql
SELECT date, sales,
  AVG(sales) OVER(ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as weekly_avg
FROM daily_sales;
```

### **Why This Works:**

```
Day 1-7: [100,110,105,115,120,125,130]
Day 7 avg = (100+110+105+115+120+125+130)/7

ROWS BETWEEN 6 PRECEDING AND CURRENT ROW =
"Take current row + 6 rows before for average"
```

### **Real-World Applications:**

1. **7-day moving average of stock prices**
2. **Rolling 30-day revenue**
3. **Trailing 12-month performance**
4. **Smooth sensor data**
5. **Trend analysis**

### **Visual Memory Hook:**

```
📈 Day1: 100
📈 Day2: 110
📈 Day3: 105
📈 Day4: 115
📈 Day5: 120
📈 Day6: 125
📈 Day7: 130  ← Window: [Day1-Day7] → Average
```

### **Forever Memory Technique:**

**Analogy:** Like a moving car window. ROWS BETWEEN 6 PRECEDING AND CURRENT ROW = "Look through a window that shows last 7 days (including today)."

---

## **🔥 PATTERN 7: THE "CONSECUTIVE DAYS" PATTERN**

### **Brain Imprint: "Date - ROW_NUMBER() Grouping Trick"**

```sql
WITH numbered_dates AS (
  SELECT date,
    date - INTERVAL ROW_NUMBER() OVER(ORDER BY date) DAY as grp
  FROM attendance
)
SELECT MIN(date) as start_date, MAX(date) as end_date
FROM numbered_dates
GROUP BY grp;
```

### **Why This Works (Magic!):**

```
Dates: Jan1, Jan2, Jan3, Jan5, Jan6, Jan7

ROW_NUMBER: 1,2,3,4,5,6
date - ROW_NUMBER days:
Jan1 - 1 = Dec31
Jan2 - 2 = Dec31
Jan3 - 3 = Dec31  ← Same grp! Consecutive!
Jan5 - 4 = Jan1
Jan6 - 5 = Jan1
Jan7 - 6 = Jan1    ← Same grp! Consecutive!

GROUP BY grp → Finds consecutive streaks!
```

### **Real-World Applications:**

1. **Login streaks**
2. **Consecutive work days**
3. **Daily exercise streaks**
4. **Attendance patterns**
5. **Stock market up/down streaks**

### **Visual Memory Hook:**

```
📅 Jan1: Row1 → Jan1 - 1 = Dec31
📅 Jan2: Row2 → Jan2 - 2 = Dec31  ← SAME! (Consecutive)
📅 Jan3: Row3 → Jan3 - 3 = Dec31  ← SAME! (Consecutive)
📅 Jan5: Row4 → Jan5 - 4 = Jan1   ← DIFFERENT! (Gap)
```

### **Forever Memory Technique:**

**Memory Hook:** Dates that are consecutive will "cancel out" when you subtract their row number. Like magic subtraction that reveals patterns!

---

## **🔥 PATTERN 8: THE "HIERARCHY/TREE" PATTERN**

### **Brain Imprint: "WITH RECURSIVE CTE"**

```sql
WITH RECURSIVE org_chart AS (
  -- Anchor: Start with CEO (no manager)
  SELECT id, name, manager_id, 1 as level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: Find subordinates
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart;
```

### **Why This Works:**

```
CEO (level 1)
├── Manager A (level 2)
│   ├── Employee 1 (level 3)
│   └── Employee 2 (level 3)
└── Manager B (level 2)
    └── Employee 3 (level 3)

Recursive CTE walks down the tree level by level
```

### **Real-World Applications:**

1. **Organization charts**
2. **Category hierarchies**
3. **Bill of materials**
4. **Forum comment threads**
5. **File system structures**

### **Visual Memory Hook:**

```
🌳 CEO (Anchor - starts the tree)
  └─🌿 Manager A (Recursive join: manager_id = CEO.id)
      └─🍃 Employee 1 (Recursive join: manager_id = Manager A.id)
```

### **Forever Memory Technique:**

**Story:** It's a family tree! Anchor = grandparents, Recursive = find their children, then grandchildren, etc. It's SQL's way of saying "and then their children, and then their children..."

---

## **🔥 PATTERN 9: THE "PIVOT DATA" PATTERN**

### **Brain Imprint: "CASE in SELECT with GROUP BY"**

```sql
SELECT
  product_id,
  SUM(CASE WHEN month = 'Jan' THEN sales END) as Jan,
  SUM(CASE WHEN month = 'Feb' THEN sales END) as Feb,
  SUM(CASE WHEN month = 'Mar' THEN sales END) as Mar
FROM monthly_sales
GROUP BY product_id;
```

### **Why This Works:**

```
Original (long format):
Product | Month | Sales
A       | Jan   | 100
A       | Feb   | 150
B       | Jan   | 200

After Pivot (wide format):
Product | Jan  | Feb
A       | 100  | 150
B       | 200  | NULL
```

### **Real-World Applications:**

1. **Monthly sales reports**
2. **Survey data aggregation**
3. **Student grades by subject**
4. **Website metrics by day**
5. **Financial statements**

### **Visual Memory Hook:**

```
📊 Before:           📊 After:
Row1: A, Jan, 100    Product | Jan  | Feb
Row2: A, Feb, 150    --------------------
Row3: B, Jan, 200    A       | 100  | 150
                     B       | 200  |
```

### **Forever Memory Technique:**

**Analogy:** Like making a spreadsheet! Rows become columns. CASE statements = "If month is Jan, put sales in Jan column, else NULL." SUM with GROUP BY collapses multiple rows.

---

## **🔥 PATTERN 10: THE "PERCENT OF TOTAL" PATTERN**

### **Brain Imprint: "SUM() OVER() / Total"**

```sql
SELECT
  category,
  sales,
  sales * 100.0 / SUM(sales) OVER() as percent_of_total
FROM category_sales;
```

### **Why This Works:**

```
Category | Sales
Electronics | 5000
Clothing    | 3000
Books       | 2000
Total       | 10000

Percentages:
Electronics: 5000/10000 = 50%
Clothing: 3000/10000 = 30%
Books: 2000/10000 = 20%
```

### **Real-World Applications:**

1. **Market share analysis**
2. **Budget allocation percentages**
3. **Website traffic sources**
4. **Product category contributions**
5. **Department expense breakdown**

### **Visual Memory Hook:**

```
🍕 Pizza: 8 slices = 100%
You eat 2 slices → 2/8 = 25% of total pizza

SUM(sales) OVER() = total pizza slices
sales = your slices
```

### **Forever Memory Technique:**

**Analogy:** Like calculating what percentage of pizza you ate. SUM() OVER() = whole pizza, your slices = category sales, percentage = your contribution!

---

## **🧠 THE ULTIMATE MEMORY PALACE**

Imagine a **SQL DOJO** with 10 rooms. Each room teaches one pattern:

### **Room 1: Detective Room (Find Missing)**

- Left Join + Null Check posters
- Missing persons case files

### **Room 2: Counting Room (Find Duplicates)**

- Group By bins everywhere
- Counters on each bin

### **Room 3: Ranking Room (Top N per Group)**

- Olympic podiums (🥇🥈🥉)
- Row_Number() scoreboards

### **Room 4: Accumulator Room (Running Total)**

- Piggy banks filling up
- SUM() OVER() conveyor belts

### **Room 5: Time Travel Room (Compare Previous)**

- LAG() = look backward mirror
- LEAD() = look forward telescope

### **Room 6: Smoothing Room (Moving Average)**

- Sliding windows
- AVG() OVER() rolling pins

### **Room 7: Streak Room (Consecutive Days)**

- Calendar wall with ROW_NUMBER() trick
- Streak counter machines

### **Room 8: Tree Room (Hierarchy)**

- Family tree diagrams
- WITH RECURSIVE elevators

### **Room 9: Transformer Room (Pivot Data)**

- Row-to-column machines
- CASE statement switches

### **Room 10: Percentage Room (Percent of Total)**

- Pie chart makers
- Division calculators

**Walk through this palace daily in your mind!**

---

## **🎯 THE PATTERN RECOGNITION FLOWCHART**

```
START with any SQL problem
↓
Is it about FINDING something missing?
├─ YES → PATTERN 1: LEFT JOIN + NULL
│
Is it about FINDING duplicates?
├─ YES → PATTERN 2: GROUP BY + COUNT > 1
│
Is it about TOP N within categories?
├─ YES → PATTERN 3: ROW_NUMBER + PARTITION
│
Is it about CUMULATIVE totals?
├─ YES → PATTERN 4: SUM() OVER(ORDER BY)
│
Is it about COMPARING to previous/next?
├─ YES → PATTERN 5: LAG()/LEAD()
│
Is it about SMOOTHING data over time?
├─ YES → PATTERN 6: AVG() OVER(ROWS N PRECEDING)
│
Is it about CONSECUTIVE streaks?
├─ YES → PATTERN 7: Date - ROW_NUMBER() trick
│
Is it about HIERARCHY/tree traversal?
├─ YES → PATTERN 8: WITH RECURSIVE
│
Is it about ROWS to COLUMNS transformation?
├─ YES → PATTERN 9: CASE in SELECT + GROUP BY
│
Is it about PERCENTAGE calculations?
└─ YES → PATTERN 10: value / SUM() OVER()
```

---

## **🔥 THE DAILY 10-MINUTE PATTERN DRILL**

**Every morning, write these from memory:**

1. **Pattern 1:** `SELECT A.* FROM A LEFT JOIN B ON A.id=B.id WHERE B.id IS NULL;`
2. **Pattern 2:** `SELECT col, COUNT(*) FROM t GROUP BY col HAVING COUNT(*)>1;`
3. **Pattern 3:** `SELECT * FROM (SELECT *, ROW_NUMBER() OVER(PARTITION BY g ORDER BY v DESC) rn FROM t) WHERE rn<=N;`
4. **Pattern 4:** `SELECT date, SUM(amt) OVER(ORDER BY date) rt FROM sales;`
5. **Pattern 5:** `SELECT val, LAG(val) OVER(ORDER BY date) prev FROM t;`
6. **Pattern 6:** `SELECT date, AVG(val) OVER(ORDER BY date ROWS 6 PRECEDING) ma FROM t;`
7. **Pattern 7:** `SELECT MIN(d), MAX(d) FROM (SELECT d, d-ROW_NUMBER() OVER(ORDER BY d) grp FROM t) GROUP BY grp;`
8. **Pattern 8:** `WITH RECURSIVE t AS (SELECT ... UNION ALL SELECT ... FROM t JOIN ...) SELECT * FROM t;`
9. **Pattern 9:** `SELECT id, SUM(CASE WHEN m='Jan' THEN s END) Jan FROM t GROUP BY id;`
10. **Pattern 10:** `SELECT val, val*100.0/SUM(val) OVER() pct FROM t;`

**Do this for 21 days. Patterns become muscle memory.**

---

## **💡 PATTERN COMBINATIONS - REAL WORLD SCENARIOS**

### **Scenario: "Find customers who haven't ordered in 30 days, but spent over $1000"**

```sql
-- Pattern 1 + Pattern 10
WITH customer_totals AS (
  SELECT customer_id, SUM(amount) as total_spent  -- Aggregation
  FROM orders
  GROUP BY customer_id
  HAVING SUM(amount) > 1000  -- Pattern 2 (filter groups)
),
recent_customers AS (
  SELECT DISTINCT customer_id  -- Pattern 1 concept
  FROM orders
  WHERE order_date > CURRENT_DATE - 30
)
SELECT ct.*
FROM customer_totals ct
LEFT JOIN recent_customers rc ON ct.customer_id = rc.customer_id
WHERE rc.customer_id IS NULL;  -- Pattern 1 complete
```

### **Scenario: "Weekly report with running totals and growth"**

```sql
-- Pattern 4 + Pattern 5 + Pattern 10
SELECT
  week,
  sales,
  SUM(sales) OVER(ORDER BY week) as running_total,  -- Pattern 4
  sales - LAG(sales) OVER(ORDER BY week) as weekly_growth,  -- Pattern 5
  sales * 100.0 / SUM(sales) OVER() as percent_of_total  -- Pattern 10
FROM weekly_sales;
```

---

## **🎮 GAMIFY YOUR LEARNING**

### **Level 1: Apprentice (Recognize Patterns)**

- Given problem, name the pattern
- Time limit: 30 seconds per problem

### **Level 2: Practitioner (Write Pattern)**

- Given pattern name, write the SQL skeleton
- Time limit: 1 minute per pattern

### **Level 3: Master (Combine Patterns)**

- Solve real problems combining 2+ patterns
- Time limit: 5 minutes per problem

### **Level 4: Grandmaster (Optimize Patterns)**

- Rewrite patterns for better performance
- Explain why they work

---

## **🚨 EMERGENCY PATTERN RECALL CARD**

Keep this image in mind:

```
┌─────────────────────────────────────────────────────┐
│               10 SQL PATTERNS - SAVE THIS!          │
├─────────────────────────────────────────────────────┤
│ 1. Missing → LEFT JOIN + WHERE IS NULL              │
│ 2. Duplicates → GROUP BY + HAVING COUNT>1           │
│ 3. Top N → ROW_NUMBER + PARTITION + Filter          │
│ 4. Running → SUM() OVER(ORDER BY)                   │
│ 5. Compare → LAG()/LEAD() OVER(ORDER BY)            │
│ 6. Smooth → AVG() OVER(ROWS N PRECEDING)            │
│ 7. Streak → Date - ROW_NUMBER() trick               │
│ 8. Tree → WITH RECURSIVE                            │
│ 9. Pivot → CASE in SELECT + GROUP BY                │
│10. Percent → value / SUM() OVER()                   │
└─────────────────────────────────────────────────────┘
```

---

## **🎯 FINAL MASTERY EXERCISE**

**For the next 10 days:**

- **Day 1-3:** Master Patterns 1-3 (Find Missing, Duplicates, Top N)
- **Day 4-6:** Master Patterns 4-6 (Running, Compare, Smooth)
- **Day 7-9:** Master Patterns 7-10 (Streak, Tree, Pivot, Percent)
- **Day 10:** Combine all patterns in one complex query

**Your query for Day 10 should include:**

1. A LEFT JOIN with NULL check
2. A GROUP BY with HAVING
3. A window function with PARTITION BY
4. A recursive CTE or LAG/LEAD
5. A percentage calculation

---

**Remember:** These 10 patterns are like **chess openings**. Once you know them, you can handle any position (SQL problem) that comes your way.

**You don't need to memorize 1000 queries. You need to MASTER 10 patterns.**

**Start today. Practice one pattern. Tomorrow, another. In 10 days, you'll be unstoppable.** 🚀
