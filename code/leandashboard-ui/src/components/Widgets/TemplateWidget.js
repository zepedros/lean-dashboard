import DataTable from './DataTable'
import PieChart from './PieChart'
import BarChart from './BarChart'
import GaugeChart from './GaugeChart'
export default function ({ type, widget }) {
    switch (type) {
        case "BarChart": return (<BarChart widget={widget}/>)
        case "PieChart": return (<PieChart widget={widget} template={undefined} />)
        case "DataTable": return (<DataTable widget={widget}/>)
        case "GaugeChart": return (<GaugeChart widget={widget}/>)
        default: return <div></div>
    }
}