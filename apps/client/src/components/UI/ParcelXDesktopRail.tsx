import { alpha, Box, Stack, Tooltip } from '@mui/material'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { BsGrid } from 'react-icons/bs'
import { FiHelpCircle, FiPackage } from 'react-icons/fi'
import { HiOutlineReceiptPercent } from 'react-icons/hi2'
import { LuIndianRupee, LuMessagesSquare, LuSettings2 } from 'react-icons/lu'
import { MdKeyboardReturn, MdOutlineInventory2, MdOutlineLocalShipping } from 'react-icons/md'
import { PiTicket, PiTruckLight } from 'react-icons/pi'
import { TbArrowsTransferUp, TbChartInfographic, TbPackageImport } from 'react-icons/tb'
import { NavLink, useLocation } from 'react-router-dom'
import { brand } from '../../theme/brand'

const railItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <BsGrid size={15} /> },
  { label: 'Add Orders', path: '/addorders/forward/AddOrder', icon: <TbPackageImport size={15} /> },
  { label: 'Shipments', path: '/shipment', icon: <MdOutlineLocalShipping size={16} /> },
  { label: 'Channel Orders', path: '/channel/pending', icon: <MdOutlineInventory2 size={15} /> },
  { label: 'Wallet', path: '/wallet/wallet_deduction', icon: <LuIndianRupee size={15} /> },
  { label: 'NDR', path: '/ndr/ndr-shipment', icon: <PiTruckLight size={15} /> },
  { label: 'Reports', path: '/report/mis-report', icon: <TbChartInfographic size={15} /> },
  { label: 'Billing', path: '/billing/cod', icon: <HiOutlineReceiptPercent size={15} /> },
  { label: 'Custom Tracking', path: '/custom-tracking', icon: <FiPackage size={15} /> },
  { label: 'Communication', path: '/communication/credit_recharge', icon: <LuMessagesSquare size={15} /> },
  { label: 'Tickets', path: '/tickets', icon: <PiTicket size={15} /> },
  { label: 'Utilities', path: '/utility/ratecalculator', icon: <BiBarChartAlt2 size={15} /> },
  { label: 'Support', path: '/support', icon: <FiHelpCircle size={15} /> },
  { label: 'Settings', path: '/setting/labelsetting', icon: <LuSettings2 size={15} /> },
]

const isMatch = (pathname: string, path: string) =>
  pathname === path || pathname.startsWith(`${path}/`) || (path === '/dashboard' && pathname === '/')

export default function ParcelXDesktopRail() {
  const location = useLocation()

  return (
    <Box
      sx={{
        width: 38,
        minWidth: 38,
        bgcolor: '#FFFFFF',
        borderRight: `1px solid ${alpha('#d7dde5', 0.9)}`,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        py: 0.75,
        gap: 0.8,
      }}
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: 1.1,
          backgroundColor: alpha(brand.accent, 0.12),
          color: brand.accent,
          display: 'grid',
          placeItems: 'center',
          mb: 0.15,
        }}
      >
        <TbArrowsTransferUp size={13} />
      </Box>

      <Stack spacing={0.8} alignItems="center" sx={{ width: '100%' }}>
        {railItems.map((item) => {
          const active = isMatch(location.pathname, item.path)
          return (
            <Tooltip key={item.label} title={item.label} placement="right">
              <Box
                component={NavLink}
                to={item.path}
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: 1,
                  display: 'grid',
                  placeItems: 'center',
                  color: active ? brand.accent : alpha(brand.ink, 0.62),
                  backgroundColor: active ? alpha(brand.accent, 0.1) : 'transparent',
                  border: active
                    ? `1px solid ${alpha(brand.accent, 0.3)}`
                    : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    color: brand.accent,
                    backgroundColor: alpha(brand.accent, 0.07),
                  },
                }}
              >
                {item.icon}
              </Box>
            </Tooltip>
          )
        })}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Tooltip title="Returns" placement="right">
        <Box
          component={NavLink}
          to="/rtoreport"
          sx={{
            width: 26,
            height: 26,
            borderRadius: 1,
            display: 'grid',
            placeItems: 'center',
            color: alpha(brand.ink, 0.62),
            textDecoration: 'none',
            '&:hover': { color: brand.accent, backgroundColor: alpha(brand.accent, 0.07) },
          }}
        >
          <MdKeyboardReturn size={15} />
        </Box>
      </Tooltip>
    </Box>
  )
}
