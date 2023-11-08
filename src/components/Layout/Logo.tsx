import { TextSnippet } from "@mui/icons-material";
import { Typography } from "@mui/material";
import MergedLink from "src/components/MergedLink";

export default function Logo() {
  return (
    <MergedLink
      sx={{ display: "flex", alignItems: "center", cursor: "pointer", textDecoration: "none" }}
      href="/"
    >
      <Typography
        variant="h1"
        color={"#1976d2"}
        sx={{ fontFamily: "Homenaje, sans-serif", fontSize: "2.5rem" }}
      >
        Legal
      </Typography>
      <Typography
        variant="h1"
        color={"black"}
        sx={{ fontFamily: "Homenaje, sans-serif", fontSize: "2.5rem" }}
      >
        Docs
      </Typography>
      <TextSnippet sx={{ fontSize: "2.5rem", color: "#1976d2" }} />
    </MergedLink>
  );
}
