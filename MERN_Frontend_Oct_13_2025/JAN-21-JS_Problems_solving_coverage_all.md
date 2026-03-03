Totally 55 Javascript problems in JS for the interview rounds and skills based QNs:

PROBLEM TYPES
├── ARRAY PROBLEMS
│ ├── SUM/CALCULATION (5)
│ ├── SEARCH/FIND (8)
│ ├── MODIFICATION (7)
│ ├── MULTI-DIMENSIONAL (3)
│ └── PATTERN MATCHING (5)
└── STRING PROBLEMS
├── REVERSE/TRANSFORM (7)
├── VALIDATION/CHECK (6)
├── SUBSTRING/PATTERN (8)
└── COUNT/FREQUENCY (6)

## 🎯 **ARRAY PROBLEMS - QUICK RECALL CHEATSHEET**

### **1. SUM/CALCULATION PROBLEMS**

| Problem               | Key Concept          | Memory Hook             | Code Hint               |
| --------------------- | -------------------- | ----------------------- | ----------------------- |
| **Sum of elements**   | Loop + accumulate    | "Total sum = add all"   | `for + sum`             |
| **Max/Min element**   | Track while looping  | "Keep biggest/smallest" | `if > max / < min`      |
| **Prefix Sum**        | Running total array  | "Cumulative sum"        | `sum += arr[i]`         |
| **Equilibrium Index** | Left sum = Right sum | "Balance point"         | `total - left - arr[i]` |
| **Missing Number**    | Sum formula or XOR   | "n\*(n+1)/2 - sum"      | `totalSum - actualSum`  |

**🎵 Mnemonic**: **"SMMPE"** - Sum, Max/Min, Missing, Prefix, Equilibrium

---

### **2. SEARCH/FIND PROBLEMS**

| Problem                   | Key Concept           | Memory Hook            | Pattern               |
| ------------------------- | --------------------- | ---------------------- | --------------------- |
| **First/Last occurrence** | Linear scan           | "Scan find first/last" | `for + if + return`   |
| **Find duplicates**       | Set/HashMap           | "Seen before?"         | `Set.has() → return`  |
| **Majority element**      | Boyer-Moore voting    | "Candidate + count"    | `count=0 → candidate` |
| **Kth Largest**           | Sort or QuickSelect   | "Sort → k-1 index"     | `sort()[k-1]`         |
| **Peak element**          | Binary search compare | "Mid > mid+1?"         | `binary search`       |
| **Missing ranges**        | Gap detection         | "Find gaps"            | `curr-prev > 1`       |
| **Three Sum**             | Sort + Two pointer    | "Fix i, left+right"    | `i + left + right`    |

**🎵 Mnemonic**: **"FD MKP T"** - Find, Duplicate, Majority, Kth, Peak, ThreeSum

---

### **3. MODIFICATION PROBLEMS**

| Problem                 | Key Concept           | Memory Hook                    | Pattern                            |
| ----------------------- | --------------------- | ------------------------------ | ---------------------------------- |
| **Reverse array**       | Swap ends to middle   | "Swap start-end"               | `while(left<right) swap`           |
| **Rotate array**        | Reverse segments      | "Reverse trick"                | `reverse all → reverse parts`      |
| **Move zeros**          | Two-pointer overwrite | "Non-zero forward"             | `if ≠0 → copy → fill 0`            |
| **Remove duplicates**   | Unique pointer        | "New index for unique"         | `if ≠ prev → copy`                 |
| **Merge arrays**        | Pointer merge         | "Combine in order"             | `while both → compare`             |
| **Product except self** | Prefix × Suffix       | "Left product × Right product" | `prefix[i] = prefix[i-1]*arr[i-1]` |
| **Partition equal sum** | Subset sum DP         | "Find subset sum/2"            | `dp[sum] = true/false`             |

**🎵 Mnemonic**: **"RR M MPP"** - Reverse, Rotate, Move, Merge, Product, Partition

---

### **4. MULTI-DIMENSIONAL ARRAYS**

| Problem              | Key Concept         | Memory Hook                      | Pattern               |
| -------------------- | ------------------- | -------------------------------- | --------------------- |
| **Spiral traversal** | 4 boundaries        | "Top, Right, Bottom, Left"       | `while(T≤B && L≤R)`   |
| **Rotate matrix**    | Transpose + Reverse | "Swap(i,j)→(j,i) + reverse rows" | `transpose → reverse` |
| **Search 2D matrix** | Binary search       | "Row = mid/cols, Col = mid%cols" | `binary search`       |

**🎵 Mnemonic**: **"SRT"** - Spiral, Rotate, Traverse

---

### **5. PATTERN MATCHING PROBLEMS**

| Problem                  | Key Concept          | Memory Hook                   | Pattern                                       |
| ------------------------ | -------------------- | ----------------------------- | --------------------------------------------- |
| **Two Sum**              | HashMap complement   | "Need = target - curr"        | `Map[complement]`                             |
| **Subarray sum K**       | Prefix sum HashMap   | "Sum[i] - Sum[j] = K"         | `Map.has(sum-K)`                              |
| **Max subarray sum**     | Kadane's algorithm   | "Max(curr, curr+prev)"        | `maxEndingHere = max(num, maxEndingHere+num)` |
| **Max product subarray** | Track min/max        | "Swap on negative"            | `if<0 swap(max,min)`                          |
| **Longest consecutive**  | Set + sequence start | "No left neighbor → sequence" | `!set.has(num-1)`                             |

**🎵 Mnemonic**: **"TS SM ML"** - TwoSum, SubarraySum, MaxSubarray, MaxProduct, Longest

---

## 🎯 **STRING PROBLEMS - QUICK RECALL CHEATSHEET**

### **1. REVERSE/TRANSFORM**

| Problem                       | Key Concept             | Memory Hook                | Pattern                     |
| ----------------------------- | ----------------------- | -------------------------- | --------------------------- |
| **Reverse string**            | Swap ends               | "Swap start-end chars"     | `while(left<right) swap`    |
| **Reverse words**             | Split → Reverse each    | "Word by word reverse"     | `split(' ') → map(reverse)` |
| **Uppercase/Lowercase**       | Char code ±32           | "A(65) ↔ a(97) diff 32"    | `charCodeAt() ± 32`         |
| **Remove spaces/punctuation** | Filter characters       | "Keep only letters/digits" | `if(isAlphaNumeric)`        |
| **Capitalize words**          | Uppercase first letter  | "First char uppercase"     | `word[0].toUpperCase()`     |
| **Repeat string**             | Concatenate n times     | "Loop n times add"         | `result += str`             |
| **Rotate string**             | Concatenate self + find | "(str+str).includes(s2)"   | `double check`              |

**🎵 Mnemonic**: **"RRU RCR"** - Reverse, ReverseWords, Uppercase, Remove, Capitalize, Repeat, Rotate

---

### **2. VALIDATION/CHECK**

| Problem                         | Key Concept             | Memory Hook                   | Pattern                               |
| ------------------------------- | ----------------------- | ----------------------------- | ------------------------------------- |
| **Palindrome**                  | Compare ends            | "Left=Right?"                 | `while(left<right)`                   |
| **Anagram**                     | Frequency count or sort | "Same chars count"            | `sort→compare OR map count`           |
| **Valid parentheses**           | Stack matching          | "Push open, pop close"        | `stack.push() / stack.pop()`          |
| **Is subsequence**              | Two-pointer scan        | "Pointer in both strings"     | `while(i<sub.length && j<str.length)` |
| **Is rotation**                 | Concatenate + find      | "s1+s1 contains s2"           | `(s1+s1).includes(s2)`                |
| **Palindrome ignore non-alpha** | Filter + compare        | "Clean then check palindrome" | `replace(/\W/g,'')`                   |

**🎵 Mnemonic**: **"PAV IRS"** - Palindrome, Anagram, ValidParentheses, IsSubsequence, IsRotation, SpecialPalindrome

---

### **3. SUBSTRING/PATTERN**

| Problem                           | Key Concept                | Memory Hook                           | Pattern                                 |
| --------------------------------- | -------------------------- | ------------------------------------- | --------------------------------------- |
| **Longest substring no repeat**   | Sliding window + Set       | "Expand right, shrink left if repeat" | `while(set.has) delete left++`          |
| **Longest palindrome**            | Expand around center       | "Odd/even expand from center"         | `expand(i,i) + expand(i,i+1)`           |
| **Min window substring**          | Sliding window + HashMap   | "Have/Need counters"                  | `while(have===need) shrink`             |
| **Count palindrome substrings**   | Expand count all           | "All centers count expands"           | `expandCount(i,i) + expandCount(i,i+1)` |
| **String compression**            | Count consecutive          | "Char + count if >1"                  | `while(same) count++`                   |
| **Group anagrams**                | Sort key or frequency key  | "Sorted word as map key"              | `Map[sorted].push(word)`                |
| **Longest repeating replacement** | Sliding window + maxFreq   | "Window - maxFreq ≤ k"                | `while(winSize-maxFreq>k) left++`       |
| **String to integer (atoi)**      | Parse digits with overflow | "Skip spaces → sign → digits"         | `result*10 + digit`                     |

**🎵 Mnemonic**: **"LPM C GLR S"** - LongestUnique, Palindrome, MinWindow, CountPalindromes, Compression, GroupAnagrams, LongestReplacement, StringToInt

---

### **4. COUNT/FREQUENCY**

| Problem                         | Key Concept          | Memory Hook                      | Pattern                       |
| ------------------------------- | -------------------- | -------------------------------- | ----------------------------- | --- | ----- |
| **Count vowels/consonants**     | Check char set       | "aeiou includes?"                | `if('aeiou'.includes(char))`  |
| **Count character occurrences** | Frequency map        | "Map[char]++"                    | `freq[char] = (freq[char]     |     | 0)+1` |
| **Count words**                 | Split whitespace     | "trim→split(/\s+/)→length"       | `split and filter empty`      |
| **First unique character**      | Frequency + scan     | "Count all → find first count=1" | `freq then find index`        |
| **Remove duplicates**           | Set or result string | "Seen? skip : add"               | `if(!seen.has) result+=char`  |
| **Find duplicates**             | Set detection        | "Seen before? → duplicate"       | `if(seen.has) duplicates.add` |

**🎵 Mnemonic**: **"VCO W FRD"** - Vowels, CharacterOccurrence, Words, FirstUnique, RemoveDuplicates, FindDuplicates

---

## 🚀 **PROBLEM-SOLVING DECISION TREE**

### **QUESTION: Which pattern to use?**

```
START → What's being asked?
  │
  ├─ SUM/CALCULATION? → Prefix sum, Kadane's, Two pointers
  │
  ├─ SEARCH/FIND? → HashMap, Binary search, Two pointers
  │
  ├─ MODIFICATION? → In-place, Two pointers, Reverse trick
  │
  ├─ VALIDATION? → Stack, Two pointers, Frequency count
  │
  ├─ SUBSTRING/PATTERN? → Sliding window, Expand center
  │
  └─ COUNT/FREQUENCY? → HashMap, Array counter
```

### **QUICK PATTERN MATCHER:**

**See these words → Use this pattern:**

- **"Sum"** → Prefix sum / Kadane's / Two pointers
- **"Find pair"** → HashMap (Two Sum pattern)
- **"Longest substring"** → Sliding window
- **"Palindrome"** → Two pointers / Expand center
- **"Duplicate"** → Set / HashMap
- **"Rotate"** → Reverse segments / Modulus indexing
- **"Merge/Overlap"** → Sort + compare ends
- **"Kth largest/smallest"** → QuickSelect / Heap
- **"Consecutive"** → Set + check sequence start

---

## 📝 **MEMORY PEG SYSTEM (Use Stories)**

### **Array Stories:**

1. **"SUM Family"** - 5 problems: Sum, Max/Min, Prefix, Equilibrium, Missing
   _Story: A family of 5 needs to SUM everything, find MAX person, PREFIX titles, find EQUILIBRIUM, and notice who's MISSING_

2. **"Search Squad"** - 8 problems: Find, Duplicate, Majority, Kth, Peak, Ranges, ThreeSum
   _Story: A search squad of 8 looks for things: FIND items, spot DUPLICATES, follow MAJORITY, find Kth in line, reach PEAK, check RANGES, make THREE teams_

3. **"Modify Mechanics"** - 7 problems: Reverse, Rotate, Move, Remove, Merge, Product, Partition
   _Story: 7 mechanics MODIFY cars: REVERSE gear, ROTATE tires, MOVE parts, REMOVE dents, MERGE tools, check PRODUCT specs, PARTITION garage_

### **String Stories:**

1. **"Transform Team"** - 7 problems: Reverse, ReverseWords, Case, Remove, Capitalize, Repeat, Rotate
   _Story: 7 transformers: REVERSE bot, WORD reverser, CASE changer, REMOVER bot, CAPITALIZER, REPEATER, ROTATOR_

2. **"Validator Vanguard"** - 6 problems: Palindrome, Anagram, Parentheses, Subsequence, Rotation, SpecialPal
   _Story: 6 validators check: PALINDROME mirror, ANAGRAM scrambler, PARENTHESES balancer, SUBSEQUENCE tracker, ROTATION detector, SPECIAL cleaner_

I'll provide solutions for all 30 problems with **both** approaches:
without built-in methods (manual implementation) and with built-in methods.

## 1. Sum of all elements

```javascript
// Without built-in methods
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// With built-in methods
function sumArrayBuiltIn(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
```

## 2. Maximum element

```javascript
// Without built-in methods
function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// With built-in methods
function findMaxBuiltIn(arr) {
  return Math.max(...arr);
  // Alternative: arr.reduce((a,b) => a > b ? a : b)
}
```

## 3. Minimum element

```javascript
// Without built-in methods
function findMin(arr) {
  if (arr.length === 0) return null;
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}

// With built-in methods
function findMinBuiltIn(arr) {
  return Math.min(...arr);
}
```

## 4. Reverse an array

```javascript
// Without built-in methods
function reverseArray(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
  // In-place: for(let i=0; i<arr.length/2; i++) swap arr[i] and arr[arr.length-1-i]
}

// With built-in methods
function reverseArrayBuiltIn(arr) {
  return arr.slice().reverse(); // slice() creates copy
}
```

## 5. Find index of element

```javascript
// Without built-in methods
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// With built-in methods
function findIndexBuiltIn(arr, target) {
  return arr.indexOf(target);
}
```

## 6. Check if element exists

```javascript
// Without built-in methods
function elementExists(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return true;
  }
  return false;
}

// With built-in methods
function elementExistsBuiltIn(arr, target) {
  return arr.includes(target);
}
```

## 7. Count occurrences

```javascript
// Without built-in methods
function countOccurrences(arr, target) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) count++;
  }
  return count;
}

// With built-in methods
function countOccurrencesBuiltIn(arr, target) {
  return arr.filter((x) => x === target).length;
}
```

## 8. Remove duplicates

```javascript
// Without built-in methods
function removeDuplicates(arr) {
  const unique = [];
  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < unique.length; j++) {
      if (arr[i] === unique[j]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) unique.push(arr[i]);
  }
  return unique;
}

// With built-in methods
function removeDuplicatesBuiltIn(arr) {
  return [...new Set(arr)];
  // Alternative: arr.filter((x, i) => arr.indexOf(x) === i)
}
```

## 9. Sum of even numbers

```javascript
// Without built-in methods
function sumEvenNumbers(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) sum += arr[i];
  }
  return sum;
}

// With built-in methods
function sumEvenNumbersBuiltIn(arr) {
  return arr.filter((x) => x % 2 === 0).reduce((a, b) => a + b, 0);
}
```

## 10. Merge two arrays

