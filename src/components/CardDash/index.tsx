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
    <Card className="w-full p-4 dark:bg-dark-paper">
      <div className="flex gap-4">
        {icon}

        <div>
          <p className="text-xl font-bold text-text-secondary dark:text-dark-gray">
            <CountUp end={title} separator=" " />
          </p>
          <p className="text-text-subtitle dark:text-dark-gray">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
};
