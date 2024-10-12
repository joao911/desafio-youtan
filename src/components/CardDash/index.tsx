import React from "react";
import { Card } from "@mui/material";
import CountUp from "react-countup";

interface CardDashProps {
  icon: React.ReactNode;
  title: number;
  subtitle: string;
}

export const CardDash: React.FC<CardDashProps> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <Card className="w-full p-4">
      <div className="flex gap-4">
        {icon}

        <div>
          <p className="text-xl font-bold text-text-secondary">
            <CountUp end={title} separator=" " />
          </p>
          <p className="text-text-subtitle">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
};
