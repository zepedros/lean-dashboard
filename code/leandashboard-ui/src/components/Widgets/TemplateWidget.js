import BarChart from './BarChart'
import DataTable from './DataTable'
import GaugeChart from './GaugeChart'
import PieChart from './PieChart'
export default function ({ type, widget }) {
    switch (type) {
        case "BarChart": return (<BarChart widget={widget}/>)
        case "PieChart": return (<PieChart widget={widget}/>)
        case "DataTable": return (<DataTable widget={widget}/>)
        case "GaugeChart": return (<GaugeChart widget={widget}/>)
        default: return <div></div>
    }
}