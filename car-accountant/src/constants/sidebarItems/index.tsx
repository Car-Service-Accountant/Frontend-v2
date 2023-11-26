import GridViewIcon from '@mui/icons-material/GridView'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'
import CommuteIcon from '@mui/icons-material/Commute'
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined'
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'

export const guestItems = [
  {
    label: 'Табло',
    path: '/',
    icon: <GridViewIcon style={{ marginRight: '10px' }} />,
  },
  {
    label: 'Добави кола',
    path: '/AddCar',
    icon: <DirectionsCarOutlinedIcon style={{ marginRight: '10px' }} />,
  },
  {
    label: 'Добави ремонт',
    path: '/AddRepair',
    icon: <HandymanOutlinedIcon style={{ marginRight: '10px' }} />,
  },
  {
    label: 'Всички коли',
    path: '/AllCars',
    icon: <CommuteIcon style={{ marginRight: '10px' }} />,
  },
  {
    label: 'Коли в ремонт',
    path: '/CarsInService',
    icon: <CarRepairOutlinedIcon style={{ marginRight: '10px' }} />,
  },
]

export const managerItems = [
  {
    label: 'Чакащи плащания',
    path: '/AwaitingPayments',
    icon: <AddCardOutlinedIcon style={{ marginRight: '10px' }} />,
  },
  {
    label: 'Отчети',
    path: '/Reports',
    icon: <AssessmentOutlinedIcon style={{ marginRight: '10px' }} />,
  },
]

export const ownerItems = [
  // {
  //   label: 'Допълнителен разход',
  //   path: '/AdditionalCost',
  //   icon: <PaidOutlinedIcon style={{ marginRight: '10px' }} />,
  // },
  {
    label: 'Всички служители',
    path: '/employers',
    icon: <Groups2OutlinedIcon style={{ marginRight: '10px' }} />,
  },
  {
    label: 'Добави служител',
    path: '/AddEmployer',
    icon: <PersonAddOutlinedIcon style={{ marginRight: '10px' }} />,
  },
]
