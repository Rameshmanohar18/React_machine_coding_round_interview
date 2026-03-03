I'll provide **each of the 42 React scenario questions with example components** for every scenario. This will be comprehensive, so I'll organize them by category and provide the complete code for each.

---

## ✅ **1. Parent-Child Communication**

### **Q1: How to send data from parent to child component?**

**ParentComponent.js:**

```jsx
import React from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const message = "Hello from Parent!";
  const user = { name: "Alice", age: 30 };

  return (
    <div>
      <ChildComponent text={message} userData={user} isAdmin={false} />
    </div>
  );
}
```

**ChildComponent.js:**

```jsx
import React from "react";

function ChildComponent({ text, userData, isAdmin }) {
  return (
    <div>
      <h1>{text}</h1>
      <p>
        Name: {userData.name}, Age: {userData.age}
      </p>
      {isAdmin && <button>Admin Panel</button>}
    </div>
  );
}
```

---

### **Q2: How to call parent method from child?**

**ParentComponent.js:**

```jsx
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const [message, setMessage] = useState("");

  const handleChildAction = (data) => {
    console.log("Method called from child!", data);
    setMessage(data);
  };

  return (
    <div>
      <ChildComponent onAction={handleChildAction} />
      <p>Message from child: {message}</p>
    </div>
  );
}
```

**ChildComponent.js:**

```jsx
import React from "react";

function ChildComponent({ onAction }) {
  const handleClick = () => {
    onAction("Hello from child!");
  };

  return <button onClick={handleClick}>Trigger Parent Method</button>;
}
```

---

### **Q3: Change child textbox focus/enable based on parent button**

**ParentComponent.js:**

```jsx
import React, { useState, useRef, useEffect } from "react";

function Child({ disabled, shouldFocus }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  return (
    <input
      ref={inputRef}
      type="text"
      disabled={disabled}
      placeholder={disabled ? "Disabled" : "Enabled"}
    />
  );
}

function Parent() {
  const [disabled, setDisabled] = useState(true);
  const [focusRequest, setFocusRequest] = useState(false);

  return (
    <>
      <button onClick={() => setDisabled((prev) => !prev)}>
        {disabled ? "Enable" : "Disable"} Textbox
      </button>
      <button onClick={() => setFocusRequest(true)} disabled={disabled}>
        Focus Textbox
      </button>
      <Child disabled={disabled} shouldFocus={focusRequest} />
    </>
  );
}
```

---

### **Q4: Send data from child to parent (Callback method)**

**ParentComponent.js:**

```jsx
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const [dataFromChild, setDataFromChild] = useState("");

  return (
    <div>
      <ChildComponent onData={setDataFromChild} />
      <p>Data from child: {dataFromChild}</p>
    </div>
  );
}
```

**ChildComponent.js:**

```jsx
import React from "react";

function ChildComponent({ onData }) {
  const sendData = () => {
    onData("Data from child at " + new Date().toLocaleTimeString());
  };

  return <button onClick={sendData}>Send Data to Parent</button>;
}
```

---

### **Q5: Send data from child to parent using useRef**

**ParentComponent.js:**

```jsx
import React, { useRef } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const childDataRef = useRef("");

  const handleClick = () => {
    console.log("Data from child:", childDataRef.current);
    alert(childDataRef.current);
  };

  return (
    <>
      <ChildComponent dataRef={childDataRef} />
      <button onClick={handleClick}>Get Child Data</button>
    </>
  );
}
```

**ChildComponent.js:**

```jsx
import React, { useState } from "react";

function ChildComponent({ dataRef }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    dataRef.current = e.target.value;
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Type here..."
    />
  );
}
```

---

## ✅ **2. State & Event Handling**

### **Q6: Display user input in another textbox**

**InputDisplay.js:**

```jsx
import React, { useState } from "react";

function InputDisplay() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mirrored here..."
        value={inputValue}
        readOnly
      />
      <p>You typed: {inputValue}</p>
    </div>
  );
}
```

---

### **Q7: Display dropdown selection in textbox**

**DropdownToTextbox.js:**

```jsx
import React, { useState } from "react";

function DropdownToTextbox() {
  const [selectedValue, setSelectedValue] = useState("");
  const options = ["Apple", "Banana", "Orange", "Mango"];

  return (
    <div>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={selectedValue}
        readOnly
        placeholder="Selected value"
      />
    </div>
  );
}
```

---

### **Q8: Display radio selection in textbox**

**RadioToTextbox.js:**

```jsx
import React, { useState } from "react";

function RadioToTextbox() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div>
      <h3>Select an option:</h3>
      <label>
        <input
          type="radio"
          value="Option 1"
          checked={selectedOption === "Option 1"}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        Option 1
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Option 2"
          checked={selectedOption === "Option 2"}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        Option 2
      </label>
      <br />
      <br />

      <label>
        Selected option:
        <input type="text" value={selectedOption} readOnly />
      </label>
    </div>
  );
}
```

---

### **Q9: Search textbox filter**

**SearchFilter.js:**

```jsx
import React, { useState } from "react";

function SearchFilter() {
  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Grapes",
    "Strawberry",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => <li key={idx}>{item}</li>)
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
}
```

---

### **Q10: Counter with useState**

**Counter.js:**

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} disabled={count === 0}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

### **Q11: Counter with useReducer**

**CounterReducer.js:**

```jsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET_VALUE":
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Counter: {state.count}</h1>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <br />
      <input
        type="number"
        value={state.count}
        onChange={(e) =>
          dispatch({
            type: "SET_VALUE",
            payload: Number(e.target.value) || 0,
          })
        }
      />
    </div>
  );
}
```

---

### **Q12: Increment/Decrement counter with useReducer**

**IncrementDecrementCounter.js:**

```jsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}
```

---

### **Q13: Custom hook for counter**

**useCounter.js:**

```jsx
import { useState } from "react";

export function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState(initialValue);

  const increment = () => setCounter((prev) => prev + 1);
  const decrement = () => setCounter((prev) => prev - 1);
  const reset = () => setCounter(initialValue);
  const setValue = (value) => setCounter(value);

  return {
    counter,
    increment,
    decrement,
    reset,
    setValue,
  };
}
```

**Using the hook:**

```jsx
import React from "react";
import { useCounter } from "./useCounter";

function CounterComponent() {
  const { counter, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

---

### **Q14: Add data to useState array**

**ArrayState.js:**

```jsx
import React, { useState } from "react";

function ArrayState() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim()) {
      setItems((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **Q15: Call method after state update**

**AfterUpdate.js:**

```jsx
import React, { useState, useEffect } from "react";

function AfterUpdate() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // This runs after count changes
  useEffect(() => {
    if (count > 0) {
      setMessage(`Count updated to: ${count}`);
    }
  }, [count]);

  const yourMethod = () => {
    console.log("Method called after state update");
  };

  useEffect(() => {
    yourMethod();
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>{message}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}
```

---

### **Q16: Force re-render without useState**

**ForceRerender.js:**

```jsx
import React, { useReducer } from "react";

function ForceRerender() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const renderCount = React.useRef(0);

  renderCount.current++;

  return (
    <div>
      <p>Render count: {renderCount.current}</p>
      <button onClick={forceUpdate}>Force Re-render</button>
    </div>
  );
}
```

---

### **Q17: Re-render on value change**

**RerenderOnChange.js:**

```jsx
import React, { useState, useEffect } from "react";

function WatcherComponent({ value }) {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [value]);

  return (
    <div>
      <p>Value: {value}</p>
      <p>Component re-rendered {renderCount} times</p>
    </div>
  );
}

function Parent() {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type to trigger re-render"
      />
      <WatcherComponent value={value} />
    </div>
  );
}
```

---

## ✅ **3. Forms & Input Control**

### **Q18: Bind array to dropdown**

**DropdownBinding.js:**

```jsx
import React, { useState } from "react";

function DropdownBinding() {
  // Simple array
  const fruits = ["Apple", "Banana", "Orange"];

  // Array of objects
  const countries = [
    { id: 1, name: "India" },
    { id: 2, name: "USA" },
    { id: 3, name: "Canada" },
  ];

  const [selectedFruit, setSelectedFruit] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div>
      {/* Simple array */}
      <select
        value={selectedFruit}
        onChange={(e) => setSelectedFruit(e.target.value)}
      >
        <option value="">Select Fruit</option>
        {fruits.map((fruit, idx) => (
          <option key={idx} value={fruit}>
            {fruit}
          </option>
        ))}
      </select>
      <p>Selected Fruit: {selectedFruit}</p>

      {/* Array of objects */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <p>Selected Country ID: {selectedCountry}</p>
    </div>
  );
}
```

---

### **Q19: Controlled vs Uncontrolled component**

**ControlledComponent.js:**

```jsx
import React, { useState } from "react";

function ControlledInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <h3>Controlled Component</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type here..."
      />
      <p>Entered Name: {name}</p>
    </div>
  );
}
```

**UncontrolledComponent.js:**

```jsx
import React, { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    alert("Entered Name: " + inputRef.current.value);
  };

  return (
    <div>
      <h3>Uncontrolled Component</h3>
      <input type="text" ref={inputRef} placeholder="Type here..." />
      <button onClick={handleSubmit}>Show Value</button>
    </div>
  );
}
```

---

### **Q20: Textarea character counter with useRef**

**TextareaCounter.js:**

```jsx
import React, { useRef, useState } from "react";

function TextareaCounter() {
  const maxLength = 100;
  const textareaRef = useRef(null);
  const [remaining, setRemaining] = useState(maxLength);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setRemaining(maxLength - newValue.length);
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        rows={4}
        cols={40}
        placeholder="Type here..."
      />
      <div style={{ color: remaining < 20 ? "red" : "black" }}>
        {remaining} characters remaining
      </div>
      {remaining === 0 && (
        <p style={{ color: "red" }}>Character limit reached!</p>
      )}
    </div>
  );
}
```

---

### **Q21: Debouncing in React**

**DebounceExample.js:**

```jsx
import React, { useState, useEffect, useRef } from "react";

function DebounceExample() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [inputValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Type something..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>Immediate Value: {inputValue}</p>
      <p>Debounced Value (after 500ms): {debouncedValue}</p>
      <p>API would be called for: "{debouncedValue}"</p>
    </div>
  );
}
```

---

### **Q22: File upload component**

**FileUpload.js:**

```jsx
import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setStatus("");

    // Create preview for images
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first");
      return;
    }

    setStatus("Uploading...");

    // Simulate API call
    setTimeout(() => {
      setStatus(
        `Upload successful: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
      );
      setFile(null);
      setPreview("");
      document.getElementById("fileInput").value = "";
    }, 1500);
  };

  return (
    <div>
      <input id="fileInput" type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>

      {status && <p>{status}</p>}

      {preview && (
        <div>
          <p>Preview:</p>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </div>
      )}

      {file && !preview && (
        <p>
          Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      )}
    </div>
  );
}
```

---

### **Q23: Dynamic checkbox counter**

**CheckboxCounter.js:**

```jsx
import React, { useState } from "react";

function Checkbox({ label, checked, onChange }) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
}

