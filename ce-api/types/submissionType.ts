export type SubmissionType = {
    userId: number;
    contestId?: number;
    quesId: number;
    status: string;
    output: string;
    timestamp: Date;
};