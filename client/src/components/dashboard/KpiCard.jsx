import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const KPICard = ({
  title,
  value,
  icon: Icon,
  iconColor = "bg-blue-500",
  type = "simple",
  progress = 0,
  badgeLabel,
  chartData = [],
}) => {
  return (
    <div className="relative bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
      
      {/* Accent line */}
      <div className={`absolute top-0 left-0 h-1 w-full ${iconColor} rounded-t-xl`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className={`p-3 rounded-xl ${iconColor} bg-opacity-10 group-hover:scale-110 transition`}
          >
            <Icon
              className={`w-6 h-6 ${iconColor.replace("bg-", "text-")}`}
            />
          </div>
        )}
      </div>

      {/* Badge */}
      {type === "badge" && badgeLabel && (
        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
          {badgeLabel}
        </span>
      )}

      {/* Progress */}
      {type === "progress" && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${iconColor} transition-all duration-700`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Donut */}
      {type === "donut" && (
        <div className="mt-2 h-16 w-16">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { value: progress },
                  { value: 100 - progress },
                ]}
                innerRadius={20}
                outerRadius={28}
                startAngle={90}
                endAngle={450}
                dataKey="value"
              >
                <Cell fill="#22c55e" />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Sparkline */}
      {type === "sparkline" && chartData.length > 0 && (
        <div className="h-12 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="y"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default KPICard;
