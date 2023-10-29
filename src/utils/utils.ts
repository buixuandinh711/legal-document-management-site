import { BytesLike, Wallet, ethers } from "ethers";
import { DocumentInfo, OfficerPosition } from "src/utils/types";

export const convertSecsToDateTime = (secsFromEpoch: number): string => {
  const msFromEpoch = secsFromEpoch * 1000;
  const date = new Date(msFromEpoch);

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const convertSecsToDate = (secsFromEpoch: number): string => {
  const msFromEpoch = secsFromEpoch * 1000;
  const date = new Date(msFromEpoch);

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const signDocument = async (
  documentInfo: DocumentInfo,
  documentContent: BytesLike,
  signersPosition: OfficerPosition[],
  signers: Wallet[]
): Promise<string> => {
  if (signersPosition.length != signers.length) throw new Error("Signers length not match");

  let res = "0x";

  const documentContentHash = ethers.keccak256(documentContent);

  for (let i = 0; i < signersPosition.length; i++) {
    const position = signersPosition[i];
    const signer = signers[i];
    const signedInfo = ethers.concat([
      ethers.toUtf8Bytes(position.divisionId),
      ethers.toBeHex(position.positionIndex, 32),
      ethers.toUtf8Bytes(documentInfo.number),
      ethers.toUtf8Bytes(documentInfo.name),
      ethers.toUtf8Bytes(documentInfo.divisionId),
      ethers.toBeHex(documentInfo.publishedTimestamp, 32),
      documentContentHash,
    ]);

    const signedHash = ethers.keccak256(signedInfo);

    const signature = await signer.signMessage(ethers.getBytes(signedHash));
    res += signature.slice(2);
  }

  return res;
};
