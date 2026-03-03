Here's the **Ultimate SQL Mental Cheat Sheet** - designed to be tattooed in your brain, not just memorized.

---

## **🎯 THE CORE ALGORITHMS - Remember THESE, Forget Everything Else**

### **1. THE DUPLICATE FINDER**

```sql
SELECT columns, COUNT(*)
FROM table
GROUP BY columns
HAVING COUNT(*) > 1;
```

**Brain Tag:** `"Find duplicates" = GROUP BY + HAVING COUNT > 1`

### **2. THE SECOND HIGHEST PATTERN**

```sql
-- Method A: Simple
SELECT MAX(column)
FROM table
WHERE column < (SELECT MAX(column) FROM table);

-- Method B: Flexible (Nth highest)
SELECT DISTINCT column
FROM table
ORDER BY column DESC
OFFSET N-1 LIMIT 1;

-- Method C: With ranking
SELECT column FROM (
  SELECT column, DENSE_RANK() OVER(ORDER BY column DESC) as rnk
  FROM table
) WHERE rnk = 2;
```

**Brain Tag:** `"Second highest" = MAX where < MAX or DENSE_RANK=2`

### **3. THE MISSING DATA DETECTOR**

```sql
SELECT A.*
FROM TableA A
LEFT JOIN TableB B ON A.key = B.key
WHERE B.key IS NULL;
```

**Brain Tag:** `"Find missing" = LEFT JOIN + WHERE NULL`

### **4. THE TOP-N PER GROUP ENGINE**

```sql
SELECT * FROM (
  SELECT *,
    ROW_NUMBER() OVER(PARTITION BY group_column ORDER BY value_column DESC) as rn
  FROM table
) WHERE rn <= N;
```

**Brain Tag:** `"Top N per group" = ROW_NUMBER() + PARTITION BY + filter rn`

### **5. THE RUNNING TOTAL CALCULATOR**

```sql
SELECT date, amount,
  SUM(amount) OVER(ORDER BY date) as running_total
FROM sales;
```

**Brain Tag:** `"Running total" = SUM() OVER(ORDER BY)`

### **6. THE PREVIOUS/NEXT COMPARATOR**

```sql
SELECT date, amount,
  LAG(amount) OVER(ORDER BY date) as prev_amount,
  LEAD(amount) OVER(ORDER BY date) as next_amount
FROM sales;
```

**Brain Tag:** `"Compare to adjacent" = LAG()/LEAD() OVER(ORDER BY)`

### **7. THE MOVING AVERAGE SMOOTHER**

```sql
SELECT date, amount,
  AVG(amount) OVER(ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg
FROM sales;
```

**Brain Tag:** `"Moving average" = AVG() OVER(ROWS N PRECEDING)`

### **8. THE HIERARCHY NAVIGATOR**

```sql
WITH RECURSIVE cte AS (
  SELECT id, name, manager_id, 1 as level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, c.level + 1
  FROM employees e JOIN cte c ON e.manager_id = c.id
)
SELECT * FROM cte;
```

**Brain Tag:** `"Hierarchy/Tree" = WITH RECURSIVE`

### **9. THE GAP-ISLAND DETECTOR**

```sql
WITH cte AS (
  SELECT date,
    date - INTERVAL '1 day' * ROW_NUMBER() OVER(ORDER BY date) as grp
  FROM table
)
SELECT MIN(date) as start_date, MAX(date) as end_date
FROM cte
GROUP BY grp;
```

**Brain Tag:** `"Consecutive/gaps" = date - ROW_NUMBER() trick`

### **10. THE PIVOT MASTER**

```sql
SELECT
  id,
  SUM(CASE WHEN month = 'Jan' THEN sales END) as Jan,
  SUM(CASE WHEN month = 'Feb' THEN sales END) as Feb
FROM sales
GROUP BY id;
```

**Brain Tag:** `"Rows to columns" = CASE in SUM() + GROUP BY`

---

## **🧠 THE DECISION TREE - What to Use When?**

