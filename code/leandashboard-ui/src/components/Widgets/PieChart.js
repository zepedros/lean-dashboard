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
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

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

  const devices = [
    {
      title: 'RUNNING',
      value: 100,
      icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'READY',
      value: 0,
      icon: TabletIcon,
      color: colors.red[600]
    },
    {
      title: 'SUCCESS',
      value: 0,
      icon: PhoneIcon,
      color: colors.orange[600]
    }
  ];

  return (
    <Card {...props.widget}>
      <CardHeader title="Tests" />
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
        {props.template ?
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            {devices.map(({
              color,
              icon: Icon,
              title,
              value
            }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: 'center'
                }}
              >
                <Icon color="action" />
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <Typography
                  style={{ color }}
                  variant="h2"
                >
                  {value}
                  %
                </Typography>
              </Box>
            ))}
          </Box> : null
        }
      </CardContent>
    </Card>
  );
};

export default PieChart;