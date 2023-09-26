import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext } from "react";
import { useState } from "react";
import { TodosContext } from "./contexts/todosContext";

export default function Todo({ todo, handleCheck }) {
  const [showDelete, setshowDelete] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);
  const [udpatedTodo, setudpatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  //EVENT HANDLERS
  function handleCheckClick() {
    const updateTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  function handleDelete() {
    setshowDelete(true);
  }

  function handleUpdateClose() {
    setshowUpdate(false);
  }

  function handleDeleteClose() {
    setshowDelete(false);
  }
  function handleDeleteConfirm() {
    const updateTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: udpatedTodo.title, details: udpatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setshowUpdate(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleUdateClick() {
    setshowUpdate(true);
  }

  return (
    <>
      {/*delete modal*/}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteClose}
        open={showDelete}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"هل متاكد من حذف المهمة"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            لا يمكنك التراجع من الحذف بعد اتماته
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm}>نعم ,قم بالحذف</Button>
        </DialogActions>
      </Dialog>
      {/*delete modal */}

      {/*update modal*/}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdate}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="عنوان المهمة"
              fullWidth
              variant="standard"
              value={udpatedTodo.title}
              onChange={(e) => {
                setudpatedTodo({ ...udpatedTodo, title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label=" التفاصيل"
              fullWidth
              variant="standard"
              value={udpatedTodo.details}
              onChange={(e) => {
                setudpatedTodo({ ...udpatedTodo, details: e.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm}>تأكيد</Button>
        </DialogActions>
      </Dialog>
      {/*update modal */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: " #b2cccc",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/*CHEKED ICON */}

              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButtona"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>

              {/*CHEKED ICON */}

              <IconButton
                className="iconButtona"
                aria-label="delete"
                onClick={handleUdateClick}
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/*delete button*/}
              <IconButton
                aria-label="delete"
                className="iconButtona"
                style={{
                  color: "red",
                  background: "white",
                  border: "solid red 3px",
                }}
                onClick={handleDelete}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