```
START
  ↓
Are you finding MISSING records? → Use PATTERN #3 (LEFT JOIN + NULL)
  ↓
Are you finding DUPLICATES? → Use PATTERN #1 (GROUP BY + COUNT>1)
  ↓
Are you finding TOP N per GROUP? → Use PATTERN #4 (ROW_NUMBER + PARTITION)
  ↓
Are you comparing to PREVIOUS/NEXT? → Use PATTERN #6 (LAG/LEAD)
  ↓
Need RUNNING totals? → Use PATTERN #5 (SUM OVER)
  ↓
Need MOVING averages? → Use PATTERN #7 (AVG OVER ROWS)
  ↓
Working with HIERARCHY? → Use PATTERN #8 (RECURSIVE CTE)
  ↓
Finding CONSECUTIVE records? → Use PATTERN #9 (Gap-Island)
  ↓
Need to PIVOT data? → Use PATTERN #10 (CASE in SELECT)
  ↓
Simple aggregation? → GROUP BY
  ↓
Complex logic? → CTE to break it down
```

---

## **🔢 THE 10 COMMANDMENTS OF SQL**

1. **For missing data**: `LEFT JOIN + WHERE right.key IS NULL`
2. **For duplicates**: `GROUP BY + HAVING COUNT(*) > 1`
3. **For ranking**: `ROW_NUMBER()/RANK() OVER(PARTITION BY ORDER BY)`
4. **For trends**: `LAG()/LEAD() OVER(ORDER BY)`
5. **For running totals**: `SUM() OVER(ORDER BY)`
6. **For top N per group**: `ROW_NUMBER() + filter rn <= N`
7. **For hierarchy**: `WITH RECURSIVE`
8. **For consecutive days**: `date - ROW_NUMBER() as group_id`
9. **For pivot**: `CASE in SELECT with GROUP BY`
10. **For complex queries**: `Break into CTEs`

---

## **📊 THE 7 DEADLY (AND THEIR ANTIDOTES)**

| Problem Type       | Antidote (Pattern)     | Example Use                       |
| ------------------ | ---------------------- | --------------------------------- |
| "Find without"     | LEFT JOIN + IS NULL    | Employees without department      |
| "Find with all"    | COUNT DISTINCT = Total | Customers who bought all products |
| "Find consecutive" | Date - ROW_NUMBER()    | Consecutive login days            |
| "Find percentage"  | SUM OVER / Total       | Revenue percentage per product    |
| "Find changes"     | LAG() - current        | Month-over-month growth           |
| "Find median"      | PERCENTILE_CONT(0.5)   | Median salary                     |
| "Find gaps"        | LEAD() - current > 1   | Missing invoice numbers           |

---

## **🎮 THE SQL KARATE BELT SYSTEM**

### **White Belt (Basic SELECT)**

```sql
SELECT * FROM table WHERE condition ORDER BY column;
```

### **Yellow Belt (JOIN Master)**

```sql
SELECT * FROM A
JOIN B ON A.id = B.a_id
WHERE condition;
```

### **Green Belt (Aggregation Ninja)**

```sql
SELECT category, COUNT(*), AVG(value)
FROM table
GROUP BY category
HAVING COUNT(*) > 5;
```

### **Blue Belt (Window Function Samurai)**

```sql
SELECT *, ROW_NUMBER() OVER(PARTITION BY cat ORDER BY val DESC) as rank
FROM table;
```

### **Brown Belt (CTE & Recursive Jedi)**

```sql
WITH cte AS (SELECT ...), cte2 AS (SELECT ... FROM cte)
SELECT * FROM cte2;
```

### **Black Belt (Pattern Master)**

```sql
-- Can combine ALL patterns fluently
```

---

## **💡 THE "ONE-LINER" REMINDERS**

1. **Need to FILTER on aggregates?** → `HAVING`, not `WHERE`
2. **Need to COMPARE to aggregate?** → Subquery or Window function
3. **Need to PIVOT?** → `CASE` statements in `SELECT`
4. **Need to UNPIVOT?** → `UNION ALL` or `CROSS JOIN`
5. **Need to handle NULLs?** → `COALESCE(value, default)`
6. **Need unique?** → `DISTINCT` or `GROUP BY`
7. **Need ordering in rank?** → `ORDER BY` inside `OVER()`
8. **Need reset per group?** → `PARTITION BY` inside `OVER()`

---

## **🚨 EMERGENCY RESPONSE CARD**

**Q: "Find employees earning more than their manager?"**

