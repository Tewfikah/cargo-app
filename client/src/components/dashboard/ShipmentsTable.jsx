import React from "react";

const shipments = [
  {
    id: "SH-1021",
    client: "Addis Logistics",
    origin: "አዲስ አበባ",
    destination: "ድሬ ዳዋ",
    status: "በመጓጓዣ ላይ",
    date: "2026-01-01",
  },
  {
    id: "SH-1022",
    client: "Ethio Cargo",
    origin: "አዳማ",
    destination: "መቀሌ",
    status: "ተልኳል",
    date: "2026-01-01",
  },
  {
    id: "SH-1023",
    client: "Blue Nile Transport",
    origin: "ባህር ዳር",
    destination: "ጎንደር",
    status: "በመጠባበቅ",
    date: "2026-01-02",
  },
];

const statusStyles = {
  "በመጓጓዣ ላይ": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "ተልኳል": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "በመጠባበቅ": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

const ShipmentsTable = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          የቅርብ ጊዜ ጭነቶች
        </h3>
        <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          ሁሉንም ይመልከቱ
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500 dark:border-slate-700 dark:text-slate-300">
              <th className="py-3">የጭነት መለያ</th>
              <th>ደንበኛ</th>
              <th>መንገድ</th>
              <th>ሁኔታ</th>
              <th>ቀን</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="border-b transition hover:bg-gray-50 last:border-none dark:border-slate-700 dark:hover:bg-slate-700/40"
              >
                <td className="py-3 font-medium text-gray-800 dark:text-white">
                  {shipment.id}
                </td>

                <td className="text-gray-700 dark:text-slate-200">
                  {shipment.client}
                </td>

                <td className="text-gray-600 dark:text-slate-300">
                  {shipment.origin} → {shipment.destination}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[shipment.status]}`}
                  >
                    {shipment.status}
                  </span>
                </td>

                <td className="text-gray-500 dark:text-slate-400">
                  {shipment.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentsTable;