import { BytesLike, Wallet, ethers } from "ethers";
import { DocumentInfo, OfficerPosition } from "src/utils/types";
import * as flate from "wasm-flate";

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
  signersPosition: OfficerPosition,
  signer: Wallet
): Promise<string> => {
  const documentContentHash = ethers.keccak256(documentContent);

  const signedInfo = ethers.concat([
    ethers.toUtf8Bytes(signersPosition.divisionId),
    ethers.toBeHex(signersPosition.positionIndex, 32),
    ethers.toUtf8Bytes(documentInfo.number),
    ethers.toUtf8Bytes(documentInfo.name),
    ethers.toUtf8Bytes(documentInfo.divisionId),
    ethers.toBeHex(documentInfo.publishedTimestamp, 32),
    documentContentHash,
  ]);

  const signedHash = ethers.keccak256(signedInfo);

  const signature = await signer.signMessage(ethers.getBytes(signedHash));

  return signature;
};

export const getAndCompressFile = async (url: string): Promise<Uint8Array> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const compressed_data = flate.gzip_encode_raw(buffer);
    return compressed_data;
  } catch (error) {
    throw new Error(`Error fetching data: ${(error as Error).message}`);
  }
};
