import { RequestStatus, RequestUrgency } from "@prisma/client";
import { prisma } from "../prisma";

// Helper function to get the latest maintenance requests and metrics
export async function fetchDataUpdate() {
  const requests = await prisma.maintenanceRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Metrics calculation
  const openRequests = requests.filter(
    (r) => r.status === RequestStatus.OPEN
  ).length;
  const urgentRequests = requests.filter(
    (r) =>
      r.urgency === RequestUrgency.URGENT ||
      r.urgency === RequestUrgency.EMERGENCY
  ).length;

  const resolved = requests.filter(
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
    averageResolutionTime = totalTime / resolved.length / 1000; // seconds
  }

  return {
    maintenanceRequests: requests,
    metrics: { openRequests, averageResolutionTime, urgentRequests },
  };
}
