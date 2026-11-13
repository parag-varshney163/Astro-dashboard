import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, } from "recharts";
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, } from "recharts";
// import React from "react";
// import colors from "../../constants/colors";
// const PIE_COLORS = [
//   "#EF4444", // Red
//   "#3B82F6", // Blue
//   "#10B981", // Green
// ];
// export default function NotificationCharts({ data }) {
//   if (!data) return null;
//   const funnelData = [
//     {
//       name: "Sent",
//       value: data.notificationFunnel?.sent || 0,
//     },
//     {
//       name: "Delivered",
//       value: data.notificationFunnel?.delivered || 0,
//     },
//     {
//       name: "Opened",
//       value: data.notificationFunnel?.opened || 0,
//     },
//   ];
//   const notificationTypes = [
//     {
//       name: "Campaign",
//       value: data.notificationTypes?.campaign || 0,
//     },
//     {
//       name: "Transactional",
//       value: data.notificationTypes?.transactional || 0,
//     },
//     {
//       name: "System",
//       value: data.notificationTypes?.system || 0,
//     },
//   ].filter((item) => item.value > 0);
//   const campaign = data.topPerformingCampaign || {};
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr 1fr",
//         gap: 20,
//         marginTop: 24,
//       }}
//     >
//       {/* Funnel */}
//       <div
//         style={{
//           background: colors.cardBg,
//           border: `1px solid ${colors.cardBorder}`,
//           borderRadius: 24,
//           padding: 24,
//         }}
//       >
//         <h3
//           style={{
//             color: colors.textPrimary,
//             fontSize: 18,
//             marginBottom: 4,
//           }}
//         >
//           Notification Funnel
//         </h3>
//         <p
//           style={{
//             color: colors.textSecondary,
//             fontSize: 14,
//             marginBottom: 20,
//           }}
//         >
//           Sent → Delivered → Opened
//         </p>
//         <div style={{ height: 300 }}>
//           <ResponsiveContainer>
//             <BarChart data={funnelData}>
//               <XAxis
//                 dataKey="name"
//                 tick={{ fill: colors.textSecondary }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <YAxis
//                 tick={{ fill: colors.textSecondary }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <Tooltip
//                 contentStyle={{
//                   background: colors.secondary,
//                   border: `1px solid ${colors.cardBorder}`,
//                 }}
//               />
//               <Bar
//                 dataKey="value"
//                 fill="#E4C84D"
//                 radius={[8, 8, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       {/* Notification Types */}
//       <div
//         style={{
//           background: colors.cardBg,
//           border: `1px solid ${colors.cardBorder}`,
//           borderRadius: 24,
//           padding: 24,
//         }}
//       >
//         <h3
//           style={{
//             color: colors.textPrimary,
//             fontSize: 18,
//             marginBottom: 4,
//           }}
//         >
//           Notification Types
//         </h3>
//         <p
//           style={{
//             color: colors.textSecondary,
//             fontSize: 14,
//             marginBottom: 20,
//           }}
//         >
//           Distribution by type
//         </p>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 24,
//           }}
//         >
//           <div
//             style={{
//               flex: 1,
//               height: 260,
//             }}
//           >
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie
//                   data={notificationTypes}
//                   dataKey="value"
//                   innerRadius={50}
//                   outerRadius={85}
//                   stroke={colors.primary}
//                 >
//                   {notificationTypes.map((entry, index) => (
//                     <Cell
//                       key={index}
//                       fill={PIE_COLORS[index]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div
//             style={{
//               width: 170,
//               display: "flex",
//               flexDirection: "column",
//               gap: 18,
//             }}
//           >
//             {notificationTypes.map((item, index) => (
//               <div
//                 key={item.name}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 10,
//                       height: 10,
//                       borderRadius: "50%",
//                       background: PIE_COLORS[index],
//                     }}
//                   />
//                   <span
//                     style={{
//                       color: colors.textSecondary,
//                     }}
//                   >
//                     {item.name}
//                   </span>
//                 </div>
//                 <span
//                   style={{
//                     color: colors.textPrimary,
//                     fontWeight: 700,
//                   }}
//                 >
//                   {item.value.toLocaleString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* Top Campaign */}
//       <div
//         style={{
//           background: colors.cardBg,
//           border: `1px solid ${colors.cardBorder}`,
//           borderRadius: 24,
//           padding: 24,
//         }}
//       >
//         <h3
//           style={{
//             color: colors.textPrimary,
//             fontSize: 18,
//             marginBottom: 4,
//           }}
//         >
//           Top Performing Campaign
//         </h3>
//         <p
//           style={{
//             color: colors.textSecondary,
//             fontSize: 14,
//             marginBottom: 30,
//           }}
//         >
//           Highest CTR today
//         </p>
//         <div
//           style={{
//             color: colors.textPrimary,
//             fontSize: 22,
//             fontWeight: 600,
//             marginBottom: 20,
//           }}
//         >
//           {campaign.name || "No Campaign"}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "baseline",
//             gap: 10,
//             marginBottom: 20,
//           }}
//         >
//           <span
//             style={{
//               fontSize: 46,
//               fontWeight: 700,
//               color: "#E4C84D",
//             }}
//           >
//             {campaign.ctr || 0}%
//           </span>
//           <span
//             style={{
//               color: colors.textSecondary,
//               fontSize: 20,
//             }}
//           >
//             CTR
//           </span>
//         </div>
//         <div
//           style={{
//             height: 14,
//             background: "rgba(255,255,255,.05)",
//             borderRadius: 20,
//             overflow: "hidden",
//             marginBottom: 30,
//           }}
//         >
//           <div
//             style={{
//               width: `${campaign.ctr || 0}%`,
//               height: "100%",
//               background: "#69C89D",
//               borderRadius: 20,
//             }}
//           />
//         </div>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: 16,
//           }}
//         >
//           <div
//             style={{
//               border: `1px solid ${colors.cardBorder}`,
//               borderRadius: 16,
//               padding: 16,
//             }}
//           >
//             <div
//               style={{
//                 color: colors.textSecondary,
//                 marginBottom: 10,
//               }}
//             >
//               Notification → Recharge
//             </div>
//             <div
//               style={{
//                 fontSize: 36,
//                 fontWeight: 700,
//                 color: colors.textPrimary,
//               }}
//             >
//               {campaign.rechargeConv || 0}%
//             </div>
//           </div>
//           <div
//             style={{
//               border: `1px solid ${colors.cardBorder}`,
//               borderRadius: 16,
//               padding: 16,
//             }}
//           >
//             <div
//               style={{
//                 color: colors.textSecondary,
//                 marginBottom: 10,
//               }}
//             >
//               Avg Open Rate
//             </div>
//             <div
//               style={{
//                 fontSize: 36,
//                 fontWeight: 700,
//                 color: colors.textPrimary,
//               }}
//             >
//               {campaign.avgOpenRate || 0}%
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const PIE_COLORS = [
  colors.accent,
  colors.success,
  colors.accentLight,
];

