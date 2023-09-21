import Login from "./components/login/Login";
import Register from "./components/register/register";
import Todo from "./components/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Todo/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
