import React from "react";
const shipments = [
  {
    id: "SH-1021",
    client: "Addis Logistics",
    origin: "Addis Ababa",
    destination: "Dire Dawa",
    status: "In Transit",
    date: "2026-01-01",
  },
  {
    id: "SH-1022",
    client: "Ethio Cargo",
    origin: "Adama",
    destination: "Mekelle",
    status: "Delivered",
    date: "2026-01-01",
  },
  {
    id: "SH-1023",
    client: "Blue Nile Transport",
    origin: "Bahir Dar",
    destination: "Gondar",
    status: "Pending",
    date: "2026-01-02",
  },
];

const statusStyles = {
  "In Transit": "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
};

const ShipmentsTable = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Shipments
        </h3>
        <button className="text-sm text-blue-600 hover:underline">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Shipment ID</th>
              <th>Client</th>
              <th>Route</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 font-medium text-gray-800">
                  {shipment.id}
                </td>

                <td className="text-gray-700">
                  {shipment.client}
                </td>

                <td className="text-gray-600">
                  {shipment.origin} → {shipment.destination}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[shipment.status]}`}
                  >
                    {shipment.status}
                  </span>
                </td>

                <td className="text-gray-500">
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
