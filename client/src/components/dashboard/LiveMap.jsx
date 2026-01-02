import  React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const vehicleLocations = [
  {
    id: 1,
    name: "Truck A",
    position: [9.03, 38.74], // Addis Ababa
    status: "In Transit",
  },
  {
    id: 2,
    name: "Truck B",
    position: [8.98, 38.79],
    status: "Delivering",
  },
  {
    id: 3,
    name: "Truck C",
    position: [9.05, 38.76],
    status: "Idle",
  },
];

const LiveMap = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Live Fleet Map
      </h3>

      <div className="h-80 w-full rounded-xl overflow-hidden">
        <MapContainer
          center={[9.03, 38.74]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {vehicleLocations.map((vehicle) => (
            <Marker key={vehicle.id} position={vehicle.position}>
              <Popup>
                <strong>{vehicle.name}</strong> <br />
                Status: {vehicle.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMap;
