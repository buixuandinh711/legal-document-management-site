import { AddressLike, BigNumberish } from "ethers";

export type OfficerPosition = {
  officerAddress: AddressLike;
  divisionId: string;
  positionIndex: BigNumberish;
};
export type DocumentInfo = {
  number: string;
  name: string;
  divisionId: string;
  docType: string;
  publishedTimestamp: BigNumberish;
};