```javascript
// Without built-in methods
function mergeArrays(arr1, arr2) {
  const merged = [];
  for (let i = 0; i < arr1.length; i++) merged.push(arr1[i]);
  for (let i = 0; i < arr2.length; i++) merged.push(arr2[i]);
  return merged;
}

// With built-in methods
function mergeArraysBuiltIn(arr1, arr2) {
  return [...arr1, ...arr2];
  // Alternative: arr1.concat(arr2)
}
```

## 11. Find second largest

```javascript
// Without built-in methods
function secondLargest(arr) {
  if (arr.length < 2) return null;
  let first = -Infinity,
    second = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > first) {
      second = first;
      first = arr[i];
    } else if (arr[i] > second && arr[i] < first) {
      second = arr[i];
    }
  }
  return second === -Infinity ? null : second;
}

// With built-in methods
function secondLargestBuiltIn(arr) {
  const unique = [...new Set(arr)];
  if (unique.length < 2) return null;
  return unique.sort((a, b) => b - a)[1];
}
```

## 12. Rotate array k times

```javascript
// Without built-in methods
function rotateArray(arr, k) {
  k = k % arr.length;
  const rotated = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    rotated[(i + k) % arr.length] = arr[i];
  }
  return rotated;
}

// With built-in methods
function rotateArrayBuiltIn(arr, k) {
  k = k % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}
```

## 13. Move zeros to end

```javascript
// Without built-in methods
function moveZeros(arr) {
  let nonZeroIndex = 0;
  // Move all non-zero elements to front
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[nonZeroIndex++] = arr[i];
    }
  }
  // Fill remaining with zeros
  for (let i = nonZeroIndex; i < arr.length; i++) {
    arr[i] = 0;
  }
  return arr;
}

// With built-in methods
function moveZerosBuiltIn(arr) {
  const nonZeros = arr.filter((x) => x !== 0);
  const zeros = arr.filter((x) => x === 0);
  return [...nonZeros, ...zeros];
}
```

## 14. Reverse only vowels (string)

```javascript
// Without built-in methods
function reverseVowels(str) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  const chars = str.split("");
  let left = 0,
    right = chars.length - 1;

  while (left < right) {
    while (left < right && !vowels.has(chars[left])) left++;
    while (left < right && !vowels.has(chars[right])) right--;

    if (left < right) {
      const temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;
      left++;
      right--;
    }
  }

  let result = "";
  for (let i = 0; i < chars.length; i++) result += chars[i];
  return result;
}

// With built-in methods
function reverseVowelsBuiltIn(str) {
  const vowels = str.match(/[aeiou]/gi);
  if (!vowels) return str;
  return str.replace(/[aeiou]/gi, () => vowels.pop());
}
```

## 15. Remove falsy values

```javascript
// Without built-in methods
function removeFalsy(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) result.push(arr[i]);
  }
  return result;
}

// With built-in methods
function removeFalsyBuiltIn(arr) {
  x;
  return arr.filter(Boolean);
}
```

## 16. Find duplicates

```javascript
// Without built-in methods
function findDuplicates(arr) {
  const seen = {};
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    if (seen[arr[i]]) {
      if (!duplicates.includes(arr[i])) duplicates.push(arr[i]);
    } else {
      seen[arr[i]] = true;
    }
  }
  return duplicates;
}

// With built-in methods
function findDuplicatesBuiltIn(arr) {
  return arr.filter((x, i) => arr.indexOf(x) !== i);
}
```

## 17. Array intersection

```javascript
// Without built-in methods
function arrayIntersection(arr1, arr2) {
  const result = [];
  const set = new Set(arr2);
  for (let i = 0; i < arr1.length; i++) {
    if (set.has(arr1[i]) && !result.includes(arr1[i])) {
      result.push(arr1[i]);
    }
  }
  return result;
}

// With built-in methods
function arrayIntersectionBuiltIn(arr1, arr2) {
  return [...new Set(arr1.filter((x) => arr2.includes(x)))];
}
```

## 18. Array union

```javascript
// Without built-in methods
function arrayUnion(arr1, arr2) {
  const result = [];
  const combined = [...arr1, ...arr2];
  for (let i = 0; i < combined.length; i++) {
    if (!result.includes(combined[i])) {
      result.push(combined[i]);
    }
  }
  return result;
}

// With built-in methods
function arrayUnionBuiltIn(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}
```

## 19. Count even and odd

```javascript
// Without built-in methods
function countEvenOdd(arr) {
  let even = 0,
    odd = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) even++;
    else odd++;
  }
  return { even, odd };
}

// With built-in methods
function countEvenOddBuiltIn(arr) {
  const even = arr.filter((x) => x % 2 === 0).length;
  const odd = arr.length - even;
  return { even, odd };
}
```

## 20. Prefix sum array

```javascript
// Without built-in methods
function prefixSum(arr) {
  const result = new Array(arr.length);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    result[i] = sum;
  }
  return result;
}

// With built-in methods
function prefixSumBuiltIn(arr) {
  return arr.map((_, i) => arr.slice(0, i + 1).reduce((a, b) => a + b, 0));
}
```

## 21. Maximum subarray sum (Kadane's)

```javascript
// Without built-in methods (Kadane's Algorithm)
function maxSubarraySum(arr) {
  if (arr.length === 0) return 0;
  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// With built-in methods (slower O(n²))
function maxSubarraySumBuiltIn(arr) {
  let maxSum = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      const subarray = arr.slice(i, j + 1);
      const sum = subarray.reduce((a, b) => a + b, 0);
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum;
}
```

## 22. Longest increasing subsequence

```javascript
// Without built-in methods (DP O(n²))
function longestIncreasingSubsequence(arr) {
  if (arr.length === 0) return 0;
  const dp = new Array(arr.length).fill(1);

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  let max = 0;
  for (let i = 0; i < dp.length; i++) {
    if (dp[i] > max) max = dp[i];
  }
  return max;
}
```

## 23. Rotate 2D matrix

```javascript
// Without built-in methods
function rotateMatrix(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // Reverse rows
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      [matrix[i][j], matrix[i][n - 1 - j]] = [
        matrix[i][n - 1 - j],
        matrix[i][j],
      ];
    }
  }
  return matrix;
}
```

## 24. Find missing number 1→n

```javascript
// Without built-in methods
function findMissingNumber(arr, n) {
  let total = (n * (n + 1)) / 2;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return total - sum;
}

// With built-in methods
function findMissingNumberBuiltIn(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
```

## 25. Two sum

```javascript
// Without built-in methods (using object/map)
function twoSum(arr, target) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[arr[i]] = i;
  }
  return [];
}

// With built-in methods (less efficient)
function twoSumBuiltIn(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    const index = arr.indexOf(complement, i + 1);
    if (index !== -1) return [i, index];
  }
  return [];
}
```

## 26. Maximum product of two

```javascript
// Without built-in methods
function maxProductTwo(arr) {
  if (arr.length < 2) return null;
  let max1 = -Infinity,
    max2 = -Infinity;
  let min1 = Infinity,
    min2 = Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max1) {
      max2 = max1;
      max1 = arr[i];
    } else if (arr[i] > max2) {
      max2 = arr[i];
    }

    if (arr[i] < min1) {
      min2 = min1;
      min1 = arr[i];
    } else if (arr[i] < min2) {
      min2 = arr[i];
    }
  }

  return Math.max(max1 * max2, min1 * min2);
}
```

## 27. Subarray with given sum (positive numbers)

```javascript
// Without built-in methods (sliding window)
function subarrayWithSum(arr, target) {
  let start = 0,
    currentSum = 0;

  for (let end = 0; end < arr.length; end++) {
    currentSum += arr[end];

    while (currentSum > target && start <= end) {
      currentSum -= arr[start];
      start++;
    }

    if (currentSum === target) {
      return arr.slice(start, end + 1);
    }
  }

  return [];
}
```

## 28. Count pairs with sum

```javascript
// Without built-in methods
function countPairsWithSum(arr, target) {
  const freq = {};
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (freq[complement]) {
      count += freq[complement];
    }
    freq[arr[i]] = (freq[arr[i]] || 0) + 1;
  }

  return count;
}
```

## 29. Trap rain water

```javascript
// Without built-in methods (two-pointer)
function trapRainWater(heights) {
  if (heights.length < 3) return 0;

  let left = 0,
    right = heights.length - 1;
  let leftMax = 0,
    rightMax = 0;
  let water = 0;

  while (left <= right) {
    if (heights[left] <= heights[right]) {
      if (heights[left] > leftMax) {
        leftMax = heights[left];
      } else {
        water += leftMax - heights[left];
      }
      left++;
    } else {
      if (heights[right] > rightMax) {
        rightMax = heights[right];
      } else {
        water += rightMax - heights[right];
      }
      right--;
    }
  }

  return water;
}
```

## 30. Longest consecutive sequence

```javascript
// Without built-in methods
function longestConsecutiveSequence(arr) {
  if (arr.length === 0) return 0;

  const numSet = new Set();
  for (let i = 0; i < arr.length; i++) {
    numSet.add(arr[i]);
  }

  let longest = 0;

  for (const num of numSet) {
    // Check if it's the start of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      longest = Math.max(longest, currentLength);
    }
  }

  return longest;
}
```

## Key Differences Between Approaches:

### **Without Built-in Methods:**

- More control and understanding of algorithms
- Better for interviews to show algorithmic thinking
- Often better performance (O(n) vs O(n²) with some built-ins)
- More verbose but educational

### **With Built-in Methods:**

- Cleaner, more readable code
- Faster to write and maintain
- Leverages optimized JavaScript engine implementations
- Sometimes less efficient (e.g., nested indexOf calls)

### **When to Use Each:**

- **Learning/Interviews**: Implement without built-ins to demonstrate understanding
- **Production Code**: Use built-ins for cleaner, more maintainable code
- **Performance-critical**: Test both approaches, as sometimes manual implementation is faster

The manual implementations help you understand the underlying algorithms, while the built-in method solutions show you how to write concise, maintainable code in real-world applications.

<!---------------------------------------------











JS String problems coverage all






 --------------------------------->

I'll provide solutions for all string problems with both manual and built-in method approaches, plus alternative strategies.

## 1. Reverse a string

```javascript
// Method 1: Without built-in methods (manual loop)
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Method 2: Using built-in methods
function reverseStringBuiltIn(str) {
  return str.split("").reverse().join("");
}

// Alternative approach: Recursive
function reverseStringRecursive(str) {
  if (str === "") return "";
  return reverseStringRecursive(str.substr(1)) + str[0];
}

// Alternative: Two-pointer in-place (for array)
function reverseStringTwoPointer(str) {
  const chars = str.split("");
  let left = 0,
    right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join("");
}
```

## 2. Check palindrome

```javascript
// Method 1: Without built-in methods (two-pointer)
function isPalindrome(str) {
  let left = 0,
    right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Method 2: Using built-in methods
function isPalindromeBuiltIn(str) {
  return str === str.split("").reverse().join("");
}

// Alternative: Compare from both ends
function isPalindromeAlternative(str) {
  const length = str.length;
  for (let i = 0; i < Math.floor(length / 2); i++) {
    if (str[i] !== str[length - 1 - i]) return false;
  }
  return true;
}
```

## 3. Count vowels

```javascript
// Method 1: Without built-in methods (manual)
function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) count++;
  }
  return count;
}

// Method 2: Using regex built-in
function countVowelsBuiltIn(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

// Method 3: Using filter
function countVowelsFilter(str) {
  return str.split("").filter((char) => "aeiouAEIOU".includes(char)).length;
}
```

## 4. Count consonants

```javascript
// Method 1: Without built-in methods
function countConsonants(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
      if (!vowels.includes(char)) count++;
    }
  }
  return count;
}

// Method 2: Using regex built-in
function countConsonantsBuiltIn(str) {
  const matches = str.match(/[^aeiou\W\d]/gi);
  return matches ? matches.length : 0;
}
```

## 5. Convert to uppercase

```javascript
// Method 1: Without built-in methods
function toUpperCaseManual(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char >= "a" && char <= "z") {
      result += String.fromCharCode(char.charCodeAt(0) - 32);
    } else {
      result += char;
    }
  }
  return result;
}

// Method 2: Built-in method
function toUpperCaseBuiltIn(str) {
  return str.toUpperCase();
}
```

## 6. Convert to lowercase

```javascript
// Method 1: Without built-in methods
function toLowerCaseManual(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char >= "A" && char <= "Z") {
      result += String.fromCharCode(char.charCodeAt(0) + 32);
    } else {
      result += char;
    }
  }
  return result;
}

// Method 2: Built-in method
function toLowerCaseBuiltIn(str) {
  return str.toLowerCase();
}
```

## 7. Remove spaces

```javascript
// Method 1: Without built-in methods
function removeSpacesManual(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") result += str[i];
  }
  return result;
}

// Method 2: Using built-in methods
function removeSpacesBuiltIn(str) {
  return str.replace(/\s/g, "");
}

// Alternative: Remove all whitespace (spaces, tabs, newlines)
function removeAllWhitespace(str) {
  return str.replace(/\s+/g, "");
}
```

## 8. Find first occurrence of character

```javascript
// Method 1: Without built-in methods
function firstIndexOfChar(str, char) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) return i;
  }
  return -1;
}

// Method 2: Built-in method
function firstIndexOfCharBuiltIn(str, char) {
  return str.indexOf(char);
}
```

## 9. Find last occurrence of character

```javascript
// Method 1: Without built-in methods
function lastIndexOfChar(str, char) {
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === char) return i;
  }
  return -1;
}

// Method 2: Built-in method
function lastIndexOfCharBuiltIn(str, char) {
  return str.lastIndexOf(char);
}
```

## 10. Count occurrence of a character

```javascript
// Method 1: Without built-in methods
function countCharOccurrence(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) count++;
  }
  return count;
}

// Method 2: Using built-in methods
function countCharOccurrenceBuiltIn(str, char) {
  const matches = str.match(new RegExp(char, "g"));
  return matches ? matches.length : 0;
}

// Method 3: Using split
function countCharOccurrenceSplit(str, char) {
  return str.split(char).length - 1;
}
```

## 11. Remove duplicates from string

```javascript
// Method 1: Without built-in methods
function removeDuplicatesString(str) {
  let result = "";
  const seen = new Set();
  for (let i = 0; i < str.length; i++) {
    if (!seen.has(str[i])) {
      result += str[i];
      seen.add(str[i]);
    }
  }
  return result;
}

// Method 2: Using built-in methods
function removeDuplicatesStringBuiltIn(str) {
  return [...new Set(str)].join("");
}
```

## 12. Reverse each word in string

```javascript
// Method 1: Without built-in methods
function reverseEachWord(str) {
  let result = "";
  let wordStart = 0;

  for (let i = 0; i <= str.length; i++) {
    if (i === str.length || str[i] === " ") {
      // Reverse current word
      for (let j = i - 1; j >= wordStart; j--) {
        result += str[j];
      }
      // Add space if not last
      if (i !== str.length) result += " ";
      wordStart = i + 1;
    }
  }
  return result;
}

// Method 2: Using built-in methods
function reverseEachWordBuiltIn(str) {
  return str
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
}
```

## 13. Check anagrams

```javascript
// Method 1: Without built-in methods (frequency counting)
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};
  // Count frequency in str1
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    freq[char] = (freq[char] || 0) + 1;
  }
  // Subtract frequency from str2
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    if (!freq[char]) return false;
    freq[char]--;
  }
  return true;
}

// Method 2: Using built-in methods (sorting)
function areAnagramsBuiltIn(str1, str2) {
  const normalize = (s) => s.toLowerCase().split("").sort().join("");
  return normalize(str1) === normalize(str2);
}
```

## 14. Count words in string

```javascript
// Method 1: Without built-in methods
function countWords(str) {
  let count = 0;
  let inWord = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " " && !inWord) {
      count++;
      inWord = true;
    } else if (str[i] === " ") {
      inWord = false;
    }
  }
  return count;
}

// Method 2: Using built-in methods
function countWordsBuiltIn(str) {
  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}
```

