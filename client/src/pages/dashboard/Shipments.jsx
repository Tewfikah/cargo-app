import React, { useState } from "react";
import { StatCard } from "../../components/dashboard/Shipments/StatCard";
import { Modal } from "../../components/dashboard/Shipments/Modal";
import { ShipmentTable } from "../../components/dashboard/Shipments/ShipmentTable";
import { shipmentsMock } from "../../mocks/shipments.mock.js";
import { SHIPMENT_STATUS, STATUS_LABELS_EN } from "../../utils/shipmentStatus.js";

const DRIVERS = ["Michael R.", "Sarah L.", "James K.", "Robert M.", "Alice W.", "David B."];

const Shipments = () => {
  const [shipments, setShipments] = useState(shipmentsMock);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "assign" | "status"
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [modalValue, setModalValue] = useState("");

  const filteredData = shipments.filter((item) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      String(item.id || "").toLowerCase().includes(q) ||
      String(item.client || "").toLowerCase().includes(q);

    const matchesFilter = activeFilter === "ALL" || item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const openAssignDriver = (id) => {
    const shipment = shipments.find((s) => s.id === id);
    if (!shipment) return;
    setSelectedShipment(shipment);
    setModalType("assign");
    setModalValue(shipment.driver && shipment.driver !== "Unassigned" ? shipment.driver : DRIVERS[0]);
    setIsModalOpen(true);
  };

  const openUpdateStatus = (id) => {
    const shipment = shipments.find((s) => s.id === id);
    if (!shipment) return;
    setSelectedShipment(shipment);
    setModalType("status");
    setModalValue(shipment.status);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShipment(null);
    setModalType(null);
    setModalValue("");
  };

  const handleSaveChanges = () => {
    if (!selectedShipment) return;

    setShipments((prev) =>
      (prev || []).map((item) => {
        if (item.id !== selectedShipment.id) return item;

        if (modalType === "assign") return { ...item, driver: modalValue };
        if (modalType === "status") return { ...item, status: modalValue };
        return item;
      })
    );

    handleCloseModal();
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Shipment Overview
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Shipments" type="TOTAL" color="#6366f1" shipments={shipments} />
        <StatCard label={STATUS_LABELS_EN.IN_TRANSIT} type={SHIPMENT_STATUS.IN_TRANSIT} color="#3b82f6" shipments={shipments} />
        <StatCard label={STATUS_LABELS_EN.DELIVERED} type={SHIPMENT_STATUS.DELIVERED} color="#10b981" shipments={shipments} />
        <StatCard label={STATUS_LABELS_EN.DELAYED} type={SHIPMENT_STATUS.DELAYED} color="#f43f5e" shipments={shipments} />
      </div>

      <div className="h-[600px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <ShipmentTable
          data={currentItems}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          activeFilter={activeFilter}
          onFilterChange={(filter) => {
            setActiveFilter(filter);
            setCurrentPage(1);
          }}
          searchTerm={searchTerm}
          onSearchChange={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
          onUpdateStatus={openUpdateStatus}
          onAssignDriver={openAssignDriver}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalType === "assign" ? "Assign Driver" : "Update Status"}
      >
        <div className="p-6">
          <div className="mb-6">
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-300">
              Order ID:{" "}
              <span className="font-bold text-slate-800 dark:text-white">
                {selectedShipment?.id}
              </span>
            </p>

            {modalType === "assign" ? (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Select Driver
                </label>
                <select
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                  {DRIVERS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  <option value="Unassigned">Unassigned</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  New Status
                </label>
                <select
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                  <option value={SHIPMENT_STATUS.PENDING}>{STATUS_LABELS_EN.PENDING}</option>
                  <option value={SHIPMENT_STATUS.IN_TRANSIT}>{STATUS_LABELS_EN.IN_TRANSIT}</option>
                  <option value={SHIPMENT_STATUS.DELIVERED}>{STATUS_LABELS_EN.DELIVERED}</option>
                  <option value={SHIPMENT_STATUS.DELAYED}>{STATUS_LABELS_EN.DELAYED}</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCloseModal}
              className="rounded-lg px-4 py-2 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Shipments;