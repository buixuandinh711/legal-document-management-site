import Typography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import MergedLink from "src/components/MergedLink";

const extractPaths = (arr: string[]): string[] => {
  const res = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    res.push(`${res[res.length - 1]}/${arr[i]}`);
  }
  return res;
};

const pathInfo: { pattern: RegExp; name: string }[] = [
  { pattern: /^$/, name: "Home" },
  { pattern: /^\/review-tasks$/, name: "Review Task" },
  { pattern: /^\/review-tasks\/[^/]+$/, name: "Task Detail" },
  { pattern: /^\/draft$/, name: "Your Draft" },
  { pattern: /^\/draft\/create$/, name: "Create Draft" },
  { pattern: /^\/draft\/[^/]+$/, name: "Draft Detail" },
  { pattern: /^\/published$/, name: "Published Document" },
  { pattern: /^\/published\/[^/]+$/, name: "Document Detail" },
  { pattern: /^\/assign-reviewing$/, name: "Assign Reviewing" },
  { pattern: /^\/assign-reviewing\/create$/, name: "New Task" },
  { pattern: /^\/publish$/, name: "Publish Document" },
  { pattern: /^\/assign-drafting$/, name: "Assign Drafting" },
  { pattern: /^\/assign-drafting\/create$/, name: "New Task" },
  { pattern: /^\/drafting-tasks$/, name: "Drafting Task" },
  { pattern: /^\/drafting-tasks\/[^/]+$/, name: "Task Detail" },
];

const getPathInfo = (path: string): string => {
  const foundResult = pathInfo.find((p) => path.match(p.pattern));
  if (foundResult === undefined) {
    return "Undefined";
  }
  return foundResult.name;
};

export default function BasicBreadcrumbs() {
  const location = useLocation();
  let pathname = location.pathname;
  pathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const paths = extractPaths(pathname.split("/"));

  return (
    <Box sx={{ p: 3, mb: 4 }}>
      <MuiBreadcrumbs aria-label="breadcrumb" sx={{}}>
        {paths.slice(0, -1).map((path) => (
          <MergedLink key={path} underline="hover" color="inherit" href={path}>
            {getPathInfo(path)}
          </MergedLink>
        ))}

        <Typography color="text.primary">{getPathInfo(paths[paths.length - 1])}</Typography>
      </MuiBreadcrumbs>
      <Typography variant="h4" sx={{}} fontSize={30} fontWeight={600}>
        {getPathInfo(paths[paths.length - 1])}
      </Typography>
    </Box>
  );
}
