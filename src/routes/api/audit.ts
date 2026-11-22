import { createFileRoute } from "@tanstack/react-router";
import { handleAudit } from "@/lib/ai/audit.server";

export const Route = createFileRoute("/api/audit")({
  server: { handlers: { POST: ({ request }) => handleAudit(request) } },
});
