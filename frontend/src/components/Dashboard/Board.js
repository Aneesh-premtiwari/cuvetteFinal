import {
  IconButton,
  Box,
  Typography,
  Grid,
  Checkbox,
  Modal,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TaskCard = ({ priority, title, list, dueDate, changeStatus, row }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const tt = [];
  list.forEach((v, i) => tt.push(v.value));
  const [checkedItems, setCheckedItems] = useState([...tt]);

  const [checked, setChecked] = useState(-1);

  return (
    <div className="card" style={{ margin: "16px" }}>
      <div className="card-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {priority == "medium" && (
            <button
              style={{
                backgroundColor: "#1857de",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                margin: "1px",
                fontSize: "0.6rem",
              }}
            >
              medium priority
            </button>
          )}
          {priority == "low" && (
            <button
              style={{
                backgroundColor: "#18de1c",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                margin: "1px",
                fontSize: "0.6rem",
              }}
            >
              low priority
            </button>
          )}
          {priority == "high" && (
            <button
              style={{
                backgroundColor: "#de1829",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                margin: "1px",
                fontSize: "0.6rem",
              }}
            >
              high priority
            </button>
          )}
          <button>...</button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>{title}</h5>
          <button onClick={handleExpandClick}>
            {expanded ? <span>- </span> : <span>+ </span>}
          </button>
        </div>
        <div style={{ fontSize: "0.8rem" }}>Checklist</div>
        <div
          style={{
            display: expanded ? "block" : "none",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            marginTop: "8px",
          }}
        >
          {checkedItems.map((v, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px",
                marginBottom: "4px",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={i == checked}
                  onChange={() => setChecked(i)}
                />
                {v}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div
        className="card-actions"
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "4px 8px",
              borderRadius: "4px",
              marginRight: "8px",
              fontSize: "0.7rem",
            }}
          >
            Due Date:
          </span>
          <span
           style={{
            backgroundColor: "red",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.7rem",
          }}
        >
          {format(dueDate, "dd MMM yyyy")}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "5px",
          marginRight: "10px",
        }}
      >
        {row.status != "inprogress" && (
          <button
            style={{
              backgroundColor: "#decdcc",
              color: "black",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.5rem",
              margin: "1px",
            }}
            onClick={() => changeStatus("inprogress", row)}
          >
            InProgress
          </button>
        )}

        {row.status != "todo" && (
          <button
            // variant=""
            onClick={() => changeStatus("todo", row)}
            style={{
              backgroundColor: "#decdcc",
              color: "black",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.5rem",
              margin: "1px",
            }}
          >
            To do
          </button>
        )}
        {row.status != "done" && (
          <button
            onClick={() => changeStatus("done", row)}
            style={{
              backgroundColor: "#decdcc",
              color: "black",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.5rem",
              margin: "1px",
            }}
          >
            Done
          </button>
        )}
        {row.status != "backlog" && (
          <button
            // variant="body1"
            onClick={() => changeStatus("backlog", row)}
            style={{
              backgroundColor: "#decdcc",
              color: "black",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.5rem",
              margin: "1px",
            }}
          >
            backlog
          </button>
        )}
      </div>
    </div>
  </div>
);
};

