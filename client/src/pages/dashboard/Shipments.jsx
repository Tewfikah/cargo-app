import React, { useState } from "react";
import { StatCard } from "../../components/dashboard/Shipments/StatCard";
import { Modal } from "../../components/dashboard/Shipments/Modal";
import { ShipmentTable } from "../../components/dashboard/Shipments/ShipmentTable";

const dummyShipments = [
  {
    id: "#SHP-001",
    customer: "TechGiant Inc.",
    status: "In Transit",
    driver: "Michael R.",
    eta: "2h 15m",
  },
  {
    id: "#SHP-002",
    customer: "Green Grocers",
    status: "Delivered",
    driver: "Sarah L.",
    eta: "Completed",
  },
  {
    id: "#SHP-003",
    customer: "AutoParts Ltd.",
    status: "Pending",
    driver: "Unassigned",
    eta: "Pending",
  },
  {
    id: "#SHP-004",
    customer: "Fashion Week",
    status: "Delayed",
    driver: "James K.",
    eta: "Delayed +4h",
  },
  {
    id: "#SHP-005",
    customer: "MediCare Plus",
    status: "In Transit",
    driver: "Robert M.",
    eta: "45m",
  },
  {
    id: "#SHP-006",
    customer: "Global Logistics",
    status: "Pending",
    driver: "Unassigned",
    eta: "Pending",
  },
  {
    id: "#SHP-007",
    customer: "FastTrack Delivery",
    status: "Delivered",
    driver: "Alice W.",
    eta: "Completed",
  },
  {
    id: "#SHP-008",
    customer: "Prime Movers",
    status: "In Transit",
    driver: "David B.",
    eta: "3h 10m",
  },
];

const Shipments = () => {
  const [shipments, setShipments] = useState(dummyShipments);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'assign' or 'status'
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [modalValue, setModalValue] = useState("");

  // Filter Logic
  const filteredData = shipments.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
  const handleAssignDriver = (id) => {
    const shipment = shipments.find((s) => s.id === id);
    setSelectedShipment(shipment);
    setModalType("assign");
    setModalValue(shipment.driver === "Unassigned" ? "Michael R." : shipment.driver);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (id) => {
    const shipment = shipments.find((s) => s.id === id);
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

    const updatedShipments = shipments.map((item) => {
      if (item.id === selectedShipment.id) {
        if (modalType === "assign") {
          return { ...item, driver: modalValue };
        } else if (modalType === "status") {
          return { ...item, status: modalValue };
        }
      }
      return item;
    });

    setShipments(updatedShipments);
    handleCloseModal();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Shipment Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Shipments" value="1,248" type="Pending" color="#6366f1" />
        <StatCard label="In Transit" value="42" type="In Transit" color="#3b82f6" />
        <StatCard label="Delivered" value="892" type="Delivered" color="#10b981" />
        <StatCard label="Delayed" value="15" type="Delayed" color="#f43f5e" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[600px]">
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
          onUpdateStatus={handleUpdateStatus}
          onAssignDriver={handleAssignDriver}
        />
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalType === "assign" ? "Assign Driver" : "Update Status"}
      >
        <div className="p-6">
          <div className="mb-6">
            <p className="text-sm text-slate-500 mb-2">
              Order ID: <span className="font-bold text-slate-800">{selectedShipment?.id}</span>
            </p>
            
            {modalType === "assign" ? (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Driver</label>
                <select
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="Michael R.">Michael R.</option>
                  <option value="Sarah L.">Sarah L.</option>
                  <option value="James K.">James K.</option>
                  <option value="Robert M.">Robert M.</option>
                  <option value="Alice W.">Alice W.</option>
                  <option value="David B.">David B.</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Status</label>
                <select
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={handleCloseModal} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Save Changes</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Shipments;
