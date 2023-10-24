import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { usePrivateKeyQuery } from "src/context/slices/apiSlice";
import { useAppDispatch, useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import { gcm } from "@noble/ciphers/aes";
import { hexToBytes, utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";
import { ethers } from "ethers";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

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

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      values: { password: string },
      { setSubmitting }: FormikHelpers<{ password: string }>
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

        const wallet = new ethers.Wallet(decryptedPk);
        const address = wallet.address.toLowerCase();

        window.alert(address + " " + keyInfo.onchainAddress);
      } catch (error) {
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
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  return <ContentError />;
}