## 15. Remove punctuation

```javascript
// Method 1: Without built-in methods
function removePunctuation(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      (char >= "0" && char <= "9") ||
      char === " "
    ) {
      result += char;
    }
  }
  return result;
}

// Method 2: Using built-in methods
function removePunctuationBuiltIn(str) {
  return str.replace(/[^\w\s]/g, "");
}
```

## 16. Find longest word

```javascript
// Method 1: Without built-in methods
function longestWord(str) {
  let longest = "";
  let current = "";

  for (let i = 0; i <= str.length; i++) {
    if (i === str.length || str[i] === " ") {
      if (current.length > longest.length) {
        longest = current;
      }
      current = "";
    } else {
      current += str[i];
    }
  }
  return longest;
}

// Method 2: Using built-in methods
function longestWordBuiltIn(str) {
  return str
    .split(" ")
    .reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      "",
    );
}
```

## 17. Capitalize first letter of each word

```javascript
// Method 1: Without built-in methods
function capitalizeWords(str) {
  let result = "";
  let capitalizeNext = true;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (capitalizeNext && char >= "a" && char <= "z") {
      result += String.fromCharCode(char.charCodeAt(0) - 32);
      capitalizeNext = false;
    } else {
      result += char;
    }

    if (char === " ") capitalizeNext = true;
  }
  return result;
}

// Method 2: Using built-in methods
function capitalizeWordsBuiltIn(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
```

## 18. Check if substring exists

```javascript
// Method 1: Without built-in methods (naive search)
function containsSubstring(str, substr) {
  if (substr.length > str.length) return false;

  for (let i = 0; i <= str.length - substr.length; i++) {
    let found = true;
    for (let j = 0; j < substr.length; j++) {
      if (str[i + j] !== substr[j]) {
        found = false;
        break;
      }
    }
    if (found) return true;
  }
  return false;
}

// Method 2: Using built-in methods
function containsSubstringBuiltIn(str, substr) {
  return str.includes(substr);
}
```

## 19. Remove vowels

```javascript
// Method 1: Without built-in methods
function removeVowelsManual(str) {
  const vowels = "aeiouAEIOU";
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (!vowels.includes(str[i])) result += str[i];
  }
  return result;
}

// Method 2: Using built-in methods
function removeVowelsBuiltIn(str) {
  return str.replace(/[aeiou]/gi, "");
}
```

## 20. Repeat string n times

```javascript
// Method 1: Without built-in methods
function repeatString(str, n) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += str;
  }
  return result;
}

// Method 2: Using built-in methods
function repeatStringBuiltIn(str, n) {
  return str.repeat(n);
}
```

## 21. Longest palindrome in string

```javascript
// Method 1: Expand around center (O(n²))
function longestPalindrome(str) {
  if (str.length < 1) return "";

  let start = 0,
    end = 0;

  for (let i = 0; i < str.length; i++) {
    // Odd length palindrome
    const len1 = expandAroundCenter(str, i, i);
    // Even length palindrome
    const len2 = expandAroundCenter(str, i, i + 1);
    const maxLen = Math.max(len1, len2);

    if (maxLen > end - start) {
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }

  return str.substring(start, end + 1);
}

function expandAroundCenter(str, left, right) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}
```

## 22. Count all palindromic substrings

```javascript
// Method: Expand around center for each index
function countPalindromicSubstrings(str) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    // Odd length palindromes
    count += expandAndCount(str, i, i);
    // Even length palindromes
    count += expandAndCount(str, i, i + 1);
  }

  return count;
}

function expandAndCount(str, left, right) {
  let count = 0;
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    count++;
    left--;
    right++;
  }
  return count;
}
```

## 23. Longest substring without repeating characters

```javascript
// Method: Sliding window with hash map
function longestUniqueSubstring(str) {
  const charIndex = new Map();
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < str.length; end++) {
    const char = str[end];
    if (charIndex.has(char)) {
      start = Math.max(start, charIndex.get(char) + 1);
    }
    charIndex.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Alternative: Using Set
function longestUniqueSubstringSet(str) {
  const charSet = new Set();
  let left = 0,
    maxLength = 0;

  for (let right = 0; right < str.length; right++) {
    while (charSet.has(str[right])) {
      charSet.delete(str[left]);
      left++;
    }
    charSet.add(str[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

## 24. Minimum window substring

```javascript
// Method: Sliding window with hash map
function minWindowSubstring(s, t) {
  if (t.length > s.length) return "";

  const targetCount = {};
  const windowCount = {};

  // Count characters in target string
  for (let char of t) {
    targetCount[char] = (targetCount[char] || 0) + 1;
  }

  let have = 0,
    need = Object.keys(targetCount).length;
  let result = [-1, -1],
    resultLength = Infinity;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowCount[char] = (windowCount[char] || 0) + 1;

    if (targetCount[char] && windowCount[char] === targetCount[char]) {
      have++;
    }

    while (have === need) {
      // Update result
      if (right - left + 1 < resultLength) {
        result = [left, right];
        resultLength = right - left + 1;
      }

      // Shrink window from left
      windowCount[s[left]]--;
      if (targetCount[s[left]] && windowCount[s[left]] < targetCount[s[left]]) {
        have--;
      }
      left++;
    }
  }

  return resultLength === Infinity ? "" : s.substring(result[0], result[1] + 1);
}
```

## 25. String compression

```javascript
// Method: Without built-in methods
function compressString(str) {
  if (str.length === 0) return "";

  let compressed = "";
  let count = 1;
  let currentChar = str[0];

  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      count++;
    } else {
      compressed += currentChar + count;
      currentChar = str[i];
      count = 1;
    }
  }

  compressed += currentChar + count;

  return compressed.length < str.length ? compressed : str;
}

// Alternative: Using built-in methods
function compressStringBuiltIn(str) {
  let result = "";
  let regex = /(.)\1*/g;
  let match;

  while ((match = regex.exec(str)) !== null) {
    result += match[1] + match[0].length;
  }

  return result.length < str.length ? result : str;
}
```

## 26. Longest repeating character replacement

```javascript
function longestRepeatingCharReplacement(s, k) {
  const charCount = new Array(26).fill(0);
  let maxCount = 0,
    maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const charIndex = s.charCodeAt(right) - 65;
    charCount[charIndex]++;
    maxCount = Math.max(maxCount, charCount[charIndex]);

    // If current window size - maxCount > k, need to shrink
    if (right - left + 1 - maxCount > k) {
      charCount[s.charCodeAt(left) - 65]--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

## 27. Check if rotation

```javascript
// Method 1: Without built-in methods (concatenation check)
function isRotation(str1, str2) {
  if (str1.length !== str2.length) return false;

  const concatenated = str1 + str1;
  // Naive substring check
  for (let i = 0; i <= concatenated.length - str2.length; i++) {
    let match = true;
    for (let j = 0; j < str2.length; j++) {
      if (concatenated[i + j] !== str2[j]) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }
  return false;
}

// Method 2: Using built-in methods
function isRotationBuiltIn(str1, str2) {
  return str1.length === str2.length && (str1 + str1).includes(str2);
}
```

## 28. String to integer (atoi)

```javascript
function stringToInteger(str) {
  let i = 0;
  let sign = 1;
  let result = 0;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  // Skip whitespace
  while (i < str.length && str[i] === " ") i++;

  // Check sign
  if (str[i] === "+" || str[i] === "-") {
    sign = str[i] === "-" ? -1 : 1;
    i++;
  }

  // Convert digits
  while (i < str.length && str[i] >= "0" && str[i] <= "9") {
    const digit = str.charCodeAt(i) - 48; // '0' char code is 48

    // Check overflow
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    i++;
  }

  return sign * result;
}
```

## 29. Validate palindrome ignoring non-alphanumeric

```javascript
// Method 1: Without built-in methods
function isPalindromeAlphanumeric(str) {
  let left = 0,
    right = str.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphanumeric(str[left])) left++;
    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphanumeric(str[right])) right--;

    if (toLowerCase(str[left]) !== toLowerCase(str[right])) return false;

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char) {
  return (
    (char >= "a" && char <= "z") ||
    (char >= "A" && char <= "Z") ||
    (char >= "0" && char <= "9")
  );
}

function toLowerCase(char) {
  if (char >= "A" && char <= "Z") {
    return String.fromCharCode(char.charCodeAt(0) + 32);
  }
  return char;
}

// Method 2: Using built-in methods
function isPalindromeAlphanumericBuiltIn(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleanStr === cleanStr.split("").reverse().join("");
}
```

## 30. Group anagrams

```javascript
// Method 1: Using frequency counting
function groupAnagrams(strs) {
  const groups = new Map();

  for (const str of strs) {
    // Create frequency count key
    const count = new Array(26).fill(0);
    for (const char of str) {
      count[char.charCodeAt(0) - 97]++; // 'a' is 97
    }
    const key = count.join("#");

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(str);
  }

  return Array.from(groups.values());
}

// Method 2: Using sorted strings as keys
function groupAnagramsBuiltIn(strs) {
  const groups = {};

  for (const str of strs) {
    const sorted = str.split("").sort().join("");
    if (!groups[sorted]) {
      groups[sorted] = [];
    }
    groups[sorted].push(str);
  }

  return Object.values(groups);
}
```

## Summary of Key Differences:

### **Manual Implementations:**

- More algorithmic understanding
- Better control over edge cases
- Often more efficient for specific cases
- Shows understanding of data structures

### **Built-in Method Implementations:**

- Cleaner and more readable
- Leverage JavaScript engine optimizations
- Faster to write and maintain
- More concise

### **When to Use Each Approach:**

1. **Interviews/Assessments**: Show manual implementations to demonstrate understanding
2. **Learning/Education**: Start with manual, then learn built-ins
3. **Production Code**: Use built-ins for maintainability
4. **Performance**: Test both - sometimes manual is faster, sometimes built-ins are faster

### **Most Common Patterns:**

1. **Sliding Window**: For substring problems
2. **Two Pointers**: For palindrome and rotation problems
3. **Hash Maps**: For frequency counting and grouping
4. **Expand Around Center**: For palindrome substrings
5. **Frequency Arrays**: For character counting (size 26 for English)

These implementations give you a solid foundation for solving string manipulation problems efficiently in both interview settings and real-world applications.

<!------------------------------------------------------







Array problems
both manual and
built-in methods used here





array problems with both manual implementations and built-in method approaches







 ---------------------------------------->

I'll provide solutions for all these array problems with both manual implementations and built-in method approaches.

## 1. Find Missing Number

```javascript
// Method 1: Without built-in methods (sum formula)
function findMissingNumber(arr, n) {
  let total = (n * (n + 1)) / 2;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return total - sum;
}

// Method 2: Without built-in methods (XOR)
function findMissingNumberXOR(arr, n) {
  let xor1 = 0,
    xor2 = 0;
  for (let i = 0; i < arr.length; i++) {
    xor1 ^= arr[i];
    xor2 ^= i + 1;
  }
  xor2 ^= n;
  return xor1 ^ xor2;
}

// Method 3: With built-in methods
function findMissingNumberBuiltIn(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
```

## 2. First Duplicate

```javascript
// Method 1: Without built-in methods (hash set)
function firstDuplicate(arr) {
  const seen = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i])) return arr[i];
    seen.add(arr[i]);
  }
  return -1;
}

// Method 2: Without built-in methods (mark negative)
function firstDuplicateInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    const index = Math.abs(arr[i]) - 1;
    if (arr[index] < 0) return Math.abs(arr[i]);
    arr[index] = -arr[index];
  }
  return -1;
}

// Method 3: With built-in methods
function firstDuplicateBuiltIn(arr) {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
  return -1;
}
```

## 3. Rotate Array by K Steps

```javascript
// Method 1: Without built-in methods (reverse segments)
function rotateArray(arr, k) {
  k = k % arr.length;
  if (k === 0) return arr;

  // Reverse entire array
  reverse(arr, 0, arr.length - 1);
  // Reverse first k elements
  reverse(arr, 0, k - 1);
  // Reverse remaining elements
  reverse(arr, k, arr.length - 1);
  return arr;

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
}

// Method 2: With built-in methods
function rotateArrayBuiltIn(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}
```

## 4. Maximum Subarray Sum (Kadane's)

```javascript
// Method 1: Without built-in methods (Kadane's algorithm)
function maxSubarraySum(arr) {
  if (arr.length === 0) return 0;

  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// Method 2: With built-in methods (O(n²))
function maxSubarraySumBuiltIn(arr) {
  let maxSum = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      const subarray = arr.slice(i, j + 1);
      const sum = subarray.reduce((a, b) => a + b, 0);
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum;
}
```

## 5. Check Arrays Equal (ignore order)

```javascript
// Method 1: Without built-in methods (frequency count)
function arraysEqualIgnoreOrder(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const freq = {};

  for (let i = 0; i < arr1.length; i++) {
    freq[arr1[i]] = (freq[arr1[i]] || 0) + 1;
    freq[arr2[i]] = (freq[arr2[i]] || 0) - 1;
  }

  for (const key in freq) {
    if (freq[key] !== 0) return false;
  }

  return true;
}

// Method 2: With built-in methods
function arraysEqualIgnoreOrderBuiltIn(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sorted1.every((val, idx) => val === sorted2[idx]);
}
```

## 6. Intersection of Two Arrays

```javascript
// Method 1: Without built-in methods (using Set)
function intersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const result = [];

  for (let i = 0; i < arr2.length; i++) {
    if (set1.has(arr2[i]) && !result.includes(arr2[i])) {
      result.push(arr2[i]);
    }
  }

  return result;
}

// Method 2: With built-in methods
function intersectionBuiltIn(arr1, arr2) {
  return [...new Set(arr1.filter((x) => arr2.includes(x)))];
}
```

## 7. Merge Overlapping Intervals

```javascript
// Method 1: Without built-in methods (manual sort + merge)
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  // Manual bubble sort (use built-in in production)
  for (let i = 0; i < intervals.length - 1; i++) {
    for (let j = 0; j < intervals.length - i - 1; j++) {
      if (intervals[j][0] > intervals[j + 1][0]) {
        [intervals[j], intervals[j + 1]] = [intervals[j + 1], intervals[j]];
      }
    }
  }

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

// Method 2: With built-in methods
function mergeIntervalsBuiltIn(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  return intervals.reduce((merged, current) => {
    const last = merged[merged.length - 1];
    if (last && current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
    return merged;
  }, []);
}
```

## 8. Two Sum

```javascript
// Method 1: Without built-in methods (hash map)
function twoSum(arr, target) {
  const map = {};

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[arr[i]] = i;
  }

  return [];
}

// Method 2: With built-in methods
function twoSumBuiltIn(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    const index = arr.indexOf(complement, i + 1);
    if (index !== -1) return [i, index];
  }
  return [];
}
```

## 9. Majority Element (> n/2)

```javascript
// Method 1: Without built-in methods (Boyer-Moore)
function majorityElement(arr) {
  let candidate = null;
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (count === 0) {
      candidate = arr[i];
      count = 1;
    } else if (arr[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }

  // Verify
  count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === candidate) count++;
  }

  return count > arr.length / 2 ? candidate : null;
}

// Method 2: With built-in methods
function majorityElementBuiltIn(arr) {
  const freq = {};
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] > arr.length / 2) return num;
  }
  return null;
}
```

## 10. Move All Zeros to End

```javascript
// Method 1: Without built-in methods (two-pointer)
function moveZerosToEnd(arr) {
  let nonZeroIndex = 0;

  // Move all non-zero elements to front
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[nonZeroIndex++] = arr[i];
    }
  }

  // Fill remaining positions with zeros
  for (let i = nonZeroIndex; i < arr.length; i++) {
    arr[i] = 0;
  }

  return arr;
}

// Method 2: With built-in methods
function moveZerosToEndBuiltIn(arr) {
  const nonZeros = arr.filter((x) => x !== 0);
  const zeros = arr.filter((x) => x === 0);
  return [...nonZeros, ...zeros];
}
```

## 11. Product of Array Except Self

```javascript
// Method 1: Without built-in methods (prefix & suffix)
function productExceptSelf(arr) {
  const n = arr.length;
  const result = new Array(n).fill(1);

  // Calculate prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= arr[i];
  }

  // Calculate suffix products
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= arr[i];
  }

  return result;
}

// Method 2: With built-in methods (less efficient)
function productExceptSelfBuiltIn(arr) {
  return arr.map((_, i) =>
    arr.reduce((product, num, j) => (j === i ? product : product * num), 1),
  );
}
```

## 12. Longest Consecutive Sequence

```javascript
// Method 1: Without built-in methods
function longestConsecutiveSequence(arr) {
  if (arr.length === 0) return 0;

  const numSet = new Set();
  for (let i = 0; i < arr.length; i++) {
    numSet.add(arr[i]);
  }

  let longest = 0;

  for (const num of numSet) {
    // Check if it's start of sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      longest = Math.max(longest, currentLength);
    }
  }

  return longest;
}
```

## 13. Find Duplicates without Extra Space

```javascript
// Method: Mark negative (modifies input array)
function findDuplicatesInPlace(arr) {
  const duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    const index = Math.abs(arr[i]) - 1;
    if (arr[index] < 0) {
      duplicates.push(Math.abs(arr[i]));
    } else {
      arr[index] = -arr[index];
    }
  }

  // Restore array (optional)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.abs(arr[i]);
  }

  return duplicates;
}
```

## 14. Check Subsequence

```javascript
// Method 1: Without built-in methods (two-pointer)
function isSubsequence(sub, arr) {
  if (sub.length === 0) return true;
  if (sub.length > arr.length) return false;

  let i = 0,
    j = 0;

  while (i < sub.length && j < arr.length) {
    if (sub[i] === arr[j]) {
      i++;
    }
    j++;
  }

  return i === sub.length;
}

// Method 2: With built-in methods
function isSubsequenceBuiltIn(sub, arr) {
  return sub.every((char) => {
    const index = arr.indexOf(char);
    if (index === -1) return false;
    arr = arr.slice(index + 1);
    return true;
  });
}
```

## 15. Equilibrium Index

```javascript
// Method 1: Without built-in methods
function equilibriumIndex(arr) {
  let totalSum = 0;
  for (let i = 0; i < arr.length; i++) {
    totalSum += arr[i];
  }

  let leftSum = 0;
  for (let i = 0; i < arr.length; i++) {
    const rightSum = totalSum - leftSum - arr[i];
    if (leftSum === rightSum) return i;
    leftSum += arr[i];
  }

  return -1;
}

// Method 2: With built-in methods
function equilibriumIndexBuiltIn(arr) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  let leftSum = 0;

  return arr.findIndex((num, i) => {
    const rightSum = totalSum - leftSum - num;
    const found = leftSum === rightSum;
    leftSum += num;
    return found;
  });
}
```

## 16. Spiral Matrix Traversal

```javascript
// Method: Without built-in methods
function spiralTraversal(matrix) {
  if (matrix.length === 0) return [];

  const result = [];
  let top = 0,
    bottom = matrix.length - 1;
  let left = 0,
    right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Top row
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // Right column
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    // Bottom row
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    // Left column
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}
```

## 17. Kth Largest Element

```javascript
// Method 1: Without built-in methods (quickselect)
function findKthLargest(arr, k) {
  k = arr.length - k; // Convert to kth smallest

  function quickselect(l, r) {
    const pivot = arr[r];
    let p = l;

    for (let i = l; i < r; i++) {
      if (arr[i] <= pivot) {
        [arr[p], arr[i]] = [arr[i], arr[p]];
        p++;
      }
    }
    [arr[p], arr[r]] = [arr[r], arr[p]];

    if (p > k) return quickselect(l, p - 1);
    if (p < k) return quickselect(p + 1, r);
    return arr[p];
  }

  return quickselect(0, arr.length - 1);
}

// Method 2: With built-in methods
function findKthLargestBuiltIn(arr, k) {
  return arr.sort((a, b) => b - a)[k - 1];
}
```

## 18. Remove Duplicates from Sorted Array

```javascript
// Method 1: Without built-in methods (two-pointer)
function removeDuplicatesInPlace(arr) {
  if (arr.length === 0) return 0;

  let uniqueIndex = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arr[uniqueIndex] = arr[i];
      uniqueIndex++;
    }
  }

  return uniqueIndex; // New length
}

// Method 2: With built-in methods
function removeDuplicatesBuiltIn(arr) {
  return [...new Set(arr)];
}
```

## 19. Three Sum = 0

```javascript
// Method 1: Without built-in methods (sort + two-pointer)
function threeSum(arr) {
  const result = [];
  arr.sort((a, b) => a - b);

  for (let i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue;

    let left = i + 1,
      right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum === 0) {
        result.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;

        // Skip duplicates
        while (left < right && arr[left] === arr[left - 1]) left++;
        while (left < right && arr[right] === arr[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

## 20. Maximum Product Subarray

```javascript
// Method: Without built-in methods
function maxProductSubarray(arr) {
  if (arr.length === 0) return 0;

  let maxProd = arr[0];
  let minProd = arr[0];
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const num = arr[i];

    // Swap if negative
    if (num < 0) {
      [maxProd, minProd] = [minProd, maxProd];
    }

    maxProd = Math.max(num, maxProd * num);
    minProd = Math.min(num, minProd * num);

    result = Math.max(result, maxProd);
  }

  return result;
}
```

## 21. Find Missing Ranges

```javascript
// Method 1: Without built-in methods
function findMissingRanges(arr, lower, upper) {
  const result = [];

  // Helper function to add range
  const addRange = (start, end) => {
    if (start === end) {
      result.push(`${start}`);
    } else {
      result.push(`${start}->${end}`);
    }
  };

  // Check before first element
  if (arr.length === 0) {
    addRange(lower, upper);
    return result;
  }

  if (lower < arr[0]) {
    addRange(lower, arr[0] - 1);
  }

  // Check between elements
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] > 1) {
      addRange(arr[i - 1] + 1, arr[i] - 1);
    }
  }

  // Check after last element
  if (arr[arr.length - 1] < upper) {
    addRange(arr[arr.length - 1] + 1, upper);
  }

  return result;
}
```

## 22. Flatten Nested Arrays

```javascript
// Method 1: Without built-in methods (recursive)
function flattenArray(arr) {
  const result = [];

  function flattenHelper(item) {
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        flattenHelper(item[i]);
      }
    } else {
      result.push(item);
    }
  }

  flattenHelper(arr);
  return result;
}

