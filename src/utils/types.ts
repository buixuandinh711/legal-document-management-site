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
