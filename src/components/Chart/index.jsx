import _ from "lodash";
import {data} from '../../data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts";
import "./Chart.scss";

export const Chart = () => {
  

  const occurencies = _.countBy(data, (item) => item.date);

  const occurenciesData = Object.entries(occurencies).map((item) => {
    const [key, value] = item;
    return {
      date: key,
      count: value,
    };
  });

  console.log(occurenciesData);

  return (
    <div className="chart">
      <div className="chart__wrapper">
        <h1>Статистика обращений</h1>
        
        <LineChart
          width={1000}
          height={500}
          data={occurenciesData}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 20,
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Line type="monotone" dot={false} dataKey="count" fill="#5181b8" />
          <Brush
            dataKey="date"
            height={50}
            stroke="#5181b8"
            travellerWidth={10}
          >
            <LineChart
              data={occurenciesData}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <Line type="monotone" dot={false} dataKey="count" fill="#5181b8" />
            </LineChart>
          </Brush>
        </LineChart>
      </div>
    </div>
  );
};