// Method 2: With built-in methods
function flattenArrayBuiltIn(arr) {
  return arr.flat(Infinity);
}

// Method 3: Using reduce
function flattenArrayReduce(arr) {
  return arr.reduce(
    (flat, item) =>
      flat.concat(Array.isArray(item) ? flattenArrayReduce(item) : item),
    [],
  );
}
```

## 23. Longest Subarray with Sum = K

```javascript
// Method: Without built-in methods (hash map)
function longestSubarrayWithSum(arr, k) {
  const prefixSum = new Map();
  let maxLength = 0;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    if (sum === k) {
      maxLength = i + 1;
    }

    if (prefixSum.has(sum - k)) {
      maxLength = Math.max(maxLength, i - prefixSum.get(sum - k));
    }

    if (!prefixSum.has(sum)) {
      prefixSum.set(sum, i);
    }
  }

  return maxLength;
}
```

## 24. Partition Array into Equal Sum

```javascript
// Method 1: Without built-in methods
function canPartitionEqualSum(arr) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  const n = arr.length;

  // DP approach
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < n; i++) {
    for (let j = target; j >= arr[i]; j--) {
      dp[j] = dp[j] || dp[j - arr[i]];
    }
  }

  return dp[target];
}
```

## 25. Find Peak Element

```javascript
// Method 1: Without built-in methods (binary search)
function findPeakElement(arr) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] > arr[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// Method 2: Linear scan
function findPeakElementLinear(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (
      (i === 0 || arr[i] >= arr[i - 1]) &&
      (i === arr.length - 1 || arr[i] >= arr[i + 1])
    ) {
      return i;
    }
  }
  return -1;
}
```

## Key Differences Between Approaches:

### **Manual Implementations:**

- **Understanding**: Shows deep understanding of algorithms
- **Control**: Full control over time/space complexity
- **Edge Cases**: Better handling of edge cases
- **Optimization**: Can be optimized for specific use cases

### **Built-in Method Implementations:**

- **Readability**: More concise and readable
- **Productivity**: Faster to write and maintain
- **Optimized**: JavaScript engines optimize built-ins
- **Reliability**: Well-tested and bug-free

### **Performance Considerations:**

1. **Manual is often faster** for algorithmic problems
2. **Built-ins are optimized** for typical use cases
3. **Memory usage** can differ significantly
4. **Readability vs performance** trade-off

### **When to Use Each:**

- **Interviews**: Manual to demonstrate skills
- **Learning**: Start manual, then learn built-ins
- **Production**: Built-ins for maintainability
- **Performance-critical**: Test both approaches

This comprehensive set of solutions provides you with both the fundamental understanding (manual) and practical implementation (built-in) skills needed for interviews and real-world development.

<!------------------------------------------==================




Quick Recall Guide: Array & String Problems
📚 MENTAL FRAMEWORK - ALGORITHM TREE













 -------------------------------------------------------------->

# **Quick Recall Guide: Array & String Problems**

## 📚 **MENTAL FRAMEWORK - ALGORITHM TREE**

```
PROBLEM TYPES
├── ARRAY PROBLEMS
│   ├── SUM/CALCULATION (5)
│   ├── SEARCH/FIND (8)
│   ├── MODIFICATION (7)
│   ├── MULTI-DIMENSIONAL (3)
│   └── PATTERN MATCHING (5)
└── STRING PROBLEMS
    ├── REVERSE/TRANSFORM (7)
    ├── VALIDATION/CHECK (6)
    ├── SUBSTRING/PATTERN (8)
    └── COUNT/FREQUENCY (6)
```

---

## 🎯 **ARRAY PROBLEMS - QUICK RECALL CHEATSHEET**

### **1. SUM/CALCULATION PROBLEMS**

| Problem               | Key Concept          | Memory Hook             | Code Hint               |
| --------------------- | -------------------- | ----------------------- | ----------------------- |
| **Sum of elements**   | Loop + accumulate    | "Total sum = add all"   | `for + sum`             |
| **Max/Min element**   | Track while looping  | "Keep biggest/smallest" | `if > max / < min`      |
| **Prefix Sum**        | Running total array  | "Cumulative sum"        | `sum += arr[i]`         |
| **Equilibrium Index** | Left sum = Right sum | "Balance point"         | `total - left - arr[i]` |
| **Missing Number**    | Sum formula or XOR   | "n\*(n+1)/2 - sum"      | `totalSum - actualSum`  |

**🎵 Mnemonic**: **"SMMPE"** - Sum, Max/Min, Missing, Prefix, Equilibrium

---

### **2. SEARCH/FIND PROBLEMS**

| Problem                   | Key Concept           | Memory Hook            | Pattern               |
| ------------------------- | --------------------- | ---------------------- | --------------------- |
| **First/Last occurrence** | Linear scan           | "Scan find first/last" | `for + if + return`   |
| **Find duplicates**       | Set/HashMap           | "Seen before?"         | `Set.has() → return`  |
| **Majority element**      | Boyer-Moore voting    | "Candidate + count"    | `count=0 → candidate` |
| **Kth Largest**           | Sort or QuickSelect   | "Sort → k-1 index"     | `sort()[k-1]`         |
| **Peak element**          | Binary search compare | "Mid > mid+1?"         | `binary search`       |
| **Missing ranges**        | Gap detection         | "Find gaps"            | `curr-prev > 1`       |
| **Three Sum**             | Sort + Two pointer    | "Fix i, left+right"    | `i + left + right`    |

**🎵 Mnemonic**: **"FD MKP T"** - Find, Duplicate, Majority, Kth, Peak, ThreeSum

---

### **3. MODIFICATION PROBLEMS**

| Problem                 | Key Concept           | Memory Hook                    | Pattern                            |
| ----------------------- | --------------------- | ------------------------------ | ---------------------------------- |
| **Reverse array**       | Swap ends to middle   | "Swap start-end"               | `while(left<right) swap`           |
| **Rotate array**        | Reverse segments      | "Reverse trick"                | `reverse all → reverse parts`      |
| **Move zeros**          | Two-pointer overwrite | "Non-zero forward"             | `if ≠0 → copy → fill 0`            |
| **Remove duplicates**   | Unique pointer        | "New index for unique"         | `if ≠ prev → copy`                 |
| **Merge arrays**        | Pointer merge         | "Combine in order"             | `while both → compare`             |
| **Product except self** | Prefix × Suffix       | "Left product × Right product" | `prefix[i] = prefix[i-1]*arr[i-1]` |
| **Partition equal sum** | Subset sum DP         | "Find subset sum/2"            | `dp[sum] = true/false`             |

**🎵 Mnemonic**: **"RR M MPP"** - Reverse, Rotate, Move, Merge, Product, Partition

---

### **4. MULTI-DIMENSIONAL ARRAYS**

| Problem              | Key Concept         | Memory Hook                      | Pattern               |
| -------------------- | ------------------- | -------------------------------- | --------------------- |
| **Spiral traversal** | 4 boundaries        | "Top, Right, Bottom, Left"       | `while(T≤B && L≤R)`   |
| **Rotate matrix**    | Transpose + Reverse | "Swap(i,j)→(j,i) + reverse rows" | `transpose → reverse` |
| **Search 2D matrix** | Binary search       | "Row = mid/cols, Col = mid%cols" | `binary search`       |

**🎵 Mnemonic**: **"SRT"** - Spiral, Rotate, Traverse
3

---

### **5. PATTERN MATCHING PROBLEMS**

| Problem                  | Key Concept          | Memory Hook                   | Pattern                                       |
| ------------------------ | -------------------- | ----------------------------- | --------------------------------------------- |
| **Two Sum**              | HashMap complement   | "Need = target - curr"        | `Map[complement]`                             |
| **Subarray sum K**       | Prefix sum HashMap   | "Sum[i] - Sum[j] = K"         | `Map.has(sum-K)`                              |
| **Max subarray sum**     | Kadane's algorithm   | "Max(curr, curr+prev)"        | `maxEndingHere = max(num, maxEndingHere+num)` |
| **Max product subarray** | Track min/max        | "Swap on negative"            | `if<0 swap(max,min)`                          |
| **Longest consecutive**  | Set + sequence start | "No left neighbor → sequence" | `!set.has(num-1)`                             |

**🎵 Mnemonic**: **"TS SM ML"** - TwoSum, SubarraySum, MaxSubarray, MaxProduct, Longestrer

---

## 🎯 **STRING PROBLEMS - QUICK RECALL CHEATSHEET**

### **1. REVERSE/TRANSFORM**

| Problem                       | Key Concept             | Memory Hook                | Pattern                     |
| ----------------------------- | ----------------------- | -------------------------- | --------------------------- |
| **Reverse string**            | Swap ends               | "Swap start-end chars"     | `while(left<right) swap`    |
| **Reverse words**             | Split → Reverse each    | "Word by word reverse"     | `split(' ') → map(reverse)` |
| **Uppercase/Lowercase**       | Char code ±32           | "A(65) ↔ a(97) diff 32"    | `charCodeAt() ± 32`         |
| **Remove spaces/punctuation** | Filter characters       | "Keep only letters/digits" | `if(isAlphaNumeric)`        |
| **Capitalize words**          | Uppercase first letter  | "First char uppercase"     | `word[0].toUpperCase()`     |
| **Repeat string**             | Concatenate n times     | "Loop n times add"         | `result += str`             |
| **Rotate string**             | Concatenate self + find | "(str+str).includes(s2)"   | `double check`              |

**🎵 Mnemonic**: **"RRU RCR"** - Reverse, ReverseWords, Uppercase, Remove, Capitalize, Repeat, Rotate

---

### **2. VALIDATION/CHECK**

| Problem                         | Key Concept             | Memory Hook                   | Pattern                               |
| ------------------------------- | ----------------------- | ----------------------------- | ------------------------------------- |
| **Palindrome**                  | Compare ends            | "Left=Right?"                 | `while(left<right)`                   |
| **Anagram**                     | Frequency count or sort | "Same chars count"            | `sort→compare OR map count`           |
| **Valid parentheses**           | Stack matching          | "Push open, pop close"        | `stack.push() / stack.pop()`          |
| **Is subsequence**              | Two-pointer scan        | "Pointer in both strings"     | `while(i<sub.length && j<str.length)` |
| **Is rotation**                 | Concatenate + find      | "s1+s1 contains s2"           | `(s1+s1).includes(s2)`                |
| **Palindrome ignore non-alpha** | Filter + compare        | "Clean then check palindrome" | `replace(/\W/g,'')`                   |

**🎵 Mnemonic**: **"PAV IRS"** - Palindrome, Anagram, ValidParentheses, IsSubsequence, IsRotation, SpecialPalindrome

---

### **3. SUBSTRING/PATTERN**

| Problem                           | Key Concept                | Memory Hook                           | Pattern                                 |
| --------------------------------- | -------------------------- | ------------------------------------- | --------------------------------------- |
| **Longest substring no repeat**   | Sliding window + Set       | "Expand right, shrink left if repeat" | `while(set.has) delete left++`          |
| **Longest palindrome**            | Expand around center       | "Odd/even expand from center"         | `expand(i,i) + expand(i,i+1)`           |
| **Min window substring**          | Sliding window + HashMap   | "Have/Need counters"                  | `while(have===need) shrink`             |
| **Count palindrome substrings**   | Expand count all           | "All centers count expands"           | `expandCount(i,i) + expandCount(i,i+1)` |
| **String compression**            | Count consecutive          | "Char + count if >1"                  | `while(same) count++`                   |
| **Group anagrams**                | Sort key or frequency key  | "Sorted word as map key"              | `Map[sorted].push(word)`                |
| **Longest repeating replacement** | Sliding window + maxFreq   | "Window - maxFreq ≤ k"                | `while(winSize-maxFreq>k) left++`       |
| **String to integer (atoi)**      | Parse digits with overflow | "Skip spaces → sign → digits"         | `result*10 + digit`                     |

**🎵 Mnemonic**: **"LPM C GLR S"** - LongestUnique, Palindrome, MinWindow, CountPalindromes, Compression, GroupAnagrams, LongestReplacement, StringToInt

---

### **4. COUNT/FREQUENCY**

| Problem                         | Key Concept          | Memory Hook                      | Pattern                       |
| ------------------------------- | -------------------- | -------------------------------- | ----------------------------- | --- | ----- |
| **Count vowels/consonants**     | Check char set       | "aeiou includes?"                | `if('aeiou'.includes(char))`  |
| **Count character occurrences** | Frequency map        | "Map[char]++"                    | `freq[char] = (freq[char]     |     | 0)+1` |
| **Count words**                 | Split whitespace     | "trim→split(/\s+/)→length"       | `split and filter empty`      |
| **First unique character**      | Frequency + scan     | "Count all → find first count=1" | `freq then find index`        |
| **Remove duplicates**           | Set or result string | "Seen? skip : add"               | `if(!seen.has) result+=char`  |
| **Find duplicates**             | Set detection        | "Seen before? → duplicate"       | `if(seen.has) duplicates.add` |

**🎵 Mnemonic**: **"VCO W FRD"** - Vowels, CharacterOccurrence, Words, FirstUnique, RemoveDuplicates, FindDuplicates

---

## 🚀 **PROBLEM-SOLVING DECISION TREE**

### **QUESTION: Which pattern to use?**

```
START → What's being asked?
  │
  ├─ SUM/CALCULATION? → Prefix sum, Kadane's, Two pointers
  │
  ├─ SEARCH/FIND? → HashMap, Binary search, Two pointers
  │
  ├─ MODIFICATION? → In-place, Two pointers, Reverse trick
  │
  ├─ VALIDATION? → Stack, Two pointers, Frequency count
  │
  ├─ SUBSTRING/PATTERN? → Sliding window, Expand center
  │
  └─ COUNT/FREQUENCY? → HashMap, Array counter
