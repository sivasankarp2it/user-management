import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Chip,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  setFilter,
  setStatus,
} from "../store/slices/tasksSlice";
import useForm from "../hooks/useForm";

export default function Todos() {
  const dispatch = useDispatch();
  const { values, handleChange, reset, setValues } = useForm({
    title: "",
    status: "all",
  });

  const [editingTask, setEditingTask] = useState<any>(null);
  const { items, filter } = useSelector((s: any) => s.tasks);
  const user = useSelector((s: any) => s.auth.user);
  const [search, setSearch] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const filtered = items
    .filter((t: any) => t.user === user?.username)
    .filter((t: any) => (filter === "all" ? true : t.status === filter))
    .filter((t: any) =>
      t.title.toLowerCase().includes(search.toLowerCase().trim())
    );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim() || !user) {
      setSnack({
        open: true,
        message: "Please enter a task title.",
        severity: "warning",
      });
      return;
    }

    dispatch(addTask(user.username, values.title));
    reset();
    setSnack({
      open: true,
      message: "Task created successfully!",
      severity: "success",
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
      setSnack({ open: true, message: "Task deleted.", severity: "info" });
    }
  };

  const handleEditSave = () => {
    if (!editingTask.title.trim()) {
      setSnack({
        open: true,
        message: "Task title cannot be empty.",
        severity: "warning",
      });
      return;
    }

    dispatch(editTask({ id: editingTask.id, title: editingTask.title }));
    dispatch(setStatus({ id: editingTask.id, status: editingTask.status }));
    setEditingTask(null);
    setSnack({
      open: true,
      message: "Task updated successfully!",
      severity: "success",
    });
  };

  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  return (
    <Paper sx={{ maxWidth: 700, m: "30px auto", p: 3 }}>
      <Typography variant="h5" mb={2} fontWeight="600">
        My Tasks
      </Typography>

      {/* --- CREATE SECTION --- */}
      <Box
        component="form"
        onSubmit={handleAdd}
        noValidate
        display="flex"
        alignItems="center"
        gap={1}
      >
        <TextField
          size="small"
          label="Task Name"
          name="title"
          fullWidth
          value={values.title}
          onChange={handleChange}
        />
        <Select
          name="status"
          value={values.status}
          onChange={(e) =>
            handleChange({
                target: { name: "status", value: e.target.value },
            } as any)
          }
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </Box>

      {/* --- FILTER + SEARCH SECTION --- */}
      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <TextField
          select
          label="Filter by Status"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <TextField
          label="Search Tasks"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* --- TASK LIST --- */}
      <List sx={{ mt: 2 }}>
        {filtered.map((t: any) => (
          <ListItem
            key={t.id}
            sx={{
              border: "1px solid #eee",
              borderRadius: 2,
              mb: 1,
              boxShadow: 1,
            }}
          >
            <ListItemText
              primary={t.title}
              secondary={`Status: ${t.status}`}
              sx={{
                textDecoration:
                  t.status === "completed" ? "line-through" : "none",
              }}
            />
            <Chip
                label={t.status === "inprogress" ? "In Progress" : t.status}
                color={
                t.status === "completed"
                    ? "success"
                    : t.status === "inprogress"
                    ? "warning"
                    : "default"
                }
                size="small"
                sx={{ mt: 0.5 }}
            />
            {/* <Select
              value={t.status}
              size="small"
              onChange={(e) =>
                dispatch(setStatus({ id: t.id, status: e.target.value }))
              }
              sx={{ ml: 2, minWidth: 120 }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="inprogress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select> */}
              <>
                <IconButton edge="end" onClick={() => setEditingTask(t)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(t.id)}>
                  <Delete />
                </IconButton>
              </>
            </ListItem>
        ))}
      </List>

      {!filtered.length && (
        <Typography align="center" color="text.secondary" mt={3}>
          No tasks found.
        </Typography>
      )}

      {/* --- EDIT DIALOG --- */}
      <Dialog
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
           size="small"
            label="Task Name"
            value={editingTask?.title || ""}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
            fullWidth
          />
          <Select
            size="small"
            value={editingTask?.status || ""}
            onChange={(e) =>
              setEditingTask({ ...editingTask, status: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingTask(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- SNACKBAR --- */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity as any}>{snack.message}</Alert>
      </Snackbar>
    </Paper>
  );
}