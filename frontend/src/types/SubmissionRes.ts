import { submissionStatusEnum } from "@/enums/submissionStatusEnum";

export type SubmissionRes = {
    id: number;
    userId: number;
    contestId?: number;
    quesId: number;
    status: submissionStatusEnum;
    output: string;
    timestamp: Date;
};