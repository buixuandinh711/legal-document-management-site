import { Send } from "@mui/icons-material";
import {
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  MenuItem,
  ListSubheader,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useAppSelector } from "src/context/store";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateDraftTaskMutation, useDivisionDraftersQuery } from "src/context/slices/apiSlice";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";
import { getDisplayName } from "src/utils/utils";
import { useDispatch } from "react-redux";
import { openSnackbar } from "src/context/slices/snackbarSlide";
import { createSearchParams, useNavigate } from "react-router-dom";

interface CreateTaskFromValues {
  taskName: string;
  drafter: string;
}

const validationSchema = yup.object({
  taskName: yup.string().required("Task name is required"),
  drafter: yup.string().required("Drafter is required"),
});

export default function CreateDraftingTask() {
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const divisionDraftersQuery = useDivisionDraftersQuery(
    {
      divisionOnchainId,
      positionIndex,
    },
    { skip: divisionOnchainId === "" }
  );
  const [createDraftTask] = useCreateDraftTaskMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taskName: "",
      drafter: "",
    } as CreateTaskFromValues,
    validationSchema: validationSchema,
    onSubmit: async (
      values: CreateTaskFromValues,
      { setSubmitting }: FormikHelpers<CreateTaskFromValues>
    ) => {
      setSubmitting(false);
      const [drafterAddress, rawPositionIndex] = values.drafter.split("/");
      const drafterPositionIndex = parseInt(rawPositionIndex);

      try {
        const createdTaskId = await createDraftTask({
          divisionOnchainId,
          positionIndex,
          taskName: values.taskName,
          drafterAddress,
          drafterPositionIndex,
        }).unwrap();
        dispatch(openSnackbar({ type: "success", message: "Draft created" }));
        navigate({
          pathname: "/assign-drafting",
          search: createSearchParams({
            new: createdTaskId,
          }).toString(),
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (divisionDraftersQuery.isLoading) {
    return <ContentLoading />;
  }

  if (divisionDraftersQuery.isSuccess) {
    const divisionDrafters = divisionDraftersQuery.data;

    return (
      <>
        <Paper
          sx={{
            width: "100%",
            pt: 2,
            pb: 4,
            px: 4,
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
              Create Drafting Task
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              variant="standard"
              sx={{ my: 2 }}
              required
              label="Task Name"
              id="taskName"
              name="taskName"
              autoComplete="taskName"
              value={formik.values.taskName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.taskName && Boolean(formik.errors.taskName)}
              helperText={formik.touched.taskName && formik.errors.taskName}
            />
            <FormControl
              fullWidth
              variant="standard"
              sx={{ my: 4 }}
              error={formik.touched.drafter && Boolean(formik.errors.drafter)}
            >
              <InputLabel id="select-drafter">Drafter</InputLabel>
              <Select
                labelId="select-drafter"
                id="drafter"
                name="drafter"
                variant="standard"
                autoComplete="drafter"
                value={formik.values.drafter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(selected) => getDisplayName(divisionDrafters, selected)}
              >
                {divisionDrafters.map((signer) => {
                  const items = [
                    <ListSubheader key={signer.signerAddress}>{signer.signerName}</ListSubheader>,
                  ];
                  items.push(
                    ...signer.positions.map((pos) => (
                      <MenuItem
                        key={`${signer.signerAddress}/${pos.positionIndex}`}
                        value={`${signer.signerAddress}/${pos.positionIndex}`}
                      >
                        {pos.positionName}
                      </MenuItem>
                    ))
                  );
                  return items;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button
              variant="outlined"
              sx={{ mr: 1, width: "120px" }}
              onClick={() => {
                //   navigate(-1);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              loading={false}
              type="submit"
              endIcon={<Send />}
              sx={{ width: "120px" }}
            >
              Create
            </LoadingButton>
          </Box>
        </Paper>
      </>
    );
  }

  return <ContentError />;
}