const Board = () => {
const navigate = useNavigate();
const sections = ["Backlog", "To-Do", "In-Progress", "Done"];
const currentDate = new Date();
const formattedDate = format(currentDate, "do MMMM yyyy");
const [open, setOpen] = useState(false);
const [newTask, setNewTask] = useState("");
const [priority, setPriority] = useState("");
const [assignee, setAssignee] = useState("");
const [dueDate, setDueDate] = useState(currentDate);
const [currDueDate, setCurrDueDate] = useState(new Date());
const [emailOptions, setEmailOptions] = useState([]);

const [checklist, setChecklist] = useState([
  { id: 1, value: "", checked: false },
]);

const [todo, setTodo] = useState([]);
const [inpro, setInpro] = useState([]);
const [done, setDone] = useState([]);
const [back, setBack] = useState([]);

const getAssignee = async () => {
  try {
    const data = await axios.get("http://localhost:5000/api/users", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const t = [];
    const pp = data.data;
    pp.map((v, i) => t.push(v.email));
    setEmailOptions(t);
  } catch {
    console.log("got error while getting assignee");
  }
};

const getApiData = async () => {
  try {
    const p = await axios.get("http://localhost:5000/api/", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const dddd = p.data;
    const t = [];
    const ii = [];
    const d = [];
    const b = [];
    dddd.forEach((v, i) => {
      if (v.status == "todo") t.push(v);
        if (v.status == "done") d.push(v);
        if (v.status == "inprogress") ii.push(v);
        if (v.status == "backlog") b.push(v);
      });
      setTodo(t);
      setBack(b);
      setDone(d);
      setInpro(ii);
    } catch {
      console.log("got an error");
    }
  };
  const changeStatus = async (newstatus, row) => {
    console.log("prio", row);
    try {
      const data = axios.put(
        "http://localhost:5000/api/" + row._id,
        {
          newTask: row.newTask,
          priority: row.priority,
          assignee: row.assignee,
          assigner: row.assigner,
          checklist: row.checklist,
          currDueDate: row.currDueDate,
          status: newstatus,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      getApiData();
    } catch {
      console.log("error while changing status");
    }
  };

  useEffect(() => {
    getApiData();
    getAssignee();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleAssigneeChange = (event, newValue) => {
    setAssignee(newValue);
  };

  const handleChecklistChange = (id, value) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleChecklistCheck = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddChecklistItem = () => {
    const newItem = { id: checklist.length + 1, value: "", checked: false };
    setChecklist([...checklist, newItem]);
  };

  const handleDeleteChecklistItem = (id) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const handleAddTask = async () => {
    try {
      const data = axios.post(
        "http://localhost:5000/api",
        {
          newTask: newTask,
          priority: priority,
          assignee: assignee,
          assigner: localStorage.getItem("email"),
          status: "todo",
          checklist: checklist,
          currDueDate: currDueDate,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      getApiData();
    } catch {
      console.log("got error while adding");
    }
    handleClose();
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {" "}
        <h2>Welcome {localStorage.getItem("name")}</h2>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6">{formattedDate}</Typography>
        </Box>
      </Box>
      <Typography variant="h4" gutterBottom>
        Board
      </Typography>
      <Grid container spacing={2}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={3} key={section}>
            <Box
              sx={{
                backgroundColor: "#c7bfbf",
                padding: "100px",
                borderRadius: "3px",
                position: "relative",
                height: "100%",
              }}
            >
              <h4 style={{position:"absolute", top:"2%", left:"40%"}}>{section}</h4>

              {section === "To-Do" && (
                <IconButton
                  sx={{ position: "absolute", top: "16px", right: "16px" }}
                  onClick={handleOpen}
                >
                  +
                </IconButton>
              )}

              {section == "Backlog" &&
                back.map((v, i) => (
                  <TaskCard
                    priority={v.priority}
                    title={v.newTask}
                    list={v.checklist}
                    dueDate={v.currDueDate}
                    changeStatus={changeStatus}
                    row={v}
                  />
                ))}
              {section == "To-Do" &&
                todo.map((v, i) => (
                  <TaskCard
                    priority={v.priority}
                    title={v.newTask}
                    list={v.checklist}
                    dueDate={v.currDueDate}
                    changeStatus={changeStatus}
                    row={v}
                  />
                ))}
              {section == "In-Progress" &&
                inpro.map((v, i) => (
                  <TaskCard
                    priority={v.priority}
                    title={v.newTask}
                    list={v.checklist}
                    dueDate={v.currDueDate}
                    changeStatus={changeStatus}
                    row={v}
                  />
                ))}
              {section == "Done" &&
                done.map((v, i) => (
                  <TaskCard
                    priority={v.priority}
                    title={v.newTask}
                    list={v.checklist}
                    dueDate={v.currDueDate}
                    changeStatus={changeStatus}
                    row={v}
                  />
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-task-modal"
        aria-describedby="add-task-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography
            id="add-task-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Add New Task
          </Typography>
          <TextField
            label="Title"
            placeholder="Enter Task Title"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={handleTaskChange}
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button
              variant={priority === "high" ? "contained" : "outlined"}
              color="error"
              onClick={() => handlePriorityChange("high")}
              sx={{ flexGrow: 1, marginRight: "4px" }}
            >
              High
            </Button>
            <Button
              variant={priority === "moderate" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handlePriorityChange("moderate")}
              sx={{ flexGrow: 1, marginRight: "4px", marginLeft: "4px" }}
            >
              Moderate
            </Button>
            <Button
              variant={priority === "low" ? "contained" : "outlined"}
              color="success"
              onClick={() => handlePriorityChange("low")}
              sx={{ flexGrow: 1, marginLeft: "4px" }}
            >
              Low
            </Button>
          </Box>
          <Autocomplete
            options={emailOptions}
            value={assignee}
            onChange={handleAssigneeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign To"
                placeholder="Assignee"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body1" gutterBottom>
              Checklist
            </Typography>
            {checklist.map((item, index) => (
              <Box key={item.id} display="flex" alignItems="center" mb={1}>
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleChecklistCheck(item.id)}
                />
                <TextField
                  value={item.value}
                  onChange={(e) =>
                    handleChecklistChange(item.id, e.target.value)
                  }
                  placeholder="Checklist Item"
                  variant="outlined"
                  fullWidth
                  sx={{ marginRight: "8px" }}
                />
                <IconButton onClick={() => handleDeleteChecklistItem(item.id)}>
                  -
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddChecklistItem}
              sx={{ width: "100%", marginTop: "8px" }}
            >
              Add New
            </Button>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button for="date" variant="outlined">
              Due date
            </Button>
            <input
              type="date"
              id="currDueDate"
              name="currDueDate"
              onChange={(e) => setCurrDueDate(e.target.value)}
            />
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddTask}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Board;