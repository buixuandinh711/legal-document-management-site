import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { OfficerPrivateKey, usePrivateKeyQuery } from "src/context/slices/apiSlice";
import { useAppDispatch, useAppSelector } from "src/context/store";
import { gcm } from "@noble/ciphers/aes";
import { hexToBytes, utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";
import { ethers } from "ethers";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import { openSnackbar } from "src/context/slices/snackbarSlide";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password should contain at least one letter and one digit"
    )
    .required("Password is required"),
});

const stepLabels = ["Sign Document", "Uploading", "Done"];

export default function PublishDialog({
  open,
  handleClose,
  submitTx,
}: {
  open: boolean;
  handleClose: (resetSelection: boolean) => void;
  submitTx: (privateKey: string) => Promise<boolean>;
}) {
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const privateKeyQuery = usePrivateKeyQuery(
    {
      divisionOnchainId,
      positionIndex,
    },
    {
      skip: divisionOnchainId === "",
    }
  );
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<0 | 1 | 3>(0);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      values: { password: string },
      { setSubmitting, setErrors }: FormikHelpers<{ password: string }>
    ) => {
      setSubmitting(false);
      try {
        if (!privateKeyQuery.isSuccess) {
          return;
        }
        const privateKey = extractPrivateKey(privateKeyQuery.data, values.password);
        if (privateKey === null) {
          setErrors({ password: "Invalid password" });
          throw new Error("Failed to decrypt private key");
        }
        setStep(1);
        const isSuccess = await submitTx(privateKey);
        if (!isSuccess) {
          throw new Error("Failed to submit tx");
        }
        setStep(3);
        dispatch(openSnackbar({ type: "success", message: "Transaction submitted" }));
      } catch (error: unknown) {
        dispatch(openSnackbar({ type: "error", message: (error as Error).message }));
        console.log(error);
      }
    },
  });

  const extractPrivateKey = (keyInfo: OfficerPrivateKey, password: string): string | null => {
    const bytesPassword = utf8ToBytes(password);
    const hashedPassword = ethers.keccak256(bytesPassword);

    const key = hexToBytes(hashedPassword.slice(2));
    const nonce = new Uint8Array(12).fill(42);
    const aes = gcm(key, nonce);

    const encryptedPk = hexToBytes(keyInfo.privateKey.slice(2));
    const decryptedPkBytes = aes.decrypt(encryptedPk);
    const decryptedPk = bytesToUtf8(decryptedPkBytes);

    const extractedAddress = ethers.computeAddress(decryptedPk).toLowerCase();
    if (extractedAddress !== keyInfo.onchainAddress) {
      return null;
    }

    return decryptedPk;
  };

  return (
    privateKeyQuery.isSuccess && (
      <Dialog
        open={open}
        PaperProps={{ sx: { borderRadius: 2, width: "30vw", py: 1 } }}
        onClose={() => handleClose(step >= 2)}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="document-list-dialog" sx={{ fontWeight: 600 }}>
            Enter Your Password
          </DialogTitle>
          <DialogContent>
            <Stepper activeStep={step} alternativeLabel sx={{ my: 4 }}>
              {stepLabels.map((label, idx) => (
                <Step key={idx}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              {(() => {
                if (step == 0) {
                  return (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  );
                }
                if (step == 1) {
                  return <CircularProgress />;
                }
                return <CheckCircle color="primary" sx={{ fontSize: "48px" }} />;
              })()}
            </Box>
          </DialogContent>
          <DialogActions>
            {step == 0 && (
              <Button variant="outlined" onClick={() => handleClose(false)}>
                Cancel
              </Button>
            )}
            {(step == 0 || step == 1) && (
              <LoadingButton type="submit" loading={step === 1} variant="contained" sx={{ mr: 2 }}>
                Confirm
              </LoadingButton>
            )}
            {step == 3 && (
              <Button
                type="submit"
                variant="contained"
                sx={{ mr: 2 }}
                onClick={() => handleClose(true)}
              >
                Close
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    )
  );
}
