import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { SubmissionRes } from "@/types/SubmissionRes";

export function SubmissionsPanel({submissions}: {submissions: SubmissionRes[]}) {
  return (
    <ScrollArea className="h-[calc(100vh-140px)]">
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              {submission.status === 'accepted' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <Badge
                variant="secondary"
                className={
                  submission.status === 'accepted'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }
              >
                {submission.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>{(new Date(submission.timestamp)).toString()}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}