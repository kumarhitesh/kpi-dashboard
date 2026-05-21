import {
  RiAddCircleLine,
  RiBarChartLine,
  RiHandCoinLine,
  RiMoneyDollarCircleLine,
  RiRefreshLine,
  RiTrophyLine,
  RiUserAddLine,
} from 'react-icons/ri'

export function getKpiIcon(id: string) {
  switch (id) {
    case 'bookings':
      return <RiMoneyDollarCircleLine />
    case 'open-pipeline':
      return <RiBarChartLine />
    case 'iqc-pipeline':
      return <RiAddCircleLine />
    case 'renewal-bookings':
      return <RiRefreshLine />
    case 'avg-deal-size':
      return <RiHandCoinLine />
    case 'new-logos':
      return <RiUserAddLine />
    case 'win-rate':
      return <RiTrophyLine />
    default:
      return <RiBarChartLine />
  }
}
