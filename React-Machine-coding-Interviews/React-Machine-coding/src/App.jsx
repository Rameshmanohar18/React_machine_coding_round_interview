import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Dec22Task from "./Components/Dec22Task";
import Counter from "./Components/Counter";
import PasswordToggle from "./Components/PasswordToggle";
import DisableSubmit from "./Components/DisableSubmit";
import CharacterCount from "./Components/CharacterCount";
import Users from "./Components/Users";
import ThemeToggle from "./Components/ThemeToggle";
import ControlledForm from "./Components/ControlledForm";
import Todo from "./Components/Todo";
import SearchUsers from "./Components/SearchUsers";
import ReactPlayground from "./Components/ReactPlayground";
import ReactMasterPlayground from "./Components/Reactmaster";
import ParentComponent from "./Components/ParentComponent";
import ChildComponent from "./Components/ChildComponent";
import NestedCricles from "./Components/NestedCircles";
import NestedCircles from "./Components/NestedCircles";
import DisplayUserInput from "./Components/DisplayUserInput";
import DisplayDropDown from "./Components/DisplayDropDown";
import DisplayRadiobox from "./Components/DisplayRadiobox";
import DisplaySearchtextbox from "./Components/DisplaySearchtextbox";
import DisplayCounterUseState from "./Components/DisplayCounterUseState";
import DisplayCounterUseReducer from "./Components/DisplayCounterUseReducer";
import DisplayIncDecWithUseReducer from "./Components/DisplayIncDecWithUseReducer";
import CounterWithLogin from "./Components/CounterWithLogin";
import BindArraytodropdown from "./Components/BindArraytodropdown";
import ControlledUncontrolled from "./Components/ControlledUncontrolled";
import Debounce from "./Components/Debounce";
import DecemberuseEffect from "./Components/DecemberuseEffect";
import ApiPolling from "./Components/APIPolling";
import Progressbutton from "./Components/ProgressButton";
import Skeleton from "./Components/Skeltion";
import SkeltonComponent from "./Components/SkeltonComponent";
import DataFetcher from "./Components/DataFetcher";

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <Header />
      <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/about">About page</Link>
        <Link to="/contact">Contact page</Link>
        <Link to="/Dec22Task">Dec22Task page</Link>
        <Link to="/Counter">Counter page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Dec22Task" element={<Dec22Task />} />
        <Route path="/Counter" element={<Counter />} />
      </Routes>
      {/* <BrowserRouter> */}
      <nav style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <Link to="/password">1-Password</Link>
        <Link to="/disable">2-Disable Button</Link>
        <Link to="/count">3-haracters</Link>
        <Link to="/users">4-Users</Link>
        <Link to="/theme">5-Theme</Link>
        <Link to="/form">6-Controlled Form</Link>
        <Link to="/todo">7-Todo</Link>
        <Link to="/search">8-Search</Link>
        <Link to="/counter">9-Counter</Link>
        <Link to="/reactplayground">10-React play Ground</Link>
        <Link to="/reactmaster">11-React master</Link>
        <Link to="/parentcomponent">12-Parent to child props</Link>
        <Link to="/nestedcircles">13-Nested circles</Link>
        <Link to="/displaydropdown">14- Display dropdown </Link>
        <Link to="/displayUserInput">15-Display user input</Link>
        <Link to="/displayradiobox">16-Display radio box </Link>
        <Link to="/DisplaySearchtextbox">17-DisplaySearchtextbox</Link>
        <Link to="/DisplayCounterUseState">18-DisplayCounterUseState</Link>
        <Link to="/DisplayCounterUseReducer">19-DisplayCounterUseReducer</Link>
        <Link to="/DisplayIncDecWithUseReducer">
          20-DisplayIncDecWithUseReducer
        </Link>
        <Link to="/bindArraytodropdown">Bind Array to dropdown</Link>
        <Link to="/controlledcomponent">22-Controlled Component</Link>
        <Link to="/debounce">23-Debounce Example</Link>
        <Link to="/DecemberuseEffect">24-December useEffect </Link>
        <Link to="/APIPolling">API Polling Example</Link>
        <Link to="/Skeleton">Skelton Loading Example</Link>
        <Link to="/skeltoncomponent">Skelton Component Example</Link>
        <Link to="/ProgressButton">Progress Button Example</Link>
        <Link to="/DataFetcher">Data Fetcher Example</Link>
      </nav>
      <Routes>
        <Route path="/password" element={<PasswordToggle />} />
        <Route path="/disable" element={<DisableSubmit />} />
        <Route path="/count" element={<CharacterCount />} />
        <Route path="/users" element={<Users />} />
        <Route path="/theme" element={<ThemeToggle />} />
        <Route path="/form" element={<ControlledForm />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/search" element={<SearchUsers />} />
        <Route path="/reactplayground" element={<ReactPlayground />} />
        <Route path="/reactmaster" element={<ReactMasterPlayground />} />
        <Route path="/useMemo" element={<useMemo />} />
        <Route path="/parentcomponent" element={<ParentComponent />} />
        <Route path="/nestedcircles" element={<NestedCircles />} />
        <Route path="/displayUserInput" element={<DisplayUserInput />} />
        <Route path="/displaydropdown" element={<DisplayDropDown />} />
        <Route path="/displayradiobox" element={<DisplayRadiobox />} />
        <Route
          path="/DisplaySearchtextbox"
          element={<DisplaySearchtextbox />}
        />
        <Route
          path="/DisplayCounterUseState"
          element={<DisplayCounterUseState />}
        />
        <Route
          path="/DisplayCounterUseReducer"
          element={<DisplayCounterUseReducer />}
        />
        <Route
          path="/DisplayIncDecWithUseReducer"
          element={<DisplayIncDecWithUseReducer />}
        />
        <Route path="/CounterwithLogin" element={<CounterWithLogin />} />
        <Route path="/useCounter" element={<useCounter />} />
        <Route path="/Bindarraytodropdown" element={<BindArraytodropdown />} />
        <Route path="/Controlled" element={<ControlledUncontrolled />} />

        <Route path="/debounce" element={<Debounce />} />
        <Route path="/DecemberuseEffect" element={<DecemberuseEffect />} /> <Route path="/DataFetcher/" element={<DataFetcher />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;
