"use client";

import clsx from "clsx";
import { formatDate, fromUnixTime } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import CountUp from "react-countup";
import { toast } from "react-toastify";

import Label from "@/components/Label";
import Skeleton from "@/components/Skeleton";

import {
  DataUpdate,
  OnDataUpdatedDocument,
  RequestStatus,
  useGetMaintenanceRequestsAndMetricsQuery,
  useResolveMaintenanceRequestMutation,
} from "@/__generated__/graphql";
import { URGENT_TYPE_TEXT, URGENT_TYPE_TEXT_COLOR } from "@/consts/maintenance";
import store from "@/store/store";
import { URGENT_EMOJI } from "./(form)/consts";

export default function Home() {
  const { data, loading, error, subscribeToMore } =
    useGetMaintenanceRequestsAndMetricsQuery({
      fetchPolicy: "cache-and-network", // Always fetch fresh data and cached
    });
  const [resolveMaintenanceRequest] = useResolveMaintenanceRequestMutation();

  const metrics = [
    {
      value: data?.metrics?.openRequests,
      title: "Open Requests",
    },
    {
      value: data?.metrics?.urgentRequests,
      title: "Urgent Requests",
    },
    {
      value: data?.metrics?.averageResolutionTime?.toFixed(2).toString(),
      title: "Average time (days) to resolve",
    },
  ];

  const dayInSeconds = 86400;

  useEffect(() => {
    // Subscribe to data updates and merge them with the existing query data
    const unsubscribe = subscribeToMore({
      document: OnDataUpdatedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        // the typings from apollo client is not correct here
        // they don't include the "dataUpdated" field in the Document
        const updatedData = subscriptionData.data as unknown as {
          dataUpdated: DataUpdate;
        };
        return {
          ...prev,
          maintenanceRequests: updatedData.dataUpdated.maintenanceRequests,
          metrics: updatedData.dataUpdated.metrics,
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, data?.maintenanceRequests, data?.metrics]);

  async function resolveRequestHandler(id: string) {
    if (window.confirm("Are you sure you want to resolve this request?")) {
      await resolveMaintenanceRequest({ variables: { id } });
      toast.success("Maintenance request resolved successfully");
    }
  }

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="mx-auto px-7 max-w-[697px] w-full mt-[70px] relative">
          <h1 className="text-center font-bold text-[20px]">
            Maintenance Request
          </h1>

          <div className="flex gap-5 justify-center items-center mt-[22px] max-w-[343px] mx-auto pb-11">
            {metrics.map(({ title, value }, idx) => (
              <div
                key={idx}
                className="w-[100px] h-[100px] rounded-[10px] text-center shadow-md  py-6 px-1.5 bg-white"
              >
                <div className="text-4xl text-teal-oasis font-medium">
                  <CountUp
                    start={0}
                    end={idx === 2 ? +value! / dayInSeconds : +value!}
                    duration={3}
                    {...(idx === 2 && {
                      separator: ",",
                      decimals: 2, // If you expect decimal places
                    })}
                  />
                </div>
                <div className="text-[9px]">{title}</div>
              </div>
            ))}
          </div>

          <div
            style={{ scrollbarWidth: "thin" }}
            className="max-h-[65vh] overflow-y-auto flex flex-col gap-5 w-full pb-4 px-7"
          >
            {loading && !data ? (
              <Skeleton className="rounded-lg h-20" />
            ) : error ? (
              <div className="text-red-400">{error.message}</div>
            ) : (
              data?.maintenanceRequests?.map((maintenanceRequest, idx) => (
                <Link
                  key={idx}
                  href={`/edit/${maintenanceRequest.id}`}
                  onClick={() => {
                    store.updateSelectedMaintenanceRequest(maintenanceRequest);
                  }}
                >
                  <div className="bg-white flex justify-between items-center p-4 rounded-xl shadow-md">
                    <div className="text-sm">
                      <div className="font-medium">
                        {maintenanceRequest.title}
                      </div>
                      <div className="mt-2.5">
                        {URGENT_EMOJI[maintenanceRequest.urgency]}
                        <span
                          className={clsx(
                            "font-light ml-1",
                            URGENT_TYPE_TEXT_COLOR[maintenanceRequest.urgency]
                          )}
                        >
                          {URGENT_TYPE_TEXT[maintenanceRequest.urgency]}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-steel-blue">
                        {formatDate(
                          +fromUnixTime(+maintenanceRequest.createdAt) / 1000,
                          "dd MMM yyyy"
                        )}
                      </div>
                      <Label
                        className="hover:shadow-lg transition-all"
                        onClick={(evt) => {
                          if (
                            maintenanceRequest.status === RequestStatus.Resolved
                          )
                            return;
                          evt.preventDefault();
                          evt.stopPropagation();
                          resolveRequestHandler(maintenanceRequest.id);
                        }}
                        color={
                          maintenanceRequest.status === RequestStatus.Open
                            ? "green"
                            : "gray"
                        }
                      >
                        {maintenanceRequest.status === RequestStatus.Open
                          ? "Mark as Resolve"
                          : "Resolved"}
                      </Label>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="sticky bottom-0 flex justify-end">
            <Link href={"/create"}>
              <div className="flex items-center justify-center cursor-pointer rounded-full shadow-sm bg-teal-oasis h-12 w-12">
                <Plus color="white" />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
