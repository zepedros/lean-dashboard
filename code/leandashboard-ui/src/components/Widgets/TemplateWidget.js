import DataTable from './DataTable'
import PieChart from './PieChart'
import BarChart from './BarChart'
import GaugeChart from './GaugeChart'
export default function ({ type, data }) {
    switch (type) {
        case "BarChart": return (<BarChart data={data}/>)
        case "PieChart": return (<PieChart template={undefined} />)
        case "DataTable": return (<DataTable />)
        case "GaugeChart": return (<GaugeChart/>)
        default: return <div></div>
    }
}