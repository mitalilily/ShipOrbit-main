import {
  alpha,
  Box,
  Button,
  Link as MuiLink,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { NavLink, useLocation } from 'react-router-dom'
import AddMoneyDialog from '../AddMoneyDialog'
import BrandLogo from '../brand/BrandLogo'
import BrandTopBar from '../brand/BrandTopBar'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth/AuthContext'
import { useWalletBalance } from '../../hooks/useWalletBalance'
import { brand } from '../../theme/brand'

interface NavbarProps {
  handleDrawerToggle: () => void
  pinned: boolean
  name?: string
}

type RouteLink = {
  label: string
  path: string
  matches: string[]
}

const navLinkSx = {
  textDecoration: 'none',
  color: 'inherit',
}

const matchesPath = (pathname: string, matches: string[]) =>
  matches.some((match) => {
    if (match === '/') return pathname === '/'
    return pathname === match || pathname.startsWith(`${match}/`)
  })

const MAIN_NAV: RouteLink[] = [
  { label: 'Dashboard', path: '/dashboard', matches: ['/dashboard'] },
  {
    label: 'Add Orders',
    path: '/addorders/forward/AddOrder',
    matches: ['/addorders', '/orders/create'],
  },
  {
    label: 'Shipments',
    path: '/shipment',
    matches: ['/shipment', '/orders/list', '/orders/b2c/list', '/orders/b2b/list'],
  },
  {
    label: 'Channel Orders',
    path: '/channel/pending',
    matches: ['/channel', '/channels'],
  },
  {
    label: 'Wallet',
    path: '/wallet/wallet_deduction',
    matches: ['/wallet', '/billingdetail', '/billing/wallet_transactions'],
  },
  { label: 'NDR', path: '/ndr/ndr-shipment', matches: ['/ndr', '/ops/ndr'] },
  {
    label: 'Reports',
    path: '/report/mis-report',
    matches: ['/report', '/reports'],
  },
  {
    label: 'Billing',
    path: '/billing/cod',
    matches: ['/billing', '/invoicepage', '/invoiceprint', '/invoiceprints', '/cod'],
  },
  {
    label: 'Custom Tracking',
    path: '/custom-tracking',
    matches: ['/custom-tracking', '/preview'],
  },
  {
    label: 'Communication',
    path: '/communication/credit_recharge',
    matches: ['/communication'],
  },
  { label: 'Tickets', path: '/tickets', matches: ['/tickets', '/support/tickets'] },
  {
    label: 'Utilities',
    path: '/utility/ratecalculator',
    matches: ['/utility', '/tools', '/trackingbill'],
  },
  {
    label: 'Help & Support',
    path: '/support',
    matches: ['/support', '/support/about_us'],
  },
  { label: 'Settings', path: '/setting/labelsetting', matches: ['/setting', '/settings'] },
]

const SUB_NAV: Record<string, RouteLink[]> = {
  Dashboard: [
    { label: 'Overview', path: '/dashboard', matches: ['/dashboard'] },
    {
      label: 'Date Wise Shipment',
      path: '/dashboard/date-wise-shipments',
      matches: ['/dashboard/date-wise-shipments'],
    },
    {
      label: 'Product Wise Shipment',
      path: '/dashboard/product-wise-shipments',
      matches: ['/dashboard/product-wise-shipments'],
    },
  ],
  'Add Orders': [
    {
      label: 'Forward Single',
      path: '/addorders/forward/AddOrder',
      matches: ['/addorders/forward/AddOrder', '/orders/create'],
    },
    {
      label: 'Forward Bulk',
      path: '/addorders/forward/BulkOrder',
      matches: ['/addorders/forward/BulkOrder'],
    },
    {
      label: 'Reverse Single',
      path: '/addorders/reverse/SinglePickup',
      matches: ['/addorders/reverse/SinglePickup'],
    },
    {
      label: 'Reverse Quick',
      path: '/addorders/reverse/QuickPickup',
      matches: ['/addorders/reverse/QuickPickup'],
    },
  ],
  Shipments: [
    {
      label: 'Processed Orders',
      path: '/shipment',
      matches: ['/shipment', '/orders/list', '/orders/b2c/list', '/orders/b2b/list'],
    },
    { label: 'Failed Orders', path: '/shipment/failed', matches: ['/shipment/failed'] },
  ],
  'Channel Orders': [
    { label: 'Channel Order', path: '/channel/pending', matches: ['/channel/pending'] },
    { label: 'Channel', path: '/channels', matches: ['/channels', '/channel/available'] },
    { label: 'Add Channel', path: '/channel/addchannel', matches: ['/channel/addchannel'] },
  ],
  Wallet: [
    {
      label: 'Wallet Deduction',
      path: '/wallet/wallet_deduction',
      matches: ['/wallet/wallet_deduction', '/billingdetail', '/billing/wallet_transactions'],
    },
    {
      label: 'Recharge History',
      path: '/wallet/rechargehistory',
      matches: ['/wallet/rechargehistory', '/wallet/recharge-history'],
    },
    {
      label: 'Add Money',
      path: '/wallet/addmoney',
      matches: ['/wallet/addmoney', '/wallet/add-money'],
    },
  ],
  Billing: [
    { label: 'COD', path: '/billing/cod', matches: ['/billing/cod', '/cod', '/cod-remittance'] },
    {
      label: 'Order Invoice',
      path: '/billing/orderinvoice',
      matches: ['/billing/orderinvoice', '/billing/order-invoice'],
    },
    {
      label: 'Communication Invoice',
      path: '/billing/communicationinvoice',
      matches: ['/billing/communicationinvoice', '/billing/communication-invoice'],
    },
  ],
  Communication: [
    {
      label: 'Credit Recharge',
      path: '/communication/credit_recharge',
      matches: ['/communication/credit_recharge'],
    },
    {
      label: 'Recharge History',
      path: '/communication/recharge_history',
      matches: ['/communication/recharge_history'],
    },
    {
      label: 'Notification Setting',
      path: '/communication/notificationsetting',
      matches: ['/communication/notificationsetting'],
    },
    {
      label: 'Notification History',
      path: '/communication/notification-history',
      matches: ['/communication/notification-history'],
    },
    { label: 'Ledger', path: '/communication/ladger', matches: ['/communication/ladger'] },
    { label: 'NDR', path: '/communication/ndr', matches: ['/communication/ndr'] },
    {
      label: 'Channels and Price',
      path: '/communication/channelpricing',
      matches: ['/communication/channelpricing'],
    },
  ],
  Utilities: [
    {
      label: 'Rate Calculator',
      path: '/utility/ratecalculator',
      matches: ['/utility/ratecalculator', '/tools/rate_calculator'],
    },
    { label: 'Pincode Servicability', path: '/utility/pincode', matches: ['/utility/pincode'] },
    {
      label: 'Rate Card',
      path: '/utility/ratecard',
      matches: ['/utility/ratecard', '/tools/rate_card'],
    },
  ],
  Settings: [
    {
      label: 'Label Setting',
      path: '/setting/labelsetting',
      matches: ['/setting/labelsetting', '/settings/label_config'],
    },
    {
      label: 'Secure Your Shipment',
      path: '/setting/secureshipment',
      matches: ['/setting/secureshipment'],
    },
    {
      label: 'Manage Team',
      path: '/setting/manageteam',
      matches: ['/setting/manageteam', '/settings/users_management'],
    },
    {
      label: 'Invoice Settings',
      path: '/setting/invoicepage',
      matches: ['/setting/invoicepage', '/settings/invoice_preferences'],
    },
    {
      label: 'API Docs',
      path: '/setting/apidocs',
      matches: ['/setting/apidocs', '/settings/api-docs'],
    },
    {
      label: 'Unique QR Code',
      path: '/setting/uniqueqr',
      matches: ['/setting/uniqueqr'],
    },
  ],
}

const topMeta = (pathname: string) =>
  MAIN_NAV.find((item) => matchesPath(pathname, item.matches)) ?? MAIN_NAV[0]

export default function Navbar({ handleDrawerToggle }: NavbarProps) {
  const theme = useTheme()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isCompact = useMediaQuery(theme.breakpoints.down('lg'))
  const { walletBalance, setWalletBalance } = useAuth()
  const { data } = useWalletBalance(true)
  const [walletDialogOpen, setWalletDialogOpen] = useState(false)

  const activeMain = useMemo(() => topMeta(location.pathname), [location.pathname])
  const activeTabs = SUB_NAV[activeMain.label] ?? []

  const liveBalance = useMemo(() => {
    const value =
      typeof data === 'number'
        ? data
        : Number((data as { data?: { balance?: number } } | undefined)?.data?.balance)
    return Number.isFinite(value) ? value : walletBalance ?? 0
  }, [data, walletBalance])

  useEffect(() => {
    if (liveBalance !== walletBalance && Number.isFinite(liveBalance)) {
      setWalletBalance(liveBalance)
    }
  }, [liveBalance, setWalletBalance, walletBalance])

  return (
    <>
      <BrandTopBar
        sx={{
          px: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: `1px solid ${alpha('#dfe3ea', 0.9)}`,
        }}
        innerSx={{
          px: { xs: 1.2, md: 2.2 },
          py: 0,
          background: '#FFFFFF',
        }}
      >
        <Stack spacing={0}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              minHeight: 42,
              borderBottom: `1px solid ${alpha(brand.line, 0.85)}`,
              color: alpha(brand.ink, 0.74),
              fontSize: '0.76rem',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.2} sx={{ minWidth: 0 }}>
              {isMobile ? (
                <Button
                  onClick={handleDrawerToggle}
                  startIcon={<HiMenuAlt2 size={16} />}
                  sx={{
                    color: brand.ink,
                    textTransform: 'none',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    minWidth: 'auto',
                    px: 0.8,
                  }}
                >
                  Menu
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    minWidth: 'auto',
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 1.4,
                    background: brand.accent,
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                  }}
                >
                  Helpline
                </Button>
              )}
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                Full Truck Load
              </Typography>
              {!isCompact && (
                <>
                  <Typography sx={{ color: alpha(brand.ink, 0.34) }}>|</Typography>
                  <MuiLink
                    component={NavLink}
                    to="/tickets"
                    sx={{ ...navLinkSx, fontSize: '0.78rem', fontWeight: 700 }}
                  >
                    Tickets
                  </MuiLink>
                </>
              )}
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                sx={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: alpha(brand.ink, 0.72),
                  whiteSpace: 'nowrap',
                }}
              >
                PX Wallet :
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.86rem',
                  fontWeight: 900,
                  color: brand.ink,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                Rs. {liveBalance.toFixed(2)}
              </Typography>
              <Button
                onClick={() => setWalletDialogOpen(true)}
                sx={{
                  minWidth: 'auto',
                  px: 0.5,
                  color: brand.accent,
                  textTransform: 'none',
                  fontWeight: 800,
                  fontSize: '0.76rem',
                }}
              >
                Recharge Wallet
              </Button>
              <UserMenu />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ minHeight: 68, py: 1.2 }}
          >
            <BrandLogo sx={{ width: { xs: 124, md: 164 } }} />

            {!isMobile && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.15}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  overflowX: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                }}
              >
                {MAIN_NAV.map((item) => {
                  const active = item.label === activeMain.label
                  return (
                    <Box key={item.label} sx={{ flexShrink: 0 }}>
                      <MuiLink
                        component={NavLink}
                        to={item.path}
                        sx={{
                          ...navLinkSx,
                          px: 1.2,
                          py: 0.9,
                          borderRadius: 1.4,
                          display: 'inline-flex',
                          alignItems: 'center',
                          color: active ? brand.accent : alpha(brand.ink, 0.76),
                          backgroundColor: active ? alpha(brand.accent, 0.08) : 'transparent',
                          fontSize: '0.82rem',
                          fontWeight: active ? 800 : 700,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.label}
                      </MuiLink>
                    </Box>
                  )
                })}
              </Stack>
            )}
          </Stack>

          {activeTabs.length > 0 && (
            <Stack
              direction="row"
              spacing={0.65}
              sx={{
                minHeight: 48,
                pt: 0.25,
                overflowX: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {activeTabs.map((tab) => {
                const active = matchesPath(location.pathname, tab.matches)
                return (
                  <Box key={tab.label} sx={{ flexShrink: 0 }}>
                    <MuiLink
                      component={NavLink}
                      to={tab.path}
                      sx={{
                        ...navLinkSx,
                        px: { xs: 1.05, md: 1.2 },
                        py: 0.95,
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderBottom: active
                          ? `3px solid ${brand.accent}`
                          : '3px solid transparent',
                        color: active ? brand.accent : alpha(brand.ink, 0.68),
                        fontSize: '0.8rem',
                        fontWeight: active ? 800 : 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tab.label}
                    </MuiLink>
                  </Box>
                )
              })}
            </Stack>
          )}
        </Stack>
      </BrandTopBar>

      <AddMoneyDialog currentBalance={liveBalance} open={walletDialogOpen} setOpen={setWalletDialogOpen} />
    </>
  )
}