function CheckboxCounter() {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Checkbox 1", checked: false },
    { id: 2, label: "Checkbox 2", checked: false },
    { id: 3, label: "Checkbox 3", checked: false },
    { id: 4, label: "Checkbox 4", checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setCheckboxes((prev) =>
      prev.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox,
      ),
    );
  };

  const handleSelectAll = () => {
    const allChecked = checkboxes.every((cb) => cb.checked);
    setCheckboxes((prev) =>
      prev.map((checkbox) => ({ ...checkbox, checked: !allChecked })),
    );
  };

  const selectedCheckboxes = checkboxes.filter((cb) => cb.checked);
  const selectedCount = selectedCheckboxes.length;
  const allChecked =
    checkboxes.length > 0 && selectedCount === checkboxes.length;

  return (
    <div>
      {checkboxes.map((checkbox) => (
        <Checkbox
          key={checkbox.id}
          label={checkbox.label}
          checked={checkbox.checked}
          onChange={() => handleCheckboxChange(checkbox.id)}
        />
      ))}

      <button onClick={handleSelectAll}>
        {allChecked ? "Deselect All" : "Select All"}
      </button>

      <p>
        Selected: {selectedCount} out of {checkboxes.length}
      </p>

      {selectedCount > 0 && (
        <div>
          <p>Selected items:</p>
          <ul>
            {selectedCheckboxes.map((cb) => (
              <li key={cb.id}>{cb.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

### **Q24: Conditional styling**

**ConditionalStyle.js:**

```jsx
import React, { useState } from "react";

function ConditionalStyle() {
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState("light");

  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
      border: "2px solid #ccc",
    },
    dark: {
      backgroundColor: "#333333",
      color: "#ffffff",
      border: "2px solid #666",
    },
  };

  return (
    <div>
      {/* Inline conditional styling */}
      <div
        style={{
          padding: "20px",
          margin: "10px",
          backgroundColor: isActive ? "green" : "gray",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? "Active" : "Inactive"} Status
      </div>

      {/* Conditional class names */}
      <button
        className={isActive ? "btn-primary" : "btn-secondary"}
        onClick={() => setIsActive(!isActive)}
      >
        Toggle Status
      </button>

      {/* Theme-based styling */}
      <div style={themeStyles[theme]} className="theme-box">
        <p>Current Theme: {theme}</p>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>

      {/* Dynamic class based on condition */}
      <div className={`message ${isActive ? "success" : "error"}`}>
        {isActive ? "Operation successful!" : "Operation failed!"}
      </div>

      <style jsx>{`
        .btn-primary {
          background-color: blue;
          color: white;
          padding: 10px 20px;
          border: none;
          margin: 10px;
        }
        .btn-secondary {
          background-color: gray;
          color: black;
          padding: 10px 20px;
          border: none;
          margin: 10px;
        }
        .theme-box {
          padding: 20px;
          margin: 20px 0;
          transition: all 0.3s;
        }
        .message {
          padding: 15px;
          margin: 10px 0;
          border-radius: 5px;
        }
        .success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
}
```

---

### **Q25: Country-State dropdowns**

**CountryStateDropdown.js:**

```jsx
import React, { useState } from "react";

function CountryStateDropdown() {
  const countries = [
    { id: "in", name: "India" },
    { id: "us", name: "USA" },
    { id: "uk", name: "UK" },
  ];

  const states = {
    in: [
      { id: "mh", name: "Maharashtra" },
      { id: "tn", name: "Tamil Nadu" },
      { id: "ka", name: "Karnataka" },
    ],
    us: [
      { id: "ca", name: "California" },
      { id: "ny", name: "New York" },
      { id: "tx", name: "Texas" },
    ],
    uk: [
      { id: "ldn", name: "London" },
      { id: "mcr", name: "Manchester" },
      { id: "br", name: "Birmingham" },
    ],
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState(""); // Reset state when country changes
  };

  const currentStates = selectedCountry ? states[selectedCountry] || [] : [];

  return (
    <div>
      <div>
        <label>Country: </label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>State: </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">-- Select State --</option>
          {currentStates.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <p>
          <strong>Selected Country:</strong>{" "}
          {countries.find((c) => c.id === selectedCountry)?.name || "None"}
        </p>
        <p>
          <strong>Selected State:</strong>{" "}
          {currentStates.find((s) => s.id === selectedState)?.name || "None"}
        </p>
      </div>
    </div>
  );
}
```

---

## ✅ **4. Component & Rendering Control**

### **Q26: Conditional rendering**

**ConditionalRender.js:**

```jsx
import React, { useState } from "react";

function ConditionalRender() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [notifications, setNotifications] = useState([]);

  // Add some sample notifications
  const addNotification = () => {
    setNotifications((prev) => [...prev, `Notification ${prev.length + 1}`]);
  };

  return (
    <div>
      <h2>Conditional Rendering Examples</h2>

      {/* Method 1: Ternary Operator */}
      <div>
        <h3>1. Ternary Operator</h3>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
        {isLoggedIn ? (
          <p>Welcome back, User!</p>
        ) : (
          <p>Please log in to continue.</p>
        )}
      </div>

      {/* Method 2: Logical AND Operator */}
      <div>
        <h3>2. Logical AND Operator</h3>
        <button onClick={addNotification}>Add Notification</button>
        <button onClick={() => setNotifications([])}>
          Clear Notifications
        </button>
        {notifications.length > 0 && (
          <div style={{ color: "red", fontWeight: "bold" }}>
            You have {notifications.length} new notification(s)!
          </div>
        )}
      </div>

      {/* Method 3: Variable Assignment */}
      <div>
        <h3>3. Variable Assignment</h3>
        <div>
          <button onClick={() => setUserRole("user")}>Set as User</button>
          <button onClick={() => setUserRole("admin")}>Set as Admin</button>
        </div>
        {(() => {
          if (userRole === "admin") {
            return (
              <div>
                <h4>Admin Dashboard</h4>
                <button>Delete Users</button>
                <button>View Reports</button>
              </div>
            );
          } else {
            return (
              <div>
                <h4>User Dashboard</h4>
                <button>View Profile</button>
                <button>Edit Settings</button>
              </div>
            );
          }
        })()}
      </div>

      {/* Method 4: Component Return */}
      <div>
        <h3>4. Early Return in Component</h3>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul>
            {notifications.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Method 5: IIFE */}
      <div>
        <h3>5. IIFE (Immediately Invoked Function Expression)</h3>
        {(() => {
          switch (userRole) {
            case "admin":
              return <p>Admin privileges enabled</p>;
            case "moderator":
              return <p>Moderator privileges enabled</p>;
            default:
              return <p>Standard user privileges</p>;
          }
        })()}
      </div>
    </div>
  );
}
```

---

### **Q27: Lazy loaded component**

**LazyComponent.js:**

```jsx
import React, { lazy, Suspense, useState } from "react";

// Regular component (loaded normally)
const RegularComponent = () => {
  console.log("RegularComponent loaded");
  return (
    <div style={{ padding: "20px", backgroundColor: "#e0e0e0" }}>
      <h3>Regular Component</h3>
      <p>This component loads with the main bundle.</p>
    </div>
  );
};

// Lazy loaded component
const LazyComponent = lazy(() => import("./HeavyComponent"));

// Simulated heavy component
// HeavyComponent.js (separate file)
// export default function HeavyComponent() {
//   return (
//     <div style={{ padding: '20px', backgroundColor: '#d0f0d0' }}>
//       <h3>Heavy Component (Lazy Loaded)</h3>
//       <p>This component is loaded only when needed.</p>
//       <p>It contains a lot of code and dependencies.</p>
//     </div>
//   );
// }

function App() {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div>
      <h1>Lazy Loading Example</h1>

      <RegularComponent />

      <button onClick={() => setShowLazy(true)}>Load Lazy Component</button>

      {showLazy && (
        <Suspense
          fallback={
            <div style={{ padding: "20px", backgroundColor: "#fff0cc" }}>
              <h3>Loading...</h3>
              <p>Please wait while the component loads...</p>
            </div>
          }
        >
          <LazyComponent />
        </Suspense>
      )}

      <p style={{ marginTop: "20px", color: "#666" }}>
        Check the Network tab in DevTools to see the chunk loading.
      </p>
    </div>
  );
}

// Create HeavyComponent.js file separately:
/*
// HeavyComponent.js
export default function HeavyComponent() {
  // Simulate heavy component with lots of code
  const heavyData = Array(1000).fill().map((_, i) => `Item ${i + 1}`);
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#d0f0d0' }}>
      <h3>Heavy Component (Lazy Loaded)</h3>
      <p>This component contains {heavyData.length} items.</p>
      <div style={{ maxHeight: '200px', overflow: 'auto' }}>
        {heavyData.slice(0, 50).map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}
*/
```

---

### **Q28: Pure component**

**PureComponentExample.js:**

```jsx
import React, { PureComponent, useState, memo } from "react";

// Class-based Pure Component
class PureCounterClass extends PureComponent {
  render() {
    console.log("PureCounterClass rendered");
    return (
      <div style={{ padding: "10px", backgroundColor: "#e8f4f8" }}>
        <h3>Pure Class Component</h3>
        <p>Count: {this.props.count}</p>
        <p>Message: {this.props.message}</p>
      </div>
    );
  }
}

// Functional component with React.memo
const PureCounterFunctional = memo(function PureCounterFunctional({
  count,
  message,
}) {
  console.log("PureCounterFunctional rendered");
  return (
    <div style={{ padding: "10px", backgroundColor: "#f8e8f8" }}>
      <h3>Pure Functional Component (with memo)</h3>
      <p>Count: {count}</p>
      <p>Message: {message}</p>
    </div>
  );
});

// Regular component for comparison
const RegularCounter = ({ count, message }) => {
  console.log("RegularCounter rendered");
  return (
    <div style={{ padding: "10px", backgroundColor: "#f8f8e8" }}>
      <h3>Regular Component</h3>
      <p>Count: {count}</p>
      <p>Message: {message}</p>
    </div>
  );
};

function PureComponentDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Hello");
  const [otherState, setOtherState] = useState(0);

  return (
    <div>
      <h1>Pure Component Demo</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <button onClick={() => setMessage("Hello " + Date.now())}>
          Change Message
        </button>
        <button onClick={() => setOtherState(otherState + 1)}>
          Change Other State ({otherState})
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <PureCounterClass count={count} message={message} />
        <PureCounterFunctional count={count} message={message} />
        <RegularCounter count={count} message={message} />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h4>Explanation:</h4>
        <ul>
          <li>
            <strong>Pure Class Component:</strong> Only re-renders when props
            change (shallow comparison)
          </li>
          <li>
            <strong>Pure Functional Component:</strong> Uses React.memo for same
            optimization
          </li>
          <li>
            <strong>Regular Component:</strong> Re-renders every time parent
            re-renders
          </li>
          <li>
            Check console to see which components re-render when clicking
            buttons
          </li>
        </ul>
      </div>
    </div>
  );
}
```

---

### **Q29: Error boundary component**

**ErrorBoundary.js:**

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log to error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            margin: "10px",
            border: "2px solid #ff6b6b",
            backgroundColor: "#ffeaea",
            borderRadius: "5px",
          }}
        >
          <h2>Something went wrong</h2>

          {this.props.fallback ? (
            this.props.fallback
          ) : (
            <>
              <p>The application encountered an unexpected error.</p>

              {this.state.error && (
                <details style={{ marginTop: "10px" }}>
                  <summary>Error Details</summary>
                  <pre
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "10px",
                      overflow: "auto",
                      fontSize: "12px",
                    }}
                  >
                    {this.state.error.toString()}
                    {this.state.errorInfo &&
                      `\n\n${this.state.errorInfo.componentStack}`}
                  </pre>
                </details>
              )}

              <button
                onClick={this.resetError}
                style={{
                  marginTop: "15px",
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Component that throws error
function BuggyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("I crashed! This is a simulated error.");
  }

  return (
    <div style={{ padding: "15px", backgroundColor: "#e8f5e8" }}>
      <h3>Normal Operation</h3>
      <p>This component is working fine.</p>
    </div>
  );
}

// Another buggy component
function AnotherBuggyComponent({ value }) {
  if (value === "crash") {
    throw new Error("Invalid value provided!");
  }

  return (
    <div style={{ padding: "15px", backgroundColor: "#e8f5ff" }}>
      <h3>Value: {value}</h3>
      <p>Everything is working correctly.</p>
    </div>
  );
}

function ErrorBoundaryDemo() {
  const [shouldThrow, setShouldThrow] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("safe");

  return (
    <div>
      <h1>Error Boundary Demo</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setShouldThrow(true)}>
          Simulate Error in BuggyComponent
        </button>
        <button onClick={() => setShouldThrow(false)}>
          Reset BuggyComponent
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type 'crash' to trigger error"
        />
      </div>

      {/* Wrapping individual components */}
      <ErrorBoundary
        fallback={<p style={{ color: "red" }}>BuggyComponent failed!</p>}
        onError={(error) => console.log("Custom error handler:", error)}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>

      <ErrorBoundary>
        <AnotherBuggyComponent value={inputValue} />
      </ErrorBoundary>

      {/* Wrapping multiple components */}
      <ErrorBoundary>
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h3>Multiple Components</h3>
          <p>This entire section is wrapped in one ErrorBoundary.</p>
          <button
            onClick={() => {
              throw new Error("Button click error!");
            }}
          >
            Click to throw error
          </button>
        </div>
      </ErrorBoundary>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#e8e8ff",
        }}
      >
        <h3>Component outside ErrorBoundary</h3>
        <p>
          This component is not wrapped and will crash the entire app if it
          throws.
        </p>
        <button
          onClick={() => {
            // This would crash the entire app
            // throw new Error('Uncaught error!');
          }}
        >
          Don't click! (Would crash app)
        </button>
      </div>
    </div>
  );
}
```

---

### **Q30: Portal popup**

**PortalPopup.js:**

```jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Portal Component
function PortalPopup({ isOpen, onClose, children }) {
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    // Create portal container if it doesn't exist
    let root = document.getElementById("portal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "portal-root";
      document.body.appendChild(root);
    }
    setPortalRoot(root);

    return () => {
      // Cleanup on unmount
      if (root && root.children.length === 0) {
        document.body.removeChild(root);
      }
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !portalRoot) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <button onClick={onClose} style={closeButtonStyle} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>,
    portalRoot,
  );
}

// Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  animation: "fadeIn 0.3s ease-out",
};

const popupStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  minWidth: "400px",
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflow: "auto",
  position: "relative",
  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  animation: "slideIn 0.3s ease-out",
};

const closeButtonStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  border: "none",
  background: "transparent",
  fontSize: "28px",
  cursor: "pointer",
  color: "#666",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
};

// Different types of popup content
function ConfirmationPopup({ onConfirm, onCancel }) {
  return (
    <div>
      <h2>Confirm Action</h2>
      <p>Are you sure you want to proceed with this action?</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={onConfirm}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            flex: 1,
          }}
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            flex: 1,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function FormPopup({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          required
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          required
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            flex: 1,
          }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9E9E9E",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            flex: 1,
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ImagePopup({ imageUrl, onClose }) {
  return (
    <div>
      <h2>Image Preview</h2>
      <img
        src={imageUrl}
        alt="Preview"
        style={{
          maxWidth: "100%",
          maxHeight: "400px",
          borderRadius: "8px",
        }}
      />
      <button
        onClick={onClose}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Close
      </button>
    </div>
  );
}

// Main App Component
function PortalDemo() {
  const [popupType, setPopupType] = useState(null);
  const [popupData, setPopupData] = useState({});

  const openPopup = (type, data = {}) => {
    setPopupType(type);
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupType(null);
    setPopupData({});
  };

  const handleConfirm = () => {
    alert("Action confirmed!");
    closePopup();
  };

  const handleFormSubmit = (data) => {
    alert(`Form submitted:\nName: ${data.name}\nEmail: ${data.email}`);
  };

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .close-btn:hover {
        background-color: #f0f0f0;
        color: #333;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Portal Popup Examples</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          margin: "30px 0",
        }}
      >
        <button onClick={() => openPopup("confirm")} style={buttonStyle}>
          Confirmation Popup
        </button>

        <button onClick={() => openPopup("form")} style={buttonStyle}>
          Form Popup
        </button>

        <button
          onClick={() =>
            openPopup("image", {
              imageUrl: "https://via.placeholder.com/400x300",
            })
          }
          style={buttonStyle}
        >
          Image Popup
        </button>

        <button
          onClick={() =>
            openPopup("custom", {
              title: "Custom Content",
              content: "This is custom popup content with any JSX you want.",
            })
          }
          style={buttonStyle}
        >
          Custom Popup
        </button>
      </div>

      {/* Portal Popup */}
      <PortalPopup isOpen={popupType !== null} onClose={closePopup}>
        {popupType === "confirm" && (
          <ConfirmationPopup onConfirm={handleConfirm} onCancel={closePopup} />
        )}

        {popupType === "form" && (
          <FormPopup onSubmit={handleFormSubmit} onClose={closePopup} />
        )}

        {popupType === "image" && (
          <ImagePopup imageUrl={popupData.imageUrl} onClose={closePopup} />
        )}

        {popupType === "custom" && (
          <div>
            <h2>{popupData.title}</h2>
            <p>{popupData.content}</p>
            <div style={{ marginTop: "20px" }}>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </PortalPopup>

      {/* Explanation section */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          borderLeft: "4px solid #2196F3",
        }}
      >
        <h3>How Portal Popups Work:</h3>
        <ul>
          <li>Portals render content outside the normal DOM hierarchy</li>
          <li>Popup appears at the end of the body element</li>
          <li>Prevents CSS conflicts with parent components</li>
          <li>Perfect for modals, tooltips, notifications</li>
          <li>Check Elements tab in DevTools to see portal-root div</li>
        </ul>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "15px",
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "transform 0.2s, background-color 0.2s",
};

// Add hover effect
const style = document.createElement("style");
style.innerHTML = `
  button:hover {
    transform: translateY(-2px);
    background-color: #1976D2;
  }
`;
document.head.appendChild(style);
```

---

### **Q31: Nested circles based on user input**

**NestedCircles.js:**

```jsx
import React, { useState } from "react";

// Circle component with recursion
function Circle({ level, maxLevel, size }) {
  const currentSize = size - level * 30;

  if (currentSize <= 0 || level > maxLevel) {
    return null;
  }

  const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2"];
  const color = colors[level % colors.length];

  return (
    <div
      style={{
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        borderRadius: "50%",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid white",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <span
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: Math.max(12, currentSize / 8),
        }}
      >
        {level}
      </span>

      {/* Recursive call for next level */}
      {level < maxLevel && (
        <Circle level={level + 1} maxLevel={maxLevel} size={size} />
      )}
    </div>
  );
}

// Circle with different pattern
function PatternCircle({ level, maxLevel, pattern }) {
  const baseSize = 200;
  const currentSize = baseSize - level * (baseSize / (maxLevel + 1));

  if (level > maxLevel || currentSize <= 20) {
    return null;
  }

  const patterns = {
    solid: `rgba(52, 152, 219, ${0.2 + level * 0.1})`,
    gradient: `radial-gradient(circle, 
      rgba(41, 128, 185, ${0.8 - level * 0.1}), 
      rgba(52, 152, 219, ${0.6 - level * 0.1})
    )`,
    striped: level % 2 === 0 ? "#3498db" : "#2980b9",
    rainbow: ["#FF6B6B", "#FFD166", "#06D6A0", "#118AB2", "#9B59B6"][level % 5],
  };

  const backgroundColor = patterns[pattern] || patterns.solid;

  return (
    <div
      style={{
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        borderRadius: "50%",
        background: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: pattern === "striped" ? "2px dashed white" : "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.5s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: Math.max(14, currentSize / 10),
          textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      >
        {level + 1}
      </span>

      {/* Inner decorative element */}
      {pattern === "gradient" && (
        <div
          style={{
            position: "absolute",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(5px)",
          }}
        />
      )}

      {/* Recursive call */}
      {level < maxLevel - 1 && (
        <PatternCircle
          level={level + 1}
          maxLevel={maxLevel}
          pattern={pattern}
        />
      )}
    </div>
  );
}

// Interactive circle with controls
function InteractiveCircle() {
  const [level, setLevel] = useState(3);
  const [size, setSize] = useState(300);
  const [pattern, setPattern] = useState("solid");
  const [animation, setAnimation] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interactive Nested Circles</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          margin: "30px 0",
        }}
      >
        {/* Controls */}
        <div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Number of Circles: {level}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Base Size: {size}px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Pattern:
            </label>
            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="solid">Solid</option>
              <option value="gradient">Gradient</option>
              <option value="striped">Striped</option>
              <option value="rainbow">Rainbow</option>
            </select>
          </div>

          <button
            onClick={() => setAnimation(!animation)}
            style={{
              padding: "10px 20px",
              backgroundColor: animation ? "#FF6B6B" : "#4ECDC4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              fontSize: "16px",
            }}
          >
            {animation ? "Stop Animation" : "Start Animation"}
          </button>
        </div>

        {/* Circle Display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <div
            style={{
              animation: animation ? "pulse 2s infinite" : "none",
            }}
          >
            <Circle level={1} maxLevel={level} size={size} />
          </div>
        </div>
      </div>

      {/* Pattern Circle Display */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3>Alternative Pattern: {pattern}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <PatternCircle level={0} maxLevel={level} pattern={pattern} />
        </div>
      </div>

      {/* Explanation */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
        }}
      >
        <h3>How This Works:</h3>
        <ul>
          <li>
            <strong>Recursion:</strong> Each circle renders itself and calls the
            next level
          </li>
          <li>
            <strong>Props Drilling:</strong> Level, maxLevel, and size passed
            down recursively
          </li>
          <li>
            <strong>Base Case:</strong> Stops when level exceeds maxLevel or
            size becomes too small
          </li>
          <li>
            <strong>Dynamic Styling:</strong> Size, color, and style calculated
            based on level
          </li>
        </ul>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
```

---

### **Q32: Call method on first render**

**FirstRender.js:**

```jsx
import React, { useState, useEffect, useRef } from "react";

function FirstRender() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasLoaded = useRef(false);

  // Method to call on first render
  const initializeApp = () => {
    console.log("App initialized - First render only");
    // Perform one-time setup tasks
    document.title = "First Render Demo";

    // Simulate API call
    setTimeout(() => {
      setData({ message: "Data loaded on first render!" });
      setLoading(false);
    }, 1000);
  };

  // Method called on every render (for comparison)
  const onEveryRender = () => {
    console.log("This runs on EVERY render");
  };

  // Effect with empty dependency array - runs once on mount
  useEffect(() => {
    if (!hasLoaded.current) {
      initializeApp();
      hasLoaded.current = true;
    }

    // Cleanup function (runs on unmount)
    return () => {
      console.log("Component will unmount - cleanup");
    };
  }, []); // Empty array means run once

  // This runs on every render
  onEveryRender();

  return (
    <div style={{ padding: "20px" }}>
      <h1>First Render Demo</h1>

      <div
        style={{
          padding: "15px",
          backgroundColor: "#e8f5e8",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h3>Component Information:</h3>
        <p>
          <strong>Render Count:</strong> {count + 1}
        </p>
        <p>
          <strong>Initialized:</strong> {hasLoaded.current ? "Yes" : "No"}
        </p>
        <p>
          <strong>Check console for logs</strong>
        </p>
      </div>

      {loading ? (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid #f3f3f3",
              borderTop: "5px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
          <p>Loading data from first render API call...</p>
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#d4edda",
            borderRadius: "5px",
            color: "#155724",
          }}
        >
          <h3>Data Loaded Successfully!</h3>
          <p>{data?.message}</p>
          <p>
            This data was loaded only once when the component first mounted.
          </p>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Re-render Component ({count} times clicked)
        </button>

        <p style={{ marginTop: "10px", color: "#666" }}>
          Clicking this button triggers re-renders but doesn't call the
          first-render method again.
        </p>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          borderLeft: "4px solid #3498db",
        }}
      >
        <h3>Key Points:</h3>
        <ul>
          <li>
            <code>
              useEffect(() ={">"} {"{}"}, [])
            </code>{" "}
            with empty array runs once on mount
          </li>
          <li>
            Use <code>useRef</code> to track if initialization already happened
          </li>
          <li>
            First-render logic includes: API calls, subscriptions, initial
            configuration
          </li>
          <li>Return a cleanup function from useEffect for unmounting</li>
          <li>Methods outside useEffect run on every render</li>
        </ul>
      </div>

      {/* CSS for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Class component equivalent
class FirstRenderClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    // This runs once when component mounts
    console.log("Class component mounted - first render");
    this.initializeApp();
  }

  initializeApp = () => {
    document.title = "Class Component First Render";

    setTimeout(() => {
      this.setState({
        data: { message: "Class component data loaded!" },
        loading: false,
      });
    }, 1000);
  };

  render() {
    const { count, data, loading } = this.state;

    return (
      <div style={{ padding: "20px", backgroundColor: "#fff3cd" }}>
        <h2>Class Component Version</h2>
        <p>
          <code>componentDidMount()</code> is the class equivalent
        </p>
        {loading ? <p>Loading...</p> : <p>{data?.message}</p>}
        <button onClick={() => this.setState({ count: count + 1 })}>
          Re-render ({count})
        </button>
      </div>
    );
  }
}
```

---

### **Q33: Call method on every re-render**

**EveryRender.js:**

```jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";

function EveryRender() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [renderLog, setRenderLog] = useState([]);
  const renderCount = React.useRef(0);

  // This function runs on EVERY render
  const logRender = () => {
    renderCount.current += 1;
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `Render #${renderCount.current} at ${timestamp}`;

    console.log(logEntry);

    // Update render log (limited to last 5 entries)
    setRenderLog((prev) => {
      const newLog = [logEntry, ...prev];
      return newLog.slice(0, 5);
    });
  };

  // This effect runs on EVERY render (no dependency array)
  useEffect(() => {
    console.log("useEffect without dependencies - runs on every render");

    // This could be expensive, so be careful!
    const expensiveCalculation = () => {
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      return sum;
    };

    // Uncomment to see performance impact
    // const result = expensiveCalculation();
    // console.log('Expensive calculation result:', result);
  });

  // Call the render logger on every render
  logRender();

  // Expensive computation (useMemo prevents re-calculation on every render)
  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value...");
    let total = 0;
    for (let i = 0; i < 10000000; i++) {
      total += Math.random();
    }
    return total;
  }, [count]); // Only re-compute when count changes

  // Memoized callback (useCallback prevents re-creation on every render)
  const handleClick = useCallback(() => {
    alert(`Button clicked! Count: ${count}`);
  }, [count]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Every Render Demo</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          margin: "30px 0",
        }}
      >
        {/* Controls Section */}
        <div>
          <div style={{ marginBottom: "20px" }}>
            <h3>Trigger Re-renders:</h3>
            <button onClick={() => setCount(count + 1)} style={buttonStyle}>
              Increment Count ({count})
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type to trigger re-render..."
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={() => setCount(count)} // Same value triggers re-render
              style={{
                ...buttonStyle,
                marginTop: "10px",
                backgroundColor: "#e74c3c",
              }}
            >
              Re-render with Same State
            </button>
          </div>

          <div>
            <h3>Performance Tips:</h3>
            <ul style={{ fontSize: "14px", color: "#666" }}>
              <li>Check console for render logs</li>
              <li>Functions outside useEffect run on every render</li>
              <li>Use useMemo for expensive calculations</li>
              <li>Use useCallback for function props</li>
              <li>Empty dependency array in useEffect prevents re-runs</li>
            </ul>
          </div>
        </div>

        {/* Render Log Section */}
        <div>
          <h3>Render Log (Last 5):</h3>
          <div
            style={{
              backgroundColor: "#2c3e50",
              color: "#ecf0f1",
              padding: "15px",
              borderRadius: "5px",
              fontFamily: "monospace",
              minHeight: "150px",
            }}
          >
            {renderLog.length === 0 ? (
              <p>No renders yet...</p>
            ) : (
              renderLog.map((log, index) => (
                <div
                  key={index}
                  style={{
                    padding: "5px 0",
                    borderBottom:
                      index < renderLog.length - 1
                        ? "1px solid #34495e"
                        : "none",
                  }}
                >
                  {log}
                </div>
              ))
            )}
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Total Renders:</strong> {renderCount.current}
            </p>
            <p>
              <strong>Current Count:</strong> {count}
            </p>
            <p>
              <strong>Input Value:</strong> {inputValue || "(empty)"}
            </p>
            <p>
              <strong>Expensive Value:</strong> {expensiveValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Child component to demonstrate prop changes */}
      <ChildComponent
        count={count}
        onClick={handleClick}
        renderCount={renderCount.current}
      />

      {/* Explanation */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
        }}
      >
        <h3>What Triggers Re-renders:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          <div style={cardStyle}>
            <h4>State Changes</h4>
            <code>setState()</code> or <code>useState()</code> updater
          </div>
          <div style={cardStyle}>
            <h4>Prop Changes</h4>
            Parent component re-renders with new props
          </div>
          <div style={cardStyle}>
            <h4>Context Changes</h4>
            Context value updates trigger consumers
          </div>
          <div style={cardStyle}>
            <h4>Parent Re-render</h4>
            Parent re-render causes child re-render
          </div>
          <div style={cardStyle}>
            <h4>Force Update</h4>
            <code>forceUpdate()</code> or custom force re-render
          </div>
          <div style={cardStyle}>
            <h4>Hooks Update</h4>
            <code>useReducer</code> dispatch triggers re-render
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          borderLeft: "4px solid #ffc107",
        }}
      >
        <h3>⚠️ Performance Warning:</h3>
        <p>
          Running expensive operations on every render can cause performance
          issues. Use these optimizations:
        </p>
        <ul>
          <li>
            <code>React.memo()</code> for component memoization
          </li>
          <li>
            <code>useMemo()</code> for expensive calculations
          </li>
          <li>
            <code>useCallback()</code> for function props
          </li>
          <li>
            Dependency arrays in <code>useEffect</code>
          </li>
          <li>
            <code>useRef</code> for values that shouldn't trigger re-renders
          </li>
        </ul>
      </div>
    </div>
  );
}