export default function NotificationCharts({ filter, refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Notification Funnel API
  useEffect(() => {
    const fetchNotificationFunnel = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(
          "/api/v1/customer/notification/funnel",
          {
            params: { filter },
          }
        );

        console.log("Notification Funnel API:", response.data);

        setData(response?.data?.data || null);
      } catch (err) {
        console.error("Notification Funnel API Error:", err);
        setError("Failed to load notification funnel.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationFunnel();
  }, [filter, refreshKey]);

  if (loading) {
    return (
      <div style={{ color: colors.textSecondary, padding: 20 }}>
        Loading notification charts...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: colors.danger, padding: 20 }}>
        {error}
      </div>
    );
  }

  if (!data) return null;

  // API Funnel Data
  const funnelData = [
    { name: "Sent", value: data.sent ?? 0 },
    { name: "Delivered", value: data.delivered ?? 0 },
    { name: "Opened", value: data.opened ?? 0 },
    { name: "Clicks", value: data.clicks ?? 0 },
  ];

  // API Type Breakdown
  const typeBreakdown = data.typeBreakdown || {};

  const notificationTypes = [
    {
      name: "Campaign",
      value: typeBreakdown.Campaign?.sent ?? 0,
    },
    {
      name: "Transactional",
      value: typeBreakdown.Transactional?.sent ?? 0,
    },
    {
      name: "System",
      value: typeBreakdown.System?.sent ?? 0,
    },
  ];

  const campaign = data.topCampaign || {};

  const ctr = Number(campaign.ctr ?? 0);
  const rechargeConversion = campaign.rechargeConversion;
  const averageOpenRate = campaign.averageOpenRate ?? 0;

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-IN");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20,
        marginTop: 24,
      }}
    >
      {/* Notification Funnel */}
      <div
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 20,
          padding: 24,
          minWidth: 0,
        }}
      >
        <h3
          style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Notification Funnel
        </h3>

        <p
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          Sent → Delivered → Opened → Clicks
        </p>

        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData}>
              <XAxis
                dataKey="name"
                tick={{ fill: colors.textSecondary, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: colors.textSecondary, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatNumber}
              />

              <Tooltip
                formatter={(value) => formatNumber(value)}
                contentStyle={{
                  background: colors.secondary,
                  border: `1px solid ${colors.cardBorder}`,
                  borderRadius: 10,
                  color: colors.textPrimary,
                }}
              />

              <Bar
                dataKey="value"
                fill={colors.accent}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notification Types */}
      <div
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 20,
          padding: 24,
          minWidth: 0,
        }}
      >
        <h3
          style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Notification Types
        </h3>

        <p
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          Distribution by notification type
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ flex: "1 1 150px", height: 250, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={notificationTypes}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke={colors.primary}
                >
                  {notificationTypes.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => formatNumber(value)}
                  contentStyle={{
                    background: colors.secondary,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: 10,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              flex: "1 1 130px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {notificationTypes.map((item, index) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: PIE_COLORS[index],
                    }}
                  />

                  <span
                    style={{
                      color: colors.textSecondary,
                      fontSize: 13,
                    }}
                  >
                    {item.name}
                  </span>
                </div>

                <span
                  style={{
                    color: colors.textPrimary,
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {formatNumber(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Campaign */}
      <div
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 20,
          padding: 24,
          minWidth: 0,
        }}
      >
        <h3
          style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Top Performing Campaign
        </h3>

        <p
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          Campaign performance for selected period
        </p>

        <div
          style={{
            color: colors.textPrimary,
            fontSize: 19,
            fontWeight: 600,
            marginBottom: 20,
            wordBreak: "break-word",
          }}
        >
          {campaign.name || "No Campaign"}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: colors.accentLight,
            }}
          >
            {ctr}%
          </span>

          <span
            style={{
              color: colors.textSecondary,
              fontSize: 16,
            }}
          >
            CTR
          </span>
        </div>

        <div
          style={{
            height: 12,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 26,
          }}
        >
          <div
            style={{
              width: `${Math.min(Math.max(ctr, 0), 100)}%`,
              height: "100%",
              background: colors.accent,
              borderRadius: 20,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <div
            style={{
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 14,
              padding: 14,
              minWidth: 0,
            }}
          >
            <div
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              Notification → Recharge
            </div>

            <div
              style={{
                fontSize: 25,
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              {rechargeConversion == null
                ? "N/A"
                : `${rechargeConversion}%`}
            </div>
          </div>

          <div
            style={{
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 14,
              padding: 14,
              minWidth: 0,
            }}
          >
            <div
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              Average Open Rate
            </div>

            <div
              style={{
                fontSize: 25,
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              {averageOpenRate}%
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            color: colors.textSecondary,
            fontSize: 12,
          }}
        >
          Campaign Clicks:{" "}
          <span style={{ color: colors.textPrimary, fontWeight: 700 }}>
            {formatNumber(campaign.clicks)}
          </span>
        </div>
      </div>
    </div>
  );
}
