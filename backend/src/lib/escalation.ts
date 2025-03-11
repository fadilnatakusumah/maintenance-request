// src/escalation.ts
import cron from "node-cron";

import { RequestStatus, RequestUrgency } from "@prisma/client";
import { DATA_UPDATED, prisma, pubsub } from "../prisma";

async function checkUrgencyEscalation() {
  const requests = await prisma.maintenanceRequest.findMany({
    where: { status: RequestStatus.OPEN },
  });

  const now = new Date();
  for (const request of requests) {
    let newUrgency = request.urgency;
    const createdAt = new Date(request.createdAt);

    if (request.urgency === RequestUrgency.LESS) {
      // Escalate after 3 days
      const threeDaysLater = new Date(
        createdAt.getTime() + 3 * 24 * 60 * 60 * 1000
      );
      if (now > threeDaysLater) {
        newUrgency = RequestUrgency.URGENT;
      }
    } else if (request.urgency === RequestUrgency.URGENT) {
      // Escalate after 6 hours
      const sixHoursLater = new Date(createdAt.getTime() + 6 * 60 * 60 * 1000);
      if (now > sixHoursLater) {
        newUrgency = RequestUrgency.EMERGENCY;
      }
    }

    if (newUrgency !== request.urgency) {
      await prisma.maintenanceRequest.update({
        where: { id: request.id },
        data: { urgency: newUrgency },
      });
      // Publish updated data after escalation change
      const updatedData = await (async () => {
        const allRequests = await prisma.maintenanceRequest.findMany();
        const openRequests = allRequests.filter(
          (r) => r.status === RequestStatus.OPEN
        ).length;
        const urgentRequests = allRequests.filter(
          (r) =>
            r.urgency === RequestUrgency.URGENT ||
            r.urgency === RequestUrgency.EMERGENCY
        ).length;
        const resolved = allRequests.filter(
          (r) => r.status === RequestStatus.RESOLVED && r.resolvedAt
        );
        let averageResolutionTime = null;
        if (resolved.length > 0) {
          const totalTime = resolved.reduce((acc, r) => {
            const timeTaken =
              new Date(r.resolvedAt as unknown as string).getTime() -
              new Date(r.createdAt).getTime();
            return acc + timeTaken;
          }, 0);
          averageResolutionTime = totalTime / resolved.length / 1000;
        }
        return {
          maintenanceRequests: allRequests,
          metrics: { openRequests, averageResolutionTime, urgentRequests },
        };
      })();
      pubsub.publish(DATA_UPDATED, { dataUpdated: updatedData });
    }
  }
}

// Schedule the escalation check every 10 minutes
cron.schedule("*/10 * * * *", () => {
  console.log("Running auto escalation job...");
  checkUrgencyEscalation().catch((error) => {
    console.error("Error during urgency escalation:", error);
  });
});