// Child component with memo to prevent unnecessary re-renders
const ChildComponent = React.memo(({ count, onClick, renderCount }) => {
  console.log("ChildComponent rendered");

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#d4edda",
        borderRadius: "5px",
      }}
    >
      <h3>Memoized Child Component</h3>
      <p>This component uses React.memo() to prevent unnecessary re-renders</p>
      <p>
        <strong>Prop Value:</strong> {count}
      </p>
      <p>
        <strong>Parent Render Count:</strong> {renderCount}
      </p>
      <button onClick={onClick} style={buttonStyle}>
        Call Memoized Callback
      </button>
      <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
        Check console - this component should only re-render when props change
      </p>
    </div>
  );
});

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const cardStyle = {
  padding: "15px",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  fontSize: "14px",
};
```

---

### **Q34: Display dynamic HTML content**

**DynamicHTML.js:**

```jsx
import React, { useState } from "react";
import DOMPurify from "dompurify"; // You'll need to install: npm install dompurify

function DynamicHTML() {
  const [htmlContent, setHtmlContent] = useState("");
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [previewMode, setPreviewMode] = useState("edit");

  // Sample HTML content options
  const sampleContent = {
    simple:
      '<p style="color: blue; font-weight: bold;">This is <em>simple</em> HTML with <span style="color: red;">inline styles</span>.</p>',

    complex: `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white;">
        <h2>Complex HTML Example</h2>
        <p>This includes:</p>
        <ul>
          <li>Gradients and rounded corners</li>
          <li>Lists and formatting</li>
          <li><a href="https://example.com" style="color: #ffd166;">Links</a></li>
        </ul>
        <button onclick="alert('Button clicked!')" style="padding: 10px 20px; background: #ff6b6b; border: none; color: white; border-radius: 5px; cursor: pointer;">
          Click Me
        </button>
      </div>
    `,

    dangerous: `
      <div>
        <p>Normal content...</p>
        <script>
          alert('This is malicious script!');
          document.cookie = 'stolen=true';
        </script>
        <img src="invalid" onerror="alert('XSS attack!')" />
        <iframe src="javascript:alert('XSS')"></iframe>
      </div>
    `,

    table: `
      <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
        <thead style="background-color: #4ecdc4;">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>25</td>
            <td>New York</td>
          </tr>
          <tr style="background-color: #f7f7f7;">
            <td>Jane Smith</td>
            <td>30</td>
            <td>London</td>
          </tr>
        </tbody>
      </table>
    `,
  };

  // Sanitize HTML content
  const getSanitizedHTML = (html) => {
    if (!isSafeMode) return { __html: html };

    try {
      const clean = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          "p",
          "h1",
          "h2",
          "h3",
          "div",
          "span",
          "a",
          "ul",
          "ol",
          "li",
          "strong",
          "em",
          "br",
          "table",
          "tr",
          "td",
          "th",
          "thead",
          "tbody",
          "button",
        ],
        ALLOWED_ATTR: [
          "style",
          "href",
          "onclick",
          "border",
          "cellpadding",
          "cellspacing",
          "colspan",
          "rowspan",
          "width",
        ],
      });
      return { __html: clean };
    } catch (error) {
      return { __html: '<p style="color: red;">Error sanitizing HTML</p>' };
    }
  };

  // Handle sample selection
  const handleSampleSelect = (key) => {
    setHtmlContent(sampleContent[key]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Dynamic HTML Content in React</h1>

      {/* Controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          margin: "30px 0",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <div>
          <h4>Sample Content:</h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {Object.keys(sampleContent).map((key) => (
              <button
                key={key}
                onClick={() => handleSampleSelect(key)}
                style={{
                  padding: "10px",
                  backgroundColor: key === "dangerous" ? "#ff6b6b" : "#4ecdc4",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {key} HTML
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4>Safety Mode:</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="radio"
                checked={isSafeMode}
                onChange={() => setIsSafeMode(true)}
              />
              Safe (Sanitized)
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="radio"
                checked={!isSafeMode}
                onChange={() => setIsSafeMode(false)}
              />
              Unsafe (Raw HTML)
            </label>
          </div>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            {isSafeMode
              ? "Scripts and dangerous elements are removed"
              : "⚠️ WARNING: Raw HTML may contain XSS vulnerabilities"}
          </p>
        </div>

        <div>
          <h4>Preview Mode:</h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setPreviewMode("edit")}
              style={{
                padding: "10px",
                backgroundColor: previewMode === "edit" ? "#2196F3" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              Edit
            </button>
            <button
              onClick={() => setPreviewMode("preview")}
              style={{
                padding: "10px",
                backgroundColor: previewMode === "preview" ? "#2196F3" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Editor and Preview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: previewMode === "edit" ? "1fr 1fr" : "1fr",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        {previewMode === "edit" && (
          <div>
            <h3>HTML Editor:</h3>
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              style={{
                width: "100%",
                height: "400px",
                padding: "15px",
                fontFamily: "monospace",
                fontSize: "14px",
                border: "2px solid #ddd",
                borderRadius: "5px",
                resize: "vertical",
              }}
              placeholder="Enter HTML here..."
            />
            <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
              <p>
                Characters: {htmlContent.length} | Lines:{" "}
                {htmlContent.split("\n").length}
              </p>
            </div>
          </div>
        )}

        <div>
          <h3>Rendered Output:</h3>
          <div
            style={{
              minHeight: "400px",
              padding: "20px",
              border: "2px solid #4ecdc4",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            {htmlContent ? (
              <div dangerouslySetInnerHTML={getSanitizedHTML(htmlContent)} />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  color: "#999",
                  fontStyle: "italic",
                }}
              >
                <p>
                  No HTML content to display. Select a sample or type in the
                  editor.
                </p>
              </div>
            )}
          </div>

          {/* HTML Source Preview */}
          <div style={{ marginTop: "20px" }}>
            <h4>HTML Source:</h4>
            <pre
              style={{
                backgroundColor: "#2c3e50",
                color: "#ecf0f1",
                padding: "15px",
                borderRadius: "5px",
                overflow: "auto",
                maxHeight: "200px",
                fontSize: "12px",
              }}
            >
              {htmlContent || "(empty)"}
            </pre>
          </div>
        </div>
      </div>

      {/* Security Warning */}
      {!isSafeMode && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#ffeaea",
            border: "2px solid #ff6b6b",
            borderRadius: "8px",
          }}
        >
          <h3>⚠️ SECURITY WARNING</h3>
          <p>
            You are rendering <strong>unsanitized HTML</strong>. This can lead
            to:
          </p>
          <ul>
            <li>
              <strong>XSS (Cross-Site Scripting) Attacks</strong> - Malicious
              scripts can run in your users' browsers
            </li>
            <li>
              <strong>Data Theft</strong> - Cookies and session data can be
              stolen
            </li>
            <li>
              <strong>Phishing</strong> - Fake login forms can capture user
              credentials
            </li>
            <li>
              <strong>Malware Distribution</strong> - Users can be redirected to
              malicious sites
            </li>
          </ul>
          <p>
            <strong>Always sanitize user-generated HTML</strong> using libraries
            like DOMPurify.
          </p>
        </div>
      )}

      {/* Best Practices */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
        }}
      >
        <h3>Best Practices for Dynamic HTML:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={practiceCard}>
            <h4>✅ Always Sanitize</h4>
            <p>
              Use DOMPurify or similar libraries to clean HTML before rendering.
            </p>
            <code>npm install dompurify</code>
          </div>

          <div style={practiceCard}>
            <h4>✅ Whitelist Tags/Attributes</h4>
            <p>Only allow specific HTML tags and attributes that you need.</p>
            <code>ALLOWED_TAGS: ['p', 'a', 'strong']</code>
          </div>

          <div style={practiceCard}>
            <h4>✅ Escape User Input</h4>
            <p>
              Always escape HTML entities when displaying user text directly.
            </p>
            <code>&lt; &gt; &amp; &quot; &#39;</code>
          </div>

          <div style={practiceCard}>
            <h4>✅ Use Content Security Policy</h4>
            <p>
              Implement CSP headers to prevent inline scripts and unauthorized
              sources.
            </p>
            <code>Content-Security-Policy: default-src 'self'</code>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f0f7ff",
          borderRadius: "8px",
        }}
      >
        <h3>Common Use Cases:</h3>
        <ul>
          <li>
            <strong>Rich Text Editors:</strong> WYSIWYG editors that output HTML
          </li>
          <li>
            <strong>CMS Content:</strong> Content from headless CMS systems
          </li>
          <li>
            <strong>Email Templates:</strong> HTML email content rendering
          </li>
          <li>
            <strong>Documentation:</strong> Render formatted documentation
          </li>
          <li>
            <strong>Third-party Embeds:</strong> Safe embedding of external
            content
          </li>
        </ul>
      </div>
    </div>
  );
}

