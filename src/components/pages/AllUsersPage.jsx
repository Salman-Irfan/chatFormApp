import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";
import { getAllUsersService } from "../../../services/apiServices/userServices";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsersService();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-4 max-w-3xl mx-auto">
      <Typography variant="h5" className="mb-4 font-semibold">
        All Users
      </Typography>

      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        users.map((user) => (
          <Paper key={user._id} className="p-4 mb-3" elevation={2}>
            <Typography>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Companies:</strong>{" "}
              {user.companies?.map((c) => c.name).join(", ")}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default AllUsersPage;
