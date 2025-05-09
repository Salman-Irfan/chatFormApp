// src/components/pages/AllAssignedFormPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import { getAllFormsService } from "../../../services/apiServices/formServices";
import { useNavigate } from "react-router-dom";

const AllAssignedFormPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch forms on mount
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getAllFormsService();
        setForms(data.forms || []);
      } catch (err) {
        console.error("Failed to load forms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-full py-10">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-6 max-w-5xl mx-auto">
      <Typography variant="h6" fontWeight={600} mb={3}>
        All Assigned Forms
      </Typography>

      {forms.map((form) => (
        <Paper key={form._id} elevation={2} className="p-4 mb-4">
          <Typography variant="subtitle1" fontWeight={600}>
            {form.title}
          </Typography>

          <Stack direction="row" spacing={2} mt={1}>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Assigned Users:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {form.assignedUsers.map((user) => (
                  <Chip
                    key={user._id}
                    label={user.name}
                    size="small"
                    color="primary"
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight={500}>
                Assigned Companies:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {form.assignedCompanies.map((company) => (
                  <Chip
                    key={company._id}
                    label={company.name}
                    size="small"
                    color="secondary"
                  />
                ))}
              </Stack>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {form.sections.map((section, i) => (
            <Box key={i} mb={2}>
              <Typography fontWeight={600}>{section.title}</Typography>
              {section.subsections.map((sub, j) => (
                <Box key={j} ml={2} mt={1}>
                  <Typography variant="body2" fontWeight={500}>
                    {sub.title}
                  </Typography>
                  <ul className="list-disc ml-6">
                    {sub.tasks.map((task, k) => (
                      <li key={k}>
                        {task.title} — <strong>{task.answerType}</strong>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
              {/* dynamic navigation */}
              <Button
                variant="contained"
                onClick={() => navigate(`/task-node/submit-response/${form._id}`)}
              >
                Submit Response
              </Button>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default AllAssignedFormPage;
