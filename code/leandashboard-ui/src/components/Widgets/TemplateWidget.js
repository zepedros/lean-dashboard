import DataTable from './DataTable'
import PieChart from './PieChart'
import BarChart from './BarChart'


export default function({type}){
    switch(type){
        case "BarChart" : return(<BarChart />) 
        case "PieChart" : return (<PieChart />)
        case "DataTable" : return (<DataTable />)
        case "GaugeChart" : return(<PieChart template={false}/>)
    }
}