```sql
SELECT e.* FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

**Think:** Self-join + compare

**Q: "Find second highest salary per department?"**

```sql
SELECT * FROM (
  SELECT *, DENSE_RANK() OVER(PARTITION BY dept ORDER BY salary DESC) as rnk
  FROM employees
) WHERE rnk = 2;
```

**Think:** Window function + partition

**Q: "Find customers who bought all products?"**

```sql
SELECT customer_id FROM sales
GROUP BY customer_id
HAVING COUNT(DISTINCT product_id) = (SELECT COUNT(*) FROM products);
```

**Think:** Count distinct = total count

**Q: "Find month-over-month growth?"**

```sql
WITH monthly AS (
  SELECT DATE_TRUNC('month', date) as month, SUM(amount) as total
  FROM sales GROUP BY month
)
SELECT month, total,
  (total - LAG(total) OVER(ORDER BY month)) * 100.0 /
  LAG(total) OVER(ORDER BY month) as growth_pct
FROM monthly;
```

**Think:** LAG() for previous value

---

## **🧩 THE LEGO BLOCK APPROACH**

Think of SQL queries as LEGO blocks:

**Basic Blocks:**

- `SELECT` = What you want to see
- `FROM` = Where to get it from
- `WHERE` = Filter conditions
- `GROUP BY` = Grouping bucket
- `HAVING` = Filter on groups

**Advanced Blocks:**

- `JOIN` = Connect tables
- `OVER()` = Window operations
- `WITH` = Temporary tables
- `CASE` = If-else logic
- `COALESCE` = Handle NULLs

**Build ANY query by snapping these together!**

---

## **🎵 THE SQL RAP (To Remember Patterns)**

_LEFT JOIN plus IS NULL_
_Finds the data that's gone for a while_
_GROUP BY with a COUNT more than one_
_Shows the duplicates, oh what fun!_
_ROW NUMBER with PARTITION BY_
_Ranks the data, don't ask me why_
_LAG and LEAD for before and after_
_Make your queries filled with laughter_
_SUM OVER ORDER BY date_
_Running totals are really great!_

---

## **✅ THE 5-MINUTE DAILY DRILL**

Every day, write these 5 patterns from memory:

1. **Duplicate finder**
2. **Missing data finder**
3. **Top 3 per department**
4. **Running total by date**
5. **Month-over-month growth**

Do this for 30 days. You'll NEVER forget them.

---

## **📱 THE "SAVE THIS" SCREENSHOT**

[IMAGINE THIS AS A PHONE WALLPAPER]

```
SQL PATTERN CHEAT SHEET
══════════════════════
1. Missing: LEFT JOIN + IS NULL
2. Duplicates: GROUP BY + COUNT>1
3. Top N: ROW_NUMBER() + PARTITION
4. Running: SUM() OVER(ORDER BY)
5. Compare: LAG()/LEAD() OVER()
6. Consecutive: date - ROW_NUMBER()
7. Hierarchy: WITH RECURSIVE
8. Pivot: CASE in SELECT
══════════════════════
NEED X? → USE Y
```

---

## **🎯 FINAL ADVICE: The 3-Step Solution Process**

For ANY SQL question:

**STEP 1: Identify the PATTERN**

- What's it asking for? (Missing, Duplicates, Ranking, Trends)
- Which of the 10 core patterns applies?

**STEP 2: Write the SKELETON**

- Write the pattern skeleton first
- Fill in your specific table/column names

**STEP 3: Test & Refine**

- Does it handle NULLs?
- Does it handle duplicates?
- Does it handle edge cases?

**Example:** "Find employees without managers"

1. Pattern: "Missing data" → Pattern #3
2. Skeleton: `SELECT A.* FROM A LEFT JOIN B ON A.key=B.key WHERE B.key IS NULL`
3. Fill: `SELECT e.* FROM employees e LEFT JOIN employees m ON e.manager_id=m.id WHERE m.id IS NULL`

---

**Remember:** You don't need to memorize 300 queries. You need to **internalize 10 patterns**. The patterns are your **superpowers**. Every SQL problem is just these patterns combined in different ways.

**Start today:** Pick ONE pattern. Write it 10 times. Solve 5 problems with it. Tomorrow, pick another. In 10 days, you'll know all patterns. In 30 days, you'll be unstoppable.

<!-----------------------------------


Absolutely! MongoDB is actually easier to master than SQL once you understand the mental models. Let me give you the complete MongoDB mastery system.


 ---------------------->

Absolutely! MongoDB is actually **easier** to master than SQL once you understand the mental models. Let me give you the complete MongoDB mastery system.

---

## **🔥 MONGODB CORE CONCEPT SHIFT**

**Forget Tables & Rows → Think Documents & Collections**

- SQL Table = MongoDB Collection
- SQL Row = MongoDB Document (JSON-like)
- SQL Column = MongoDB Field
- SQL JOIN = MongoDB $lookup (but avoid it when possible!)

---

## **🎯 THE 10 MONGODB SUPER PATTERNS**

### **1. THE CRUD OPERATOR MAP**

```
SQL          → MongoDB
==========   → ===========
INSERT       → insertOne() / insertMany()
SELECT       → find() / findOne()
UPDATE       → updateOne() / updateMany()
DELETE       → deleteOne() / deleteMany()
WHERE        → $match
ORDER BY     → $sort
GROUP BY     → $group
HAVING       → $match after $group
LIMIT        → $limit
JOIN         → $lookup (rarely needed)
```

### **2. THE FIND PATTERN ENGINE**

```javascript
// Basic find
db.collection.find({ field: value });

