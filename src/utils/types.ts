export interface Position {
  positionIndex: number;
  positionName: string;
  positionRole: number;
  divisionId: number;
  divisionName: string;
}

export interface Officer {
  officerName: string;
  positions: Position[];
}

export interface GetUserResponse {
  officer_name: string;
  positions: {
    position_index: number;
    position_name: string;
    position_role: number;
    division_id: number;
    division_name: string;
  }[];
}
