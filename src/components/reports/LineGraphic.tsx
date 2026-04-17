"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: unknown[],
}

const BarGraphicDailyTotal = ({ data }: Props) => {
  console.log("DATA PARA GRÁFICO ", data);
  return (
      <BarChart 
        style={{ width: "100%", maxHeight: 350, height: "100%" }} 
        data={data} 
        responsive={true}
        margin={{
          top: 20,
          right: 25,
          bottom: 5,
          left: 5,
        }}        
        >
        <Bar dataKey="monto" type={"Barar"} fill="#1447e6"/>
        <XAxis dataKey="fecha" interval={4}/>
        <YAxis label={{ value: 'Monto diario', position: 'insideLeft', angle: -90, style: { fontSize: 14} }} />
        <Tooltip />
        <CartesianGrid stroke="#bbb" strokeDasharray="2 2" vertical={false}/>
      </BarChart>
  )
};

export { BarGraphicDailyTotal };