// Multiple conditions (AND)
db.collection.find({
  field1: value1,
  field2: value2,
});

// OR conditions
db.collection.find({
  $or: [{ field1: value1 }, { field2: value2 }],
});

// Comparison operators
db.collection.find({
  age: { $gt: 18, $lt: 65 }, // > 18 AND < 65
  status: { $ne: "inactive" }, // not equal
  score: { $gte: 80 }, // >= 80
  name: { $in: ["John", "Jane"] }, // in array
});
```

**Brain Tag:** `"Find with conditions" = find({field: {$operator: value}})`

### **3. THE AGGREGATION PIPELINE (The REAL Power)**

Think of this as a **factory assembly line**:

```javascript
db.collection.aggregate([
  { $match: {} }, // FILTER documents (like WHERE)
  { $group: {} }, // GROUP documents
  { $sort: {} }, // SORT results
  { $project: {} }, // SELECT/transform fields
  { $limit: 10 }, // LIMIT results
]);
```

**Visualize:** Documents flowing through pipes, getting transformed at each stage.

### **4. THE GROUP & AGGREGATE PATTERN**

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id", // GROUP BY customer_id
      totalSpent: { $sum: "$amount" }, // SUM(amount)
      avgOrder: { $avg: "$amount" }, // AVG(amount)
      orderCount: { $sum: 1 }, // COUNT(*)
      firstOrder: { $min: "$date" }, // MIN(date)
      lastOrder: { $max: "$date" }, // MAX(date)
    },
  },
  {
    $match: { totalSpent: { $gt: 1000 } }, // HAVING totalSpent > 1000
  },
]);
```

**Brain Tag:** `"Group & aggregate" = $group with _id + accumulator operators`

### **5. THE LOOKUP PATTERN (JOIN Alternative)**

```javascript
// One-to-many join
db.orders.aggregate([
  {
    $lookup: {
      from: "customers", // collection to join
      localField: "customer_id", // field from orders
      foreignField: "_id", // field from customers
      as: "customer_info", // output array field
    },
  },
  { $unwind: "$customer_info" }, // Convert array to object
]);
```

**Brain Tag:** `"Join collections" = $lookup + (optional) $unwind`

### **6. THE ARRAY OPERATOR MASTERY**

```javascript
// Find documents where array contains value
db.users.find({ tags: "premium" }); // tags array contains "premium"

// Find documents where array contains ALL values
db.users.find({ tags: { $all: ["premium", "vip"] } });

// Find by array size
db.users.find({ tags: { $size: 3 } });

// Query array of objects
db.products.find({
  "reviews.rating": { $gte: 4 }, // Dot notation for nested arrays
});

// Add to array (if not already present)
db.users.updateOne({ _id: 1 }, { $addToSet: { tags: "new-tag" } });

// Remove from array
db.users.updateOne({ _id: 1 }, { $pull: { tags: "old-tag" } });

// Update element in array
db.users.updateOne(
  { _id: 1, "skills.name": "JavaScript" },
  { $set: { "skills.$.level": "expert" } }, // $ = matched element
);
```

**Brain Tag:** `"Array operations" = $addToSet, $pull, $push, dot notation`

### **7. THE PROJECT PATTERN (SELECT Transformation)**

