import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  InputBase,
  Avatar,
  useTheme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallMadeIcon from "@mui/icons-material/CallMade";

// Mocked contacts list with type-based call status
const contacts = [
  { name: "Kim Williamson", time: "2:34PM", type: "missed" },
  { name: "Shane Watson", time: "2:34PM", type: "outgoing" },
  { name: "Hazellwood", time: "2:34PM", type: "incoming" },
  { name: "Zunaira Butt", time: "2:34PM", type: "incoming" },
  { name: "Kamran Masood", time: "2:34PM", type: "outgoing" },
];

const SidebarLeft = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 300,
        height: "calc(100vh - 72px)", // Matches full height minus fixed header
        backgroundColor: theme.palette.grey[100],
        p: 2,
        overflowY: "auto", // Allows independent scrolling
      }}
    >
      {/* Toggle Tabs (Messages / Calls) */}
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="text" sx={{ color: theme.palette.grey[300] }}>
          Messages
        </Button>
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: `linear-gradient(0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "#fff",
          }}
        >
          Calls
        </Button>
      </Stack>

      {/* Search Input Field */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          px: 2,
          py: 0.5,
          borderRadius: "25px",
          boxShadow: theme.shadows[1],
        }}
      >
        <SearchIcon sx={{ color: theme.palette.grey[300], mr: 1 }} />
        <InputBase placeholder="Search" fullWidth />
      </Box>

      {/* Filter Buttons (All, Missed, Incoming) */}
      <Stack direction="row" spacing={1} mt={3} mb={2}>
        {["All", "Missed", "Incoming"].map((label) => {
          const isActive = label === "All";
          return (
            <Button
              key={label}
              variant="outlined"
              sx={{
                px: 2,
                py: 0.5,
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 20,
                border: isActive
                  ? `2px solid transparent`
                  : `1px solid ${theme.palette.grey[200]}`,
                background: isActive
                  ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                  : "transparent",
                color: isActive ? "#fff" : theme.palette.grey[300],
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>

      {/* List of Call Entries with Icons and Timestamps */}
      <Stack spacing={2}>
        {contacts.map((contact, i) => {
          // Select icon and color based on call type
          const Icon =
            contact.type === "missed"
              ? CallMissedIcon
              : contact.type === "incoming"
              ? CallReceivedIcon
              : CallMadeIcon;

          const iconColor =
            contact.type === "missed"
              ? "error.main"
              : contact.type === "incoming"
              ? "success.main"
              : "primary.main";

          return (
            <Box
              key={i}
              sx={{
                bgcolor: "#fff",
                borderRadius: 3,
                px: 2,
                py: 1,
                boxShadow: theme.shadows[1],
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Avatar and User Info */}
              <Stack direction="row" spacing={1}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: `linear-gradient(0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: "#fff",
                  }}
                >
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    {contact.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Icon sx={{ color: iconColor, fontSize: 18 }} />
                    <Typography variant="caption" color="text.secondary">
                      {contact.type}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              {/* Call Timestamp */}
              <Typography variant="caption" color="text.secondary">
                {contact.time}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SidebarLeft;
