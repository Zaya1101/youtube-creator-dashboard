import { useMemo } from "react";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";

import {
  PieChart as EchartsPieChart,
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

type PieChartProps = {
  chartData: Array<{
    name: string
    value: number
  }> | undefined;
  total: number;
}

echarts.use([TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, EchartsPieChart, SVGRenderer]);

export default function PieChart({
  chartData, 
  total 
}: PieChartProps) {
  
  const pieChartOptions: ECBasicOption = useMemo(() => {
    return {
      title: {
        show: false
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        show: true,
        right: 100,
        top: 30,
        bottom: 0,
        selected: {
          "Unknown": false,
        }
      },
      series: [
        {
          name: "Total",
          type: "pie",
          radius: ["45%", "80%"],
          center: ["30%", "50%"],
          left: 0,
          top: 0,
          bottom: 0,
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          data: chartData
        }
      ]
    };
  }, [chartData]);

  return (
    <div>
      <ReactEChartsCore
        echarts={echarts}
        option={pieChartOptions}
        style={{width: "100%"}}
        opts={{renderer: "svg"}}
      />
    </div>
  );
}