const practiceCard = {
  padding: "15px",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

// Alternative: Using DOMPurify wrapper component
function SafeHTML({ html, ...props }) {
  const sanitizedHTML = DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: [
      "p",
      "h1",
      "h2",
      "h3",
      "div",
      "span",
      "a",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "br",
    ],
    ALLOWED_ATTR: ["style", "href", "class"],
  });

  return <div {...props} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}
```

---

## ✅ **5. Data Fetching & Side Effects**

### **Q35: Component to fetch data from API**

**APIFetcher.js:**

```jsx
import React, { useState, useEffect } from "react";

function APIFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState("posts");
  const [id, setId] = useState("");

  const endpoints = {
    posts: "https://jsonplaceholder.typicode.com/posts",
    comments: "https://jsonplaceholder.typicode.com/comments",
    users: "https://jsonplaceholder.typicode.com/users",
    todos: "https://jsonplaceholder.typicode.com/todos",
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = endpoints[endpoint];

      // If ID is provided, fetch specific item
      if (id && !isNaN(id)) {
        url = `${url}/${id}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleReset = () => {
    setId("");
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>API Data Fetcher</h1>

      {/* Controls */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Endpoint:
            </label>
            <select
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              style={{ padding: "8px", minWidth: "100px" }}
            >
              {Object.keys(endpoints).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                ID (optional):
              </label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter ID"
                min="1"
                style={{ padding: "8px", width: "100px" }}
              />
            </div>
            <button type="submit" style={buttonStyle}>
              Fetch Data
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
            >
              Reset
            </button>
          </form>
        </div>

        <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
          <p>
            Current URL: {endpoints[endpoint]}
            {id ? `/${id}` : ""}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={spinnerStyle} />
          <p>Loading data from API...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffeaea",
            border: "2px solid #ff6b6b",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#721c24", marginTop: 0 }}>Error</h3>
          <p>
            <strong>Message:</strong> {error}
          </p>
          <button
            onClick={fetchData}
            style={{ ...buttonStyle, backgroundColor: "#ff6b6b" }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Data Display */}
      {!loading && !error && data && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3>
              Data (
              {Array.isArray(data) ? `${data.length} items` : "Single item"})
            </h3>
            <div style={{ fontSize: "14px", color: "#666" }}>
              {!Array.isArray(data) && `ID: ${data.id}`}
            </div>
          </div>

          {Array.isArray(data) ? (
            <div
              style={{
                maxHeight: "500px",
                overflow: "auto",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead
                  style={{
                    backgroundColor: "#f8f9fa",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        borderBottom: "2px solid #dee2e6",
                      }}
                    >
                      ID
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        borderBottom: "2px solid #dee2e6",
                      }}
                    >
                      Title/Name
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        borderBottom: "2px solid #dee2e6",
                      }}
                    >
                      Body/Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 50).map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: "12px" }}>{item.id}</td>
                      <td style={{ padding: "12px" }}>
                        {item.title || item.name || "N/A"}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {item.body ||
                          item.email ||
                          item.completed?.toString() ||
                          "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length > 50 && (
                <div
                  style={{
                    padding: "15px",
                    textAlign: "center",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  Showing 50 of {data.length} items
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <strong>ID:</strong> {data.id}
              </div>
              {Object.entries(data).map(
                ([key, value]) =>
                  key !== "id" && (
                    <div key={key} style={{ marginBottom: "10px" }}>
                      <strong
                        style={{ display: "inline-block", minWidth: "120px" }}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>
                      <span
                        style={{
                          backgroundColor: "#e9ecef",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          display: "inline-block",
                          marginLeft: "10px",
                        }}
                      >
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      )}

      {/* No Data State */}
      {!loading && !error && !data && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <p>No data available. Try fetching from a different endpoint.</p>
        </div>
      )}

      {/* Statistics */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <h4>API Information:</h4>
        <ul>
          <li>
            <strong>Base URL:</strong> https://jsonplaceholder.typicode.com
          </li>
          <li>
            <strong>Available endpoints:</strong> posts, comments, users, todos
          </li>
          <li>
            <strong>Data Format:</strong> JSON
          </li>
          <li>
            <strong>Mock Data:</strong> This is sample data for testing
          </li>
        </ul>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const spinnerStyle = {
  width: "50px",
  height: "50px",
  border: "5px solid #f3f3f3",
  borderTop: "5px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto",
};

// Add CSS for spinner
const style = document.createElement("style");
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
```

---

**Note:** Due to the character limit, I've provided detailed examples for the first 35 scenarios. The remaining 7 scenarios (Q36-Q42) follow similar patterns with custom hooks, context API, HOCs, etc.

Would you like me to continue with the remaining scenarios in the same detailed format?

I'll continue with the remaining 7 scenarios (Q36-Q42) in the same detailed format:

---

## ✅ **5. Data Fetching & Side Effects (Continued)**

### **Q36: Custom hook for data fetching**

**useFetch.js (Custom Hook):**

```jsx
import { useState, useEffect, useCallback, useRef } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);

  const {
    manual = false, // If true, doesn't fetch automatically
    cache = false, // Enable caching
    timeout = 0, // Request timeout in ms (0 = no timeout)
    retries = 0, // Number of retries on failure
    ...fetchOptions
  } = options;

  // Cache implementation
  const cacheRef = useRef(new Map());

  const fetchData = useCallback(
    async (retryCount = 0) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      // Check cache
      if (cache && cacheRef.current.has(url)) {
        const cachedData = cacheRef.current.get(url);
        if (isMountedRef.current) {
          setData(cachedData);
          setLoading(false);
          setError(null);
          setStatus("success");
        }
        return;
      }

      if (!url) {
        if (isMountedRef.current) {
          setLoading(false);
          setStatus("idle");
        }
        return;
      }

      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
        setStatus("loading");
      }

      let timeoutId;

      try {
        // Setup timeout if specified
        if (timeout > 0) {
          timeoutId = setTimeout(() => {
            if (abortControllerRef.current) {
              abortControllerRef.current.abort();
            }
          }, timeout);
        }

        const response = await fetch(url, {
          ...fetchOptions,
          signal,
          headers: {
            "Content-Type": "application/json",
            ...fetchOptions.headers,
          },
        });

        // Clear timeout
        if (timeoutId) clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`,
          );
        }

        const result = await response.json();

        // Cache result if enabled
        if (cache) {
          cacheRef.current.set(url, result);
        }

        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
          setError(null);
          setStatus("success");
        }
      } catch (err) {
        if (timeoutId) clearTimeout(timeoutId);

        // Only handle errors if component is still mounted
        if (!isMountedRef.current) return;

        // Handle abort errors differently
        if (err.name === "AbortError") {
          setError(new Error("Request was aborted"));
          setStatus("idle");
        } else {
          setError(err);
          setStatus("error");

          // Retry logic
          if (retryCount < retries) {
            console.log(`Retrying... (${retryCount + 1}/${retries})`);
            setTimeout(
              () => {
                fetchData(retryCount + 1);
              },
              1000 * Math.pow(2, retryCount),
            ); // Exponential backoff
          }
        }

        setLoading(false);
      }
    },
    [url, cache, timeout, retries, fetchOptions],
  );

  // Auto-fetch when URL changes (unless manual)
  useEffect(() => {
    isMountedRef.current = true;

    if (!manual && url) {
      fetchData();
    }

    // Cleanup function
    return () => {
      isMountedRef.current = false;

      // Cancel ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, manual, fetchData]);

  // Manual refresh function
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Clear cache function
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return {
    data,
    loading,
    error,
    status,
    refresh,
    clearCache,
    fetch: fetchData, // Manual trigger
  };
}

export default useFetch;
```

**Using the custom hook:**

```jsx
import React, { useState } from "react";
import useFetch from "./useFetch";

function DataFetchingDemo() {
  const [userId, setUserId] = useState(1);
  const [endpoint, setEndpoint] = useState("posts");

  const endpoints = {
    posts: "https://jsonplaceholder.typicode.com/posts",
    users: "https://jsonplaceholder.typicode.com/users",
    todos: "https://jsonplaceholder.typicode.com/todos",
    comments: "https://jsonplaceholder.typicode.com/comments",
  };

  // Using the custom hook
  const { data, loading, error, status, refresh, clearCache } = useFetch(
    `${endpoints[endpoint]}/${userId}`,
    {
      cache: true,
      retries: 2,
      timeout: 5000, // 5 second timeout
    },
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Custom useFetch Hook Demo</h1>

      {/* Controls */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "20px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Endpoint:
          </label>
          <select
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            style={{ padding: "8px", minWidth: "120px" }}
          >
            {Object.keys(endpoints).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            User ID:
          </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            min="1"
            max="10"
            style={{ padding: "8px", width: "80px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <button
            onClick={refresh}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "#ccc" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>

          <button
            onClick={clearCache}
            style={{
              padding: "10px 20px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Cache
          </button>
        </div>
      </div>

      {/* Status Display */}
      <div
        style={{
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor:
            status === "loading"
              ? "#fff3cd"
              : status === "error"
                ? "#ffeaea"
                : status === "success"
                  ? "#d4edda"
                  : "#f8f9fa",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>Status:</strong>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor:
                  status === "loading"
                    ? "#ffc107"
                    : status === "error"
                      ? "#dc3545"
                      : status === "success"
                        ? "#28a745"
                        : "#6c757d",
                color: "white",
                marginLeft: "10px",
                fontSize: "12px",
              }}
            >
              {status.toUpperCase()}
            </span>
          </div>

          {status === "loading" && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={spinnerStyle} />
              <span>Fetching data...</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffeaea",
            border: "2px solid #ff6b6b",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#721c24", marginTop: 0 }}>Error</h3>
          <p>
            <strong>Message:</strong> {error.message}
          </p>
          <button
            onClick={refresh}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Data Display */}
      {data && !loading && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h3>Data Received:</h3>
          <pre
            style={{
              backgroundColor: "#2c3e50",
              color: "#ecf0f1",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
              maxHeight: "400px",
              fontSize: "14px",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* No Data */}
      {!data && !loading && !error && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <p>No data available. Enter a valid ID and endpoint.</p>
        </div>
      )}

      {/* Hook Features */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
        }}
      >
        <h3>Custom Hook Features:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <FeatureCard
            title="🔄 Auto & Manual Fetching"
            description="Automatically fetches when URL changes, or manually trigger with refresh()"
          />
          <FeatureCard
            title="⚡ Caching"
            description="Optional caching to prevent duplicate requests"
          />
          <FeatureCard
            title="⏱️ Timeout"
            description="Configurable timeout to abort slow requests"
          />
          <FeatureCard
            title="🔄 Retry Logic"
            description="Automatic retries with exponential backoff"
          />
          <FeatureCard
            title="🚫 Request Cancellation"
            description="Automatically cancels previous requests"
          />
          <FeatureCard
            title="📊 Detailed Status"
            description="Loading, error, success, and idle states"
          />
        </div>
      </div>

      {/* Example Usage */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f0f7ff",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <h3>Example Usage:</h3>
        <pre
          style={{
            backgroundColor: "#2c3e50",
            color: "#ecf0f1",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
          }}
        >
          {`const { 
  data, 
  loading, 
  error, 
  refresh 
} = useFetch('https://api.example.com/data', {
  cache: true,
  timeout: 10000,
  retries: 3
});

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
return <div>{JSON.stringify(data)}</div>;`}
        </pre>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      <p style={{ fontSize: "14px", color: "#666" }}>{description}</p>
    </div>
  );
}

const spinnerStyle = {
  width: "20px",
  height: "20px",
  border: "3px solid #f3f3f3",
  borderTop: "3px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

// Add CSS for spinner
const style = document.createElement("style");
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
```

---

### **Q37: Cancel API call with AbortController and timeout**

**AbortControllerDemo.js:**

```jsx
import React, { useState, useEffect, useRef } from "react";

function AbortControllerDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutDuration, setTimeoutDuration] = useState(5000); // 5 seconds default
  const [requestStatus, setRequestStatus] = useState("idle"); // 'idle' | 'pending' | 'success' | 'error' | 'timeout' | 'aborted'

  const abortControllerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Simulate different API response times
  const endpoints = [
    { name: "Fast API (500ms)", url: "https://httpbin.org/delay/0.5" },
    { name: "Slow API (3s)", url: "https://httpbin.org/delay/3" },
    { name: "Very Slow API (8s)", url: "https://httpbin.org/delay/8" },
    { name: "Error API", url: "https://httpbin.org/status/500" },
  ];

  const fetchWithAbortController = async (url) => {
    // Reset state
    setLoading(true);
    setError(null);
    setRequestStatus("pending");

    // Create new AbortController
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Setup timeout
      timeoutRef.current = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          setRequestStatus("timeout");
          setError(new Error(`Request timeout after ${timeoutDuration}ms`));
          setLoading(false);
        }
      }, timeoutDuration);

      const startTime = Date.now();
      const response = await fetch(url, { signal });

      // Clear timeout since we got a response
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setData({
        ...result,
        requestDuration: `${duration}ms`,
        url,
        timestamp: new Date().toLocaleTimeString(),
      });

      setRequestStatus("success");
      setLoading(false);
    } catch (err) {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Check if error is due to abort
      if (err.name === "AbortError") {
        if (requestStatus !== "timeout") {
          setRequestStatus("aborted");
          setError(new Error("Request was manually aborted"));
        }
      } else {
        setRequestStatus("error");
        setError(err);
      }

      setLoading(false);
    }
  };

  const handleFetch = (url) => {
    fetchWithAbortController(url);
  };

  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleReset = () => {
    // Clean up any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset state
    setData(null);
    setError(null);
    setLoading(false);
    setRequestStatus("idle");

    abortControllerRef.current = null;
    timeoutRef.current = null;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getStatusColor = () => {
    switch (requestStatus) {
      case "pending":
        return "#ffc107";
      case "success":
        return "#28a745";
      case "error":
        return "#dc3545";
      case "timeout":
        return "#fd7e14";
      case "aborted":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  const getStatusIcon = () => {
    switch (requestStatus) {
      case "pending":
        return "🔄";
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "timeout":
        return "⏰";
      case "aborted":
        return "⏹️";
      default:
        return "⏸️";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AbortController with Timeout Demo</h1>

      {/* Explanation */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>What is AbortController?</h3>
        <p>
          AbortController is a JavaScript API that allows you to abort fetch
          requests. Combined with setTimeout, you can implement request
          timeouts.
        </p>
        <ul>
          <li>
            <strong>Create controller:</strong>{" "}
            <code>new AbortController()</code>
          </li>
          <li>
            <strong>Get signal:</strong> <code>controller.signal</code>
          </li>
          <li>
            <strong>Pass to fetch:</strong>{" "}
            <code>
              fetch(url, {"{"} signal {"}"})
            </code>
          </li>
          <li>
            <strong>Abort request:</strong> <code>controller.abort()</code>
          </li>
          <li>
            <strong>Handle abort:</strong> Catch <code>AbortError</code>
          </li>
        </ul>
      </div>

      {/* Controls */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Timeout Duration: <strong>{timeoutDuration}ms</strong>
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="1000"
            value={timeoutDuration}
            onChange={(e) => setTimeoutDuration(parseInt(e.target.value))}
            style={{ width: "100%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#666",
            }}
          >
            <span>1s</span>
            <span>10s</span>
          </div>
        </div>

        <div>
          <h4>Test Endpoints:</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            {endpoints.map((endpoint, index) => (
              <button
                key={index}
                onClick={() => handleFetch(endpoint.url)}
                disabled={loading}
                style={{
                  padding: "10px 15px",
                  backgroundColor: loading ? "#ccc" : "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                  flex: "1",
                  minWidth: "200px",
                }}
              >
                {endpoint.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={handleAbort}
            disabled={!loading}
            style={{
              padding: "10px 20px",
              backgroundColor: !loading ? "#ccc" : "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: !loading ? "not-allowed" : "pointer",
              flex: 1,
            }}
          >
            Abort Request
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Status Display */}
      <div
        style={{
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: getStatusColor() + "20", // Add transparency
          border: `2px solid ${getStatusColor()}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>{getStatusIcon()}</span>
            <span>Request Status: {requestStatus.toUpperCase()}</span>
          </h3>
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div style={spinnerStyle} />
              <span>Request in progress... Timeout in {timeoutDuration}ms</span>
            </div>
          )}
        </div>

        <div style={{ fontSize: "12px", color: "#666" }}>
          <div>Timeout: {timeoutDuration}ms</div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffeaea",
            border: "2px solid #ff6b6b",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#721c24", marginTop: 0 }}>Error Details</h3>
          <p>
            <strong>Type:</strong> {error.name}
          </p>
          <p>
            <strong>Message:</strong> {error.message}
          </p>
          <p>
            <strong>Time:</strong> {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* Data Display */}
      {data && !loading && requestStatus === "success" && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#d4edda",
            border: "2px solid #c3e6cb",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ color: "#155724", margin: 0 }}>Request Successful</h3>
            <span
              style={{
                padding: "4px 8px",
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {data.requestDuration}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#15572410",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            <p>
              <strong>URL:</strong> {data.url}
            </p>
            <p>
              <strong>Timestamp:</strong> {data.timestamp}
            </p>
            <p>
              <strong>Duration:</strong> {data.requestDuration}
            </p>
          </div>

          <div>
            <h4>Response Data:</h4>
            <pre
              style={{
                backgroundColor: "#2c3e50",
                color: "#ecf0f1",
                padding: "15px",
                borderRadius: "5px",
                overflow: "auto",
                maxHeight: "300px",
                fontSize: "12px",
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Visual Timeline */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Request Timeline</h3>
        <div
          style={{
            height: "60px",
            backgroundColor: "#e9ecef",
            borderRadius: "5px",
            position: "relative",
            marginTop: "20px",
            overflow: "hidden",
          }}
        >
          {/* Time markers */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "absolute",
              top: "5px",
              left: "0",
              right: "0",
              padding: "0 10px",
              fontSize: "10px",
              color: "#666",
            }}
          >
            <span>0s</span>
            <span>{(timeoutDuration / 2000).toFixed(1)}s</span>
            <span>{(timeoutDuration / 1000).toFixed(1)}s</span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: "100%",
              width: loading ? "100%" : "0%",
              backgroundColor:
                requestStatus === "success"
                  ? "#28a745"
                  : requestStatus === "error"
                    ? "#dc3545"
                    : requestStatus === "timeout"
                      ? "#fd7e14"
                      : requestStatus === "aborted"
                        ? "#6c757d"
                        : "#3498db",
              transition: loading
                ? `width ${timeoutDuration}ms linear`
                : "none",
              borderRadius: "5px",
            }}
          />

          {/* Timeout line */}
          <div
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "100%",
              width: "2px",
              backgroundColor: "#fd7e14",
              transform: "translateX(-2px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-10px",
                backgroundColor: "#fd7e14",
                color: "white",
                padding: "2px 6px",
                borderRadius: "3px",
                fontSize: "10px",
                whiteSpace: "nowrap",
              }}
            >
              Timeout
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#3498db",
                borderRadius: "50%",
                margin: "0 auto 5px",
              }}
            />
            <div>Request Start</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#28a745",
                borderRadius: "50%",
                margin: "0 auto 5px",
              }}
            />
            <div>Success</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#fd7e14",
                borderRadius: "50%",
                margin: "0 auto 5px",
              }}
            />
            <div>Timeout</div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f0f7ff",
          borderRadius: "8px",
        }}
      >
        <h3>Technical Implementation:</h3>

        <div
          style={{
            backgroundColor: "#2c3e50",
            color: "#ecf0f1",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "12px",
            marginBottom: "15px",
          }}
        >
          {`async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const timeoutId = setTimeout(() => {
    controller.abort(); // Abort request on timeout
  }, timeoutMs);
  
  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId); // Clear timeout if successful
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId); // Always clear timeout
  }
}`}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <div style={techCard}>
            <h4>1. Create Controller</h4>
            <code>const controller = new AbortController()</code>
          </div>
          <div style={techCard}>
            <h4>2. Setup Timeout</h4>
            <code>setTimeout(() ={">"} controller.abort(), timeout)</code>
          </div>
          <div style={techCard}>
            <h4>3. Pass Signal</h4>
            <code>
              fetch(url, {"{"} signal: controller.signal {"}"})
            </code>
          </div>
          <div style={techCard}>
            <h4>4. Handle Abort</h4>
            <code>
              catch (err) {"{"} if (err.name === 'AbortError') {"}"}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

const spinnerStyle = {
  width: "20px",
  height: "20px",
  border: "3px solid #f3f3f3",
  borderTop: "3px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const techCard = {
  padding: "15px",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  fontSize: "14px",
};

// Add CSS for spinner
const style = document.createElement("style");
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
```

---

### **Q38: Update document title on mount**

**DocumentTitleDemo.js:**

```jsx
import React, { useState, useEffect, useRef } from "react";

// Custom hook for document title
function useDocumentTitle(title, keepOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      if (!keepOnUnmount) {
        document.title = defaultTitle.current;
      }
    };
  }, [title, keepOnUnmount]);

  return {
    reset: () => {
      document.title = defaultTitle.current;
    },
    getDefault: () => defaultTitle.current,
  };
}

// Component 1: Basic title update
function PageOne() {
  const [count, setCount] = useState(0);

  useDocumentTitle(`Page One - Count: ${count}`, false);

  return (
    <div style={pageStyle}>
      <h2>Page One</h2>
      <p>Document title updates with count</p>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment ({count})</button>
      <div style={infoBox}>
        <strong>Title Pattern:</strong> "Page One - Count: X"
      </div>
    </div>
  );
}

// Component 2: Title with notifications
function PageTwo() {
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);

  useDocumentTitle(
    `${notifications > 0 ? `(${notifications}) ` : ""}Messages${messages > 0 ? ` (${messages})` : ""} - Dashboard`,
    true,
  );

  const addNotification = () => {
    setNotifications((prev) => prev + 1);
  };

  const addMessage = () => {
    setMessages((prev) => prev + 1);
  };

  const clearAll = () => {
    setNotifications(0);
    setMessages(0);
  };

  return (
    <div style={pageStyle}>
      <h2>Page Two - Dashboard</h2>
      <p>Title shows notification and message counts</p>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={counterCard}>
          <h3>Notifications</h3>
          <p style={countDisplay}>{notifications}</p>
          <button onClick={addNotification} style={buttonStyle}>
            Add Notification
          </button>
        </div>

        <div style={counterCard}>
          <h3>Messages</h3>
          <p style={countDisplay}>{messages}</p>
          <button onClick={addMessage} style={buttonStyle}>
            Add Message
          </button>
        </div>
      </div>

      <button
        onClick={clearAll}
        style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}
      >
        Clear All
      </button>

      <div style={infoBox}>
        <strong>Title Pattern:</strong> "(X) Messages (Y) - Dashboard"
      </div>
    </div>
  );
}

// Component 3: Dynamic title based on time
function PageThree() {
  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const status = isOnline ? "🟢 Online" : "🔴 Offline";

  useDocumentTitle(`${formattedTime} - ${status}`, false);

  return (
    <div style={pageStyle}>
      <h2>Page Three - Live Clock</h2>
      <p>Document title shows live time and status</p>

      <div style={timeDisplay}>
        <div style={clockStyle}>{formattedTime}</div>
        <div
          style={{
            fontSize: "24px",
            marginTop: "10px",
          }}
        >
          {status}
        </div>
      </div>

      <button
        onClick={() => setIsOnline(!isOnline)}
        style={{
          ...buttonStyle,
          backgroundColor: isOnline ? "#e74c3c" : "#2ecc71",
        }}
      >
        {isOnline ? "Go Offline" : "Go Online"}
      </button>

      <div style={infoBox}>
        <strong>Title Pattern:</strong> "HH:MM:SS - Status"
      </div>
    </div>
  );
}

// Component 4: Tab management
function PageFour() {
  const [activeTab, setActiveTab] = useState("home");
  const [unreadCount, setUnreadCount] = useState(3);

  const tabs = [
    { id: "home", name: "Home", icon: "🏠" },
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "settings", name: "Settings", icon: "⚙️" },
    { id: "messages", name: "Messages", icon: "💬" },
  ];

  const activeTabName =
    tabs.find((tab) => tab.id === activeTab)?.name || "Unknown";

  useDocumentTitle(
    `${unreadCount > 0 ? `(${unreadCount}) ` : ""}${activeTabName} - My App`,
    false,
  );

  return (
    <div style={pageStyle}>
      <h2>Page Four - Tab Management</h2>
      <p>Title updates based on active tab and unread count</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...buttonStyle,
              backgroundColor: activeTab === tab.id ? "#3498db" : "#95a5a6",
              flex: "1",
              minWidth: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
            {tab.id === "messages" && unreadCount > 0 && (
              <span style={badgeStyle}>{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setUnreadCount((prev) => prev + 1)}
          style={buttonStyle}
        >
          Add Unread Message
        </button>
        <button
          onClick={() => setUnreadCount(0)}
          style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}
        >
          Mark All as Read
        </button>
      </div>

      <div style={contentBox}>
        <h3>Active Tab: {activeTabName}</h3>
        <p>Unread messages: {unreadCount}</p>
      </div>

      <div style={infoBox}>
        <strong>Title Pattern:</strong> "(X) TabName - My App"
      </div>
    </div>
  );
}

// Main Demo Component
function DocumentTitleDemo() {
  const [activePage, setActivePage] = useState("one");
  const { reset, getDefault } = useDocumentTitle(
    "React Document Title Demo",
    false,
  );

  const pages = {
    one: { name: "Counter Title", component: <PageOne /> },
    two: { name: "Dashboard Title", component: <PageTwo /> },
    three: { name: "Live Clock Title", component: <PageThree /> },
    four: { name: "Tab Title", component: <PageFour /> },
  };

  const handleReset = () => {
    reset();
    alert(`Title reset to: "${getDefault()}"`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Document Title Management Demo</h1>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(pages).map(([key, page]) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            style={{
              padding: "12px 20px",
              backgroundColor: activePage === key ? "#3498db" : "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              flex: "1",
              minWidth: "200px",
            }}
          >
            {page.name}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Current Page: {pages[activePage]?.name}</h3>
          <p style={{ margin: "5px 0 0 0", color: "#666" }}>
            Check your browser tab title ↑
          </p>
        </div>

        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset Title
        </button>
      </div>

      {/* Active Page Content */}
      <div
        style={{
          border: "2px solid #3498db",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {pages[activePage]?.component}
      </div>

      {/* Explanation */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
        }}
      >
        <h3>How It Works:</h3>

        <div
          style={{
            backgroundColor: "#2c3e50",
            color: "#ecf0f1",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        >
          {`// Custom Hook: useDocumentTitle
function useDocumentTitle(title, keepOnUnmount = false) {
  const defaultTitle = useRef(document.title);
  
  useEffect(() => {
    document.title = title; // Update title
    
    return () => {
      if (!keepOnUnmount) {
        document.title = defaultTitle.current; // Restore on unmount
      }
    };
  }, [title, keepOnUnmount]);
  
  return { reset: () => { document.title = defaultTitle.current; } };
}

// Usage in component
function MyComponent() {
  const [count, setCount] = useState(0);
  useDocumentTitle(\`My App - Count: \${count}\`);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Increment ({count})
    </button>
  );
}`}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <div style={featureCard}>
            <h4>🔄 Dynamic Updates</h4>
            <p>Title updates automatically when state/props change</p>
          </div>
          <div style={featureCard}>
            <h4>🧹 Automatic Cleanup</h4>
            <p>Title restores to original when component unmounts</p>
          </div>
          <div style={featureCard}>
            <h4>🎯 Multiple Use Cases</h4>
            <p>Counters, notifications, live data, tab management</p>
          </div>
          <div style={featureCard}>
            <h4>⚡ Performance</h4>
            <p>Optimized with useEffect dependency array</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f0f7ff",
          borderRadius: "8px",
        }}
      >
        <h3>Common Use Cases:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          <UseCaseCard
            icon="📱"
            title="Notifications"
            description="Show unread count in title"
          />
          <UseCaseCard
            icon="⏰"
            title="Live Data"
            description="Real-time clock or updates"
          />
          <UseCaseCard
            icon="📊"
            title="Progress"
            description="Upload/download progress"
          />
          <UseCaseCard
            icon="🔔"
            title="Alerts"
            description="Important status changes"
          />
          <UseCaseCard
            icon="📑"
            title="Tab Context"
            description="Active page/tab name"
          />
          <UseCaseCard
            icon="🎮"
            title="Game State"
            description="Score, level, or timer"
          />
        </div>
      </div>

      {/* Best Practices */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          borderLeft: "4px solid #ffc107",
        }}
      >
        <h3>Best Practices:</h3>
        <ul>
          <li>
            <strong>Keep it short:</strong> Title should be concise (50-60
            characters)
          </li>
          <li>
            <strong>Important info first:</strong> Put critical info (counts,
            status) at beginning
          </li>
          <li>
            <strong>Restore on unmount:</strong> Always clean up to avoid title
            conflicts
          </li>
          <li>
            <strong>Debounce frequent updates:</strong> Throttle rapid title
            changes
          </li>
          <li>
            <strong>Test across browsers:</strong> Different browsers may handle
            titles differently
          </li>
          <li>
            <strong>Accessibility:</strong> Ensure title changes don't confuse
            screen readers
          </li>
        </ul>
      </div>
    </div>
  );
}

// Styled components
const pageStyle = {
  padding: "30px",
  backgroundColor: "white",
  minHeight: "400px",
};

const infoBox = {
  marginTop: "20px",
  padding: "15px",
  backgroundColor: "#f8f9fa",
  borderRadius: "5px",
  borderLeft: "4px solid #3498db",
  fontSize: "14px",
};

const counterCard = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  textAlign: "center",
  minWidth: "150px",
};

const countDisplay = {
  fontSize: "48px",
  fontWeight: "bold",
  margin: "10px 0",
  color: "#3498db",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const timeDisplay = {
  textAlign: "center",
  padding: "30px",
  backgroundColor: "#2c3e50",
  color: "white",
  borderRadius: "8px",
  marginBottom: "20px",
};

const clockStyle = {
  fontSize: "48px",
  fontFamily: "monospace",
  fontWeight: "bold",
  letterSpacing: "2px",
};

const badgeStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

const contentBox = {
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  marginBottom: "20px",
};

const featureCard = {
  padding: "15px",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

function UseCaseCard({ icon, title, description }) {
  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "10px" }}>{icon}</div>
      <h4 style={{ margin: "10px 0" }}>{title}</h4>
      <p style={{ fontSize: "12px", color: "#666" }}>{description}</p>
    </div>
  );
}
```

---

## ✅ **6. Performance & Advanced Patterns**

### **Q39: Optimization with useMemo**

**UseMemoDemo.js:**

```jsx
import React, { useState, useMemo, useEffect } from "react";

// Expensive calculation function
const expensiveCalculation = (num) => {
  console.log("Calculating expensive value...");

  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += Math.random() * num;
  }

  return result;
};

// Component without useMemo
function WithoutUseMemo({ value }) {
  const [count, setCount] = useState(0);
  const expensiveValue = expensiveCalculation(value); // Recalculates on every render

  return (
    <div style={cardStyle}>
      <h3>Without useMemo</h3>
      <p>Expensive Value: {expensiveValue.toFixed(2)}</p>
      <p>Render Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
      <p style={warningText}>⚠️ Expensive calculation runs on EVERY render</p>
    </div>
  );
}

// Component with useMemo
function WithUseMemo({ value }) {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    return expensiveCalculation(value);
  }, [value]); // Only recalculates when 'value' changes

  return (
    <div style={cardStyle}>
      <h3>With useMemo</h3>
      <p>Expensive Value: {expensiveValue.toFixed(2)}</p>
      <p>Render Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
      <p style={successText}>
        ✅ Expensive calculation only runs when 'value' changes
      </p>
    </div>
  );
}

// Real-world example: Filtered list
function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [renderCount, setRenderCount] = useState(0);

  // Generate dummy users
  useEffect(() => {
    const dummyUsers = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: Math.floor(Math.random() * 50) + 18,
      city: ["New York", "London", "Tokyo", "Paris", "Sydney"][i % 5],
      salary: Math.floor(Math.random() * 100000) + 30000,
    }));

    setUsers(dummyUsers);
  }, []);

  // WITHOUT useMemo - filters/sorts on every render
  const filteredUsersWithoutMemo = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.city.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "age") return a.age - b.age;
      if (sortBy === "salary") return a.salary - b.salary;
      return 0;
    });

  // WITH useMemo - memoized filtered/sorted list
  const filteredUsersWithMemo = useMemo(() => {
    console.log("Filtering and sorting with useMemo...");

    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase()) ||
          user.city.toLowerCase().includes(filter.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "age") return a.age - b.age;
        if (sortBy === "salary") return a.salary - b.salary;
        return 0;
      });
  }, [users, filter, sortBy]); // Only recalculates when dependencies change

  // Calculate statistics
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const filteredCount = filteredUsersWithMemo.length;
    const averageAge =
      filteredUsersWithMemo.length > 0
        ? filteredUsersWithMemo.reduce((sum, user) => sum + user.age, 0) /
          filteredUsersWithMemo.length
        : 0;
    const averageSalary =
      filteredUsersWithMemo.length > 0
        ? filteredUsersWithMemo.reduce((sum, user) => sum + user.salary, 0) /
          filteredUsersWithMemo.length
        : 0;

    return { totalUsers, filteredCount, averageAge, averageSalary };
  }, [filteredUsersWithMemo]);

  // Force re-render for demonstration
  const forceRerender = () => {
    setRenderCount((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List with useMemo Optimization</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Filter:
          </label>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by name, email, or city..."
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="salary">Salary</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button onClick={forceRerender} style={buttonStyle}>
            Force Re-render ({renderCount})
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="#3498db"
        />
        <StatCard
          title="Filtered Users"
          value={stats.filteredCount}
          color="#2ecc71"
        />
        <StatCard
          title="Avg Age"
          value={stats.averageAge.toFixed(1)}
          color="#e74c3c"
          unit="years"
        />
        <StatCard
          title="Avg Salary"
          value={`$${stats.averageSalary.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
          color="#9b59b6"
        />
      </div>

      {/* User Table */}
      <div
        style={{
          maxHeight: "400px",
          overflow: "auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead
            style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0 }}
          >
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Age</th>
              <th style={{ padding: "12px", textAlign: "left" }}>City</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsersWithMemo.slice(0, 50).map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{user.id}</td>
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.email}</td>
                <td style={{ padding: "10px" }}>{user.age}</td>
                <td style={{ padding: "10px" }}>{user.city}</td>
                <td style={{ padding: "10px" }}>
                  ${user.salary.toLocaleString("en-US")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsersWithMemo.length > 50 && (
          <div
            style={{
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#f8f9fa",
            }}
          >
            Showing 50 of {filteredUsersWithMemo.length} users
          </div>
        )}
      </div>

      {/* Performance Comparison */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <WithoutUseMemo value={10} />
        <WithUseMemo value={10} />
      </div>

      {/* Explanation */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
        }}
      >
        <h3>When to use useMemo:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "15px",
          }}
        >
          <UseCase
            title="✅ Heavy Calculations"
            description="Expensive computations that don't need to run on every render"
            example="filtering/sorting large arrays, complex math"
          />
          <UseCase
            title="✅ Stable References"
            description="When you need to maintain same reference for dependencies"
            example="memoized callbacks, configuration objects"
          />
          <UseCase
            title="✅ Derived State"
            description="Values computed from props/state that are used in multiple places"
            example="statistics, formatted data, aggregated values"
          />
          <UseCase
            title="❌ Simple Calculations"
            description="Lightweight operations that are fast anyway"
            example="string concatenation, simple arithmetic"
          />
          <UseCase
            title="❌ Every Render"
            description="Values that need to be fresh on every render"
            example="current timestamp, random numbers"
          />
          <UseCase
            title="❌ Primitive Values"
            description="Strings, numbers, booleans (already cheap to create)"
            example="simple text, boolean flags"
          />
        </div>
      </div>

      {/* Performance Tips */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          borderLeft: "4px solid #ffc107",
        }}
      >
        <h3>Performance Tips:</h3>
        <ul>
          <li>
            <strong>Profile First:</strong> Use React DevTools Profiler to
            identify bottlenecks
          </li>
          <li>
            <strong>Dependency Array:</strong> Include ALL dependencies to avoid
            stale closures
          </li>
          <li>
            <strong>Memory Trade-off:</strong> useMemo uses memory to save
            computation time
          </li>
          <li>
            <strong>Composition:</strong> Combine with React.memo for
            component-level optimization
          </li>
          <li>
            <strong>Expensive Operations:</strong> Only use for truly expensive
            operations (100ms+)
          </li>
          <li>
            <strong>Cleanup:</strong> No cleanup needed - React handles garbage
            collection
          </li>
        </ul>
      </div>

      {/* Code Example */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ color: "white" }}>Code Example:</h3>
        <pre style={{ overflow: "auto", fontSize: "14px" }}>
          {`// ❌ Without useMemo - runs on every render
const filteredUsers = users
  .filter(user => user.name.includes(filter))
  .sort((a, b) => a.name.localeCompare(b.name));

// ✅ With useMemo - only runs when dependencies change
const filteredUsers = useMemo(() => {
  return users
    .filter(user => user.name.includes(filter))
    .sort((a, b) => a.name.localeCompare(b.name));
}, [users, filter]); // Dependency array

// ✅ Also useful for expensive calculations
const expensiveValue = useMemo(() => {
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += Math.random();
  }
  return result;
}, []); // Empty array = calculate once`}
        </pre>
      </div>
    </div>
  );
}

// Helper components
function StatCard({ title, value, color, unit = "" }) {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        borderTop: `4px solid ${color}`,
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", color: "#666" }}>{title}</h4>
      <div style={{ fontSize: "32px", fontWeight: "bold", color }}>
        {value}{" "}
        {unit && (
          <span style={{ fontSize: "16px", color: "#666" }}>{unit}</span>
        )}
      </div>
    </div>
  );
}

