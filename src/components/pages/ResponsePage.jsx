// src/components/pages/ResponsePage.jsx
import React, { useEffect, useState } from "react";
import { getAllFormResponsesService } from "../../../services/apiServices/formServices";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";

const ResponsePage = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResponses = async () => {
    try {
      const data = await getAllFormResponsesService();
      setResponses(data.responses || []);
    } catch (err) {
      console.error("Failed to fetch responses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  if (loading) {
    return (
      <Box className="p-6">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-6 max-w-5xl mx-auto">
      <Typography variant="h5" fontWeight={600} mb={4}>
        All Form Responses
      </Typography>

      {responses.length === 0 ? (
        <Typography>No responses submitted yet.</Typography>
      ) : (
        responses.map((item) => (
          <Card key={item._id} variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📝 {item.form.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                👤 {item.user.name} ({item.user.email}) — 🏢 {item.company.name}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {item.responses.map((r, idx) => (
                <Box key={idx} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">
                    {r.sectionTitle} / {r.subsectionTitle}
                  </Typography>
                  <Typography>
                    • <strong>{r.taskTitle}</strong>: {r.answer}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ResponsePage;
