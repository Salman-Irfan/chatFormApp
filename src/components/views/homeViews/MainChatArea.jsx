import React from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// Dummy message data used for rendering chat bubbles
const messages = [
  { text: "Hello, how are you available for meeting", time: "9:30AM", sent: false },
  { text: "Hello, how are you available for meeting", time: "9:31AM", sent: true },
  { text: "Hello, how are you available for meeting", time: "9:32AM", sent: true },
  { text: "Hello, how are you available for meeting", time: "9:33AM", sent: true },
  { text: "Hello, how are you available for meeting", time: "9:34AM", sent: false },
  { text: "Hello, how are you available for meeting", time: "9:35AM", sent: true },
  { text: "Hello, how are you available for meeting", time: "9:36AM", sent: false },
];

const MainChatArea = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        height: "calc(100vh - 72px)", // Full height minus header
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Chat Bubble Container */}
      <Box sx={{ px: 3, py: 1, flex: 1, overflowY: "auto" }}>
        {/* Timestamp Label */}
        <Typography
          variant="caption"
          align="center"
          display="block"
          color="text.secondary"
          mb={2}
        >
          Today 12:34 PM
        </Typography>

        {/* Message List */}
        <Stack spacing={1}>
          {messages.map((msg, i) => {
            const isSent = msg.sent;
            const prev = messages[i - 1]?.sent;
            const next = messages[i + 1]?.sent;

            // Determine message bubble shape based on adjacent messages
            let borderTopRightRadius = 50;
            let borderBottomRightRadius = 50;

            if (isSent) {
              const isFirst = !prev;
              const isLast = !next;

              if (isFirst && isLast) {
                borderTopRightRadius = 100;
                borderBottomRightRadius = 0;
              } else if (isFirst && !isLast) {
                borderTopRightRadius = 100;
                borderBottomRightRadius = 0;
              } else if (!isFirst && !isLast) {
                borderTopRightRadius = 0;
                borderBottomRightRadius = 0;
              } else if (!isFirst && isLast) {
                borderTopRightRadius = 0;
                borderBottomRightRadius = 100;
              }
            }

            return (
              <Stack
                key={i}
                direction="row"
                justifyContent={isSent ? "flex-end" : "flex-start"}
                alignItems="flex-end"
                spacing={0.5}
              >
                {/* Message Bubble with absolute time overlay */}
                <Box
                  sx={{
                    maxWidth: "40%",
                    background: isSent
                      ? `linear-gradient(0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : "#F0F0F0",
                    color: isSent ? "#fff" : "#000",
                    px: 5,
                    py: 1.5,
                    borderRadius: 50,
                    borderTopLeftRadius: isSent ? 50 : 50,
                    borderTopRightRadius,
                    borderBottomRightRadius,
                    borderBottomLeftRadius: isSent ? 50 : 50,
                    position: "relative",
                  }}
                >
                  {/* Message Text */}
                  <Typography sx={{ fontSize: 14, lineHeight: 1.5, pr: 5 }}>
                    {msg.text}
                  </Typography>

                  {/* Timestamp at Bottom Right of Bubble */}
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      right: 40,
                      bottom: 8,
                      fontSize: "11px",
                      color: isSent ? "#e0e0e0" : "#888",
                    }}
                  >
                    {msg.time}
                  </Typography>
                </Box>

                {/* Optional Blue Tick Outside Bubble */}
                {isSent && (
                  <DoneAllIcon
                    sx={{
                      fontSize: 16,
                      color: "#1D9BF0", // Blue tone as seen in Figma
                      mb: "3px", // Align with message timestamp
                    }}
                  />
                )}
              </Stack>
            );
          })}
        </Stack>
      </Box>

      {/* Message Input Bar */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* Left Icons: Attachment and Calendar */}
        <Stack direction="row" spacing={1.5} alignItems="center" mr={2}>
          <AttachFileIcon sx={{ color: "#999", fontSize: 22 }} />
          <Box sx={{ position: "relative", width: 24, height: 24 }}>
            <CalendarMonthIcon sx={{ fontSize: 22, color: "#999" }} />
            <AccessTimeIcon
              sx={{
                position: "absolute",
                bottom: -1,
                right: -3,
                fontSize: 14,
                color: "#999",
                backgroundColor: "#fff",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Stack>

        {/* Middle Input Text Box */}
        <Box
          sx={{
            backgroundColor: "#F7F7F7",
            borderRadius: "25px",
            flex: 1,
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1.2,
          }}
        >
          <TextField
            variant="standard"
            placeholder="Type Message here"
            fullWidth
            InputProps={{ disableUnderline: true }}
            sx={{ fontSize: 14, mr: 1 }}
          />
          <EmojiEmotionsIcon sx={{ color: "#999", mr: 1, fontSize: 22 }} />
          <MicIcon sx={{ color: "#999", fontSize: 22 }} />
        </Box>

        {/* Right Send Button */}
        <IconButton
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "#fff",
            width: 42,
            height: 42,
            borderRadius: "50%",
            ml: 2,
            "&:hover": { opacity: 0.9 },
          }}
        >
          <SendIcon sx={{ transform: "rotate(-45deg)", fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MainChatArea;