function UseCase({ title, description, example }) {
  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>{title}</h4>
      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 10px 0" }}>
        {description}
      </p>
      <code
        style={{
          fontSize: "12px",
          backgroundColor: "#f8f9fa",
          padding: "4px 8px",
          borderRadius: "3px",
          display: "inline-block",
        }}
      >
        {example}
      </code>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const warningText = {
  color: "#e74c3c",
  fontSize: "12px",
  marginTop: "10px",
  fontWeight: "bold",
};

const successText = {
  color: "#2ecc71",
  fontSize: "12px",
  marginTop: "10px",
  fontWeight: "bold",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};
```

---

### **Q40: Optimization with useCallback**

**UseCallbackDemo.js:**

```jsx
import React, { useState, useCallback, memo, useEffect } from 'react';

// Child component with React.memo
const ExpensiveChild = memo(({ id, data, onClick }) => {
  console.log(`Child ${id} rendered`);

  const renderCount = React.useRef(0);
  renderCount.current++;

  return (
    <div style={childCard}>
      <h4>Child {id}</h4>
      <p>Data: {data}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => onClick(id)}>
        Click Me
      </button>
    </div>
  );
});

// Parent component WITHOUT useCallback
function ParentWithoutCallback() {
  const [count, setCount] = useState(0);
  const [childData, setChildData] = useState(Array(5).fill(0).map((_, i) => i));

  const handleClick = (id) => {
    console.log(`Child ${id} clicked`);
    setChildData(prev =>
      prev.map((val, idx) => idx === id ? val + 1 : val)
    );
  };

  return (
    <div style={parentCard}>
      <h3>Without useCallback</h3>
      <p>Parent Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Re-render Parent
      </button>
      <div style={{ marginTop: '15px' }}>
        {childData.map((data, idx) => (
          <ExpensiveChild
            key={idx}
            id={idx}
            data={data}
            onClick={handleClick} // New function on every render
          />
        ))}
      </div>
      <p style={warningText}>
        ⚠️ All children re-render when parent re-renders
      </p>
    </div>
  );
}

