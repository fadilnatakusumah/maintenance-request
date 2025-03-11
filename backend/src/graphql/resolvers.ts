import {
  MaintenanceRequest,
  RequestStatus,
  RequestUrgency,
} from "@prisma/client";

import {
  CreateMaintenanceRequestInput,
  UpdateMaintenanceRequestInput,
} from "../__generated__/graphql";
import { fetchDataUpdate } from "../helpers/data";
import { DATA_UPDATED, prisma, pubsub } from "../prisma";

export const resolvers = {
  Query: {
    maintenanceRequests: async (_: unknown) => {
      return prisma.maintenanceRequest.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    metrics: async () => {
      try {
        const requests = await prisma.maintenanceRequest.findMany();
        // Fallback to an empty array if something is off
        const reqs = requests || [];
        const openRequests = reqs.filter(
          (r) => r.status === RequestStatus.OPEN
        ).length;
        const urgentRequests = reqs.filter(
          (r) =>
            r.urgency === RequestUrgency.URGENT ||
            r.urgency === RequestUrgency.EMERGENCY
        ).length;

        // Compute average resolution time (in seconds) for resolved requests
        const resolved = reqs.filter(
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

        return { openRequests, averageResolutionTime, urgentRequests };
      } catch (error) {
        console.error("Error fetching metrics:", error);
        // Return a default Metrics object so that the field is never null
        return {
          openRequests: 0,
          averageResolutionTime: null,
          urgentRequests: 0,
        };
      }
    },
  },
  MaintenanceRequest: {
    // Compute resolution time as a field
    resolutionTime: (parent: MaintenanceRequest) => {
      if (parent.status !== RequestStatus.RESOLVED || !parent.resolvedAt)
        return null;
      const timeTaken =
        new Date(parent.resolvedAt).getTime() -
        new Date(parent.createdAt).getTime();
      return timeTaken / 1000; // seconds
    },
  },
  Mutation: {
    createMaintenanceRequest: async (
      _: unknown,
      { input }: { input: CreateMaintenanceRequestInput }
    ) => {
      const newRequest = await prisma.maintenanceRequest.create({
        data: {
          title: input.title,
          status: input.status,
          description: input.description,
          urgency: input.urgency,
        },
      });

      const dataUpdate = await fetchDataUpdate();
      pubsub.publish(DATA_UPDATED, { dataUpdated: dataUpdate });
      return newRequest;
    },

    updateMaintenanceRequest: async (
      _: unknown,
      { input }: { input: UpdateMaintenanceRequestInput }
    ) => {
      const updatedRequest = await prisma.maintenanceRequest.update({
        where: { id: input.id },
        data: {
          title: input.title ?? undefined,
          status: input.status,
          description: input.description ?? undefined,
          urgency: input.urgency,
        },
      });

      const dataUpdate = await fetchDataUpdate();
      pubsub.publish(DATA_UPDATED, { dataUpdated: dataUpdate });
      return updatedRequest;
    },

    resolveMaintenanceRequest: async (_: unknown, { id }: { id: string }) => {
      // Ensure the request isn’t already resolved
      const request = await prisma.maintenanceRequest.findUnique({
        where: { id },
      });
      if (request!.status === RequestStatus.RESOLVED) {
        throw new Error("Request already resolved.");
      }
      const resolvedRequest = await prisma.maintenanceRequest.update({
        where: { id },
        data: {
          status: RequestStatus.RESOLVED,
          resolvedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const dataUpdate = await fetchDataUpdate();
      pubsub.publish(DATA_UPDATED, { dataUpdated: dataUpdate });
      return resolvedRequest;
    },
  },
  Subscription: {
    dataUpdated: {
      subscribe: () => pubsub.asyncIterableIterator([DATA_UPDATED]),
    },
  },
};
