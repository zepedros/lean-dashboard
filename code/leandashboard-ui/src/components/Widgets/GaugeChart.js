import GaugeChart from 'react-gauge-chart'

export default function(){
    return(
    <GaugeChart id="gauge-chart3" 
        nrOfLevels={30} 
        colors={["#FF5F6D", "#FFC371"]} 
        arcWidth={0.3} 
        percent={0.37} 
        textColor="#FF5F6D"
      />
    )
}