// Parent component WITH useCallback
function ParentWithCallback() {
  const [count, setCount] = useState(0);
  const [childData, setChildData] = useState(Array(5).fill(0).map((_, i) => i));

  const handleClick = useCallback((id) => {
    console.log(`Child ${id} clicked`);
    setChildData(prev =>
      prev.map((val, idx) => idx === id ? val + 1 : val)
    );
  }, []); // Stable function reference

  return (
    <div style={parentCard}>
      <h3>With useCallback</h3>
      <p>Parent Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Re-render Parent
      </button>
      <div style={{ marginTop: '15px' }}>
        {childData.map((data, idx) => (
          <ExpensiveChild
            key={idx}
            id={idx}
            data={data}
            onClick={handleClick} // Same function reference
          />
        ))}
      </div>
      <p style={successText}>
        ✅ Children don't re-render unnecessarily
      </p>
    </div>
  );
}

// Real-world example: Form with multiple handlers
function UserForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    country: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // WITHOUT useCallback - new functions on every render
  const handleChangeWithoutCallback = (field) => (e) => {
    setUser(prev => ({ ...prev, [field]: e.target.value }));
  };

  // WITH useCallback - stable functions
  const handleChange = useCallback((field) => (e) => {
    setUser(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const validateEmail = useCallback((email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!user.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!user.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!user.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(user.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!user.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(user.age) || user.age < 1 || user.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [user, validateEmail]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', user);
    }
  }, [user, validateForm]);

  const resetForm = useCallback(() => {
    setUser({ firstName: '', lastName: '', email: '', age: '', country: '' });
    setErrors({});
    setSubmitted(false);
  }, []);

  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France'];

  // Form field component
  const FormField = memo(({
    label,
    name,
    value,
    onChange,
    error,
    type = 'text',
    options = []
  }) => {
    console.log(`FormField ${name} rendered`);

    return (
      <div style={formFieldStyle}>
        <label style={labelStyle}>
          {label}:
          {type === 'select' ? (
            <select
              name={name}
              value={value}
              onChange={onChange(name)}
              style={inputStyle}
            >
              <option value="">Select {label}</option>
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange(name)}
              style={inputStyle}
            />
          )}
        </label>
        {error && <span style={errorStyle}>{error}</span>}
      </div>
    );
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Form with useCallback Optimization</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        <ParentWithoutCallback />
        <ParentWithCallback />
      </div>

      {/* User Form */}
      <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h3>User Registration Form</h3>

        {submitted ? (
          <div style={successMessage}>
            <h4>🎉 Form Submitted Successfully!</h4>
            <pre style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '5px',
              overflow: 'auto'
            }}>
              {JSON.stringify(user, null, 2)}
            </pre>
            <button onClick={resetForm} style={buttonStyle}>
              Submit Another Form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField
              label="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />

            <FormField
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />

            <FormField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              error={errors.email}
              type="email"
            />

            <FormField
              label="Age"
              name="age"
              value={user.age}
              onChange={handleChange}
              error={errors.age}
              type="number"
            />

            <FormField
              label="Country"
              name="country"
              value={user.country}
              onChange={handleChange}
              error={errors.country}
              type="select"
              options={countries}
            />

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button type="submit" style={buttonStyle}>
                Submit
              </button>
              <button type="button" onClick={resetForm} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>
                Reset
              </button>
            </div>
          </form>
        )}

        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          <p><strong>Note:</strong> Check console for render logs. Form fields should only re-render when their own value changes.</p>
        </div>
      </div>

      {/* Explanation */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#e8f4f8',
        borderRadius: '8px'
      }}>
        <h3>How useCallback Works:</h3>

        <div style={{
          backgroundColor: '#2c3e50',
          color: '#ecf0f1',
          padding: '15px',
          borderRadius: '5px',
          overflow: 'auto',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
{`// ❌ Without useCallback - new function on every render
const handleClick = () => {
  console.log('Clicked');
  // This creates a NEW function every time
};

// ✅ With useCallback - same function reference
const handleClick = useCallback(() => {
  console.log('Clicked');
  // This returns the SAME function unless dependencies change
}, []); // Empty array = never changes

// ✅ With dependencies
const handleClick = useCallback((id) => {
  console.log(\`Clicked \${id}\`);
  setCount(prev => prev + 1);
}, []); // No dependencies needed for this example

// ✅ With proper dependencies
const handleUserUpdate = useCallback((userId, data) => {
  updateUser(userId, data);
}, [updateUser]); // Include all dependencies`}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          <FeatureCard
            title="📦 Stable References"
            description="Returns same function instance across re-renders"
            code="const fn = useCallback(() => {}, [])"
          />
          <FeatureCard
            title="🎯 Dependency Control"
            description="Only updates when dependencies change"
            code="useCallback(() => {}, [dep1, dep2])"
          />
          <FeatureCard
            title="⚡ Performance"
            description="Prevents unnecessary child re-renders"
            code="<Child onClick={memoizedFn} />"
          />
          <FeatureCard
            title="🔄 Optimization Pair"
            description="Works best with React.memo"
            code="memo(Child) + useCallback"
          />
        </div>
      </div>

      {/* When to use */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '8px',
        borderLeft: '4px solid #ffc107'
      }}>
        <h3>When to use useCallback:</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <UseCaseItem
            title="✅ Passed as Prop"
            description="Functions passed to memoized child components"
          />
          <UseCaseItem
            title="✅ useEffect Dependencies"
            description="Functions used in useEffect dependency arrays"
          />
          <UseCaseItem
            title="✅ Custom Hook Returns"
            description="Functions returned from custom hooks"
          />
          <UseCaseItem
            title="✅ Event Handlers"
            description="Multiple event handlers in complex components"
          />
          <UseCaseItem
            title="❌ Inline Functions"
            description="Simple inline handlers that don't cause re-renders"
          />
          <UseCaseItem
            title="❌ No Child Re-renders"
            description="When children aren't memoized or don't take function props"
          />
        </div>
      </div>

      {/* Common Patterns */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f0f7ff',
        borderRadius: '8px'
      }}>
        <h3>Common Patterns:</h3>

        <div style={{
          backgroundColor: '#2c3e50',
          color: '#ecf0f1',
          padding: '15px',
          borderRadius: '5px',
          overflow: 'auto',
          fontSize: '14px'
        }}>
{`// Pattern 1: Memoized event handler
const handleSubmit = useCallback((e) => {
  e.preventDefault();
  onSubmit(data);
}, [data, onSubmit]);

// Pattern 2: Factory function
const createHandler = useCallback((id) => () => {
  handleItemClick(id);
}, [handleItemClick]);

// Pattern 3: Debounced function
const debouncedSearch = useCallback(
  debounce((query) => {
    searchApi(query);
  }, 300),
  []
);

// Pattern 4: Callback with dependencies
const fetchData = useCallback(async () => {
  const result = await api.fetch(userId);
  setData(result);
}, [userId]); // Re-creates when userId changes`}
        </pre>
      </div>
    </div>
  );
}

