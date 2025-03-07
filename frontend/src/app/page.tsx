import { formatDate } from "date-fns";
import Emoji from "react-emojis";
import { MdAdd } from "react-icons/md";

export default function Home() {
  const metrics = [
    {
      value: 1,
      title: "Open Requests",
    },
    {
      value: 3,
      title: "Urgent Requests",
    },
    {
      value: 3,
      title: "Average time (days) to resolve",
    },
  ];
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
                  {value}
                </div>
                <div className="text-[9px]">{title}</div>
              </div>
            ))}
          </div>

          <div
            style={{ scrollbarWidth: "thin" }}
            className="max-h-[65vh] overflow-y-auto flex flex-col gap-5 w-full pb-4"
          >
            {[...Array(5)].map((_, idx) => (
              <div
                className="bg-white flex justify-between items-center p-4 rounded-xl shadow-md"
                key={idx}
              >
                <div className="text-sm">
                  <div className="font-medium">Front Door Lock Broken</div>
                  <div className="mt-2.5">
                    <Emoji emoji="woman-dancing" />
                    <span className="text-emerald-green font-light ml-1">
                      Non Urgent
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-steel-blue">
                    {formatDate(new Date(), "dd MMM yyyy")}
                  </div>
                  <div className="px-2 py-0.5 text-xs text-white bg-teal-oasis rounded-full mt-2.5">
                    Mark as Resolve
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 flex justify-end">
            <div className="flex items-center justify-center cursor-pointer rounded-full shadow-sm bg-teal-oasis h-12 w-12">
              <MdAdd color="white" size="28px"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
