import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const BarChart = ({widget}) => {
  const theme = useTheme();
  var keys = Object.keys(widget.data[0].counts);
  var labelsAux=[]
  for(let i = 0; i < keys.length;i++){
    labelsAux.push(Object.keys(widget.data[0].counts[i]))
  }
 
  labelsAux = labelsAux.flat(Infinity)
  
  let dataAux= []
  for(let i = 0; i<keys.length;i++){
    dataAux.push(widget.data[0].counts[i][labelsAux[i]])
  }

  const data = {
    labels: labelsAux,
    datasets: [
      { 
        label: widget.data[0].name,
        data: dataAux,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor:'rgba(54, 162, 235, 0.2)',
        borderWidth: 1,

      },
    ],
   
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div>
    <Card {...widget}>
      <CardHeader
        title="Bar Chart"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 200,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      
    </Card>
    </div>
  );
};

export default BarChart