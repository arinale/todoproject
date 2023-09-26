import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components.js/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./components.js/contexts/todosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#26c6da",
    },
  },
});

const initial = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "ijik jnjb njbjhb",
    isCompleted: false,
  },

  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "ijik jnjb njbjhb",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "ijik jnjb njbjhb",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initial);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
