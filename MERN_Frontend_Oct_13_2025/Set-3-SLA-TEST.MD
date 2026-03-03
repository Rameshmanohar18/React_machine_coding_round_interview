## 🧠 APTITUDE / LOGICAL

### 1️⃣ Series: `3, 7, 15, 31, 63, __`

Pattern: ×2 + 1
👉 **Answer:** `127`

---

### 2️⃣ Work together

C = 8 days → 1/8
D = 16 days → 1/16

Together:

```
1/8 + 1/16 = 3/16
```

Time = `16/3 ≈ 5.33 days`

👉 **Answer:** **5⅓ days**

---

### 3️⃣ Trains crossing

Total distance = 180 + 180 = 360 m
Speed = (60 + 90) km/h = 150 km/h = `41.67 m/s`

```
Time = 360 / 41.67 ≈ 8.64 sec
```

👉 **Answer:** **~8.6 seconds**

---

### 4️⃣ Relation puzzle

“Son of the only daughter of my grandfather”

- Grandfather’s only daughter = **A’s mother**
- Her son = **A himself**

👉 **Answer:** **A is the boy himself**

---

### 5️⃣ Probability (exactly 2 red)

Total balls = 20
Ways to choose 3 = C(20,3)

Favorable:

- 2 red from 5 → C(5,2)
- 1 non-red from 15 → C(15,1)

```
Probability = [C(5,2) × C(15,1)] / C(20,3)
= (10 × 15) / 1140
= 5/38
```

👉 **Answer:** **5/38**

---

### 6️⃣ Man & Train

Man speed = 4 km/h = 1.11 m/s
Relative speed = 150 / 9 = 16.67 m/s

Train speed:

```
16.67 + 1.11 = 17.78 m/s
= 64 km/h
```

👉 **Answer:** **64 km/h**

---

### 7️⃣ Paper & notebooks

2 kg → 8 packets → each packet = 250 g
Each packet → 5 notebooks × 150 pages = 750 pages

Total pages in 2 kg:

```
8 × 750 = 6000 pages
```

Pages in 5 kg:

```
6000 × (5/2) = 15000 pages
```

250-page notebooks:

```
15000 / 250 = 60
```

👉 **Answer:** **60 notebooks**

---

### 8️⃣ Odd one out

Rose, Fern, Tulip, Sunflower, Daisy

👉 **Fern** (does not flower)

---

### 9️⃣ Coding puzzle

Tree = 5200 (4 letters → 4 × 1300)
Leaf = 4600 (4 × 1150)

2800 → 2 letters × 1400
👉 **Answer:** **“OX”** (or any 2-letter word)

---

## 🌐 HTML / CSS / JS

### 🔟 Fixed navigation bar (CSS)

```css
nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: #333;
}
```

---

### 1️⃣1️⃣ Email validation (HTML + JS)

```html
<form onsubmit="return validateEmail()">
  <input type="email" id="email" />
  <button>Submit</button>
</form>

<script>
  function validateEmail() {
    const email = document.getElementById("email").value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
</script>
```

---

### 1️⃣2️⃣ Toggle paragraph

```js
function togglePara() {
  const p = document.getElementById("para");
  p.style.display = p.style.display === "none" ? "block" : "none";
}
```

---

### 1️⃣3️⃣ JS functions

#### Toggle class

```js
btn.addEventListener("click", () => el.classList.toggle("active"));
```

#### Alert + disable

```js
btn.onclick = () => {
  alert("Clicked!");
  btn.disabled = true;
};
```

#### Like button

```js
let liked = false,
  count = 0;

btn.onclick = () => {
  if (!liked) {
    count++;
    btn.style.color = "red";
    btn.innerText = `❤️ ${count}`;
    liked = true;
  }
};
```

---

### 1️⃣4️⃣ Select elements

```js
document.getElementById("id");
document.querySelector(".class");
document.getElementsByTagName("div");
```

---

### 1️⃣5️⃣ Add event listener

```js
btn.addEventListener("click", handler);
```

---

### 1️⃣6️⃣ `true + 1`

👉 **2**

---

### 1️⃣7️⃣ `typeof NaN`

👉 **"number"**

---

## 👨‍💼 JS Scenario – Employees

```js
const employees = [
  { name: "A", id: 1, salary: 90000 },
  { name: "B", id: 2, salary: 45000 },
  { name: "C", id: 3, salary: 60000 },
];

const above50 = employees.filter((e) => e.salary > 50000);

const avg = employees.reduce((s, e) => s + e.salary, 0) / employees.length;

employees.sort((a, b) => b.salary - a.salary);

const topEarners = employees.filter((e) => e.salary > 80000);

const count = {
  above: employees.filter((e) => e.salary > 50000).length,
  below: employees.filter((e) => e.salary <= 50000).length,
};
```

---

## 🗄️ SQL

### 1️⃣9️⃣ 3rd highest salary

```sql
SELECT DISTINCT salary
FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET 2;
```

---

### 2️⃣0️⃣ Less than dept avg

```sql
SELECT *
FROM Employee e
WHERE salary < (
  SELECT AVG(salary)
  FROM Employee
  WHERE dept_id = e.dept_id
);
```

---

### 2️⃣1️⃣ Less than manager

```sql
SELECT e.*
FROM Employee e
JOIN Employee m ON e.manager_id = m.emp_id
WHERE e.salary < m.salary;
```

---

### 2️⃣2️⃣ Top 3 lowest customers

```sql
SELECT c.customer_name, SUM(o.order_amount) total
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total ASC
LIMIT 3;
```

---

### Employees earning more than dept avg

```sql
SELECT e.*
FROM Employee e
JOIN Department d ON e.dept_id = d.dept_id
WHERE salary > (
  SELECT AVG(salary)
  FROM Employee
  WHERE dept_id = e.dept_id
);
```

---

## 🧩 Procedures / Functions

### 2️⃣3️⃣ i) Procedure

```sql
CREATE PROCEDURE add_employee(...)
BEGIN
  IF EXISTS (SELECT 1 FROM Department WHERE dept_id = p_dept) THEN
    INSERT INTO Employee VALUES (...);
  END IF;
END;
```

### ii) Function

```sql
CREATE FUNCTION total_projects(emp INT)
RETURNS INT
RETURN (SELECT COUNT(*) FROM Projects WHERE emp_id = emp);
```

---

### 2️⃣4️⃣ Transaction

```sql
START TRANSACTION;

INSERT INTO Orders VALUES (...);
INSERT INTO OrderDetails VALUES (...);

COMMIT;
-- ROLLBACK if error
```

---

### 2️⃣5️⃣ Delete queries

```sql
DELETE FROM Customers
WHERE customer_id NOT IN (
  SELECT DISTINCT customer_id FROM Orders
);

DELETE FROM Suppliers
WHERE supplier_id NOT IN (
  SELECT DISTINCT supplier_id FROM Products
);
```
