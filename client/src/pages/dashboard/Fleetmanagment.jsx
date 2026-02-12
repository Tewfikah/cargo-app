import React, { useState } from 'react'
import StatsCards from '../../components/dashboard/fleet-managmet/StatsCards'
import VehicleTable from '../../components/dashboard/fleet-managmet/VehicleTable'
import MaintenanceModal from '../../components/dashboard/fleet-managmet/MaintenanceModal'


const Fleetmanagment = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Fleet Management</h1>
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <VehicleTable onMaintenanceClick={(id) => setSelectedVehicle(id)} />
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <MaintenanceModal vehicleId={selectedVehicle} onClose={() => setSelectedVehicle(null)} inline />
          </div>
        </aside>
      </div>
    </>
  )
}

export default Fleetmanagment
