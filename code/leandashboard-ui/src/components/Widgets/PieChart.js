import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';

const PieChart = (props) => {
  const theme = useTheme();

  var keys = Object.keys(props.widget.data[0].counts);
  console.log(keys)
  var labelsAux=[]
  for(let i = 0; i < keys.length;i++){
    labelsAux.push(props.widget.data[0].counts[i].status)
    console.log(props.widget.data[0].counts[i].status)
  }
  console.log(labelsAux)

  let dataAux= []
  for(let i = 0; i<keys.length;i++){
    dataAux.push(props.widget.data[0].counts[i].percentage)
  }
  console.log(dataAux)
  const data = {
    datasets: [
      {
        data: dataAux,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.green[600],
          colors.pink[200]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: labelsAux
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props.widget}>
      <CardHeader title={props.widget.name} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart;