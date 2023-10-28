import { AddressLike, BigNumberish } from "ethers";

export interface Position {
  divisionOnchainId: string;
  divisionName: string;
  positionIndex: number;
  positionName: string;
  positionRole: number;
}

export interface Officer {
  officerName: string;
  positions: Position[];
}

export type InitialResult = {
  isLoading: false;
  isError: false;
  isSuccess: false;
  data: undefined;
};
export type SuccessResult<T> = {
  isLoading: false;
  isError: false;
  isSuccess: true;
  data: T;
};
export type LoadingResult = {
  isLoading: true;
  isError: false;
  isSuccess: false;
  data: undefined;
};
export type ErrorResult = {
  isLoading: false;
  isError: true;
  isSuccess: false;
  data: undefined;
};

export type Result<T> = SuccessResult<T> | LoadingResult | ErrorResult | InitialResult;

export type OfficerPosition = {
  officerAddress: AddressLike;
  divisionId: string;
  positionIndex: BigNumberish;
};
export type DocumentInfo = {
  number: string;
  name: string;
  divisionId: string;
  publishedTimestamp: BigNumberish;
};
