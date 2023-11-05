import { ethers } from "ethers";
import SubmitTxDialog from "src/components/SubmitTxDialog";
import { useAppSelector } from "src/context/store";
import { Legal_document_manager__factory } from "src/contracts";
import { getAndCompressFile } from "src/utils/utils";

export interface PublishDraftDetailProps {
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

const chainProvider: string = import.meta.env.VITE_CHAIN_PROVIDER;
const contractAddress: string = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function PublishDocDialog({
  open,
  handleClose,
  draftDetail,
}: {
  open: boolean;
  handleClose: (resetSelection: boolean) => void;
  draftDetail: PublishDraftDetailProps;
}) {
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);

  return (
    <SubmitTxDialog
      open={open}
      handleClose={handleClose}
      successMsg="Document published"
      errorMsg="Failed to publish document"
      submitTx={async (privateKey: string): Promise<boolean> => {
        const provider = new ethers.JsonRpcProvider(chainProvider);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = Legal_document_manager__factory.connect(contractAddress, provider);
        const compressedDoc = await getAndCompressFile(draftDetail.docUri);
        const publishTx = await contract.connect(wallet).publishDocument(
          divisionOnchainId,
          positionIndex,
          {
            number: draftDetail.documentNo,
            name: draftDetail.documentName,
            docType: draftDetail.documentType,
            divisionId: divisionOnchainId,
            // publishedTimestamp: Math.floor(Date.now() / 1000 / 86400) * 86400,
            publishedTimestamp: Math.floor(new Date("2024-01-01").getTime() / 1000),
          },
          compressedDoc,
          [],
          "0x"
        );
        await publishTx.wait();

        return true;
      }}
    />
  );
}
