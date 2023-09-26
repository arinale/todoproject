import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import TextField from "@mui/material/TextField";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
//component
import Todo from "./Todo";
//others
import { TodosContext } from "./contexts/todosContext";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");

  const [displayTodoType, setdisplayTodoType] = useState("all");

  function changeDisplayType(e) {
    setdisplayTodoType(e.target.value);
  }
  //filter arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notcompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosBeRender = todos;
  if (displayTodoType == "completed") {
    todosBeRender = completedTodos;
  } else if (displayTodoType == "non-completed") {
    todosBeRender = notcompletedTodos;
  }

  const todojsx = todosBeRender.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  function handleAddclick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh ",
          overflow: "scroll",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", color: " #006666" }}
          >
            {" "}
            مهامي
          </Typography>
          <Divider />
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displayTodoType}
            exclusive
            onChange={changeDisplayType}
            //{handleAlignment}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="non-completed"> غيرالمنجز </ToggleButton>
            <ToggleButton value="completed">منجز </ToggleButton>
            <ToggleButton value="all"> الكل </ToggleButton>
          </ToggleButtonGroup>
          {/* All TODOS  */}
          {todojsx}

          {/* All TODOS  */}
        </CardContent>
        <CardActions></CardActions>

        <Grid container style={{ marginTop: "20px" }} spacing={2}>
          <Grid
            xs={8}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </Grid>
          <Grid
            xs={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button
              style={{ width: "100%", height: "100%" }}
              variant="contained"
              onClick={() => {
                handleAddclick();
              }}
              disabled={titleInput.length == 0}
            >
              اضافة المهمة
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
