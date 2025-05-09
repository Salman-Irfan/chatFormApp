// Import necessary components and icons
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Header = () => {
  return (
    // AppBar serves as the header container
    <AppBar
      position="static"
      elevation={0}
      color="inherit"
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #E0E0E0",
        px: 2,
      }}
    >
      {/* Toolbar contains the header content */}
      <Toolbar
        disableGutters
        sx={{
          minHeight: 72,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* LEFT SECTION: Contains select dropdown and icons */}
        <Box
          sx={{
            width: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Select dropdown for numbers */}
            <Select
              defaultValue="All Numbers"
              variant="outlined"
              size="small"
              sx={{
                background: "linear-gradient(0deg, #7B5FFF 0%, #D88EFF 100%)",
                color: "#fff",
                borderRadius: "20px",
                height: 36,
                fontWeight: 500,
                fontSize: "14px",
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                ".MuiSelect-icon": {
                  color: "#fff",
                },
                ".MuiSelect-select": {
                  px: 2,
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <MenuItem value="All Numbers">All Numbers</MenuItem>
              <MenuItem value="Number 1">Number 1</MenuItem>
            </Select>

            {/* Message icon */}
            <IconButton>
              <MessageIcon sx={{ color: "#7F8C8D" }} />
            </IconButton>

            {/* Phone icon */}
            <IconButton>
              <PhoneIcon sx={{ color: "#7F8C8D" }} />
            </IconButton>
          </Stack>

          {/* Vertical divider */}
          <Box
            sx={{
              alignSelf: "stretch",
              width: "1px",
              backgroundColor: "#E0E0E0",
            }}
          />
        </Box>

        {/* CENTER SECTION: Contains user info and action icons */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* User information */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {/* User avatar */}
              <Avatar
                alt="Mishal Irfan"
                src="https://i.pravatar.cc/150?img=47"
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                {/* User name */}
                <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
                  Mishal Irfan
                </Typography>

                {/* Last seen info */}
                <Typography
                  variant="caption"
                  sx={{ color: "#999", fontSize: "12px" }}
                >
                  Last seen at 2:34PM
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Action icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Stack direction="row" spacing={1}>
              {/* Phone icon */}
              <IconButton>
                <PhoneIcon sx={{ color: "#7F8C8D" }} />
              </IconButton>

              {/* More options icon */}
              <IconButton>
                <MoreVertIcon sx={{ color: "#7F8C8D" }} />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* RIGHT SECTION: Contains settings and more options icons */}
        <Box
          sx={{
            width: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 2,
          }}
        >
          {/* Vertical divider */}
          <Box
            sx={{
              alignSelf: "stretch",
              width: "1px",
              backgroundColor: "#E0E0E0",
            }}
          />

          {/* Settings and more options icons */}
          <Stack direction="row" spacing={1.5}>
            <IconButton>
              <SettingsIcon sx={{ color: "#7F8C8D" }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon sx={{ color: "#7F8C8D" }} />
            </IconButton>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
