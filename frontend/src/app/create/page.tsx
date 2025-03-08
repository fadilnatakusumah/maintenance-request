import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Emoji from "react-emojis";
import Button from "@/components/Button";

import DropdownField from "@/components/DropdownField";
import Field from "@/components/Field";
import FieldGroup from "@/components/FieldGroup";
import FieldLabel from "@/components/FieldLabel";

import { REQUEST_STATUS, URGENT_TYPE } from "@/consts/maintenance";

export const URGENT_EMOJI = {
  [URGENT_TYPE.URGENT]: <Emoji emoji="high-voltage" />,
  [URGENT_TYPE.NON_URGENT]: <Emoji emoji="slightly-smiling-face" />,
  [URGENT_TYPE.EMERGENCY]: <Emoji emoji="fire" />,
  [URGENT_TYPE.LESS_URGENT]: <Emoji emoji="hammer" />,
};

export default function CreatePage() {
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
            <span>Maintenance Request</span>
          </div>

          <form className="pt-[30px]">
            <FieldGroup>
              <FieldLabel required className="mb-2">
                Urgency
              </FieldLabel>
              <DropdownField
                options={[
                  {
                    value: URGENT_TYPE.URGENT,
                    label: "Urgent",
                  },
                  {
                    value: URGENT_TYPE.NON_URGENT,
                    label: "Non Urgent",
                  },
                  {
                    value: URGENT_TYPE.EMERGENCY,
                    label: "Emergency",
                  },
                  {
                    value: URGENT_TYPE.LESS_URGENT,
                    label: "Less Emergency",
                  },
                ]}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel required className="mb-2">
                Status
              </FieldLabel>
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
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel required className="mb-2">
                Title
              </FieldLabel>
              <Field />
            </FieldGroup>
            <FieldGroup className="mb-[46px]">
              <FieldLabel className="mb-2">Description</FieldLabel>
              <Field textarea />
            </FieldGroup>
            <Button className="mx-auto block">Save</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
