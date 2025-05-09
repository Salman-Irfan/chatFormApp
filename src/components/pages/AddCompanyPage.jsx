import React, { useState } from "react";
import { createCompanyService } from "../../../services/apiServices/companyServices";
import {
  Snackbar,
  Alert,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const AddCompanyPage = () => {
  const [name, setName] = useState("");

  const [toast, setToast] = useState({
    open: false,
    severity: "success", // 'error' or 'success'
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createCompanyService({ name });
      setToast({ open: true, severity: "success", message: data.message });
      setName("");
    } catch (err) {
      setToast({
        open: true,
        severity: "error",
        message: err.response?.data?.error || "Something went wrong",
      });
    }
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box className="p-4 max-w-md mx-auto">
      <Typography variant="h6" fontWeight={600} mb={2}>
        Add Company
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ background: "linear-gradient(to right, #3b82f6, #9333ea)" }}
        >
          Add Company
        </Button>
      </form>

      {/* MUI Snackbar for Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCompanyPage;
