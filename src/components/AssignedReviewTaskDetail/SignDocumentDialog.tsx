import { ethers } from "ethers";
import SubmitTxDialog from "src/components/SubmitTxDialog";
import { useUpdateReviewTaskSignedMutation } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import { getAndCompressFile, signDocument } from "src/utils/utils";

export interface PublishDraftDetailProps {
  name: string;
  documentNo: string;
  documentName: string;
  documentType: string;
  fileName: string;
  updatedAt: number;
  drafterName: string;
  docUri: string;
}

export default function SignDocumentDialog({
  open,
  handleClose,
  taskId,
  draftDetail,
}: {
  open: boolean;
  handleClose: (resetSelection: boolean) => void;
  taskId: number;
  draftDetail: PublishDraftDetailProps;
}) {
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const [updateReviewTaskSigned] = useUpdateReviewTaskSignedMutation();

  return (
    <SubmitTxDialog
      open={open}
      handleClose={handleClose}
      successMsg="Văn bản đã được ký"
      errorMsg="Ký văn bản thất bại"
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
          await updateReviewTaskSigned({ divisionOnchainId, positionIndex, taskId, signature }).unwrap();
        } catch (error) {
          return false;
        }

        return true;
      }}
    />
  );
}
