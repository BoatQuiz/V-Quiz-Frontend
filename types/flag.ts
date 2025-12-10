import { ApiResponse } from "./quiz";

export interface Flag {
  Id: string;
  UserId: string | null;
  Comment: string | null;
  FlaggedAt: string;
}

export interface FlaggedData {
  Id: string;
  QuestionId: string;
  Flags: Flag[];
  IsResolved: boolean;
  ResolvedAt: string | null;
  ResolvedBy: string | null;
}

export interface FlagReason {
  Key: string;
  Label: string;
}

export interface SendFlagRequest {
  questionId: string;
  reasons: string[];
  userId: string | null;
  comment: string | null;
}

export type FlagResponse = ApiResponse<FlaggedData>;

export type FlagReasonResponse = ApiResponse<FlagReason>;
