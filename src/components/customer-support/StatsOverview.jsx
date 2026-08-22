import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import React from "react";

import DashboardCard from "../ui/DashboardCard";
import colors from "../../constants/colors";


export default function StatsOverview() {
  const stats = [
    {
      title: "Total",
      highlight: "Chat",
      value: "357",
      trendIcon: <ArrowUpRight size={16} />,
      trendText: "+12 from last month",
      trendColor: colors.success,
    },
    {
      title: "Total",
      highlight: "Tickets",
      value: "102",
      trendIcon: <ArrowUpRight size={16} />,
      trendText: "+8.2 from last period",
      trendColor: colors.success,
    },
    {
      title: "Avg Response",
      highlight: "Time",
      value: "2m 28s",
      trendIcon: <ArrowDownRight size={16} />,
      trendText: "-15.3% faster than before",
      trendColor: colors.success,
    },
    {
      title: "Resolution",
      highlight: "Rate",
      value: "94.2%",
      trendIcon: <ArrowUpRight size={16} />,
      trendText: "+12 from last month",
      trendColor: colors.success,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        marginTop: "20px",
        justifyContent:"center"
      }}
    >
      {stats.map((item, index) => (
        <DashboardCard
          key={index}
          title={item.title}
          highlight={item.highlight}
          value={item.value}
          trendIcon={item.trendIcon}
          trendText={item.trendText}
          trendColor={item.trendColor}
        />
      ))}
    </div>
  );
}

