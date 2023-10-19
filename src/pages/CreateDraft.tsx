import { Send } from "@mui/icons-material"; // Import the Edit icon
import { Typography, Paper, Box, Button, InputLabel, TextField, MenuItem } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import InputFileUpload from "src/components/InputFileUpload";
import { useCreateDraftMutation, useUserQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import * as yup from "yup";

interface CreateTaskFromValues {
  draftName: string;
  documentNo: string;
  documentName: string;
  documentType: string;
  documentContent: File | null;
}

const validationSchema = yup.object({
  draftName: yup.string().required("Draft name is required"),
  documentNo: yup.string().required("Document no. is required"),
  documentName: yup.string().required("Docuemnt name is required"),
});

const legalDocumentTypes = [
  { id: 1, name: "Hiến pháp" },
  { id: 2, name: "Bộ luật" },
  { id: 3, name: "Luật" },
  { id: 4, name: "Nghị quyết" },
  { id: 5, name: "Pháp lệnh" },
  { id: 6, name: "Quyết định" },
  { id: 7, name: "Nghị định" },
  { id: 8, name: "Thông tư" },
  { id: 9, name: "Nghị quyết liên tịch" },
];

export default function CreateDraft() {
  const [createDraft] = useCreateDraftMutation();
  const position = useAppSelector((state) => state.position);

  const formik = useFormik({
    initialValues: {
      draftName: "",
      documentNo: "",
      documentName: "",
      documentType: "",
      documentContent: null,
    } as CreateTaskFromValues,
    validationSchema: validationSchema,
    onSubmit: async (
      values: CreateTaskFromValues,
      { setSubmitting }: FormikHelpers<CreateTaskFromValues>
    ) => {
      setSubmitting(false);
      try {
        if (values.documentContent === null) {
          return;
        }
        
        await createDraft({
          divisionId: position.divisionId,
          positionIndex: position.positionIndex,
          draftName: values.draftName,
          documentNo: values.documentNo,
          documentName: values.documentName,
          documentType: Number.parseInt(values.documentType),
          documentContent: values.documentContent,
        }).unwrap();
        console.log("Create draft successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

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
            Create Draft
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            variant="standard"
            sx={{ my: 2 }}
            required
            label="Draft Name"
            id="draftName"
            name="draftName"
            autoComplete="draftName"
            value={formik.values.draftName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.draftName && Boolean(formik.errors.draftName)}
            helperText={formik.touched.draftName && formik.errors.draftName}
          />
          <TextField
            fullWidth
            variant="standard"
            sx={{ my: 2 }}
            required
            label="Document No."
            id="documentNo"
            name="documentNo"
            autoComplete="documentNo"
            value={formik.values.documentNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.documentNo && Boolean(formik.errors.documentNo)}
            helperText={formik.touched.documentNo && formik.errors.documentNo}
          />
          <TextField
            fullWidth
            variant="standard"
            multiline
            maxRows={3}
            sx={{ my: 2 }}
            required
            label="Document Name"
            id="documentName"
            name="documentName"
            autoComplete="documentName"
            value={formik.values.documentName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.documentName && Boolean(formik.errors.documentName)}
            helperText={formik.touched.documentName && formik.errors.documentName}
          />
          <TextField
            fullWidth
            variant="standard"
            sx={{ my: 2 }}
            select
            required
            label="Document Type"
            id="documentType"
            name="documentType"
            autoComplete="documentType"
            value={formik.values.documentType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.documentType && Boolean(formik.errors.documentType)}
            helperText={formik.touched.documentType && formik.errors.documentType}
          >
            {legalDocumentTypes.map((type) => (
              <MenuItem key={type.id} value={`${type.id}`}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ my: 2 }}>
            <InputLabel sx={{ transform: "scale(0.75)", mb: 1 }}>Document Content</InputLabel>
            <InputFileUpload
              file={formik.values.documentContent}
              removeFile={() => {
                formik.setFieldValue("documentContent", null);
              }}
              onChange={(event) => {
                if (event.target.files !== null) {
                  const maxFileSizeInBytes = 10485760; // 1 MB
                  const file = event.target.files[0];

                  if (file.size > maxFileSizeInBytes) {
                    event.target.files = null;
                    return;
                  }

                  formik.setFieldValue("documentContent", event.target.files[0]);
                }
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button variant="outlined" sx={{ mr: 1, width: "120px" }}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" endIcon={<Send />} sx={{ width: "120px" }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  );
}