"use client";

import { TimePeriod, userReport } from "@/lib/types/core.types";
import "../../lib/chart_registration";
import { PositiveSkills } from "./positive_skills";
import { NegativeSkills } from "./negative_skills";
import { MonthOnMonthComp } from "./month_on_month_comparisons";

export interface ReportProps {
  data: userReport;
  period: TimePeriod;
}

function generateSummary(data: userReport | null) {
  const summary: string[] = ["summary", "summary summary"];
  if (data === null) return summary;
  data;
  return summary;
}

export function Report({ data, period }: ReportProps) {
  const summary = generateSummary(data);
  return (
    <div className=" flex flex-col mt-8 w-full max-w-7xl items-center">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Summary</h3>
          <ol className="list-decimal list-inside p-2">
            {summary.map((element, index) => (
              <li className="list-item" key={index}>
                {element}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Insights</h3>
          <ol className="list-decimal list-inside p-2">
            {data.summary.map((element, index) => (
              <li className="list-item" key={index}>
                {element}
              </li>
            ))}
          </ol>
        </div>
      </div>
      {data.positiveSkills ? (
        <PositiveSkills period={period} data={data} />
      ) : (
        <div>Positive Skills not available please regenerate the report.</div>
      )}
      {data.negativeSkills ? (
        <NegativeSkills period={period} data={data} />
      ) : (
        <div>Negative Skills not available please regenerate the report.</div>
      )}
      <MonthOnMonthComp period={period} data={data} />
    </div>
  );
}