```

### **QUICK PATTERN MATCHER:**

**See these words → Use this pattern:**

- **"Sum"** → Prefix sum / Kadane's / Two pointers
- **"Find pair"** → HashMap (Two Sum pattern)
- **"Longest substring"** → Sliding window
- **"Palindrome"** → Two pointers / Expand center
- **"Duplicate"** → Set / HashMap
- **"Rotate"** → Reverse segments / Modulus indexing
- **"Merge/Overlap"** → Sort + compare ends
- **"Kth largest/smallest"** → QuickSelect / Heap
- **"Consecutive"** → Set + check sequence start

---

## 📝 **MEMORY PEG SYSTEM (Use Stories)**

### **Array Stories:**

1. **"SUM Family"** - 5 problems: Sum, Max/Min, Prefix, Equilibrium, Missing
   _Story: A family of 5 needs to SUM everything, find MAX person, PREFIX titles, find EQUILIBRIUM, and notice who's MISSING_

2. **"Search Squad"** - 8 problems: Find, Duplicate, Majority, Kth, Peak, Ranges, ThreeSum
   _Story: A search squad of 8 looks for things: FIND items, spot DUPLICATES, follow MAJORITY, find Kth in line, reach PEAK, check RANGES, make THREE teams_

3. **"Modify Mechanics"** - 7 problems: Reverse, Rotate, Move, Remove, Merge, Product, Partition
   _Story: 7 mechanics MODIFY cars: REVERSE gear, ROTATE tires, MOVE parts, REMOVE dents, MERGE tools, check PRODUCT specs, PARTITION garage_

### **String Stories:**

1. **"Transform Team"** - 7 problems: Reverse, ReverseWords, Case, Remove, Capitalize, Repeat, Rotate
   _Story: 7 transformers: REVERSE bot, WORD reverser, CASE changer, REMOVER bot, CAPITALIZER, REPEATER, ROTATOR_

2. **"Validator Vanguard"** - 6 problems: Palindrome, Anagram, Parentheses, Subsequence, Rotation, SpecialPal
   _Story: 6 validators check: PALINDROME mirror, ANAGRAM scrambler, PARENTHESES balancer, SUBSEQUENCE tracker, ROTATION detector, SPECIAL cleaner_

---

## 🎮 **DAILY PRACTICE ROUTINE**

### **Week 1-2: Foundation (30 mins/day)**

- **Day 1-3**: Sum/Max/Min problems (5 problems)
- **Day 4-6**: Search/Find problems (8 problems)
- **Day 7-9**: Modification problems (7 problems)
- **Day 10-12**: String transformation (7 problems)
- **Day 13-15**: String validation (6 problems)

### **Week 3-4: Advanced (45 mins/day)**

- **Day 1-3**: Pattern problems (5 array + 3 string)
- **Day 4-6**: Multi-dimensional + Substring
- **Day 7-9**: Mixed bag practice
- **Day 10-12**: Timed mock solving
- **Day 13-15**: Review weak areas

---

## 🔑 **CRITICAL FORMULAS TO MEMORIZE**

### **Array Formulas:**

1. **Missing Number**: `n*(n+1)/2 - sum(arr)`
2. **Kadane's Algorithm**:
   ```javascript
   maxEndingHere = Math.max(num, maxEndingHere + num);
   maxSoFar = Math.max(maxSoFar, maxEndingHere);
   ```
3. **Prefix Sum**: `prefix[i] = prefix[i-1] + arr[i-1]`
4. **Two Sum**: `complement = target - arr[i]`
5. **Rotate by K**: `arr[(i+k)%n] = arr[i]`

### **String Formulas:**

1. **Palindrome**: `while(left<right && s[left]===s[right])`
2. **Sliding Window**: `while(condition) { add right; while(invalid) remove left }`
3. **Expand Center**: `expand(left, right) while(s[left]===s[right])`
4. **Char Case**: `charCode +/- 32`

---

## 🧠 **INSTANT RECALL TRICKS**

### **When you see:**

- **"Consecutive"** → Think **SET + check left neighbor**
- **"Subarray sum"** → Think **PREFIX SUM + HashMap**
- **"Longest without repeat"** → Think **SLIDING WINDOW + Set**
- **"Palindrome"** → Think **TWO POINTERS or EXPAND CENTER**
- **"Kth element"** → Think **QUICKSELECT or SORT**
- **"Duplicate"** → Think **SET or NEGATIVE MARKING**
- **"Merge intervals"** → Think **SORT + COMPARE ENDS**

---

## 📱 **QUICK REFERENCE CARDS**

### **CARD 1: Array Patterns**

```
Two Sum → HashMap complement
Max Subarray → Kadane's (track current)
Longest Consecutive → Set + start check
Rotate → Reverse segments
Move Zeros → Two-pointer overwrite
```

### **CARD 2: String Patterns**

```
Palindrome → Two pointers / Expand center
Longest Unique → Sliding window + Set
Anagram → Frequency map / Sort
Subsequence → Two pointers
Min Window → Sliding window + HashMap
```

---

## 🎯 **LAST-MINUTE INTERVIEW PREP**

### **Top 10 MUST-KNOW:**

1. Two Sum (HashMap)
2. Max Subarray Sum (Kadane's)
3. Longest Substring Without Repeat (Sliding Window)
4. Valid Palindrome (Two pointers)
5. Merge Intervals (Sort + merge)
6. Group Anagrams (HashMap with sorted key)
7. Product Except Self (Prefix × Suffix)
8. Longest Consecutive Sequence (Set + start)
9. Rotate Array (Reverse trick)
10. Valid Parentheses (Stack)

### **When Stuck, Ask:**

1. Can I use extra space? → HashMap/Set
2. Need O(1) space? → Two pointers / In-place
3. Sorted/Can sort? → Two pointers / Binary search
4. Need all combinations? → Backtracking
5. Optimal substructure? → DP

---

## 📈 **PROGRESS TRACKING**

Track these metrics:

- **Recall speed**: How quickly you identify pattern
- **Implementation time**: Time to code solution
- **Bug rate**: How often first attempt fails
- **Optimization**: Can you improve space/time?

**Remember**: It's not about memorizing code, but recognizing **patterns** and applying **concepts**.

Would you like me to create flashcards, a spaced repetition schedule, or specific drills for any particular problem type?

<!---------------------------------------------






Array and string problems

🎯 Spaced Repetition Flashcard System for Array & String Problems
📅 30-Day Mastery Plan







 ------------------------------>

# 🎯 **Spaced Repetition Flashcard System for Array & String Problems**

## 📅 **30-Day Mastery Plan**

### **Phase 1: Foundation (Days 1-10)**

**Daily: 20 flashcards, 30 minutes**

---

## 🃏 **FLASHCARDS FORMAT**

### **CARD TYPE 1: Problem Pattern Recognition**

**FRONT:**

```
"Find the first duplicate element in an array"
```

**BACK:**

```
PATTERN: Hash Set Detection
APPROACH: Use Set to track seen elements
KEY CODE: if (seen.has(arr[i])) return arr[i]
TIME: O(n), SPACE: O(n)
ALTERNATIVE: Negative marking for O(1) space
MEMORY HOOK: "Seen before? → Duplicate"
```

---

### **CARD TYPE 2: Code Template Recall**

**FRONT:**

```
Write the template for "Two Sum"
```

**BACK:**

```javascript
function twoSum(arr, target) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[arr[i]] = i;
  }
  return [];
}
// Memory: "Complement = target - current"
```

---

## 🗓️ **DAILY SCHEDULE**

### **Week 1: Core Patterns (Days 1-7)**

**Theme: "One Pattern Per Day"**

#### **Day 1: HashMap Patterns**

```
Flashcards (10):
1. Two Sum
2. First Duplicate
3. Group Anagrams
4. Longest Consecutive Sequence
5. Longest Substring Without Repeat
6. Find All Duplicates
7. First Unique Character
8. Valid Anagram
9. Intersection of Two Arrays
10. Majority Element

Drill: Code all 10 in 60 mins
```

#### **Day 2: Two Pointer Patterns**

```
Flashcards (10):
1. Palindrome Check
2. Container With Most Water
3. Three Sum
4. Remove Duplicates (Sorted)
5. Move Zeros to End
6. Valid Palindrome (with cleanup)
7. Merge Sorted Arrays
8. Is Subsequence
9. Sort Colors
10. Reverse String

Drill: Identify when to use 2-pointer
```

#### **Day 3: Sliding Window Patterns**

```
Flashcards (8):
1. Longest Substring Without Repeat
2. Minimum Window Substring
3. Longest Repeating Character Replacement
4. Max Consecutive Ones
5. Permutation in String
6. Fruit Into Baskets
7. Longest Subarray with Sum K
8. Best Time to Buy/Sell Stock

Drill: Write sliding window template
```

#### **Day 4: Prefix Sum/Dynamic Patterns**

```
Flashcards (8):
1. Maximum Subarray Sum (Kadane's)
2. Product Except Self
3. Subarray Sum Equals K
4. Range Sum Query
5. Equilibrium Index
6. Trapping Rain Water
7. Maximum Product Subarray
8. Best Time to Buy/Sell Stock II

Drill: Prefix sum formula practice
```

#### **Day 5: In-place Modification**

```
Flashcards (8):
1. Rotate Array
2. Move Zeros to End
3. Remove Duplicates (Sorted)
4. Remove Element
5. Sort Colors
6. First Missing Positive
7. Set Matrix Zeroes
8. Reverse Array/String

Drill: In-place algorithms without extra space
```

#### **Day 6: Matrix/2D Array**

```
Flashcards (6):
1. Spiral Matrix
2. Rotate Image
3. Set Matrix Zeroes
4. Search 2D Matrix
5. Number of Islands
6. Word Search

Drill: Matrix traversal patterns
```

#### **Day 7: Sorting/Heap Patterns**

```
Flashcards (8):
1. Kth Largest Element
2. Merge Intervals
3. Top K Frequent Elements
4. Meeting Rooms
5. Sort Colors
6. Valid Anagram
7. Maximum Product of Three
8. Array Partition

Drill: When to sort vs when to use heap
```

---

### **Week 2: String Mastery (Days 8-14)**

#### **Day 8: Palindrome Patterns**

```
Flashcards (6):
1. Valid Palindrome
2. Longest Palindromic Substring
3. Count Palindromic Substrings
4. Palindrome Partitioning
5. Valid Palindrome II (one deletion)
6. Shortest Palindrome

Pattern: Two pointers or Expand center
```

#### **Day 9: Substring/Search Patterns**

```
Flashcards (7):
1. Longest Substring Without Repeat
2. Minimum Window Substring
3. Find All Anagrams
4. Longest Repeating Character Replacement
5. Permutation in String
6. Substring with Concatenation
7. Implement strStr()

Pattern: Sliding window or KMP
```

#### **Day 10: Transformation Patterns**

```
Flashcards (8):
1. Reverse String
2. Reverse Words
3. String Compression
4. Zigzag Conversion
5. Integer to Roman
6. Roman to Integer
7. String to Integer (atoi)
8. Count and Say

Pattern: Character manipulation
```

---

## 🎮 **INTERACTIVE DRILLS**

### **Drill 1: Pattern Identification Game**

```
Given problem statement, identify pattern in 10 seconds:

1. "Find two numbers that add to target" → HashMap
2. "Maximum sum of contiguous subarray" → Kadane's
3. "Check if string reads same backward" → Two pointers
4. "Longest substring with unique chars" → Sliding window
5. "Rotate array by k positions" → Reverse segments
```

### **Drill 2: Code Template Completion**

```js
Fill in blanks:

function maxSubarraySum(arr) {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];

    for (let i = 1; i < arr.length; i++) {
        maxEndingHere = Math.max(______, maxEndingHere + ______);
        maxSoFar = Math.max(______, ______);
    }
    return maxSoFar;
}
```

### **Drill 3: Time/Space Complexity Quiz**

```
Two Sum: O( ) time, O( ) space
Merge Sort: O( ) time, O( ) space
Binary Search: O( ) time, O( ) space
Quick Sort: O( ) time, O( ) space
```

---

## 📊 **PROGRESS TRACKER TEMPLATE**

```javascript
const progress = {
  day1: { patterns: ["HashMap"], score: 0, time: 0 },
  day2: { patterns: ["TwoPointer"], score: 0, time: 0 },
  day3: { patterns: ["SlidingWindow"], score: 0, time: 0 },
  // ... track all days
};

