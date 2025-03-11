import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";

export const prisma = new PrismaClient();
export const pubsub = new PubSub();

export const DATA_UPDATED = "DATA_UPDATED";
