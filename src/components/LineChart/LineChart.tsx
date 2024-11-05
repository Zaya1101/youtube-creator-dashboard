import { useMemo } from "react";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";

import {
  LineChart as EchartsLineChart,
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent
} from "echarts/components";

import {
  SVGRenderer
} from "echarts/renderers";

import { ECBasicOption } from "echarts/types/dist/shared";

type LineChartProps = {
  chartData: string[];
  total: number;
}

echarts.use([TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, EchartsLineChart, SVGRenderer]);

export default function LineChart({
  chartData, 
  total 
}: LineChartProps) {
  
  const lineChartOptions: ECBasicOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: "time",
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: chartData,
          type: "line"
        }
      ]
    };
  }, [chartData]);

  return (
    <div>
      <ReactEChartsCore
        echarts={echarts}
        option={lineChartOptions}
        style={{width: "100%"}}
        opts={{renderer: "svg"}}
      />
    </div>
  );
}