// Daily Metrics:
// 1. Pattern recognition speed (seconds)
// 2. Code completion time (minutes)
// 3. Accuracy (%)
// 4. Memory usage recall
```

---

## 🧩 **PATTERN MATCHING CHEAT SHEET (Pocket Size)**

### **Array Problems:**

```
"Sum" → Prefix sum / Kadane's
"Find pair" → HashMap
"Subarray" → Sliding window / Prefix sum
"Duplicate" → Set / Negative marking
"Rotate" → Reverse trick
"Kth" → QuickSelect / Heap
"Consecutive" → Set + sequence start
"Interval" → Sort + compare ends
```

### **String Problems:**

```
"Palindrome" → Two pointers / Expand center
"Substring" → Sliding window
"Anagram" → Frequency map / Sort
"Transform" → Character manipulation
"Match" → Two pointers / KMP
"Compress" → Count consecutive
```

---

## ⏰ **DAILY PRACTICE SCHEDULE**

### **Morning (10 mins):**

- Review 5 flashcards from previous day
- Quick pattern recognition drill (5 problems)

### **Afternoon (20 mins):**

- Learn 3 new patterns
- Code template writing
- Time complexity analysis

### **Evening (15 mins):**

- Mixed problem solving (random pattern)
- Self-test without looking
- Error analysis

---

## 🎯 **WEEKLY REVIEW SYSTEM**

### **Saturday: Pattern Review**

```
Review all patterns learned:
1. HashMap (3 problems)
2. Two Pointer (3 problems)
3. Sliding Window (3 problems)
4. Prefix Sum (3 problems)
5. In-place (3 problems)
```

### **Sunday: Mock Interview**

```
45-minute session:
- 2 Easy problems (10 mins each)
- 2 Medium problems (15 mins each)
- Pattern identification practice
- Time management drill
```

---

## 🚨 **COMMON PITFALLS & SOLUTIONS**

### **Pitfall 1: Overcomplicating**

```
Solution: Always start with brute force
Then optimize: Can I use HashMap? Sort? Two pointers?
```

### **Pitfall 2: Forgetting edge cases**

```
Solution: Create checklist:
- Empty input
- Single element
- All same elements
- Large input
- Negative numbers
```

### **Pitfall 3: Poor time management**

```
Solution: 5-10-15 rule:
- 5 mins: Understand + plan
- 10 mins: Implement
- 15 mins: Test + optimize
```

---

## 📱 **DIGITAL FLASHCARD TEMPLATE**

### **Anki Card Format:**

```
Front: Problem statement + constraints
Back:
1. Pattern name
2. Time/Space complexity
3. Key code snippet
4. Common mistakes
5. Related problems
```

### **Example Card:**

```js
FRONT:
"Given an array, find two numbers that add to target.
Assume exactly one solution, can't use same element twice."

BACK:
PATTERN: Two Sum (HashMap)
COMPLEXITY: O(n) time, O(n) space
CODE:
  const map = {};
  for(i) {
    complement = target - arr[i];
    if(map[complement]) return [map[complement], i];
    map[arr[i]] = i;
  }
MISTAKES: Forgetting to check undefined, using same element
RELATED: Three Sum, Four Sum, Two Sum II (sorted)
```

---

## 🏆 **30-DAY PROGRESS MILESTONES**

### **Week 1 Goal:** Recognize 7 core patterns instantly

### **Week 2 Goal:** Implement 20+ solutions from memory

### **Week 3 Goal:** Solve mixed problems in <20 mins

### **Week 4 Goal:** 90% accuracy in mock interviews

---

## 🎪 **GAMIFICATION**

### **Level System:**

```
Level 1: Novice (0-10 patterns)
Level 2: Apprentice (11-20 patterns)
Level 3: Adept (21-30 patterns)
Level 4: Expert (31-40 patterns)
Level 5: Master (All patterns + optimizations)
```

### **Achievements:**

- **Speed Demon**: Solve 5 problems in <15 mins
- **Memory Master**: Recall 10 patterns from memory
- **Bug Hunter**: Find 3 edge cases in sample code
- **Optimizer**: Improve 5 solutions to optimal

---

## 🔄 **SPACED REPETITION SCHEDULE**

Based on Ebbinghaus forgetting curve:

```
Day 0: Learn new pattern
Day 1: Review (after 24 hours)
Day 3: Review (after 3 days)
Day 7: Review (after 1 week)
Day 14: Review (after 2 weeks)
Day 30: Final review
```

### **Sample Schedule:**

```
Monday: Learn HashMap patterns
Tuesday: Review HashMap + Learn Two Pointer
Wednesday: Review Both + Learn Sliding Window
Thursday: Review All + Learn Prefix Sum
Friday: Mixed review
Saturday: Weekly assessment
Sunday: Mock interview
```

---

## 📚 **QUICK REFERENCE SHEETS**

### **Sheet 1: Array Operation Cheatsheet**

```javascript
// Reverse array
for (let i = 0; i < arr.length / 2; i++)
  [arr[i], arr[n - 1 - i]] = [arr[n - 1 - i], arr[i]];

// Two pointer template
let left = 0,
  right = arr.length - 1;
while (left < right) {
  // Process
  left++;
  right--;
}

// Sliding window template
let left = 0;
for (let right = 0; right < arr.length; right++) {
  // Add arr[right] to window
  while (windowInvalid) {
    // Remove arr[left] from window
    left++;
  }
  // Update answer
}
```

### **Sheet 2: String Operation Cheatsheet**

```javascript
// Palindrome check
function isPalindrome(s) {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Character frequency
const freq = {};
for (let char of str) {
  freq[char] = (freq[char] || 0) + 1;
}

// String to array and back
const chars = str.split("");
const newStr = chars.join("");
```

---

## 🚀 **GETTING STARTED TODAY**

### **Step 1: Print/Create Flashcards**

1. Create 50 flashcards (25 array, 25 string)
2. Front: Problem statement
3. Back: Pattern + template

### **Step 2: Set Daily Goals**

- 10 flashcards/day
- 3 coding problems/day
- 1 pattern deep dive/day

### **Step 3: Track Progress**

- Use spreadsheet or app
- Note weak areas
- Adjust schedule

### **Step 4: Weekly Assessment**

- Timed problem sets
- Pattern recognition test
- Code review

---

## 💡 **PRO TIPS**

1. **Use Mnemonics**: Create stories for patterns
2. **Teach Others**: Explaining reinforces learning
3. **Code by Hand**: Practice whiteboard coding
4. **Time Yourself**: Build speed under pressure
5. **Review Errors**: Learn from mistakes
6. **Mix It Up**: Don't study same pattern consecutively
7. **Sleep on It**: Sleep consolidates memory
8. **Stay Consistent**: 30 mins daily > 4 hours weekly

---

**Ready to start?** Begin with **Day 1: HashMap Patterns** and work through the system. Within 30 days, you'll be able to recognize and solve most array/string problems instantly!

Want me to generate the actual flashcards or create a specific weekly plan for you?

<!-------------------------------------------------











Analysis:
Out of the 27 problems you shared, many are already covered in my previous comprehensive solutions.
 Let me provide the complete solutions for all 27 with proper examples, console.log outputs,
 and both approaches.






 ------------------------------------------------------->

I'll analyze all 27 problems and provide complete solutions with both manual
and built-in approaches where applicable. Let me check which ones are already covered and which need new solutions.

## **Analysis:**

Out of the 27 problems you shared, many are already covered in my previous comprehensive solutions.
Let me provide the complete solutions for **all 27** with proper examples, console.log outputs, and both approaches.

---

## **1. Remove duplicates from array**

```javascript
// Method 1: Without built-in methods
function removeDuplicatesWay1(arr) {
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    let found = false;
    for (let j = 0; j < uniqueArr.length; j++) {
      if (arr[i] === uniqueArr[j]) {
        found = true;
        break;
      }
    }
    if (!found) uniqueArr.push(arr[i]);
  }
  return uniqueArr;
}

// Method 2: With indexOf (semi-built-in)
function removeDuplicatesWay2(arr) {
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (uniqueArr.indexOf(arr[i]) === -1) {
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
}

// Method 3: With built-in Set
function removeDuplicatesWay3(arr) {
  return Array.from(new Set(arr));
  // Alternative: return [...new Set(arr)];
}

// Test with examples
console.log("=== 1. Remove duplicates from array ===");
const testArr1 = [1, 2, 1, 3, 4, 2, 2, 1, 5, 6];
console.log("Input:", testArr1);
console.log("Method 1 (nested loops):", removeDuplicatesWay1([...testArr1]));
console.log("Method 2 (indexOf):", removeDuplicatesWay2([...testArr1]));
console.log("Method 3 (Set):", removeDuplicatesWay3([...testArr1]));
console.log("---\n");
```

## **2. Return array with only even numbers**

```javascript
// Method 1: Without built-in methods
function findEvenNumbersManual(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Method 2: With built-in filter
function findEvenNumbersBuiltIn(arr) {
  return arr.filter((num) => num % 2 === 0);
}

// Test
console.log("=== 2. Array with only even numbers ===");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, -8, 19, 9, 10];
console.log("Input:", numbers);
console.log("Manual:", findEvenNumbersManual(numbers));
console.log("Built-in (filter):", findEvenNumbersBuiltIn(numbers));
console.log("---\n");
```

## **3. Check if string is palindrome**

```javascript
// Method 1: Without built-in methods
function checkPalindromeManual(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Method 2: With built-in methods
function checkPalindromeBuiltIn(str) {
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}

// Test
console.log("=== 3. Check if string is palindrome ===");
console.log("Input: 'madam'");
console.log("Manual:", checkPalindromeManual("madam")); // true
console.log("Built-in:", checkPalindromeBuiltIn("madam")); // true
console.log("Input: 'hello'");
console.log("Manual:", checkPalindromeManual("hello")); // false
console.log("Input: 'racecar'");
console.log("Manual:", checkPalindromeManual("racecar")); // true
console.log("---\n");
```

## **4. Factorial of given number**

```javascript
// Method 1: Recursive (without built-in)
function findFactorialRecursive(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  return num * findFactorialRecursive(num - 1);
}

// Method 2: Iterative (without built-in)
function findFactorialIterative(num) {
  if (num === 0 || num === 1) return 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

// Test
console.log("=== 4. Factorial of number ===");
console.log("Input: 4");
console.log("Recursive:", findFactorialRecursive(4)); // 24
console.log("Iterative:", findFactorialIterative(4)); // 24
console.log("Input: 0");
console.log("Recursive:", findFactorialRecursive(0)); // 1
console.log("Input: 5");
console.log("Recursive:", findFactorialRecursive(5)); // 120
console.log("---\n");
```

## **5. Find longest word in a sentence**

```javascript
// Method 1: Without built-in split
function findLongestWordManual(sentence) {
  let words = [];
  let currentWord = "";

  // Split sentence into words manually
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === " " || i === sentence.length - 1) {
      if (i === sentence.length - 1 && sentence[i] !== " ") {
        currentWord += sentence[i];
      }
      if (currentWord.length > 0) {
        words.push(currentWord);
      }
      currentWord = "";
    } else {
      currentWord += sentence[i];
    }
  }

  // Find longest word
  let longestWord = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  return longestWord;
}

// Method 2: With built-in methods
function findLongestWordBuiltIn(sentence) {
  const words = sentence.split(" ");
  return words.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    "",
  );
}

// Test
console.log("=== 5. Find longest word in sentence ===");
const sentence = "Hi Iam Saikrishna Iam a UI Developer";
console.log("Input:", sentence);
console.log("Manual:", findLongestWordManual(sentence)); // Saikrishna
console.log("Built-in:", findLongestWordBuiltIn(sentence)); // Saikrishna
console.log("---\n");
```

## **6. Find maximum number in array**

```javascript
// Method 1: Without built-in methods
function findMaxManual(arr) {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Method 2: With built-in Math.max
function findMaxBuiltIn(arr) {
  if (arr.length === 0) return undefined;
  return Math.max(...arr);
}

// Test
console.log("=== 6. Find maximum number in array ===");
const numbers2 = [1, 6, -33, 9, 4, 8, 2];
console.log("Input:", numbers2);
console.log("Manual:", findMaxManual(numbers2)); // 9
console.log("Built-in:", findMaxBuiltIn(numbers2)); // 9
console.log("---\n");
```

## **7. Check if number is prime**

```javascript
// Method 1: Without built-in methods
function isPrimeManual(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  // Check only up to square root
  const sqrt = Math.floor(Math.sqrt(num));
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Test
console.log("=== 7. Check if number is prime ===");
console.log("Input: 17");
console.log("Result:", isPrimeManual(17)); // true
console.log("Input: 19");
console.log("Result:", isPrimeManual(19)); // true
console.log("Input: 20");
console.log("Result:", isPrimeManual(20)); // false
console.log("Input: 2");
console.log("Result:", isPrimeManual(2)); // true
console.log("Input: 1");
console.log("Result:", isPrimeManual(1)); // false
console.log("---\n");
```

## **8. Reverse string without built-in method**

```javascript
// Method 1: Without built-in methods
function findReverseManual(str) {
  let reverse = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reverse += str[i];
  }
  return reverse;
}

// Method 2: With built-in methods
function findReverseBuiltIn(str) {
  return str.split("").reverse().join("");
}

// Test
console.log("=== 8. Reverse string without built-in method ===");
const sampleString = "Hello Iam Saikrishna Ui Developer";
console.log("Input:", sampleString);
console.log("Manual:", findReverseManual(sampleString));
console.log("Built-in:", findReverseBuiltIn(sampleString));
console.log("---\n");
```

## **9. Find smallest word in sentence**

```javascript
// Method 1: Without built-in split
function findSmallestWordManual(sentence) {
  let words = [];
  let currentWord = "";

  // Split into words manually
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === " " || i === sentence.length - 1) {
      if (i === sentence.length - 1 && sentence[i] !== " ") {
        currentWord += sentence[i];
      }
      if (currentWord.length > 0) {
        words.push(currentWord);
      }
      currentWord = "";
    } else {
      currentWord += sentence[i];
    }
  }

  // Find smallest word
  let smallestWord = words[0] || "";
  for (let i = 1; i < words.length; i++) {
    if (words[i].length < smallestWord.length) {
      smallestWord = words[i];
    }
  }
  return smallestWord;
}

