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
  { pattern: /^$/, name: "Trang chủ" },
  { pattern: /^\/reviewing-tasks$/, name: "Phê duyệt" },
  { pattern: /^\/reviewing-tasks\/[^/]+$/, name: "Chi tiết công việc" },
  { pattern: /^\/draft$/, name: "Bản thảo" },
  { pattern: /^\/draft\/create$/, name: "Tạo bản thảo" },
  { pattern: /^\/draft\/[^/]+$/, name: "Chi tiết bản thảo" },
  { pattern: /^\/published$/, name: "Đã ban hành" },
  { pattern: /^\/published\/[^/]+$/, name: "Chi tiết văn bản" },
  { pattern: /^\/assign-reviewing$/, name: "Quản lý phê duyệt" },
  { pattern: /^\/assign-reviewing\/create$/, name: "Tạo công việc" },
  { pattern: /^\/publish$/, name: "Ban hành" },
  { pattern: /^\/assign-drafting$/, name: "Quản lý soạn thảo" },
  { pattern: /^\/assign-drafting\/create$/, name: "Tạo công việc" },
  { pattern: /^\/drafting-tasks$/, name: "Soạn thảo" },
  { pattern: /^\/drafting-tasks\/[^/]+$/, name: "Chi tiết công việc" },
];

const getPathInfo = (path: string): string => {
  const foundResult = pathInfo.find((p) => path.match(p.pattern));
  if (foundResult === undefined) {
    return "Không xác định";
  }
  return foundResult.name;
};

export default function BasicBreadcrumbs() {
  const location = useLocation();
  let pathname = location.pathname;
  pathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const paths = extractPaths(pathname.split("/"));

  if (paths.length === 1) {
    return <></>;
  }

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
