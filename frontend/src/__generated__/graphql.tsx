import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateMaintenanceRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status: RequestStatus;
  title: Scalars['String']['input'];
  urgency: RequestUrgency;
};

export type DataUpdate = {
  __typename?: 'DataUpdate';
  maintenanceRequests: Array<MaintenanceRequest>;
  metrics: Metrics;
};

export type MaintenanceRequest = {
  __typename?: 'MaintenanceRequest';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  resolutionTime?: Maybe<Scalars['Float']['output']>;
  resolvedAt?: Maybe<Scalars['String']['output']>;
  status: RequestStatus;
  title: Scalars['String']['output'];
  urgency: RequestUrgency;
};

export type Metrics = {
  __typename?: 'Metrics';
  averageResolutionTime?: Maybe<Scalars['Float']['output']>;
  openRequests: Scalars['Int']['output'];
  urgentRequests: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMaintenanceRequest: MaintenanceRequest;
  resolveMaintenanceRequest: MaintenanceRequest;
  updateMaintenanceRequest: MaintenanceRequest;
};


export type MutationCreateMaintenanceRequestArgs = {
  input: CreateMaintenanceRequestInput;
};


export type MutationResolveMaintenanceRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateMaintenanceRequestArgs = {
  input: UpdateMaintenanceRequestInput;
};

export type Query = {
  __typename?: 'Query';
  maintenanceRequests: Array<MaintenanceRequest>;
  metrics: Metrics;
};

export enum RequestStatus {
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export enum RequestUrgency {
  Emergency = 'EMERGENCY',
  Less = 'LESS',
  None = 'NONE',
  Urgent = 'URGENT'
}

export type Subscription = {
  __typename?: 'Subscription';
  dataUpdated: DataUpdate;
};

export type UpdateMaintenanceRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  status: RequestStatus;
  title?: InputMaybe<Scalars['String']['input']>;
  urgency: RequestUrgency;
};

export type CreateMaintenanceRequestMutationVariables = Exact<{
  input: CreateMaintenanceRequestInput;
}>;


export type CreateMaintenanceRequestMutation = { __typename?: 'Mutation', createMaintenanceRequest: { __typename?: 'MaintenanceRequest', status: RequestStatus, id: string, createdAt: string, title: string } };

export type OnDataUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnDataUpdatedSubscription = { __typename?: 'Subscription', dataUpdated: { __typename?: 'DataUpdate', maintenanceRequests: Array<{ __typename?: 'MaintenanceRequest', id: string, title: string, description?: string | null, status: RequestStatus, urgency: RequestUrgency, createdAt: string, resolvedAt?: string | null, resolutionTime?: number | null }>, metrics: { __typename?: 'Metrics', openRequests: number, averageResolutionTime?: number | null, urgentRequests: number } } };

export type GetMaintenanceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaintenanceRequestsQuery = { __typename?: 'Query', maintenanceRequests: Array<{ __typename?: 'MaintenanceRequest', id: string, title: string, description?: string | null, createdAt: string, resolutionTime?: number | null, status: RequestStatus, urgency: RequestUrgency }> };

export type GetMaintenanceRequestsAndMetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaintenanceRequestsAndMetricsQuery = { __typename?: 'Query', maintenanceRequests: Array<{ __typename?: 'MaintenanceRequest', id: string, title: string, description?: string | null, status: RequestStatus, urgency: RequestUrgency, createdAt: string, resolvedAt?: string | null, resolutionTime?: number | null }>, metrics: { __typename?: 'Metrics', averageResolutionTime?: number | null, openRequests: number, urgentRequests: number } };

export type GetMetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMetricsQuery = { __typename?: 'Query', metrics: { __typename?: 'Metrics', averageResolutionTime?: number | null, openRequests: number, urgentRequests: number } };

export type ResolveMaintenanceRequestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ResolveMaintenanceRequestMutation = { __typename?: 'Mutation', resolveMaintenanceRequest: { __typename?: 'MaintenanceRequest', description?: string | null, id: string, title: string, status: RequestStatus } };

export type UpdateMaintenanceRequestMutationVariables = Exact<{
  input: UpdateMaintenanceRequestInput;
}>;


export type UpdateMaintenanceRequestMutation = { __typename?: 'Mutation', updateMaintenanceRequest: { __typename?: 'MaintenanceRequest', id: string, description?: string | null, createdAt: string, resolutionTime?: number | null, status: RequestStatus } };


export const CreateMaintenanceRequestDocument = gql`
    mutation CreateMaintenanceRequest($input: CreateMaintenanceRequestInput!) {
  createMaintenanceRequest(input: $input) {
    status
    id
    createdAt
    title
  }
}
    `;
export type CreateMaintenanceRequestMutationFn = Apollo.MutationFunction<CreateMaintenanceRequestMutation, CreateMaintenanceRequestMutationVariables>;

