"use client";

import Button from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import DropdownField from "@/components/DropdownField";
import Field from "@/components/Field";
import FieldGroup from "@/components/FieldGroup";
import FieldLabel from "@/components/FieldLabel";

import {
  MaintenanceRequest,
  RequestUrgency,
  useUpdateMaintenanceRequestMutation,
} from "@/__generated__/graphql";
import { REQUEST_STATUS } from "@/consts/maintenance";
import { useStore } from "@/store/Provider";

const EditPage = observer(() => {
  const { store } = useStore();
  const [updateMaintenanceRequest, { loading }] =
    useUpdateMaintenanceRequestMutation();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaintenanceRequest>({
    defaultValues: {
      title: store.selectedMaintenanceRequest?.title,
      status: store.selectedMaintenanceRequest?.status,
      urgency: store.selectedMaintenanceRequest?.urgency,
      description: store.selectedMaintenanceRequest?.description,
    },
  });

  async function updateMaintenanceRequestHandler(data: MaintenanceRequest) {
    try {
      await updateMaintenanceRequest({
        variables: {
          input: {
            ...data,
            id: store.selectedMaintenanceRequest!.id!,
          },
        },
        onCompleted: () => {
          toast.success("Maintenance request successfully updated");
          push("/");
        },
      });
    } catch (error: unknown) {
      toast.error(error as string);
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="mx-auto px-7 max-w-[697px] w-full mt-[70px] relative">
          <div className="relative text-center font-bold text-[20px] flex items-center justify-center">
            <Link href={"/"}>
              <span className="relative right-[33px]">
                <ArrowLeft />
              </span>
            </Link>
            <span>Update Maintenance Request</span>
          </div>

          <form
            className="pt-[30px]"
            onSubmit={handleSubmit(updateMaintenanceRequestHandler)}
          >
            <FieldGroup>
              <FieldLabel required className="mb-2">
                Urgency
              </FieldLabel>
              <DropdownField
                options={[
                  {
                    value: RequestUrgency.Urgent,
                    label: "Urgent",
                  },
                  {
                    value: RequestUrgency.None,
                    label: "Non Urgent",
                  },
                  {
                    value: RequestUrgency.Emergency,
                    label: "Emergency",
                  },
                  {
                    value: RequestUrgency.Less,
                    label: "Less Emergency",
                  },
                ]}
                {...register("urgency", { required: "Urgency is required" })}
              />
              {errors.urgency && (
                <span className="text-xs text-red-400">
                  {errors.urgency.message}
                </span>
              )}
            </FieldGroup>
            <FieldGroup>
              <FieldLabel className="mb-2">Status</FieldLabel>
              <DropdownField
                options={[
                  {
                    value: REQUEST_STATUS.OPEN,
                    label: "Open",
                  },
                  {
                    value: REQUEST_STATUS.RESOLVED,
                    label: "Resolved",
                  },
                ]}
                {...register("status")}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel required className="mb-2">
                Title
              </FieldLabel>
              <Field
                {...register("title", { required: "Title is required" })}
              />

              {errors.title && (
                <span className="text-red-400 text-xs">
                  {errors.title.message}
                </span>
              )}
            </FieldGroup>
            <FieldGroup className="mb-[46px]">
              <FieldLabel className="mb-2">Description</FieldLabel>
              <Field textarea {...register("description")} />
            </FieldGroup>
            <Button disabled={loading} className="mx-auto block">
              {loading ? "Saving" : "Save"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
});

export default EditPage;
