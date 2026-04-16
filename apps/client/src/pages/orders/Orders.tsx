import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { FiFilter, FiRefreshCcw, FiSearch } from 'react-icons/fi'
import { HiOutlineDownload } from 'react-icons/hi'
import { NavLink, useLocation } from 'react-router-dom'
import { brand } from '../../theme/brand'

const panelSx = {
  bgcolor: '#FFFFFF',
  border: '1px solid #e7ebf0',
  borderRadius: '10px',
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
}

const miniFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    minHeight: 32,
    fontSize: '0.71rem',
    '& fieldset': { borderColor: '#eceff4' },
  },
}

const topTabs = [
  { label: 'Processed Order', path: '/shipment' },
  { label: 'Failed Orders', path: '/shipment/failed' },
]

const directionTabs = [
  { label: 'Forward', key: 'forward' },
  { label: 'Reverse', key: 'reverse' },
]

const statusTabs = [
  'Not Picked',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'NDR',
  'Return',
  'Cancelled',
  'On Process',
  'Draft Orders',
  'All Orders',
]

const headers = [
  'Order Details',
  'Tracking Details',
  'Invoice/Ref No.',
  'Product Details',
  'Amount Details',
  'Pickup Address',
  'Consignee Address',
  'Action',
]

const isPath = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`)

export default function Orders() {
  const location = useLocation()
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward')
  const [status, setStatus] = useState('Not Picked')
  const isFailed = isPath(location.pathname, '/shipment/failed')

  const title = useMemo(() => (isFailed ? 'Failed Orders' : status), [isFailed, status])

  return (
    <Box sx={{ pb: 2 }}>
      <Stack spacing={1.15}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.45}>
            {topTabs.map((tab) => {
              const active = isPath(location.pathname, tab.path)
              return (
                <Button
                  key={tab.path}
                  component={NavLink}
                  to={tab.path}
                  sx={{
                    minHeight: 26,
                    px: 1.05,
                    borderRadius: '4px',
                    textTransform: 'none',
                    fontSize: '0.63rem',
                    fontWeight: 700,
                    color: active ? '#FFFFFF' : '#525a66',
                    bgcolor: active ? '#111111' : '#f6f7f9',
                    border: active ? '1px solid #111111' : '1px solid #eceff4',
                  }}
                >
                  {tab.label}
                </Button>
              )
            })}
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            {directionTabs.map((item) => {
              const active = item.key === direction
              return (
                <Button
                  key={item.key}
                  onClick={() => setDirection(item.key as 'forward' | 'reverse')}
                  sx={{
                    minWidth: 'auto',
                    p: 0,
                    textTransform: 'none',
                    fontSize: '0.68rem',
                    color: active ? brand.accent : '#7b8390',
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      borderRadius: 999,
                      border: `1px solid ${active ? brand.accent : '#c7ccd6'}`,
                      mr: 0.5,
                      display: 'inline-grid',
                      placeItems: 'center',
                    }}
                  >
                    {active ? <Box sx={{ width: 5, height: 5, borderRadius: 999, bgcolor: brand.accent }} /> : null}
                  </Box>
                  {item.label}
                </Button>
              )
            })}
          </Stack>

          <Stack direction="row" spacing={0.65}>
            <Button
              startIcon={<FiFilter size={12} />}
              sx={{
                minHeight: 28,
                px: 1,
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: '0.66rem',
                color: '#525a66',
                border: '1px solid #eceff4',
              }}
            >
              Show Filter
            </Button>
            <Button
              sx={{
                minHeight: 28,
                px: 1,
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: '0.66rem',
                fontWeight: 700,
                color: '#FFFFFF',
                bgcolor: brand.accent,
              }}
            >
              + Shipping Manifest
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={0.8} alignItems="center">
          <TextField select value="Place Date" sx={{ ...miniFieldSx, width: 118 }}>
            <MenuItem value="Place Date">Place Date</MenuItem>
          </TextField>
          <TextField value="09-Apr-2026 12:00 am - 16-Apr-2026 11:59 pm" sx={{ ...miniFieldSx, width: 218 }} />
          <TextField select value="Tracking ID" sx={{ ...miniFieldSx, width: 106 }}>
            <MenuItem value="Tracking ID">Tracking ID</MenuItem>
          </TextField>
          <TextField value="xxxxxxxxxx" sx={{ ...miniFieldSx, width: 120 }} />
          <Button
            startIcon={<FiSearch size={12} />}
            sx={{
              minHeight: 32,
              px: 1.2,
              borderRadius: '4px',
              textTransform: 'none',
              fontSize: '0.68rem',
              color: '#FFFFFF',
              bgcolor: brand.accent,
            }}
          >
            Search
          </Button>
          <Button
            startIcon={<FiRefreshCcw size={12} />}
            sx={{
              minHeight: 32,
              px: 1.1,
              borderRadius: '4px',
              textTransform: 'none',
              fontSize: '0.68rem',
              color: '#6b7280',
              border: '1px solid #eceff4',
            }}
          >
            Reset
          </Button>
        </Stack>

        <Stack direction="row" spacing={0.4} sx={{ flexWrap: 'wrap' }}>
          {statusTabs.map((tab) => {
            const active = tab === title || (!isFailed && tab === status)
            return (
              <Button
                key={tab}
                onClick={() => setStatus(tab)}
                sx={{
                  minHeight: 26,
                  px: 1,
                  borderRadius: '4px',
                  textTransform: 'none',
                  fontSize: '0.62rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#FFFFFF' : '#6b7280',
                  bgcolor: active ? '#111111' : '#FFFFFF',
                  border: `1px solid ${active ? '#111111' : '#eceff4'}`,
                  ...(!active
                    ? {
                        '&:hover': { bgcolor: '#f8fafc' },
                      }
                    : {}),
                }}
              >
                {tab}
              </Button>
            )
          })}
        </Stack>

        <Box sx={{ ...panelSx, p: 1.05 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.1}>
            <Box>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#2f343c' }}>
                {title}
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', color: '#8b93a1', mt: 0.25 }}>
                Showing 0 - 0 of 0 orders
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.72rem', color: '#4b5563' }}>200 ▾</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Box />
            <Stack direction="row" spacing={0.55} alignItems="center">
              <Button
                startIcon={<HiOutlineDownload size={12} />}
                sx={{
                  minHeight: 28,
                  px: 1,
                  borderRadius: '4px',
                  textTransform: 'none',
                  fontSize: '0.66rem',
                  color: '#6b7280',
                  border: '1px solid #eceff4',
                }}
              >
                Export
              </Button>
              <Button
                sx={{
                  minHeight: 28,
                  px: 1,
                  borderRadius: '4px',
                  textTransform: 'none',
                  fontSize: '0.66rem',
                  color: '#6b7280',
                  border: '1px solid #eceff4',
                }}
              >
                Product Picklist
              </Button>
              <Button sx={{ minWidth: 28, minHeight: 28, border: '1px solid #eceff4', borderRadius: '4px' }}>
                ‹
              </Button>
              <Button sx={{ minWidth: 28, minHeight: 28, border: '1px solid #eceff4', borderRadius: '4px' }}>
                ›
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: '#eef1f5' }} />

          <Box sx={{ overflowX: 'auto' }}>
            <Box
              sx={{
                minWidth: 1010,
                display: 'grid',
                gridTemplateColumns: '34px repeat(7, minmax(110px, 1fr)) 92px',
                alignItems: 'center',
              }}
            >
              <Box sx={{ py: 1.05, px: 0.6 }}>
                <Box sx={{ width: 12, height: 12, border: '1px solid #d5dbe4', borderRadius: '2px' }} />
              </Box>
              {headers.map((header) => (
                <Typography
                  key={header}
                  sx={{
                    py: 1.05,
                    px: 0.55,
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: '#5d6673',
                  }}
                >
                  {header}
                </Typography>
              ))}
            </Box>
          </Box>

          <Divider sx={{ borderColor: '#eef1f5' }} />

          <Box
            sx={{
              minHeight: 144,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.67rem', color: '#8f97a3' }}>
              No orders found. Try adjusting filters.
            </Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1.1}>
            <Stack direction="row" spacing={0.45}>
              <Button sx={{ minWidth: 24, minHeight: 24, border: '1px solid #eceff4', borderRadius: '4px' }}>
                ‹
              </Button>
              <Button
                sx={{
                  minWidth: 24,
                  minHeight: 24,
                  border: '1px solid #eceff4',
                  borderRadius: '4px',
                  fontSize: '0.66rem',
                  color: '#111827',
                }}
              >
                1
              </Button>
            </Stack>
            <Typography sx={{ fontSize: '0.6rem', color: '#9aa3af' }}> </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