```javascript
db.users.aggregate([
  {
    $project: {
      name: 1, // include field
      email: 1,
      age: 1,
      fullName: {
        // create new field
        $concat: ["$firstName", " ", "$lastName"],
      },
      birthYear: {
        // calculate new field
        $subtract: [2024, "$age"],
      },
      _id: 0, // exclude field
    },
  },
]);
```

**Brain Tag:** `"Transform fields" = $project with expressions`

### **8. THE FACET PATTERN (Multiple Aggregations)**

```javascript
db.products.aggregate([
  {
    $facet: {
      byCategory: [
        // First aggregation
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ],
      byPriceRange: [
        // Second aggregation
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 50, 100, 200, 500],
            default: "Other",
            output: { count: { $sum: 1 } },
          },
        },
      ],
      totalStats: [
        // Third aggregation
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            avgPrice: { $avg: "$price" },
          },
        },
      ],
    },
  },
]);
```

**Brain Tag:** `"Multiple aggregations" = $facet with pipeline arrays`

### **9. THE TEXT SEARCH PATTERN**

```javascript
// First, create text index
db.articles.createIndex({ title: "text", content: "text" });

// Then search
db.articles
  .find(
    {
      $text: {
        $search: "mongodb tutorial",
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    },
    {
      score: { $meta: "textScore" }, // Include relevance score
    },
  )
  .sort({ score: { $meta: "textScore" } });
```

**Brain Tag:** `"Full-text search" = createIndex({field: "text"}) + $text`

### **10. THE GEO-SPATIAL PATTERN**

```javascript
// Create 2dsphere index for location-based queries
db.places.createIndex({ location: "2dsphere" })

// Find places near a point
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      $maxDistance: 5000  // meters
    }
  }
})

// Find places within a polygon
db.places.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[ [lng1, lat1], [lng2, lat2], ... ]]
      }
    }
  }
})
```

**Brain Tag:** `"Location queries" = 2dsphere index + $near/$geoWithin`

---

## **🧠 THE MONGODB DECISION TREE**

```
START
  ↓
Need to FIND documents? → Use .find() with query operators
  ↓
Need to AGGREGATE/transform? → Use .aggregate() pipeline
  ↓
Need to UPDATE documents? → Use .updateOne/Many() with $set
  ↓
Need to work with ARRAYS? → Use array operators ($push, $pull, $addToSet)
  ↓
Need to JOIN collections? → Use $lookup in aggregation
  ↓
Need FULL-TEXT search? → Create text index + $text operator
  ↓
Need LOCATION queries? → Create 2dsphere index + $near/$geoWithin
  ↓
Need MULTIPLE aggregations? → Use $facet
```

---

## **📊 THE SQL → MONGODB TRANSLATION DICTIONARY**

### **BASIC QUERIES**

```sql
-- SQL
SELECT * FROM users WHERE age > 25;
```

```javascript
// MongoDB
db.users.find({ age: { $gt: 25 } });
```

### **GROUP BY QUERIES**

```sql
-- SQL
SELECT department, COUNT(*), AVG(salary)
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

```javascript
// MongoDB
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      count: { $sum: 1 },
      avgSalary: { $avg: "$salary" },
    },
  },
  { $match: { count: { $gt: 5 } } },
]);
```

### **JOIN QUERIES**

```sql
-- SQL
SELECT o.*, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id;
```

```javascript
// MongoDB
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer",
    },
  },
  { $unwind: "$customer" },
  {
    $project: {
      orderDetails: "$$ROOT",
      customerName: "$customer.name",
    },
  },
]);
```

### **WINDOW FUNCTIONS**

```sql
-- SQL (Running total)
SELECT date, amount,
  SUM(amount) OVER(ORDER BY date) as running_total
