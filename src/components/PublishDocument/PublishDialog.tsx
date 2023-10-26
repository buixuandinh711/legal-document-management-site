import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { usePrivateKeyQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import { gcm } from "@noble/ciphers/aes";
import { hexToBytes, utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";
import { ethers } from "ethers";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import SubmitTx from "src/components/PublishDocument/SubmitTx";

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
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const workingPosition = useAppSelector((state) => state.position);
  const privateKeyQuery = usePrivateKeyQuery({
    divisionOnchainId: workingPosition.divisionOnchainId,
    positionIndex: workingPosition.positionIndex,
  });
  const [step, setStep] = useState(0);
  const [privateKey, setPrivateKey] = useState<undefined | string>(undefined);
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
        const keyInfo = privateKeyQuery.data!;

        const bytesPassword = utf8ToBytes(values.password);
        const hashedPassword = ethers.keccak256(bytesPassword);

        const key = hexToBytes(hashedPassword.slice(2));
        const nonce = new Uint8Array(12).fill(42);
        const aes = gcm(key, nonce);

        const encryptedPk = hexToBytes(keyInfo.privateKey.slice(2));
        const decryptedPkBytes = aes.decrypt(encryptedPk);
        const decryptedPk = bytesToUtf8(decryptedPkBytes);

        const address = ethers.computeAddress(decryptedPk).toLowerCase();
        if (address !== keyInfo.onchainAddress) throw new Error("Invalid password");
        setStep(1);
        setPrivateKey(decryptedPk);
      } catch (error) {
        setErrors({ password: "Invalid password" });
        console.log(error);
      }
    },
  });

  return (
    <Dialog
      open={open}
      PaperProps={{ sx: { borderRadius: 2, width: "30vw", py: 1 } }}
      onClose={handleClose}
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
              if (step == 1 && privateKey !== undefined) {
                return (
                  <SubmitTx
                    privateKey={privateKey}
                    handleSuccessTx={() => {
                      setStep(3);
                      // setPrivateKey(undefined);
                    }}
                  />
                );
              }
              return <CheckCircle color="primary" sx={{ fontSize: "48px" }} />;
            })()}
          </Box>
        </DialogContent>
        <DialogActions>
          {step == 0 && (
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          )}
          {step < 2 ? (
            <Button type="submit" disabled={step !== 0} variant="contained" sx={{ mr: 2 }}>
              Confirm
            </Button>
          ) : (
            <Button type="submit" variant="contained" sx={{ mr: 2 }} onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
