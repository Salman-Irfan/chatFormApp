// src/components/pages/SubmitFormPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllFormsService, submitFormResponseService } from "../../../services/apiServices/formServices";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

const SubmitFormPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [userId, setUserId] = useState(""); // Can be prefilled based on auth
  const [companyId, setCompanyId] = useState(""); // Same here
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchForm = async () => {
      const data = await getAllFormsService();
      const matched = data.forms.find((f) => f._id === formId);
      setForm(matched);

      const generatedResponses = [];
      matched?.sections?.forEach((section) =>
        section.subsections?.forEach((subsection) =>
          subsection.tasks?.forEach((task) => {
            generatedResponses.push({
              sectionTitle: section.title,
              subsectionTitle: subsection.title,
              taskTitle: task.title,
              answer: "",
            });
          })
        )
      );
      setResponses(generatedResponses);
    };

    fetchForm();
  }, [formId]);

  const handleAnswerChange = (index, value) => {
    const updated = [...responses];
    updated[index].answer = value;
    setResponses(updated);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        formId,
        userId,
        companyId,
        responses,
      };
      const res = await submitFormResponseService(payload);
      setSnackbar({ open: true, message: res.message, severity: "success" });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Submission failed",
        severity: "error",
      });
    }
  };

  if (!form) return <Typography>Loading form...</Typography>;

  return (
    <Box className="p-6 max-w-3xl mx-auto">
      <Typography variant="h6" mb={2}>{form.title}</Typography>

      <TextField
        fullWidth
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        sx={{ mb: 3 }}
      />

      {responses.map((resp, idx) => (
        <Box key={idx} mb={2}>
          <Typography fontWeight={600}>
            {resp.sectionTitle} / {resp.subsectionTitle} / {resp.taskTitle}
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your answer"
            value={resp.answer}
            onChange={(e) => handleAnswerChange(idx, e.target.value)}
          />
        </Box>
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        Submit Response
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubmitFormPage;
