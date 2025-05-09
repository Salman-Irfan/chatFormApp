import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { getAllCompaniesService } from "../../../services/apiServices/companyServices";
import { createUserService } from "../../../services/apiServices/userServices";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyIds, setCompanyIds] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchCompanies = async () => {
    try {
      const data = await getAllCompaniesService();
      setCompanies(data.companies);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to fetch companies",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, companyIds };
      const data = await createUserService(payload);
      setSnackbar({ open: true, message: data.message, severity: "success" });
      setName("");
      setEmail("");
      setCompanyIds([]);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "User creation failed",
        severity: "error",
      });
    }
  };

  return (
    <Box className="p-4 max-w-xl mx-auto">
      <Typography variant="h6" fontWeight={600} mb={2}>
        Add User
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Assign Companies"
          value={companyIds}
          onChange={(e) => setCompanyIds(e.target.value)}
          select
          SelectProps={{ multiple: true }}
          fullWidth
          required
          sx={{ mb: 3 }}
        >
          {companies.map((company) => (
            <MenuItem key={company._id} value={company._id}>
              {company.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          sx={{ background: "linear-gradient(to right, #2196f3, #9c27b0)" }}
        >
          Create User
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddUserPage;
