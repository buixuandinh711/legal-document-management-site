import { ethers } from "ethers";
import SubmitTxDialog from "src/components/SubmitTxDialog";
import { useSubmitDraftTaskMutation } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import { getAndCompressFile, signDocument } from "src/utils/utils";

export interface SubmittedDraftDetailProps {
  id: number;
  name: string;
  documentNo: string;
  documentName: string;
  documentType: string;
  fileName: string;
  updatedAt: number;
  drafterUsername: string;
  drafterName: string;
  docUri: string;
}

export default function SubmitDraftTaskDialog({
  open,
  handleClose,
  taskId,
  draftDetail,
}: {
  open: boolean;
  handleClose: () => void;
  taskId: number;
  draftDetail: SubmittedDraftDetailProps;
}) {
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const [submitDraftTask] = useSubmitDraftTaskMutation();

  return (
    <SubmitTxDialog
      open={open}
      handleClose={handleClose}
      successMsg="Draft submitted"
      errorMsg="Failed to submit draft"
      submitTx={async (privateKey: string): Promise<boolean> => {
        const wallet = new ethers.Wallet(privateKey);
        const compressedDoc = await getAndCompressFile(draftDetail.docUri);
        const signature = await signDocument(
          {
            number: draftDetail.documentNo,
            name: draftDetail.documentName,
            docType: draftDetail.documentType,
            divisionId: divisionOnchainId,
            publishedTimestamp: Math.floor(new Date("2024-01-01").getTime() / 1000),
          },
          compressedDoc,
          { officerAddress: wallet.address, divisionId: divisionOnchainId, positionIndex },
          wallet
        );

        try {
          await submitDraftTask({
            divisionOnchainId,
            positionIndex,
            taskId,
            draftId: draftDetail.id,
            signature,
          }).unwrap();
        } catch (error) {
          return false;
        }

        return true;
      }}
    />
  );
}
