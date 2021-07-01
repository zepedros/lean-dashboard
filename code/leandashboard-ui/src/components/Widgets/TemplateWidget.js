import DataTable from './DataTable'
import PieChart from './PieChart'
import BarChart from './BarChart'
import GaugeChart from './GaugeChart'
export default function ({ type }) {
    switch (type) {
        case "BarChart": return (<BarChart />)
        case "PieChart": return (<PieChart template={undefined} />)
        case "DataTable": return (<DataTable />)
        case "GaugeChart": return (<GaugeChart/>)
        default: return <div></div>
    }
}