FROM sales;
```

```javascript
// MongoDB
db.sales.aggregate([
  { $sort: { date: 1 } },
  {
    $group: {
      _id: null,
      docs: { $push: "$$ROOT" },
      runningTotal: { $sum: "$amount" },
    },
  },
  { $unwind: "$docs" },
  {
    $project: {
      date: "$docs.date",
      amount: "$docs.amount",
      runningTotal: 1,
    },
  },
]);
```

---

## **🎮 THE MONGODB KARATE BELT SYSTEM**

### **White Belt (Basic CRUD)**

```javascript
db.users.find({});
db.users.insertOne({ name: "John" });
db.users.updateOne({ _id: 1 }, { $set: { age: 30 } });
db.users.deleteOne({ _id: 1 });
```

### **Yellow Belt (Query Master)**

```javascript
// Complex queries
db.users.find({
  age: { $gte: 18, $lte: 65 },
  status: "active",
  $or: [{ role: "admin" }, { subscription: "premium" }],
});
```

### **Green Belt (Aggregation Ninja)**

```javascript
// Multi-stage aggregation
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customer_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]);
```

### **Blue Belt (Array & Schema Master)**

```javascript
// Complex array operations and schema design
db.products.updateMany(
  { category: "electronics" },
  {
    $push: {
      tags: {
        $each: ["new", "sale"],
        $position: 0,
      },
    },
  },
);
```

### **Black Belt (Performance & Optimization)**

```javascript
// Indexing, sharding, performance
db.collection.createIndex({ field1: 1, field2: -1 });
db.collection.explain("executionStats").find({...});
```

---

## **🔧 THE 5 ESSENTIAL INDEX PATTERNS**

### **1. Single Field Index**

```javascript
db.users.createIndex({ email: 1 }); // 1 = ascending, -1 = descending
```

**Use when:** Frequent queries on a single field.

### **2. Compound Index**

```javascript
db.users.createIndex({ last_name: 1, first_name: 1 });
```

**Use when:** Queries filter on multiple fields together.

### **3. Multikey Index (for arrays)**

```javascript
db.products.createIndex({ tags: 1 });
```

**Use when:** Querying array fields.

### **4. Text Index**

```javascript
db.articles.createIndex({ title: "text", content: "text" });
```

**Use when:** Full-text search needed.

### **5. Geospatial Index**

```javascript
db.places.createIndex({ location: "2dsphere" });
```

**Use when:** Location-based queries.

---

## **🚨 MONGODB EMERGENCY RESPONSE CARD**

**Q: "Find all active users above 18, sorted by name"**

```javascript
db.users
  .find({
    status: "active",
    age: { $gt: 18 },
  })
  .sort({ name: 1 });
```

**Q: "Count orders per customer with total > $1000"**

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id",
      total: { $sum: "$amount" },
      count: { $sum: 1 },
    },
  },
  { $match: { total: { $gt: 1000 } } },
]);
```

**Q: "Update user's last login time"**

```javascript
db.users.updateOne({ _id: userId }, { $set: { lastLogin: new Date() } });
```

**Q: "Add tag to user if not present"**

```javascript
db.users.updateOne({ _id: userId }, { $addToSet: { tags: "new-tag" } });
```

**Q: "Find products with reviews rating >= 4"**

```javascript
db.products.find({
  "reviews.rating": { $gte: 4 },
});
```

---

## **💡 THE "ONE-LINER" MONGODB WISDOM**

1. **Design for QUERY patterns, not storage**
2. **Embed what you QUERY together**
3. **Reference what you QUERY separately**
4. **Arrays are powerful but can grow without limit**
5. **Indexes are your best friends**
6. **Use $lookup sparingly - it's expensive**
7. **Aggregation pipeline > MapReduce**
8. **Project early to reduce data size**
9. **Use $match early to filter documents**
10. **Test with explain() to see query plans**

---

## **📚 DATA MODELING PATTERNS**

### **Pattern 1: EMBEDDED DOCUMENTS**

```javascript
// One-to-few relationship
{
  _id: "order123",
  customer: {
    name: "John Doe",
    email: "john@example.com"
  },
  items: [
    { product: "Laptop", quantity: 1 },
    { product: "Mouse", quantity: 2 }
  ]
}
```

**Use when:** Related data is always accessed together.

### **Pattern 2: REFERENCE BY ID**

```javascript
// One-to-many relationship
// Order document
{
  _id: "order123",
  customer_id: "cust456",
  items: ["item1", "item2"]
}

// Customer document (separate collection)
{
  _id: "cust456",
  name: "John Doe"
}
```

**Use when:** Related data grows without bound.

### **Pattern 3: ARRAY OF REFERENCES**

```javascript
// Many-to-many relationship
// User document
{
  _id: "user123",
  name: "Alice",
  courses: ["course1", "course2"]
}

// Course document
{
  _id: "course1",
  title: "MongoDB 101"
}
```

---

## **🎯 THE DAILY MONGODB DRILL**

