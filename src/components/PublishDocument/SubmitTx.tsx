import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";
import { useEffect } from "react";

const chainProvider: string = import.meta.env.VITE_CHAIN_PROVIDER;

export default function SubmitTx({
  privateKey,
  handleSuccessTx,
}: {
  privateKey: string;
  handleSuccessTx: () => void;
}) {

  

  useEffect(() => {
    const sendTx = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(chainProvider);
        const wallet = new ethers.Wallet(privateKey, provider);
        const tx = await wallet.sendTransaction({
          to: "0xA83722f7d0223C5E0459B10776A15156408Be705",
          value: 1999,
        });
        await tx.wait();
        handleSuccessTx();
      } catch (error) {
        console.log(error);
      }
    };
    sendTx();
  }, [handleSuccessTx, privateKey]);

  return <CircularProgress />;
}
