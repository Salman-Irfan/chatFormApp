import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Stack,
  Divider,
  Collapse,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

// Utility triangle icons used in collapsible sections 
const TriangleDown = () => (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderTop: "6px solid white",
    }}
  />
);

const TriangleUp = () => (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderBottom: "6px solid white",
    }}
  />
);

// Dummy contact list to simulate address book 
const contacts = [
  { name: "Alina", number: "0923456784521" },
  { name: "Amna", number: "0923456784521" },
  { name: "Brown", number: "0923456784521" },
  { name: "Ben", number: "0923456784521" },
  { name: "Cutting", number: "0923456784521" },
  { name: "Carol", number: "0923456784521" },
];

// Group contacts alphabetically by first letter 
const groupContacts = (contacts) => {
  const grouped = {};
  contacts.forEach((contact) => {
    const initial = contact.name[0].toUpperCase();
    if (!grouped[initial]) grouped[initial] = [];
    grouped[initial].push(contact);
  });
  return grouped;
};

// Circle avatar with gradient border used for contacts 
const GradientAvatar = ({ initials }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        p: "2px",
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Avatar
        sx={{
          width: "100%",
          height: "100%",
          fontSize: 14,
          bgcolor: "#fff",
          color: theme.palette.primary.main,
        }}
      >
        {initials}
      </Avatar>
    </Box>
  );
};

const SidebarRight = () => {
  const theme = useTheme();
  const groupedContacts = groupContacts(contacts);

  // UI toggle states for collapsible sections
  const [showRecent, setShowRecent] = useState(true);
  const [showFavourites, setShowFavourites] = useState(true);

  return (
    <Box
      sx={{
        position: "relative", // needed for alphabet index absolute positioning
        width: 300,
        height: "calc(100vh - 72px)", // Full height minus fixed header
        borderLeft: "1px solid #E0E0E0",
        backgroundColor: "#fff",
        p: 2,
        overflowY: "auto",
      }}
    >
      {/* Header with Title and Add Contact Button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Contact
        </Typography>
        <IconButton
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "#fff",
            width: 32,
            height: 32,
            "&:hover": { opacity: 0.9 },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* Search Input Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          px: 2,
          py: 0.5,
          borderRadius: "25px",
          mb: 2,
        }}
      >
        <SearchIcon sx={{ color: "#999", mr: 1 }} />
        <InputBase placeholder="Search Contact" fullWidth />
      </Box>

      {/* Grouped Contact List (alphabetical) */}
      <Box mb={3}>
        {Object.keys(groupedContacts)
          .sort()
          .map((letter) => (
            <Box key={letter} mb={1}>
              <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
                {letter}
              </Typography>
              <Stack spacing={1}>
                {groupedContacts[letter].map((contact, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <GradientAvatar
                      initials={contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    />
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        {contact.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.grey[300], fontSize: 12 }}
                      >
                        {contact.number}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          ))}
      </Box>

      {/* Floating A-Z Alphabet Index on the Right */}
      <Box
        sx={{
          position: "absolute",
          top: 170,
          right: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          color: "#B0B0B0",
          fontSize: "10px", // fits full A–Z list before bottom
          userSelect: "none",
        }}
      >
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <Typography
            key={letter}
            variant="caption"
            sx={{
              mb: 0.2,
              lineHeight: 1,
              fontSize: "10px",
              cursor: "pointer",
              fontWeight: 500,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            {letter}
          </Typography>
        ))}
      </Box>

      {/* Recent Section (collapsible) */}
      <Box mt={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 1 }}
        >
          <Typography fontWeight={700}>Recent</Typography>
          <IconButton
            onClick={() => setShowRecent(!showRecent)}
            sx={{
              backgroundColor: "#666666",
              width: 30,
              height: 30,
              p: 0,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#555555",
              },
            }}
          >
            {showRecent ? <TriangleUp /> : <TriangleDown />}
          </IconButton>
        </Stack>
        <Collapse in={showRecent}>
          <Typography variant="body2" color="text.secondary">
            No recent activity
          </Typography>
        </Collapse>
      </Box>

      {/* Divider Line Between Sections */}
      <Divider sx={{ my: 2 }} />

      {/* Favourites Section (collapsible) */}
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 1 }}
        >
          <Typography fontWeight={700}>Favourites</Typography>
          <IconButton
            onClick={() => setShowFavourites(!showFavourites)}
            sx={{
              backgroundColor: "#666666",
              width: 30,
              height: 30,
              p: 0,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#555555",
              },
            }}
          >
            {showFavourites ? <TriangleUp /> : <TriangleDown />}
          </IconButton>
        </Stack>
        <Collapse in={showFavourites}>
          <Typography variant="body2" color="text.secondary">
            No favourites yet
          </Typography>
        </Collapse>
      </Box>
    </Box>
  );
};

export default SidebarRight;