/**
 * __useCreateMaintenanceRequestMutation__
 *
 * To run a mutation, you first call `useCreateMaintenanceRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMaintenanceRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMaintenanceRequestMutation, { data, loading, error }] = useCreateMaintenanceRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMaintenanceRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateMaintenanceRequestMutation, CreateMaintenanceRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMaintenanceRequestMutation, CreateMaintenanceRequestMutationVariables>(CreateMaintenanceRequestDocument, options);
      }
export type CreateMaintenanceRequestMutationHookResult = ReturnType<typeof useCreateMaintenanceRequestMutation>;
export type CreateMaintenanceRequestMutationResult = Apollo.MutationResult<CreateMaintenanceRequestMutation>;
export type CreateMaintenanceRequestMutationOptions = Apollo.BaseMutationOptions<CreateMaintenanceRequestMutation, CreateMaintenanceRequestMutationVariables>;
export const OnDataUpdatedDocument = gql`
    subscription OnDataUpdated {
  dataUpdated {
    maintenanceRequests {
      id
      title
      description
      status
      urgency
      createdAt
      resolvedAt
      resolutionTime
    }
    metrics {
      openRequests
      averageResolutionTime
      urgentRequests
    }
  }
}
    `;

/**
 * __useOnDataUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnDataUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnDataUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnDataUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnDataUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnDataUpdatedSubscription, OnDataUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnDataUpdatedSubscription, OnDataUpdatedSubscriptionVariables>(OnDataUpdatedDocument, options);
      }
export type OnDataUpdatedSubscriptionHookResult = ReturnType<typeof useOnDataUpdatedSubscription>;
export type OnDataUpdatedSubscriptionResult = Apollo.SubscriptionResult<OnDataUpdatedSubscription>;
export const GetMaintenanceRequestsDocument = gql`
    query GetMaintenanceRequests {
  maintenanceRequests {
    id
    title
    description
    createdAt
    resolutionTime
    status
    urgency
  }
}
    `;

/**
 * __useGetMaintenanceRequestsQuery__
 *
 * To run a query within a React component, call `useGetMaintenanceRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaintenanceRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaintenanceRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaintenanceRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetMaintenanceRequestsQuery, GetMaintenanceRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaintenanceRequestsQuery, GetMaintenanceRequestsQueryVariables>(GetMaintenanceRequestsDocument, options);
      }
export function useGetMaintenanceRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaintenanceRequestsQuery, GetMaintenanceRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaintenanceRequestsQuery, GetMaintenanceRequestsQueryVariables>(GetMaintenanceRequestsDocument, options);
        }
export function useGetMaintenanceRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMaintenanceRequestsQuery, GetMaintenanceRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMaintenanceRequestsQuery, GetMaintenanceRequestsQueryVariables>(GetMaintenanceRequestsDocument, options);
        }
export type GetMaintenanceRequestsQueryHookResult = ReturnType<typeof useGetMaintenanceRequestsQuery>;
export type GetMaintenanceRequestsLazyQueryHookResult = ReturnType<typeof useGetMaintenanceRequestsLazyQuery>;
export type GetMaintenanceRequestsSuspenseQueryHookResult = ReturnType<typeof useGetMaintenanceRequestsSuspenseQuery>;
export type GetMaintenanceRequestsQueryResult = Apollo.QueryResult<GetMaintenanceRequestsQuery, GetMaintenanceRequestsQueryVariables>;
export const GetMaintenanceRequestsAndMetricsDocument = gql`
    query GetMaintenanceRequestsAndMetrics {
  maintenanceRequests {
    id
    title
    description
    status
    urgency
    createdAt
    resolvedAt
    resolutionTime
  }
  metrics {
    averageResolutionTime
    openRequests
    urgentRequests
  }
}
    `;

/**
 * __useGetMaintenanceRequestsAndMetricsQuery__
 *
 * To run a query within a React component, call `useGetMaintenanceRequestsAndMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaintenanceRequestsAndMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaintenanceRequestsAndMetricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaintenanceRequestsAndMetricsQuery(baseOptions?: Apollo.QueryHookOptions<GetMaintenanceRequestsAndMetricsQuery, GetMaintenanceRequestsAndMetricsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaintenanceRequestsAndMetricsQuery, GetMaintenanceRequestsAndMetricsQueryVariables>(GetMaintenanceRequestsAndMetricsDocument, options);
      }
export function useGetMaintenanceRequestsAndMetricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaintenanceRequestsAndMetricsQuery, GetMaintenanceRequestsAndMetricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaintenanceRequestsAndMetricsQuery, GetMaintenanceRequestsAndMetricsQueryVariables>(GetMaintenanceRequestsAndMetricsDocument, options);
        }
export function useGetMaintenanceRequestsAndMetricsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMaintenanceRequestsAndMetricsQuery, GetMaintenanceRequestsAndMetricsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMaintenanceRequestsAndMetricsQuery, GetMaintenanceRequestsAndMetricsQueryVariables>(GetMaintenanceRequestsAndMetricsDocument, options);
        }
export type GetMaintenanceRequestsAndMetricsQueryHookResult = ReturnType<typeof useGetMaintenanceRequestsAndMetricsQuery>;
export type GetMaintenanceRequestsAndMetricsLazyQueryHookResult = ReturnType<typeof useGetMaintenanceRequestsAndMetricsLazyQuery>;
export type GetMaintenanceRequestsAndMetricsSuspenseQueryHookResult = ReturnType<typeof useGetMaintenanceRequestsAndMetricsSuspenseQuery>;
export type GetMaintenanceRequestsAndMetricsQueryResult = Apollo.QueryResult<GetMaintenanceRequestsAndMetricsQuery, GetMaintenanceRequestsAndMetricsQueryVariables>;
export const GetMetricsDocument = gql`
    query GetMetrics {
  metrics {
    averageResolutionTime
    openRequests
    urgentRequests
  }
}
    `;

/**
 * __useGetMetricsQuery__
 *
 * To run a query within a React component, call `useGetMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMetricsQuery(baseOptions?: Apollo.QueryHookOptions<GetMetricsQuery, GetMetricsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMetricsQuery, GetMetricsQueryVariables>(GetMetricsDocument, options);
      }
export function useGetMetricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMetricsQuery, GetMetricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMetricsQuery, GetMetricsQueryVariables>(GetMetricsDocument, options);
        }
export function useGetMetricsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMetricsQuery, GetMetricsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMetricsQuery, GetMetricsQueryVariables>(GetMetricsDocument, options);
        }
export type GetMetricsQueryHookResult = ReturnType<typeof useGetMetricsQuery>;
export type GetMetricsLazyQueryHookResult = ReturnType<typeof useGetMetricsLazyQuery>;
export type GetMetricsSuspenseQueryHookResult = ReturnType<typeof useGetMetricsSuspenseQuery>;
export type GetMetricsQueryResult = Apollo.QueryResult<GetMetricsQuery, GetMetricsQueryVariables>;
export const ResolveMaintenanceRequestDocument = gql`
    mutation ResolveMaintenanceRequest($id: ID!) {
  resolveMaintenanceRequest(id: $id) {
    description
    id
    title
    status
  }
}
    `;
export type ResolveMaintenanceRequestMutationFn = Apollo.MutationFunction<ResolveMaintenanceRequestMutation, ResolveMaintenanceRequestMutationVariables>;

/**
 * __useResolveMaintenanceRequestMutation__
 *
 * To run a mutation, you first call `useResolveMaintenanceRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveMaintenanceRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveMaintenanceRequestMutation, { data, loading, error }] = useResolveMaintenanceRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResolveMaintenanceRequestMutation(baseOptions?: Apollo.MutationHookOptions<ResolveMaintenanceRequestMutation, ResolveMaintenanceRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResolveMaintenanceRequestMutation, ResolveMaintenanceRequestMutationVariables>(ResolveMaintenanceRequestDocument, options);
      }
export type ResolveMaintenanceRequestMutationHookResult = ReturnType<typeof useResolveMaintenanceRequestMutation>;
export type ResolveMaintenanceRequestMutationResult = Apollo.MutationResult<ResolveMaintenanceRequestMutation>;
export type ResolveMaintenanceRequestMutationOptions = Apollo.BaseMutationOptions<ResolveMaintenanceRequestMutation, ResolveMaintenanceRequestMutationVariables>;
export const UpdateMaintenanceRequestDocument = gql`
    mutation UpdateMaintenanceRequest($input: UpdateMaintenanceRequestInput!) {
  updateMaintenanceRequest(input: $input) {
    id
    description
    createdAt
    resolutionTime
    status
  }
}
    `;
export type UpdateMaintenanceRequestMutationFn = Apollo.MutationFunction<UpdateMaintenanceRequestMutation, UpdateMaintenanceRequestMutationVariables>;

/**
 * __useUpdateMaintenanceRequestMutation__
 *
 * To run a mutation, you first call `useUpdateMaintenanceRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMaintenanceRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMaintenanceRequestMutation, { data, loading, error }] = useUpdateMaintenanceRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMaintenanceRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMaintenanceRequestMutation, UpdateMaintenanceRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMaintenanceRequestMutation, UpdateMaintenanceRequestMutationVariables>(UpdateMaintenanceRequestDocument, options);
      }
export type UpdateMaintenanceRequestMutationHookResult = ReturnType<typeof useUpdateMaintenanceRequestMutation>;
export type UpdateMaintenanceRequestMutationResult = Apollo.MutationResult<UpdateMaintenanceRequestMutation>;
export type UpdateMaintenanceRequestMutationOptions = Apollo.BaseMutationOptions<UpdateMaintenanceRequestMutation, UpdateMaintenanceRequestMutationVariables>;