**Day 1-3:** Master CRUD operations

- `.find()` with all operators
- `.insertOne/Many()`
- `.updateOne/Many()` with `$set`, `$inc`
- `.deleteOne/Many()`

**Day 4-7:** Master Aggregation Pipeline

- `$match`, `$group`, `$project`, `$sort`
- Practice 5 aggregation queries daily

**Day 8-10:** Master Array Operations

- `$push`, `$pull`, `$addToSet`
- Querying nested arrays
- Updating array elements

**Day 11-14:** Master Indexes & Performance

- Create different index types
- Use `.explain()`
- Read query execution plans

**Day 15+:** Build Real Projects

- Blog with comments (embedding)
- E-commerce (references)
- Social media (arrays of references)

---

## **🧩 THE MONGODB LEGO BLOCKS**

**Stage Blocks (for aggregation):**

- `$match` = Filter documents
- `$group` = Group and aggregate
- `$project` = Reshape documents
- `$sort` = Sort documents
- `$limit` = Limit documents
- `$lookup` = Join collections
- `$unwind` = Flatten arrays
- `$facet` = Multiple pipelines

**Operator Blocks (for queries/updates):**

- `$gt`, `$lt`, `$gte`, `$lte` = Comparisons
- `$in`, `$nin` = In/Not in array
- `$and`, `$or`, `$not` = Logical
- `$set`, `$unset`, `$inc` = Updates
- `$push`, `$pull`, `$addToSet` = Array updates

**Expression Blocks (for calculations):**

- `$sum`, `$avg`, `$min`, `$max` = Aggregations
- `$concat`, `$substr` = String operations
- `$add`, `$subtract`, `$multiply`, `$divide` = Math
- `$cond` = If-else logic

---

## **🔥 THE MONGODB MANTRA**

_"Documents, not rows_
_Collections, not tables_
_JSON, not columns_
_Aggregation, not joins_
_Embed when you query together_
_Reference when you query apart_
_Index what you search_
_Project what you need"_

---

## **✅ THE 30-DAY MONGODB MASTERY PLAN**

**Week 1: Foundations**

- Install MongoDB Compass & Shell
- Learn CRUD operations
- Practice with sample dataset

**Week 2: Query Mastery**

- Deep dive into query operators
- Master aggregation pipeline
- Practice array operations

**Week 3: Performance & Design**

- Learn indexing strategies
- Understand schema design patterns
- Practice performance optimization

**Week 4: Real-World Projects**

- Build a blog (embedding pattern)
- Build e-commerce (reference pattern)
- Build analytics dashboard (aggregation)

---

## **📱 THE "SAVE THIS" MONGODB SCREENSHOT**

```
MONGODB PATTERN CHEAT SHEET
═══════════════════════════
CRUD:
  Find → .find({field: value})
  Insert → .insertOne({data})
  Update → .updateOne({filter}, {$set: {data}})
  Delete → .deleteOne({filter})

AGGREGATION PIPELINE:
  Filter → $match
  Group → $group
  Transform → $project
  Sort → $sort
  Join → $lookup
  Flatten → $unwind
  Multiple → $facet

ARRAY OPERATORS:
  Add → $push, $addToSet
  Remove → $pull
  Query → dot notation

INDEXES:
  Single → {field: 1}
  Compound → {field1:1, field2:-1}
  Text → {field: "text"}
  Geo → {location: "2dsphere"}
═══════════════════════════
DESIGN RULE: Embed what you query together!
```

---

## **🎯 FINAL ADVICE: The MongoDB Mindset**

1. **Think in JSON/Objects**, not tables
2. **Denormalize** when it helps queries
3. **Accept some data duplication** (it's okay!)
4. **Design for your most common queries**
5. **Use the aggregation pipeline for complex logic**
6. **Avoid joins** - embed or restructure instead
7. **Index thoughtfully** - they're crucial for performance
8. **Test with real data** - MongoDB Compass is your friend

**Remember:** MongoDB isn't "worse SQL" - it's a **different paradigm**. Embrace documents. Embrace nesting. Embrace the flexibility. The patterns above are your toolkit. Practice them daily, and you'll think in MongoDB naturally.

**Start today:** Install MongoDB locally, load a sample dataset, and run through the 10 super patterns one by one. Tomorrow, build something simple. In 30 days, you'll be a MongoDB master.