// Method 2: With built-in methods
function findSmallestWordBuiltIn(sentence) {
  const words = sentence.split(" ").filter((word) => word.length > 0);
  return words.reduce(
    (smallest, current) =>
      current.length < smallest.length ? current : smallest,
    words[0] || "",
  );
}

// Test
console.log("=== 9. Find smallest word in sentence ===");
const testSentence = "Find the smallest word";
console.log("Input:", testSentence);
console.log("Manual:", findSmallestWordManual(testSentence)); // "the"
console.log("Built-in:", findSmallestWordBuiltIn(testSentence)); // "the"
console.log("---\n");
```

## **10. Sum of every third number**

```javascript
// Method 1: Without built-in methods
function sumOfThirdsManual(arr) {
  if (arr.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i += 3) {
    sum += arr[i];
  }
  return sum;
}

// Method 2: With built-in reduce
function sumOfThirdsBuiltIn(arr) {
  if (arr.length < 3) return 0;
  return arr.reduce(
    (sum, num, index) => (index % 3 === 0 ? sum + num : sum),
    0,
  );
}

// Test
console.log("=== 10. Sum of every third number ===");
const testArr10 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Input:", testArr10);
console.log("Manual:", sumOfThirdsManual(testArr10)); // 1 + 4 + 7 = 12
console.log("Built-in:", sumOfThirdsBuiltIn(testArr10)); // 12
console.log("Empty array:", sumOfThirdsManual([])); // 0
console.log("Array length 2:", sumOfThirdsManual([1, 2])); // 0
console.log("---\n");
```

## **11. Fibonacci sequence**

```javascript
// Method 1: Without built-in methods
function fibonacciSequenceManual(numTerms) {
  if (numTerms <= 0) return [];
  if (numTerms === 1) return [0];
  if (numTerms === 2) return [0, 1];

  const sequence = [0, 1];
  for (let i = 2; i < numTerms; i++) {
    const nextFibonacci = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextFibonacci);
  }
  return sequence;
}

// Method 2: Recursive
function fibonacciSequenceRecursive(numTerms) {
  if (numTerms <= 0) return [];
  if (numTerms === 1) return [0];
  if (numTerms === 2) return [0, 1];

  const prev = fibonacciSequenceRecursive(numTerms - 1);
  return [...prev, prev[prev.length - 1] + prev[prev.length - 2]];
}

// Test
console.log("=== 11. Fibonacci sequence ===");
const numTerms = 10;
console.log(`First ${numTerms} terms:`);
console.log("Iterative:", fibonacciSequenceManual(numTerms));
console.log("Recursive:", fibonacciSequenceRecursive(numTerms));
console.log("---\n");
```

## **12. Max consecutive 1's in array**

```javascript
// Method 1: Without built-in methods
function findConsecutiveOnesManual(arr) {
  let maxCount = 0;
  let currentCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      currentCount++;
      if (currentCount > maxCount) {
        maxCount = currentCount;
      }
    } else {
      currentCount = 0;
    }
  }
  return maxCount;
}

// Test
console.log("=== 12. Max consecutive 1's in array ===");
const testArr12 = [1, 1, 0, 1, 0, 1, 1, 1, 0, 2, 5, 1];
console.log("Input:", testArr12);
console.log("Max consecutive 1's:", findConsecutiveOnesManual(testArr12)); // 3
console.log("---\n");
```

## **13. Merge two sorted arrays**

```javascript
// Method 1: Without built-in methods
function mergeSortedArraysManual(arr1, arr2) {
  const merged = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  // Add remaining elements
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}

// Method 2: With built-in methods
function mergeSortedArraysBuiltIn(arr1, arr2) {
  return [...arr1, ...arr2].sort((a, b) => a - b);
}

// Test
console.log("=== 13. Merge two sorted arrays ===");
const arr1 = [0, 3, 4, 31];
const arr2 = [4, 6, 30];
console.log("Array 1:", arr1);
console.log("Array 2:", arr2);
console.log("Manual merge:", mergeSortedArraysManual(arr1, arr2));
console.log("Built-in merge:", mergeSortedArraysBuiltIn(arr1, arr2));
console.log("---\n");
```

## **14. Check if array2 has squares of array1**

```javascript
// Method 1: Frequency counter (efficient O(n))
function isSameFrequency(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const freq1 = {};
  const freq2 = {};

  // Count frequencies in arr1
  for (let val of arr1) {
    freq1[val] = (freq1[val] || 0) + 1;
  }

  // Count frequencies in arr2
  for (let val of arr2) {
    freq2[val] = (freq2[val] || 0) + 1;
  }

  // Check if freq2 has squares of freq1 with same frequency
  for (let key in freq1) {
    const square = key * key;
    if (!freq2[square] || freq2[square] !== freq1[key]) {
      return false;
    }
  }

  return true;
}

// Test
console.log("=== 14. Check if array2 has squares of array1 ===");
console.log("[1,2,3], [4,1,9]:", isSameFrequency([1, 2, 3], [4, 1, 9])); // true
console.log("[1,2,3], [1,9]:", isSameFrequency([1, 2, 3], [1, 9])); // false
console.log("[1,2,1], [4,4,1]:", isSameFrequency([1, 2, 1], [4, 4, 1])); // false
console.log("---\n");
```

## **15. Check if strings are anagrams (same characters)**

```javascript
// Method 1: Frequency counter (efficient O(n))
function isStringCreated(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};

  // Count characters in str1
  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Subtract counts for str2
  for (let char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}

// Test
console.log("=== 15. Check if strings are anagrams ===");
console.log("'aaz', 'zza':", isStringCreated("aaz", "zza")); // false
console.log("'qwerty', 'qeywrt':", isStringCreated("qwerty", "qeywrt")); // true
console.log("'anagram', 'nagaram':", isStringCreated("anagram", "nagaram")); // true
console.log("---\n");
```

## **16. Get unique objects from array**

```javascript
// Method 1: Using object as map
function getUniqueArrManual(array) {
  const uniqueArr = [];
  const seen = {};

  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i].name;
    if (!seen[currentItem]) {
      uniqueArr.push(array[i]);
      seen[currentItem] = true;
    }
  }
  return uniqueArr;
}

// Method 2: Using Set and filter
function getUniqueArrBuiltIn(array) {
  const seen = new Set();
  return array.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

// Test
console.log("=== 16. Get unique objects from array ===");
const arrObjects = [
  { name: "sai" },
  { name: "Nang" },
  { name: "sai" },
  { name: "Nang" },
  { name: "111111" },
];
console.log("Input:", arrObjects);
console.log("Manual:", getUniqueArrManual(arrObjects));
console.log("Built-in:", getUniqueArrBuiltIn(arrObjects));
console.log("---\n");
```

## **17. Find largest element in nested array**

```javascript
// Method 1: Recursive traversal
function findLargestElementManual(arr) {
  let max = -Infinity;

  function traverse(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        traverse(arr[i]);
      } else {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
    }
  }

  traverse(arr);
  return max;
}

// Method 2: Flatten and find max
function findLargestElementBuiltIn(arr) {
  const flatten = (arr) =>
    arr.reduce(
      (acc, val) =>
        Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
      [],
    );
  const flatArr = flatten(arr);
  return Math.max(...flatArr);
}

// Test
console.log("=== 17. Find largest element in nested array ===");
const nestedArray = [
  [3, 4, 58],
  [709, 8, 9, [10, 11]],
  [111, 2],
];
console.log("Input:", nestedArray);
console.log("Manual:", findLargestElementManual(nestedArray)); // 709
console.log("Built-in:", findLargestElementBuiltIn(nestedArray)); // 709
console.log("---\n");
```

## **18. Count occurrences of each character**

```javascript
// Method 1: Without built-in methods
function countCharactersManual(str) {
  const charCount = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }
  return charCount;
}

// Method 2: With reduce
function countCharactersBuiltIn(str) {
  return str.split("").reduce((count, char) => {
    count[char] = (count[char] || 0) + 1;
    return count;
  }, {});
}

// Test
console.log("=== 18. Count occurrences of each character ===");
const testStr = "helaalo";
console.log("Input:", testStr);
console.log("Manual:", countCharactersManual(testStr));
console.log("Built-in:", countCharactersBuiltIn(testStr));
console.log("---\n");
```

## **19. Sort array in ascending order (QuickSort)**

```javascript
// Method 1: QuickSort implementation
function quickSortAscManual(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSortAscManual(left), pivot, ...quickSortAscManual(right)];
}

// Method 2: Built-in sort
function quickSortAscBuiltIn(arr) {
  return arr.slice().sort((a, b) => a - b);
}

// Test
console.log("=== 19. Sort array in ascending order ===");
const unsortedArray = [5, 2, 9, 1, 3, 6];
console.log("Input:", unsortedArray);
console.log("QuickSort:", quickSortAscManual([...unsortedArray]));
console.log("Built-in sort:", quickSortAscBuiltIn([...unsortedArray]));
console.log("---\n");
```

## **20. Sort array in descending order**

```javascript
// Method 1: QuickSort for descending
function quickSortDescManual(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSortDescManual(left), pivot, ...quickSortDescManual(right)];
}

// Method 2: Built-in sort for descending
function quickSortDescBuiltIn(arr) {
  return arr.slice().sort((a, b) => b - a);
}

// Test
console.log("=== 20. Sort array in descending order ===");
const testArr20 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
console.log("Input:", testArr20);
console.log("QuickSort desc:", quickSortDescManual([...testArr20]));
console.log("Built-in desc:", quickSortDescBuiltIn([...testArr20]));
console.log("---\n");
```

## **21. Reverse order of words in sentence**

```javascript
// Method 1: Without built-in split/reverse
function reverseWordsManual(sentence) {
  let words = [];
  let currentWord = "";

  // Split into words manually
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === " ") {
      if (currentWord.length > 0) {
        words.push(currentWord);
        currentWord = "";
      }
    } else if (i === sentence.length - 1) {
      currentWord += sentence[i];
      words.push(currentWord);
    } else {
      currentWord += sentence[i];
    }
  }

  // Reverse words manually
  let reversed = "";
  for (let i = words.length - 1; i >= 0; i--) {
    reversed += words[i];
    if (i > 0) reversed += " ";
  }
  return reversed;
}

// Method 2: With built-in methods
function reverseWordsBuiltIn(sentence) {
  return sentence.split(" ").reverse().join(" ");
}

// Test
console.log("=== 21. Reverse order of words in sentence ===");
const testSentence21 = "ChatGPT is awesome";
console.log("Input:", testSentence21);
console.log("Manual:", reverseWordsManual(testSentence21)); // "awesome is ChatGPT"
console.log("Built-in:", reverseWordsBuiltIn(testSentence21)); // "awesome is ChatGPT"
console.log("---\n");
```

## **22. Flatten nested array**

```javascript
// Method 1: Without built-in methods (iterative with stack)
function flattenArrayManual(arr) {
  const stack = [];
  const result = [];

  // Push all items to stack in reverse order
  for (let i = arr.length - 1; i >= 0; i--) {
    stack.push(arr[i]);
  }

  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      // Push array items to stack in reverse order
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i]);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

// Method 2: With built-in flat
function flattenArrayBuiltIn(arr) {
  return arr.flat(Infinity);
}

// Test
console.log("=== 22. Flatten nested array ===");
const nestedArray22 = [1, [2, [3, 4], [7, 5]], 6];
console.log("Input:", nestedArray22);
console.log("Manual:", flattenArrayManual(nestedArray22));
console.log("Built-in:", flattenArrayBuiltIn(nestedArray22));
console.log("---\n");
```

## **23. Convert string path to object**

```javascript
// Method 1: Without built-in split
function stringToObjectManual(path, value) {
  let keys = [];
  let currentKey = "";

  // Parse keys manually
  for (let i = 0; i < path.length; i++) {
    if (path[i] === ".") {
      keys.push(currentKey);
      currentKey = "";
    } else if (i === path.length - 1) {
      currentKey += path[i];
      keys.push(currentKey);
    } else {
      currentKey += path[i];
    }
  }

  // Build object manually v 
  let result = {};
  let current = result;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = {};
      current = current[key];
    }
  }

  return result;
}

// Method 2: With built-in split
function stringToObjectBuiltIn(path, value) {
  const keys = path.split(".");
  return keys.reduceRight((acc, key) => ({ [key]: acc }), value);
}

// Test
console.log("=== 23. Convert string path to object ===");
console.log("Input: 'a.b.c', 'someValue'");
console.log("Manual:", stringToObjectManual("a.b.c", "someValue"));
console.log("Built-in:", stringToObjectBuiltIn("a.b.c", "someValue"));
console.log("---\n");
```

## **24. Product of next two items**

```javascript
// Method 1: Without built-in methods
function productOfNextTwoManual(arr) {
  const result = [];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    if (i < n - 1) {
      // Product of next two items
      result.push(arr[(i + 1) % n] * arr[(i + 2) % n]);
    } else {
      // Last element: product of first two
      result.push(arr[0] * arr[1]);
    }
  }
  return result;
}

// Test
console.log("=== 24. Product of next two items ===");
const testArr24 = [3, 4, 5];
console.log("Input:", testArr24);
console.log("Output:", productOfNextTwoManual(testArr24)); // [20, 15, 12]
console.log("---\n");
```

## **25. Find second largest element**

```javascript
// Method 1: Without built-in methods
function findSecondLargestManual(arr) {
  if (arr.length < 2) return null;

  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] < largest) {
      secondLargest = arr[i];
    }
  }

  return secondLargest === -Infinity ? null : secondLargest;
}

// Method 2: With built-in sort
function findSecondLargestBuiltIn(arr) {
  if (arr.length < 2) return null;
  const unique = [...new Set(arr)];
  if (unique.length < 2) return null;
  return unique.sort((a, b) => b - a)[1];
}

// Test
console.log("=== 25. Find second largest element ===");
const testArr25 = [100, 20, 112, 22];
console.log("Input:", testArr25);
console.log("Manual:", findSecondLargestManual(testArr25)); // 100
console.log("Built-in:", findSecondLargestBuiltIn(testArr25)); // 100
console.log("---\n");
```

## **26. Find pairs that sum to target**

```javascript
// Method 1: Without built-in methods
function findPairsManual(arr, target) {
  const pairs = [];
  const seen = {};

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (seen[complement] !== undefined) {
      pairs.push([complement, arr[i]]);
    }
    seen[arr[i]] = i;
  }
  return pairs;
}

// Method 2: With Set
function findPairsBuiltIn(arr, target) {
  const pairs = [];
  const seen = new Set();

  for (const num of arr) {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs.push([complement, num]);
    }
    seen.add(num);
  }
  return pairs;
}

// Test
console.log("=== 26. Find pairs that sum to target ===");
const input1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const input2 = 10;
console.log("Array:", input1);
console.log("Target:", input2);
console.log("Manual:", findPairsManual(input1, input2));
console.log("Built-in:", findPairsBuiltIn(input1, input2));
console.log("---\n");
```

## **27. String run-length encoding**

```javascript
// Method 1: Without built-in methods
function encodeStringManual(input) {
  if (input.length === 0) return "";

  let result = "";
  let count = 1;
  let currentChar = input[0];

  for (let i = 1; i < input.length; i++) {
    if (input[i] === currentChar) {
      count++;
    } else {
      result += count + currentChar;
      currentChar = input[i];
      count = 1;
    }
  }

  // Add last sequence
  result += count + currentChar;
  return result;
}

// Method 2: With built-in methods (regex)
function encodeStringBuiltIn(input) {
  return input.replace(/(.)\1*/g, (match, char) => match.length + char);
}

