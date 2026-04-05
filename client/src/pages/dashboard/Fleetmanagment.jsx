import React, { useState } from "react";
import StatsCards from "../../components/dashboard/fleet-managmet/StatsCards";
import VehicleTable from "../../components/dashboard/fleet-managmet/VehicleTable";
import MaintenanceModal from "../../components/dashboard/fleet-managmet/MaintenanceModal";
import INITIAL_VEHICLES from "../../components/dashboard/fleet-managmet/vehiclesData";

const Fleetmanagment = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);

  return (
    <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
        Fleet Management
      </h1>

      <StatsCards vehicles={vehicles} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VehicleTable
            vehicles={vehicles}
            setVehicles={setVehicles}
            onMaintenanceClick={(id) => setSelectedVehicle(id)}
          />
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <MaintenanceModal
              vehicleId={selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
              inline
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Fleetmanagment;