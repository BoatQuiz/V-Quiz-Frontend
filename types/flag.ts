import { ApiResponse } from "./quiz";

export interface FlagRequest {
    QuestionId: string;
    UserId: string | null;
    Comment: string | null;
}

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

export type FlagResponse = ApiResponse<FlaggedData>;