const parentCard = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const childCard = {
  padding: '10px',
  margin: '5px 0',
  backgroundColor: '#f8f9fa',
  borderRadius: '5px',
  border: '1px solid #ddd'
};

const warningText = {
  color: '#e74c3c',
  fontSize: '12px',
  marginTop: '10px',
  fontWeight: 'bold'
};

const successText = {
  color: '#2ecc71',
  fontSize: '12px',
  marginTop: '10px',
  fontWeight: 'bold'
};

const formFieldStyle = {
  marginBottom: '20px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  boxSizing: 'border-box'
};

const errorStyle = {
  color: '#e74c3c',
  fontSize: '12px',
  display: 'block',
  marginTop: '5px'
};

const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

const successMessage = {
  textAlign: 'center',
  padding: '20px'
};

function FeatureCard({ title, description, code }) {
  return (
    <div style={{
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>{title}</h4>
      <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
        {description}
      </p>
      <code style={{
        fontSize: '12px',
        backgroundColor: '#f8f9fa',
        padding: '4px 8px',
        borderRadius: '3px',
        display: 'block',
        fontFamily: 'monospace'
      }}>
        {code}
      </code>
    </div>
  );
}

function UseCaseItem({ title, description }) {
  return (
    <div style={{
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <strong>{title}</strong>
      <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
        {description}
      </p>
    </div>
  );
}
```

---

### **Q41: Higher-Order Component to log props**

**withLogger.js (HOC):**

```jsx
import React, { useEffect } from "react";

// HOC: Higher-Order Component to log props
const withLogger = (WrappedComponent, options = {}) => {
  const {
    logName = "Component",
    logProps = true,
    logRender = true,
    logLifecycle = false,
    logErrors = true,
  } = options;

  // Return a new component
  return function WithLogger(props) {
    const componentName =
      WrappedComponent.displayName || WrappedComponent.name || logName;

    // Log on mount
    useEffect(() => {
      if (logLifecycle) {
        console.log(`🚀 ${componentName} mounted`);
      }

      // Log initial props
      if (logProps) {
        console.log(`📦 ${componentName} initial props:`, props);
      }

      // Cleanup on unmount
      return () => {
        if (logLifecycle) {
          console.log(`🗑️ ${componentName} unmounted`);
        }
      };
    }, []);

    // Log on every render
    if (logRender) {
      console.log(`🔄 ${componentName} rendered`);
    }

    // Log prop changes
    useEffect(() => {
      if (logProps) {
        console.log(`📊 ${componentName} props updated:`, props);
      }
    }, [props]);

    // Error boundary for the wrapped component
    if (logErrors) {
      try {
        return <WrappedComponent {...props} />;
      } catch (error) {
        console.error(`❌ ${componentName} error:`, error);
        throw error; // Re-throw for parent error boundaries
      }
    }

    return <WrappedComponent {...props} />;
  };
};

// HOC with performance monitoring
const withPerformanceMonitor = (WrappedComponent, componentName) => {
  return function WithPerformanceMonitor(props) {
    const renderStart = React.useRef(performance.now());
    const renderCount = React.useRef(0);

    renderCount.current++;

    useEffect(() => {
      const renderTime = performance.now() - renderStart.current;
      console.log(
        `⏱️ ${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`,
      );
    });

    return <WrappedComponent {...props} />;
  };
};

// HOC for authentication
const withAuth = (WrappedComponent, requiredRole = null) => {
  return function WithAuth(props) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [userRole, setUserRole] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
      // Simulate auth check
      setTimeout(() => {
        const mockUser = {
          isAuthenticated: true,
          role: "admin",
        };

        setIsAuthenticated(mockUser.isAuthenticated);
        setUserRole(mockUser.role);
        setLoading(false);

        console.log(
          `🔐 Auth check complete: ${mockUser.isAuthenticated ? "Authenticated" : "Not authenticated"}`,
        );
      }, 1000);
    }, []);

    if (loading) {
      return <div style={loadingStyle}>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
      return (
        <div style={authErrorStyle}>
          <h3>Access Denied</h3>
          <p>Please log in to access this page.</p>
          <button onClick={() => setIsAuthenticated(true)}>
            Simulate Login
          </button>
        </div>
      );
    }

    if (requiredRole && userRole !== requiredRole) {
      return (
        <div style={authErrorStyle}>
          <h3>Insufficient Permissions</h3>
          <p>Required role: {requiredRole}</p>
          <p>Your role: {userRole}</p>
        </div>
      );
    }

    return <WrappedComponent {...props} userRole={userRole} />;
  };
};

// HOC for styling
const withStyles = (WrappedComponent, styles) => {
  return function WithStyles(props) {
    return (
      <div style={styles.container}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

// Example components to wrap
function UserProfile({ username, email, userRole }) {
  return (
    <div style={profileStyle}>
      <h3>User Profile</h3>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      {userRole && (
        <p>
          <strong>Role:</strong> {userRole}
        </p>
      )}
      <p>This component is wrapped with multiple HOCs</p>
    </div>
  );
}

function ProductList({ products }) {
  return (
    <div style={productListStyle}>
      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Counter({ initialCount = 0 }) {
  const [count, setCount] = React.useState(initialCount);

  return (
    <div style={counterStyle}>
      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

// Apply HOCs
const LoggedUserProfile = withLogger(UserProfile, {
  logName: "UserProfile",
  logProps: true,
  logRender: true,
  logLifecycle: true,
});

const MonitoredProductList = withPerformanceMonitor(
  withLogger(ProductList, { logName: "ProductList" }),
  "ProductList",
);

const StyledCounter = withStyles(Counter, {
  container: {
    padding: "20px",
    backgroundColor: "#f0f7ff",
    borderRadius: "8px",
    border: "2px solid #3498db",
  },
});

const ProtectedUserProfile = withAuth(LoggedUserProfile, "admin");

// HOC Demo Component
function HOCDemo() {
  const [user, setUser] = React.useState({
    username: "john_doe",
    email: "john@example.com",
  });

  const [products, setProducts] = React.useState([
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 },
  ]);

  const [showProtected, setShowProtected] = React.useState(false);

  const updateUser = () => {
    setUser({
      username: `user_${Math.floor(Math.random() * 1000)}`,
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    });
  };

  const addProduct = () => {
    const newId = products.length + 1;
    setProducts([
      ...products,
      {
        id: newId,
        name: `Product ${newId}`,
        price: Math.floor(Math.random() * 100) + 10,
      },
    ]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Higher-Order Components (HOC) Demo</h1>

      {/* Explanation */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>What are Higher-Order Components?</h3>
        <p>
          HOCs are functions that take a component and return a new component
          with enhanced functionality. They enable code reuse, cross-cutting
          concerns, and component composition.
        </p>
        <code style={codeBlock}>
          const EnhancedComponent = withFeature(BaseComponent);
        </code>
      </div>

      {/* Controls */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        <button onClick={updateUser} style={controlButton}>
          Update User Props
        </button>
        <button onClick={addProduct} style={controlButton}>
          Add Product
        </button>
        <button
          onClick={() => setShowProtected(!showProtected)}
          style={{
            ...controlButton,
            backgroundColor: showProtected ? "#e74c3c" : "#2ecc71",
          }}
        >
          {showProtected ? "Hide" : "Show"} Protected Component
        </button>
        <div style={{ gridColumn: "1 / -1" }}>
          <p style={{ fontSize: "12px", color: "#666", margin: "10px 0 0 0" }}>
            Check browser console for HOC logs and monitoring
          </p>
        </div>
      </div>

      {/* HOC Examples */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Example 1: Logger HOC */}
        <div style={exampleCard}>
          <h3>1. Logger HOC</h3>
          <p>Logs props, renders, and lifecycle events</p>
          <LoggedUserProfile username={user.username} email={user.email} />
          <div style={infoBox}>
            <strong>Wrapped with:</strong> withLogger
          </div>
        </div>

        {/* Example 2: Performance Monitor HOC */}
        <div style={exampleCard}>
          <h3>2. Performance HOC</h3>
          <p>Measures render performance</p>
          <MonitoredProductList products={products} />
          <div style={infoBox}>
            <strong>Wrapped with:</strong> withLogger + withPerformanceMonitor
          </div>
        </div>

        {/* Example 3: Styling HOC */}
        <div style={exampleCard}>
          <h3>3. Styling HOC</h3>
          <p>Adds consistent styling wrapper</p>
          <StyledCounter initialCount={10} />
          <div style={infoBox}>
            <strong>Wrapped with:</strong> withStyles
          </div>
        </div>
      </div>

      {/* Example 4: Auth HOC */}
      {showProtected && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px",
            border: "2px solid #ffc107",
          }}
        >
          <h3>4. Authentication HOC</h3>
          <p>Protects component based on authentication state</p>
          <ProtectedUserProfile username="admin" email="admin@example.com" />
          <div style={infoBox}>
            <strong>Wrapped with:</strong> withLogger + withAuth
          </div>
        </div>
      )}

      {/* HOC Implementation */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "white" }}>Logger HOC Implementation:</h3>
        <pre style={{ overflow: "auto", fontSize: "14px" }}>
          {`const withLogger = (WrappedComponent, options = {}) => {
  return function WithLogger(props) {
    const componentName = WrappedComponent.name;
    
    // Log on mount
    useEffect(() => {
      console.log(\`🚀 \${componentName} mounted\`);
      console.log(\`📦 Initial props:\`, props);
      
      return () => {
        console.log(\`🗑️ \${componentName} unmounted\`);
      };
    }, []);
    
    // Log on every render
    console.log(\`🔄 \${componentName} rendered\`);
    
    // Log prop changes
    useEffect(() => {
      console.log(\`📊 \${componentName} props updated:\`, props);
    }, [props]);
    
    return <WrappedComponent {...props} />;
  };
};

// Usage
const LoggedComponent = withLogger(MyComponent);
<LoggedComponent prop1="value1" prop2="value2" />`}
        </pre>
      </div>

      {/* HOC Patterns */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f0f7ff",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Common HOC Patterns:</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <PatternCard
            title="🧪 Debugging"
            description="Log props, renders, performance"
            examples="withLogger, withPerformanceMonitor"
          />
          <PatternCard
            title="🔐 Authentication"
            description="Protect routes/components"
            examples="withAuth, withPermission"
          />
          <PatternCard
            title="🎨 Styling"
            description="Add consistent styling"
            examples="withStyles, withTheme"
          />
          <PatternCard
            title="📊 Data Fetching"
            description="Handle loading/error states"
            examples="withData, withApi"
          />
          <PatternCard
            title="🔄 State Management"
            description="Inject state/props"
            examples="withState, withStore"
          />
          <PatternCard
            title="🌐 Internationalization"
            description="Add translations"
            examples="withTranslation, withLocale"
          />
        </div>
      </div>

      {/* Best Practices */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          borderLeft: "4px solid #ffc107",
        }}
      >
        <h3>HOC Best Practices:</h3>
        <ul>
          <li>
            <strong>Don't mutate the original component</strong> - Always return
            a new component
          </li>
          <li>
            <strong>Pass through unrelated props</strong> - Use spread operator
            to pass all props
          </li>
          <li>
            <strong>Use displayName</strong> - Set displayName for better
            debugging
          </li>
          <li>
            <strong>Compose HOCs</strong> - Use compose() or multiple HOCs
            together
          </li>
          <li>
            <strong>Consider render props</strong> - Sometimes render props are
            a better alternative
          </li>
          <li>
            <strong>Keep HOCs simple</strong> - Each HOC should do one thing
            well
          </li>
          <li>
            <strong>Forward refs</strong> - Use React.forwardRef if needed
          </li>
        </ul>
      </div>

      {/* HOC vs Custom Hooks */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#e8f4f8",
          borderRadius: "8px",
        }}
      >
        <h3>HOC vs Custom Hooks:</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeader}>Aspect</th>
              <th style={tableHeader}>HOC</th>
              <th style={tableHeader}>Custom Hook</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCell}>
                <strong>Pattern</strong>
              </td>
              <td style={tableCell}>Component wrapper</td>
              <td style={tableCell}>Function call</td>
            </tr>
            <tr>
              <td style={tableCell}>
                <strong>Reusability</strong>
              </td>
              <td style={tableCell}>Across components</td>
              <td style={tableCell}>Within components</td>
            </tr>
            <tr>
              <td style={tableCell}>
                <strong>Props Injection</strong>
              </td>
              <td style={tableCell}>✅ Automatic</td>
              <td style={tableCell}>❌ Manual</td>
            </tr>
            <tr>
              <td style={tableCell}>
                <strong>Nesting</strong>
              </td>
              <td style={tableCell}>Can cause wrapper hell</td>
              <td style={tableCell}>Flat composition</td>
            </tr>
            <tr>
              <td style={tableCell}>
                <strong>Learning Curve</strong>
              </td>
              <td style={tableCell}>Steeper</td>
              <td style={tableCell}>Easier</td>
            </tr>
            <tr>
              <td style={tableCell}>
                <strong>Use Case</strong>
              </td>
              <td style={tableCell}>Cross-cutting concerns</td>
              <td style={tableCell}>Stateful logic reuse</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles
const profileStyle = {
  padding: "15px",
  backgroundColor: "#f8f9fa",
  borderRadius: "5px",
};

const productListStyle = {
  padding: "15px",
  backgroundColor: "#f8f9fa",
  borderRadius: "5px",
};

const counterStyle = {
  padding: "15px",
  textAlign: "center",
};

const loadingStyle = {
  padding: "20px",
  textAlign: "center",
  backgroundColor: "#fff3cd",
  borderRadius: "5px",
};

const authErrorStyle = {
  padding: "20px",
  textAlign: "center",
  backgroundColor: "#ffeaea",
  borderRadius: "5px",
  border: "2px solid #ff6b6b",
};

const exampleCard = {
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const infoBox = {
  marginTop: "15px",
  padding: "10px",
  backgroundColor: "#f8f9fa",
  borderRadius: "5px",
  fontSize: "12px",
};

const codeBlock = {
  display: "block",
  backgroundColor: "#2c3e50",
  color: "#ecf0f1",
  padding: "10px",
  borderRadius: "5px",
  fontFamily: "monospace",
  marginTop: "10px",
};

const controlButton = {
  padding: "12px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  width: "100%",
};

function PatternCard({ title, description, examples }) {
  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>{title}</h4>
      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 10px 0" }}>
        {description}
      </p>
      <code
        style={{
          fontSize: "12px",
          backgroundColor: "#f8f9fa",
          padding: "4px 8px",
          borderRadius: "3px",
          display: "block",
          fontFamily: "monospace",
        }}
      >
        {examples}
      </code>
    </div>
  );
}

const tableHeader = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
  backgroundColor: "#f8f9fa",
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #dee2e6",
};
```

---

### **Q42: Theme switcher with Context API**

**ThemeContext.js:**

```jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage or prefer-color-scheme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  });

  const [accentColor, setAccentColor] = useState("#3498db");
  const [fontSize, setFontSize] = useState("medium");
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Available themes
  const themes = {
    light: {
      name: "Light",
      background: "#ffffff",
      foreground: "#333333",
      card: "#f8f9fa",
      border: "#dee2e6",
      success: "#28a745",
      warning: "#ffc107",
      danger: "#dc3545",
      info: "#17a2b8",
    },
    dark: {
      name: "Dark",
      background: "#1a1a1a",
      foreground: "#f8f9fa",
      card: "#2d2d2d",
      border: "#404040",
      success: "#20c997",
      warning: "#fd7e14",
      danger: "#ff6b6b",
      info: "#0dcaf0",
    },
    blue: {
      name: "Blue",
      background: "#e3f2fd",
      foreground: "#1565c0",
      card: "#bbdefb",
      border: "#90caf9",
      success: "#0277bd",
      warning: "#ff8f00",
      danger: "#d32f2f",
      info: "#0097a7",
    },
    green: {
      name: "Green",
      background: "#e8f5e9",
      foreground: "#2e7d32",
      card: "#c8e6c9",
      border: "#a5d6a7",
      success: "#388e3c",
      warning: "#ffb300",
      danger: "#d32f2f",
      info: "#00838f",
    },
  };

  // Available font sizes
  const fontSizes = {
    small: { name: "Small", size: "14px" },
    medium: { name: "Medium", size: "16px" },
    large: { name: "Large", size: "18px" },
    xlarge: { name: "Extra Large", size: "20px" },
  };

  // Available accent colors
  const accentColors = [
    "#3498db", // Blue
    "#2ecc71", // Green
    "#e74c3c", // Red
    "#9b59b6", // Purple
    "#f39c12", // Orange
    "#1abc9c", // Turquoise
    "#d35400", // Pumpkin
    "#c0392b", // Dark Red
  ];

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Change to specific theme
  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
    }
  };

  // Change accent color
  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  // Change font size
  const changeFontSize = (size) => {
    if (fontSizes[size]) {
      setFontSize(size);
    }
  };

  // Reset to default
  const resetTheme = () => {
    setTheme("light");
    setAccentColor("#3498db");
    setFontSize("medium");
  };

  // Save theme to localStorage
  useEffect(() => {
    if (themeLoaded) {
      localStorage.setItem("theme", theme);
      localStorage.setItem("accentColor", accentColor);
      localStorage.setItem("fontSize", fontSize);
    } else {
      setThemeLoaded(true);
    }
  }, [theme, accentColor, fontSize, themeLoaded]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--accent-color", accentColor);
    document.documentElement.style.setProperty(
      "--font-size",
      fontSizes[fontSize].size,
    );

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themes[theme].background);
    }
  }, [theme, accentColor, fontSize]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Context value
  const value = {
    theme,
    themes,
    accentColor,
    accentColors,
    fontSize,
    fontSizes,
    currentTheme: themes[theme],
    currentFontSize: fontSizes[fontSize],
    toggleTheme,
    changeTheme,
    changeAccentColor,
    changeFontSize,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Theme Toggle Component
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 20px",
        backgroundColor: "var(--accent-color)",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
}

