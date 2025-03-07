import { prisma } from "../prisma";
import {
  CreateMaintenanceRequestInput,
  UpdateMaintenanceRequestInput,
} from "../__generated__/graphql";

export const resolvers = {
  Query: {
    maintenanceRequests: async () => {
      return prisma.maintenanceRequest.findMany();
    },
  },

  Mutation: {
    createMaintenanceRequest: async (
      _: unknown,
      { input }: { input: CreateMaintenanceRequestInput }
    ) => {
      return prisma.maintenanceRequest.create({
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
      { input }: { input: UpdateMaintenanceRequestInput }
    ) => {
      return prisma.maintenanceRequest.update({
        where: { id: input.id },
        data: {
          title: input.title ?? undefined,
          status: input.status,
          description: input.description ?? undefined,
          urgency: input.urgency,
        },
      });
    },
  },
  Subscription: {},
};
