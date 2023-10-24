import { useState } from "react";
import { ethers } from "ethers";
import { Result } from "src/utils/types";

export function useSubmitTx(
  rpcUrl: string,
  privateKey: string
): [(txRequest: ethers.TransactionRequest) => Promise<void>, Result<string>] {
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<"init" | "loading" | "error" | "success">("init");

  const sendTransaction = async (txRequest: ethers.TransactionRequest) => {
    setStatus("loading");
    setTransactionHash(undefined);

    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const wallet = new ethers.Wallet(privateKey, provider);

      const tx = await wallet.sendTransaction(txRequest);
      const receipt = await tx.wait();

      setTransactionHash(receipt?.hash);
      setStatus("success");
    } catch (error) {
      console.error("Transaction failed:", error);
      setStatus("error");
    }
  };

  let result: Result<string>;

  switch (status) {
    case "init":
      result = {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: undefined,
      };
      break;
    case "loading":
      result = {
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: undefined,
      };
      break;
    case "error":
      result = {
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
      };
      break;
    case "success":
      result = {
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: transactionHash!,
      };
      break;
  }

  return [sendTransaction, result];
}
