import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useDraftDetailQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import { Legal_document_manager__factory } from "src/contracts";

const chainProvider: string = import.meta.env.VITE_CHAIN_PROVIDER;
const contractAddress: string = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function SubmitTx({
  draftId,
  privateKey,
  handleSuccessTx,
}: {
  draftId: string;
  privateKey: string;
  handleSuccessTx: () => void;
}) {
  const parsedId = parseInt(draftId);
  const workingPosition = useAppSelector((state) => state.position);
  const draftDetailQuery = useDraftDetailQuery(
    {
      divisionOnchainId: workingPosition.divisionOnchainId,
      positionIndex: workingPosition.positionIndex,
      draftId: parsedId,
    },
    {
      skip: isNaN(parsedId),
    }
  );

  useEffect(() => {
    const sendTx = async () => {
      if (!draftDetailQuery.isSuccess) return;
      const draftDetail = draftDetailQuery.data;
      try {
        const provider = new ethers.JsonRpcProvider(chainProvider);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = Legal_document_manager__factory.connect(contractAddress, provider);
        const publishTx = await contract.connect(wallet).publishDocument(
          workingPosition.divisionOnchainId,
          workingPosition.positionIndex,
          {
            number: draftDetail.documentNo,
            name: draftDetail.documentName,
            divisionId: workingPosition.divisionOnchainId,
            publishedTimestamp: Math.round(Date.now() / 1000),
          },
          ethers.toUtf8Bytes("This is a document"),
          [],
          "0x"
        );
        await publishTx.wait();

        handleSuccessTx();
      } catch (error) {
        console.log(error);
      }
    };

    sendTx();
  }, [
    draftDetailQuery.data,
    draftDetailQuery.isSuccess,
    handleSuccessTx,
    privateKey,
    workingPosition.divisionOnchainId,
    workingPosition.positionIndex,
  ]);

  if (!draftDetailQuery.isSuccess) return <></>;

  return <CircularProgress />;
}
