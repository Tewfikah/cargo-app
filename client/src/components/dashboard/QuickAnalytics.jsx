import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import {
  DAILY_DELIVERIES,
  REVENUE_VS_COST,
  FUEL_CONSUMPTION,
} from "./constants";

const AnalyticsCard = ({ title, children }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <h4 className="text-sm font-bold text-gray-800 mb-4">
        {title}
      </h4>
      <div className="h-32">{children}</div>
    </div>
  );
};

const QuickAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Daily Deliveries */}
      <AnalyticsCard title="Daily Deliveries">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DAILY_DELIVERIES}>
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      {/* Revenue vs Cost */}
      <AnalyticsCard title="Revenue vs Cost">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={REVENUE_VS_COST}>
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      {/* Fuel Consumption */}
      <AnalyticsCard title="Fuel Consumption (L)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FUEL_CONSUMPTION}>
            <Bar
              dataKey="value"
              fill="#60a5fa"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsCard>

    </div>
  );
};

export default QuickAnalytics;
