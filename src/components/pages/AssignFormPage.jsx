// src/components/pages/AssignFormPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { getAllUsersService } from "../../../services/apiServices/userServices";
import { getAllCompaniesService } from "../../../services/apiServices/companyServices";
import { createFormService } from "../../../services/apiServices/formServices";

const AssignFormPage = () => {
  // Form-level states
  const [title, setTitle] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [assignedCompanies, setAssignedCompanies] = useState([]);

  // Dropdown options from API
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Dynamic form structure
  const [sections, setSections] = useState([]);

  // Snackbar notification state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch users and companies on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getAllUsersService();
        const companiesRes = await getAllCompaniesService();
        setUsers(usersRes.users);
        setCompanies(companiesRes.companies);
      } catch {
        setSnackbar({
          open: true,
          message: "Failed to fetch users/companies",
          severity: "error",
        });
      }
    };

    fetchData();
  }, []);

  // Add a new section to the form
  const addSection = () =>
    setSections([...sections, { title: "", subsections: [] }]);

  // Add a subsection under a specific section
  const addSubsection = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].subsections.push({ title: "", tasks: [] });
    setSections(newSections);
  };

  // Add a task under a specific subsection
  const addTask = (sectionIndex, subsectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].subsections[subsectionIndex].tasks.push({
      title: "",
      answerType: "TextField",
      options: [],
    });
    setSections(newSections);
  };

  // Update dynamic field value (section, subsection, or task)
  const updateField = (sectionIndex, subsectionIndex, taskIndex, field, value) => {
    const newSections = [...sections];
    if (taskIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex].tasks[taskIndex][field] = value;
    } else if (subsectionIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex][field] = value;
    } else {
      newSections[sectionIndex][field] = value;
    }
    setSections(newSections);
  };

  // Submit the form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, sections, assignedUsers, assignedCompanies };
      const data = await createFormService(payload);

      setSnackbar({ open: true, message: data.message, severity: "success" });

      // Reset all fields after successful submission
      setTitle("");
      setSections([]);
      setAssignedUsers([]);
      setAssignedCompanies([]);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Form creation failed",
        severity: "error",
      });
    }
  };

  return (
    <Box className="p-6 max-w-4xl mx-auto">
      {/* Page Heading */}
      <Typography variant="h6" fontWeight={600} mb={3}>
        Assign Form
      </Typography>

      {/* Form Wrapper */}
      <form onSubmit={handleSubmit}>
        {/* Form Title */}
        <TextField
          fullWidth
          label="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Users Dropdown */}
        <TextField
          select
          label="Assign Users"
          fullWidth
          SelectProps={{ multiple: true }}
          value={assignedUsers}
          onChange={(e) => setAssignedUsers(e.target.value)}
          sx={{ mb: 2 }}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name} ({user.email})
            </MenuItem>
          ))}
        </TextField>

        {/* Companies Dropdown */}
        <TextField
          select
          label="Assign Companies"
          fullWidth
          SelectProps={{ multiple: true }}
          value={assignedCompanies}
          onChange={(e) => setAssignedCompanies(e.target.value)}
          sx={{ mb: 3 }}
        >
          {companies.map((company) => (
            <MenuItem key={company._id} value={company._id}>
              {company.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Dynamic Sections */}
        {sections.map((section, sIdx) => (
          <Box key={sIdx} mb={4} p={2} border="1px solid #ccc" borderRadius={2}>
            {/* Section Title */}
            <TextField
              fullWidth
              label="Section Title"
              value={section.title}
              onChange={(e) => updateField(sIdx, null, null, "title", e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Add Subsection Button */}
            <Button onClick={() => addSubsection(sIdx)} size="small">
              ➕ Add Subsection
            </Button>

            {/* Subsections and Tasks */}
            {section.subsections.map((sub, subIdx) => (
              <Box key={subIdx} mt={2} pl={2}>
                {/* Subsection Title */}
                <TextField
                  fullWidth
                  label="Subsection Title"
                  value={sub.title}
                  onChange={(e) =>
                    updateField(sIdx, subIdx, null, "title", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />

                {/* Add Task Button */}
                <Button onClick={() => addTask(sIdx, subIdx)} size="small">
                  ➕ Add Task
                </Button>

                {/* Tasks */}
                {sub.tasks.map((task, taskIdx) => (
                  <Stack key={taskIdx} spacing={2} direction="row" mt={1}>
                    {/* Task Title */}
                    <TextField
                      label="Task Title"
                      value={task.title}
                      onChange={(e) =>
                        updateField(sIdx, subIdx, taskIdx, "title", e.target.value)
                      }
                      fullWidth
                    />

                    {/* Answer Type Dropdown */}
                    <TextField
                      select
                      label="Answer Type"
                      value={task.answerType}
                      onChange={(e) =>
                        updateField(sIdx, subIdx, taskIdx, "answerType", e.target.value)
                      }
                      sx={{ width: 150 }}
                    >
                      <MenuItem value="TextField">TextField</MenuItem>
                      <MenuItem value="Dropdown">Dropdown</MenuItem>
                    </TextField>

                    {/* Dropdown Options Input */}
                    {task.answerType === "Dropdown" && (
                      <TextField
                        label="Options (comma-separated)"
                        value={task.options?.join(",") || ""}
                        onChange={(e) =>
                          updateField(
                            sIdx,
                            subIdx,
                            taskIdx,
                            "options",
                            e.target.value.split(",").map((o) => o.trim())
                          )
                        }
                        fullWidth
                      />
                    )}
                  </Stack>
                ))}
              </Box>
            ))}
          </Box>
        ))}

        {/* Final Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
          <Button onClick={addSection} variant="outlined">
            ➕ Add Section
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ background: "linear-gradient(to right, #2196f3, #9c27b0)" }}
          >
            Create Form
          </Button>
        </Stack>
      </form>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignFormPage;
