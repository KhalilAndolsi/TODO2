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
        <Route path="/*" element={<h1 className="w-screen h-screen grid place-items-center font-bold text-5xl text-center">Page Not Found 404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
