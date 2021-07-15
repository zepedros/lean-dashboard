import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';

const BarChart = ({widget}) => {
  const theme = useTheme();
  var keys = Object.keys(widget.data[0].counts);
  console.log(keys)
  var labelsAux=[]
  for(let i = 0; i < keys.length;i++){
    labelsAux.push(Object.keys(widget.data[0].counts[i]))
    console.log(widget.data[0].counts[i])
  }
 
  labelsAux = labelsAux.flat(Infinity)
  
  let dataAux= []
  for(let i = 0; i<keys.length;i++){
    dataAux.push(widget.data[0].counts[i][labelsAux[i]])
  }
  console.log(dataAux)
  const data = {
    labels: labelsAux,
    datasets: [
      { 
        label: widget.data[0].sprintName,
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
        title="Issues"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      </Box>
    </Card>
    </div>
  );
};

export default BarChart