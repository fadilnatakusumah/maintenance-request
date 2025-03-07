import {
  CreateMaintenanceRequestInput,
  UpdateMaintenanceRequestInput,
} from "../__generated__/graphql";
import { MyContext } from "./types";

export const resolvers = {
  Query: {
    maintenanceRequests: async (_: unknown, context: MyContext) => {
      return context.prisma.maintenanceRequest.findMany();
    },
  },

  Mutation: {
    createMaintenanceRequest: async (
      _: unknown,
      { input }: { input: CreateMaintenanceRequestInput },
      context: MyContext
    ) => {
      return context.prisma.maintenanceRequest.create({
        data: {
          title: input.title,
          status: input.status,
          description: input.description,
          urgency: input.urgency,
        },
      });
    },

    updateMaintenanceRequest: async (
      _: unknown,
      { input }: { input: UpdateMaintenanceRequestInput },
      context: MyContext
    ) => {
      return context.prisma.maintenanceRequest.update({
        where: { id: input.id },
        data: {
          title: input.title ?? undefined,
          status: input.status,
          description: input.description ?? undefined,
          urgency: input.urgency,
        },
      });
    },

    resolveMaintenanceRequest: async (
      _: unknown,
      { id }: { id: string },
      context: MyContext
    ) => {
      // Ensure the request isn’t already resolved
      const request = await context.prisma.maintenanceRequest.findUnique({
        where: { id },
      });
      if (request!.status === "RESOLVED") {
        throw new Error("Request already resolved.");
      }
      const resolvedRequest = await context.prisma.maintenanceRequest.update({
        where: { id },
        data: {
          status: "RESOLVED",
          resolvedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return resolvedRequest;
    },
  },
  Subscription: {},
};
