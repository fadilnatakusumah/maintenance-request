import { prisma } from "../prisma";
import { CreateMaintenanceRequestInput } from "../__generated__/graphql";

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
  },
  Subscription: {},
};
