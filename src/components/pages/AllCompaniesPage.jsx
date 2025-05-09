import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { getAllCompaniesService } from "../../../services/apiServices/companyServices";

const AllCompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const data = await getAllCompaniesService();
      setCompanies(data.companies);
    } catch (err) {
      console.error("Error fetching companies:", err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Box className="p-4 max-w-2xl mx-auto">
      <Typography variant="h6" fontWeight={600} mb={2}>
        All Companies
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3}>
          <List>
            {companies.map((company) => (
              <ListItem key={company._id} divider>
                <ListItemText
                  primary={company.name}
                  secondary={`Created at: ${new Date(
                    company.createdAt
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AllCompaniesPage;