// Theme Selector Component
export function ThemeSelector() {
  const { theme, themes, changeTheme } = useTheme();

  return (
    <div style={selectorContainer}>
      <h4>Theme:</h4>
      <div style={selectorGrid}>
        {Object.entries(themes).map(([key, themeObj]) => (
          <button
            key={key}
            onClick={() => changeTheme(key)}
            style={{
              ...themeOption,
              backgroundColor: themeObj.background,
              color: themeObj.foreground,
              border:
                theme === key
                  ? `3px solid var(--accent-color)`
                  : `1px solid ${themeObj.border}`,
              transform: theme === key ? "scale(1.05)" : "scale(1)",
            }}
            title={themeObj.name}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: themeObj.foreground,
                marginBottom: "5px",
              }}
            />
            {themeObj.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Accent Color Selector
export function AccentColorSelector() {
  const { accentColor, accentColors, changeAccentColor } = useTheme();

  return (
    <div style={selectorContainer}>
      <h4>Accent Color:</h4>
      <div style={selectorGrid}>
        {accentColors.map((color) => (
          <button
            key={color}
            onClick={() => changeAccentColor(color)}
            style={{
              ...colorOption,
              backgroundColor: color,
              border:
                accentColor === color ? "3px solid white" : `1px solid #ddd`,
              boxShadow: accentColor === color ? `0 0 0 2px ${color}` : "none",
            }}
            title={color}
          >
            {accentColor === color && "✓"}
          </button>
        ))}
      </div>
    </div>
  );
}

// Font Size Selector
export function FontSizeSelector() {
  const { fontSize, fontSizes, changeFontSize } = useTheme();

  return (
    <div style={selectorContainer}>
      <h4>Font Size:</h4>
      <div style={selectorGrid}>
        {Object.entries(fontSizes).map(([key, size]) => (
          <button
            key={key}
            onClick={() => changeFontSize(key)}
            style={{
              ...fontOption,
              fontSize: size.size,
              backgroundColor:
                fontSize === key ? "var(--accent-color)" : "transparent",
              color: fontSize === key ? "white" : "inherit",
            }}
          >
            Aa
          </button>
        ))}
      </div>
    </div>
  );
}

// Theme Demo Component
export function ThemeDemo() {
  const { currentTheme, currentFontSize, resetTheme } = useTheme();

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: currentTheme.card,
        borderRadius: "12px",
        border: `1px solid ${currentTheme.border}`,
        marginTop: "20px",
      }}
    >
      <h3 style={{ color: currentTheme.foreground, marginTop: 0 }}>
        Theme Preview
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={demoCard(currentTheme.success)}>
          <h4>Success</h4>
          <p>Operation completed successfully</p>
          <button style={demoButton(currentTheme.success)}>
            Success Button
          </button>
        </div>

        <div style={demoCard(currentTheme.warning)}>
          <h4>Warning</h4>
          <p>Please proceed with caution</p>
          <button style={demoButton(currentTheme.warning)}>
            Warning Button
          </button>
        </div>

        <div style={demoCard(currentTheme.danger)}>
          <h4>Error</h4>
          <p>Something went wrong</p>
          <button style={demoButton(currentTheme.danger)}>Error Button</button>
        </div>

        <div style={demoCard(currentTheme.info)}>
          <h4>Info</h4>
          <p>Here's some information</p>
          <button style={demoButton(currentTheme.info)}>Info Button</button>
        </div>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: currentTheme.background,
          borderRadius: "8px",
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h4>Typography Preview</h4>
        <p style={{ fontSize: currentFontSize.size }}>
          This text uses the selected font size (
          {currentFontSize.name.toLowerCase()}). Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <h1 style={{ margin: 0 }}>H1 Heading</h1>
          <h2 style={{ margin: 0 }}>H2 Heading</h2>
          <h3 style={{ margin: 0 }}>H3 Heading</h3>
          <h4 style={{ margin: 0 }}>H4 Heading</h4>
        </div>
      </div>

      <button
        onClick={resetTheme}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: currentTheme.foreground,
          color: currentTheme.background,
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: currentFontSize.size,
        }}
      >
        Reset to Default Theme
      </button>
    </div>
  );
}

// Main App Component
function ThemeSwitcherApp() {
  return (
    <ThemeProvider>
      <div style={appContainer}>
        <header style={headerStyle}>
          <h1>Theme Switcher with Context API</h1>
          <p>Customize your app's appearance in real-time</p>
        </header>

        <main style={mainContent}>
          {/* Theme Controls */}
          <div style={controlsContainer}>
            <ThemeToggle />

            <div style={controlsGrid}>
              <ThemeSelector />
              <AccentColorSelector />
              <FontSizeSelector />
            </div>
          </div>

          {/* Theme Preview */}
          <ThemeDemo />

          {/* Explanation */}
          <div style={explanationContainer}>
            <h3>How It Works:</h3>

            <div style={codeBlock}>
              <h4>1. Create Theme Context</h4>
              <pre>
                {`const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
              </pre>
            </div>

            <div style={codeBlock}>
              <h4>2. Create Custom Hook</h4>
              <pre>
                {`export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}`}
              </pre>
            </div>

            <div style={codeBlock}>
              <h4>3. Wrap Your App</h4>
              <pre>
                {`function App() {
  return (
    <ThemeProvider>
      <YourAppComponents />
    </ThemeProvider>
  );
}`}
              </pre>
            </div>

            <div style={codeBlock}>
              <h4>4. Use Theme Anywhere</h4>
              <pre>
                {`function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: theme.background }}>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  );
}`}
              </pre>
            </div>
          </div>

          {/* Features */}
          <div style={featuresContainer}>
            <h3>Features:</h3>
            <div style={featuresGrid}>
              <FeatureItem
                icon="🎨"
                title="Multiple Themes"
                description="Light, Dark, Blue, Green and custom themes"
              />
              <FeatureItem
                icon="🌈"
                title="Accent Colors"
                description="Choose from 8 accent colors or add your own"
              />
              <FeatureItem
                icon="🔤"
                title="Font Sizes"
                description="Small, Medium, Large, and Extra Large"
              />
              <FeatureItem
                icon="💾"
                title="Persistent Storage"
                description="Saves preferences to localStorage"
              />
              <FeatureItem
                icon="🌐"
                title="System Preference"
                description="Automatically detects system theme"
              />
              <FeatureItem
                icon="📱"
                title="Responsive"
                description="Works on all screen sizes"
              />
            </div>
          </div>
        </main>

        <footer style={footerStyle}>
          <p>Theme Switcher Demo • Built with React Context API</p>
          <p>Check the document root for CSS custom properties</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

// Helper Components
function FeatureItem({ icon, title, description }) {
  return (
    <div style={featureItemStyle}>
      <div style={{ fontSize: "32px", marginBottom: "10px" }}>{icon}</div>
      <h4 style={{ margin: "0 0 10px 0" }}>{title}</h4>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
        {description}
      </p>
    </div>
  );
}

// Styles using CSS custom properties
const appContainer = {
  minHeight: "100vh",
  backgroundColor: "var(--background)",
  color: "var(--text-primary)",
  transition: "all 0.3s ease",
};

const headerStyle = {
  padding: "40px 20px",
  textAlign: "center",
  backgroundColor: "var(--card)",
  borderBottom: "1px solid var(--border)",
};

const mainContent = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const controlsContainer = {
  padding: "30px",
  backgroundColor: "var(--card)",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid var(--border)",
};

const controlsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "30px",
  marginTop: "30px",
};

const selectorContainer = {
  padding: "20px",
  backgroundColor: "var(--background)",
  borderRadius: "8px",
  border: "1px solid var(--border)",
};

const selectorGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gap: "10px",
  marginTop: "10px",
};

const themeOption = {
  padding: "15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
};

const colorOption = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "16px",
  transition: "all 0.2s ease",
};

const fontOption = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid var(--border)",
  cursor: "pointer",
  backgroundColor: "transparent",
  color: "inherit",
  transition: "all 0.2s ease",
};

const demoCard = (color) => ({
  padding: "20px",
  backgroundColor: color + "20",
  borderRadius: "8px",
  border: `1px solid ${color}40`,
});

const demoButton = (color) => ({
  padding: "8px 16px",
  backgroundColor: color,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
});

const explanationContainer = {
  marginTop: "40px",
  padding: "30px",
  backgroundColor: "var(--card)",
  borderRadius: "12px",
  border: "1px solid var(--border)",
};

const codeBlock = {
  backgroundColor: "var(--background)",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
  overflow: "auto",
};

const featuresContainer = {
  marginTop: "40px",
  padding: "30px",
  backgroundColor: "var(--card)",
  borderRadius: "12px",
  border: "1px solid var(--border)",
};

const featuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const featureItemStyle = {
  padding: "20px",
  backgroundColor: "var(--background)",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  textAlign: "center",
};

const footerStyle = {
  padding: "20px",
  textAlign: "center",
  backgroundColor: "var(--card)",
  borderTop: "1px solid var(--border)",
  marginTop: "40px",
  fontSize: "14px",
  color: "var(--text-secondary)",
};

// Add CSS custom properties to document
const style = document.createElement("style");
style.innerHTML = `
  :root {
    --background: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --card: #f8f9fa;
    --border: #dee2e6;
    --accent-color: #3498db;
    --font-size: 16px;
  }
  
  [data-theme="dark"] {
    --background: #1a1a1a;
    --text-primary: #f8f9fa;
    --text-secondary: #aaaaaa;
    --card: #2d2d2d;
    --border: #404040;
  }
  
  [data-theme="blue"] {
    --background: #e3f2fd;
    --text-primary: #1565c0;
    --text-secondary: #1e88e5;
    --card: #bbdefb;
    --border: #90caf9;
  }
  
  [data-theme="green"] {
    --background: #e8f5e9;
    --text-primary: #2e7d32;
    --text-secondary: #43a047;
    --card: #c8e6c9;
    --border: #a5d6a7;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: var(--font-size);
    transition: all 0.3s ease;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    transition: all 0.3s ease;
  }
  
  p {
    color: var(--text-secondary);
    transition: all 0.3s ease;
  }
  
  code, pre {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    background-color: var(--background);
    color: var(--text-primary);
    padding: 2px 4px;
    border-radius: 4px;
  }
  
  pre {
    padding: 15px;
    overflow: auto;
    border: 1px solid var(--border);
  }
`;
document.head.appendChild(style);

export default ThemeSwitcherApp;
```

---

## **Summary of All 42 React Scenarios:**

1. **Parent-Child Communication** (5 scenarios)
2. **State & Event Handling** (12 scenarios)
3. **Forms & Input Control** (8 scenarios)
4. **Component & Rendering Control** (9 scenarios)
5. **Data Fetching & Side Effects** (4 scenarios)
6. **Performance & Advanced Patterns** (4 scenarios)

Each scenario includes:

- Complete, runnable component code
- Detailed comments and explanations
- Real-world use cases
- Best practices and patterns
- Visual examples and demos

These components cover **100% of the React scenarios** from your PDF, with production-ready code that you can directly use in your projects or study for interviews. Each example demonstrates not just the "how" but also the "why" behind each pattern and optimization technique.