// Test
console.log("=== 27. String run-length encoding ===");
const testStr27 = "abbcccddddeea";
console.log("Input:", testStr27);
console.log("Manual:", encodeStringManual(testStr27)); // "1a2b3c4d2e1a"
console.log("Built-in:", encodeStringBuiltIn(testStr27)); // "1a2b3c4d2e1a"
console.log("---\n");
```

## **SUMMARY**

```javascript
console.log("=== SUMMARY OF ALL 27 PROBLEMS ===");
console.log("✅ All 27 problems are now covered with:");
console.log("   - Manual implementations (without built-ins)");
console.log("   - Built-in method solutions where applicable");
console.log("   - Complete examples with console.log outputs");
console.log("   - Edge cases handled");
console.log("   - Multiple approaches shown");

console.log("\nProblems Covered:");
console.log("1. Remove duplicates from array");
console.log("2. Filter even numbers");
console.log("3. Check palindrome");
console.log("4. Factorial");
console.log("5. Longest word in sentence");
console.log("6. Maximum number in array");
console.log("7. Check prime number");
console.log("8. Reverse string");
console.log("9. Smallest word in sentence");
console.log("10. Sum of every third number");
console.log("11. Fibonacci sequence");
console.log("12. Max consecutive 1's");
console.log("13. Merge sorted arrays");
console.log("14. Check squared array");
console.log("15. Check anagrams");
console.log("16. Unique objects from array");
console.log("17. Largest in nested array");
console.log("18. Count character occurrences");
console.log("19. Sort ascending (QuickSort)");
console.log("20. Sort descending");
console.log("21. Reverse words in sentence");
console.log("22. Flatten nested array");
console.log("23. String path to object");
console.log("24. Product of next two items");
console.log("25. Second largest element");
console.log("26. Find pairs summing to target");
console.log("27. Run-length encoding");

console.log("\n🎯 Key Patterns Used:");
console.log("   - Frequency counters for duplicates/anagrams");
console.log("   - Two pointers for palindromes/merging");
console.log("   - Recursion for factorial/fibonacci");
console.log("   - Stack for flattening arrays");
console.log("   - Hash maps for efficient lookups");
console.log("   - Sliding window for consecutive counts");
```

**All 27 problems are now covered with complete implementations!**
Each solution includes both manual approaches (without built-in methods) and

<!----------------------------------------------------------------









🧠 CATEGORIZATION & QUICK MEMORY SYSTEM FOR ALL PROBLEMS
📊 CATEGORY BREAKDOWN








 --------------------------------------------------->

# 🧠 **CATEGORIZATION & QUICK MEMORY SYSTEM FOR ALL PROBLEMS**

## 📊 **CATEGORY BREAKDOWN**

### **CATEGORY 1: ARRAY MANIPULATION (12 Problems)**

```
🔹 PATTERN: Adding/Removing/Modifying elements
────────────────────────────────────────────
1. Remove duplicates from array
2. Return array with only even numbers
3. Find maximum number in array
4. Sum of every third number
5. Merge two sorted arrays
6. Get unique objects from array
7. Find largest element in nested array
8. Sort array (ascending/descending)
9. Flatten nested array
10. Product of next two items
11. Find second largest element
12. Find pairs summing to target
```

**🎯 MEMORY HOOK:** _"ARRAY MODIFY"_ - Add, Remove, Arrange, Return, Merge, Yield

---

### **CATEGORY 2: STRING OPERATIONS (10 Problems)**

```
🔹 PATTERN: Character/Word manipulation
───────────────────────────────────────
1. Check if string is palindrome
2. Reverse string
3. Find longest word in sentence
4. Find smallest word in sentence
5. Reverse words in sentence
6. Check if strings are anagrams
7. Count character occurrences
8. Convert string path to object
9. String run-length encoding
10. Check palindrome (already covered)
```

**🎯 MEMORY HOOK:** _"STRING TWIST"_ - Split, Reverse, Count, Check, Convert, Encode

---

### **CATEGORY 3: SEARCH & FIND (8 Problems)**

```
🔹 PATTERN: Searching for elements/patterns
───────────────────────────────────────────
1. Check if array2 has squares of array1
2. Max consecutive 1's in array
3. Fibonacci sequence
4. Check prime number
5. Find longest word
6. Find smallest word
7. Find second largest
8. Find pairs summing to target
```

**🎯 MEMORY HOOK:** _"FIND PATTERN"_ - Search, Locate, Discover, Identify, Match

---

### **CATEGORY 4: MATHEMATICAL OPERATIONS (6 Problems)**

```
🔹 PATTERN: Numerical calculations
──────────────────────────────────
1. Factorial of number
2. Sum of every third number
3. Fibonacci sequence
4. Check prime number
5. Product of next two items
6. Find pairs summing to target
```

**🎯 MEMORY HOOK:** _"MATH CALC"_ - Compute, Calculate, Sum, Multiply, Sequence

---

### **CATEGORY 5: VALIDATION/COMPARISON (5 Problems)**

```
🔹 PATTERN: Checking conditions/equality
────────────────────────────────────────
1. Check palindrome
2. Check prime number
3. Check if array2 has squares of array1
4. Check if strings are anagrams
5. Find pairs (matching sum)
```

**🎯 MEMORY HOOK:** _"CHECK MATCH"_ - Validate, Compare, Verify, Test, Confirm

---

## 🚀 **QUICK RECALL SYSTEM**

### **ACRONYM METHOD: "ARRAYS FIX"**

```
A - Array manipulation (12)
R - Reverse/rotate (String ops)
R - Recursion/Math operations
A - Anagrams/validation
Y - Yield results (Output patterns)
S - Search/find operations

F - Filter/modify
I - Iterate/loop patterns
X - eXamine/validate
```

### **VISUAL MEMORY PALACE (5 Rooms)**

**Room 1: ARRAY FACTORY** - All array manipulation
**Room 2: STRING GYM** - All string operations  
**Room 3: SEARCH LAB** - All search/find problems
**Room 4: MATH HALL** - All mathematical problems
**Room 5: VALIDATION STATION** - All checking problems

---

## 🎯 **PATTERN-BASED QUICK RECALL TABLE**

| Pattern Name          | Problems Using It     | Memory Cue          |
| --------------------- | --------------------- | ------------------- |
| **Frequency Counter** | 1, 14, 15, 16, 18, 26 | "Count occurrences" |
| **Two Pointers**      | 3, 8, 13, 21          | "Compare ends"      |
| **Sliding Window**    | 12                    | "Consecutive count" |
| **Recursion**         | 4, 11, 17, 22         | "Call itself"       |
| **Sorting**           | 19, 20                | "Arrange order"     |
| **Hash Map/Set**      | 1, 14, 15, 16, 26     | "Store seen"        |
| **Stack/Queue**       | 22                    | "Push/pop"          |
| **Divide & Conquer**  | 19, 20 (QuickSort)    | "Split solve"       |
| **Prefix Sum**        | 10                    | "Running total"     |

---

## 🔑 **INSTANT RECALL CHEATSHEET**

### **When you see these WORDS → Use this PATTERN:**

```
"duplicate" → Set/HashMap
"even/odd" → Modulo (% 2)
"palindrome" → Two pointers
"largest/smallest" → Track variable
"consecutive" → Sliding window
"sum/product" → Prefix/accumulate
"sorted/merge" → Two pointers
"nested/flatten" → Recursion/Stack
"frequency/count" → HashMap
"prime" → Check up to sqrt
"fibonacci" → DP/recursion
"anagram" → Frequency counter
"reverse" → Two pointers/swap
```

---

## 🧩 **PROBLEM-SOLVING DECISION TREE**

```
START → What type of data?
├─ ARRAY → What operation?
│  ├─ Remove/filter? → Loop + condition
│  ├─ Find element? → Search/HashMap
│  ├─ Sort/arrange? → Sorting algorithm
│  ├─ Mathematical? → Loop + calculation
│  └─ Nested? → Recursion/Stack
│
├─ STRING → What operation?
│  ├─ Reverse? → Two pointers
│  ├─ Palindrome? → Compare ends
│  ├─ Count chars? → Frequency counter
│  ├─ Split words? → Manual parsing
│  └─ Transform? → Character manipulation
│
└─ NEED VALIDATION?
   ├─ Equality check? → Compare/HashMap
   ├─ Pattern match? → Loop/Regex
   └─ Mathematical? → Algorithm check
```

---

## 📝 **QUICK REFERENCE BY DIFFICULTY**

### **EASY (Solve in <5 mins)**

```
1. Remove duplicates (Set/HashMap)
2. Find even numbers (Modulo)
3. Maximum number (Track max)
4. Factorial (Recursion/loop)
5. Longest word (Split + loop)
6. Reverse string (Two pointers)
7. Smallest word (Split + loop)
8. Count characters (HashMap)
```

### **MEDIUM (Solve in 5-10 mins)**

```
9. Check palindrome (Two pointers)
10. Sum of thirds (Loop with step)
11. Fibonacci (DP/recursion)
12. Consecutive 1's (Sliding window)
13. Merge sorted arrays (Two pointers)
14. Sort array (QuickSort)
15. Reverse words (Split + reverse)
16. Second largest (Track two vars)
```

### **MEDIUM-HARD (Solve in 10-15 mins)**

```
17. Check squared array (Frequency)
18. Check anagrams (Frequency)
19. Unique objects (HashMap)
20. Largest in nested (Recursion)
21. Flatten array (Stack/recursion)
22. String to object (Split + reduce)
23. Product of next two (Circular)
24. Find pairs (HashSet)
```

### **HARD (Solve in 15-20 mins)**

```
25. QuickSort implementation
26. Run-length encoding
27. All pattern combinations
```

---

## 🎮 **MEMORY GAME FOR RECALL**

### **Flashcard System:**

**FRONT:** "Remove duplicates from array"
**BACK:** "Use Set for O(n), manual with nested loops for O(n²)"

**FRONT:** "Check palindrome"
**BACK:** "Two pointers: left=0, right=len-1, compare while left<right"

**FRONT:** "Merge sorted arrays"
**BACK:** "Two pointers: i for arr1, j for arr2, compare and push"

---

## 🔄 **SPACED REPETITION SCHEDULE**

### **Week 1: Foundation Patterns**

```
Day 1-2: Frequency Counter (Problems: 1, 14, 15, 18)
Day 3-4: Two Pointers (Problems: 3, 8, 13, 21)
Day 5-6: Recursion (Problems: 4, 11, 17, 22)
Day 7: Review all patterns
```

### **Week 2: Advanced Patterns**

```
Day 8-9: Sorting algorithms (19, 20)
Day 10-11: String manipulation (2, 5, 9, 27)
Day 12-13: Mathematical patterns (10, 24, 26)
Day 14: Mock test all problems
```

---

## 📊 **VISUAL MIND MAP**

```
                    ALL PROBLEMS (27)
        ┌─────────────┬─────────────┬─────────────┐
        │             │             │             │
    ARRAY OPS     STRING OPS   SEARCH/FIND  MATH/VALIDATION
    (12 problems) (10 problems) (8 problems) (6 problems)
        │             │             │             │
    ┌───┴───┐     ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
    │Modify │     │Manip  │     │Locate │     │Calc   │
    │Filter │     │Reverse│     │Pattern│     │Check  │
    │Sort   │     │Count  │     │Match  │     │Verify │
    │Merge  │     │Convert│     │Discover│    │Validate│
```

---

## 🎵 **MNEMONIC SONGS/PHRASES**

### **For Array Problems:**

_"Remove, Find, Merge, Sort, Flatten - Array problems you must be solvin'"_

### **For String Problems:**

_"Palindrome, Reverse, Count, Encode - String patterns neatly sewn"_

### **For Search Problems:**

_"Search, Find, Locate, Match - The perfect batch"_

---

## 🏆 **TOP 10 MUST-KNOW (PRIORITY ORDER)**

1. **Remove duplicates** - Most common
2. **Two Sum variation (pairs)** - Classic pattern
3. **Palindrome check** - String fundamentals
4. **Merge sorted arrays** - Two pointers classic
5. **Fibonacci sequence** - Recursion/DP basics
6. **QuickSort implementation** - Sorting fundamentals
7. **Frequency counter pattern** - Used in multiple problems
8. **Reverse string/words** - String manipulation
9. **Find max/min** - Basic iteration
10. **Flatten nested array** - Recursion practice

---

## 💡 **INTERVIEW STRATEGY**

### **Step 1: Categorize instantly**

```
If array → Think: Frequency counter? Sort? Two pointers?
If string → Think: Palindrome? Reverse? Count chars?
If numbers → Think: Math operations? Patterns?
```

### **Step 2: Choose approach**

```
Time-constrained → Built-in methods
Show skills → Manual implementation
Large data → Optimized algorithm (O(n))
```

### **Step 3: Implement**

```
Start with brute force
Optimize with patterns
Test edge cases
```

### **Step 4: Explain**

```
Time complexity
Space complexity
Alternative approaches
Trade-offs
```

---

## 📱 **QUICK REFERENCE CARDS (Print these)**

### **CARD 1: Array Patterns**

```
1. Duplicates → Set/HashMap
2. Even/Odd → num % 2 === 0
3. Max/Min → Track variable
4. Merge sorted → Two pointers
5. Flatten → Stack/Recursion
6. Sort → QuickSort/MergeSort
```

### **CARD 2: String Patterns**

```
1. Palindrome → Two pointers
2. Reverse → Swap ends
3. Count chars → Frequency map
4. Words → Split/Manual parse
5. Anagram → Same char count
6. Encoding → Count consecutive
```

### **CARD 3: Search Patterns**

```
1. Binary search → Sorted arrays
2. Linear search → Unsorted
3. Frequency → HashMap
4. Pattern → Sliding window
5. Pairs → Complement search
```

---

## 🎯 **DAILY PRACTICE ROUTINE**

### **Morning (15 mins):**

- Review 5 pattern flashcards
- Solve 2 easy problems

### **Afternoon (20 mins):**

- Practice 1 medium problem
- Time yourself

### **Evening (15 mins):**

- Review mistakes
- Plan next day's focus

---

## 📈 **PROGRESS TRACKING**

Track these metrics weekly:

1. **Pattern recognition speed** (seconds)
2. **Implementation time** (minutes)
3. **Accuracy rate** (%)
4. **Most missed patterns** (list)
5. **Time complexity analysis** (correct/incorrect)

---

## 🚨 **COMMON PITFALLS & FIXES**

```
❌ Forgetting empty/edge cases → ✅ Always check length first
❌ O(n²) when O(n) possible → ✅ Use HashMap/Set
❌ Modifying input unintentionally → ✅ Use copy [...arr]
❌ Infinite recursion → ✅ Add base case
❌ Off-by-one errors → ✅ Test with small inputs
❌ Case sensitivity in strings → ✅ Use .toLowerCase()
```

---

## 🌟 **FINAL MASTERY CHECKLIST**

### **Level 1: Novice (0-10 problems)**

- [ ] Can solve basic array/string problems
- [ ] Understands loops and conditions

### **Level 2: Intermediate (11-20 problems)**

- [ ] Knows 3+ patterns (Frequency, Two Pointers, etc.)
- [ ] Can optimize from O(n²) to O(n)
- [ ] Handles edge cases

### **Level 3: Advanced (21-27 problems)**

- [ ] All patterns memorized
- [ ] Can derive solutions from patterns
- [ ] Explains time/space complexity
- [ ] Solves in <15 mins

---

## 🎉 **CELEBRATION MILESTONES**

```
✓ 5 problems mastered → Understands basic patterns
✓ 10 problems mastered → Comfortable with common patterns
✓ 15 problems mastered → Can tackle most interviews
✓ 20 problems mastered → Expert pattern recognition
✓ 27 problems mastered → MASTER LEVEL!
```

---

**Remember:** It's not about memorizing 27 solutions, but recognizing **10 core patterns** that solve 90% of problems. Focus on the patterns, not the specific problems!

Want me to create flashcards or a specific study schedule for you based on this categorization?
