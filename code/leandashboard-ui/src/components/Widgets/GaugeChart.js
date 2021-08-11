import GaugeChart from 'react-gauge-chart'

export default function ({ widget }) {
  return (
    <GaugeChart id="gauge-chart3"
      nrOfLevels={30}
      colors={["#FF5F6D", "#FFC371"]}
      arcWidth={0.3}
      percent={widget.data[0].info.percentage / 100}
      textColor="black"
    />
  )
}