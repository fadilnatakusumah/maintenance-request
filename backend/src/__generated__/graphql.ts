/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CreateMaintenanceRequestInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  status: RequestStatus;
  title: Scalars["String"]["input"];
  urgency: RequestUrgency;
};

export type MaintenanceRequest = {
  __typename?: "MaintenanceRequest";
  createdAt: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  resolutionTime?: Maybe<Scalars["Float"]["output"]>;
  resolvedAt?: Maybe<Scalars["String"]["output"]>;
  status: RequestStatus;
  title: Scalars["String"]["output"];
  urgency: RequestUrgency;
};

export type Metrics = {
  __typename?: "Metrics";
  averageResolutionTime?: Maybe<Scalars["Float"]["output"]>;
  openRequests: Scalars["Int"]["output"];
  urgentRequests: Scalars["Int"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createMaintenanceRequest: MaintenanceRequest;
  resolveMaintenanceRequest: MaintenanceRequest;
  updateMaintenanceRequest: MaintenanceRequest;
};

export type MutationCreateMaintenanceRequestArgs = {
  input: CreateMaintenanceRequestInput;
};

export type MutationResolveMaintenanceRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateMaintenanceRequestArgs = {
  input: UpdateMaintenanceRequestInput;
};

export type Query = {
  __typename?: "Query";
  maintenanceRequests: Array<MaintenanceRequest>;
  metrics: Metrics;
};

export enum RequestStatus {
  Open = "OPEN",
  Resolved = "RESOLVED",
}

export enum RequestUrgency {
  Emergency = "EMERGENCY",
  Less = "LESS",
  None = "NONE",
  Urgent = "URGENT",
}

export type Subscription = {
  __typename?: "Subscription";
  maintenanceRequestUpdated: MaintenanceRequest;
};

export type UpdateMaintenanceRequestInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  status: RequestStatus;
  title?: InputMaybe<Scalars["String"]["input"]>;
  urgency: RequestUrgency;
};
