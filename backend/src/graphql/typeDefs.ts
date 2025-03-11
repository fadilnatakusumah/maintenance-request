export const typeDefs = `#graphql
  enum RequestStatus {
    OPEN
    RESOLVED
  }

  enum RequestUrgency {
    NONE
    LESS
    URGENT
    EMERGENCY
  }

  type MaintenanceRequest {
    id: ID!
    title: String!
    description: String
    status: RequestStatus!
    urgency: RequestUrgency!
    createdAt: String!
    resolvedAt: String
    resolutionTime: Float
  }

  input CreateMaintenanceRequestInput {
    title: String!
    description: String
    status: RequestStatus!
    urgency: RequestUrgency!
  }

  input UpdateMaintenanceRequestInput {
    id: ID!
    title: String
    description: String
    status: RequestStatus!
    urgency: RequestUrgency!
  }

  type Metrics {
    openRequests: Int!
    averageResolutionTime: Float
    urgentRequests: Int!
  }




  type Query {
    maintenanceRequests: [MaintenanceRequest!]!
    metrics: Metrics!
  }

  # New type to encapsulate the full data update payload
  type DataUpdate {
    maintenanceRequests: [MaintenanceRequest!]!
    metrics: Metrics!
  }

  type Mutation {
    createMaintenanceRequest(
      input: CreateMaintenanceRequestInput!
    ): MaintenanceRequest!
    updateMaintenanceRequest(
      input: UpdateMaintenanceRequestInput!
    ): MaintenanceRequest!
    resolveMaintenanceRequest(id: ID!): MaintenanceRequest!
  }

  type Subscription {
    dataUpdated: DataUpdate!
  }
`;
