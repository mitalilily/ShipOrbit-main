import { alpha, Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { HiOutlineDownload, HiOutlineUpload } from 'react-icons/hi'
import { NavLink, useLocation } from 'react-router-dom'
import { brand } from '../../theme/brand'

const panelSx = {
  bgcolor: '#FFFFFF',
  border: '1px solid #e7ebf0',
  borderRadius: '10px',
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
}

const topTabs = [
  { label: 'COD', path: '/billing/cod' },
  { label: 'Order Invoice', path: '/billing/orderinvoice' },
  { label: 'Communication Invoice', path: '/billing/communicationinvoice' },
]

const miniFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    minHeight: 32,
    fontSize: '0.71rem',
    '& fieldset': { borderColor: '#eceff4' },
  },
}

const chartLegend = [
  { label: 'Remitted', color: '#71c96a' },
  { label: 'Accruing', color: '#f4d575' },
  { label: 'Generated', color: '#a5bdf8' },
]

const isPath = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`)

export default function CodRemittancesList() {
  const location = useLocation()

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

          <Stack direction="row" spacing={0.65}>
            <TextField select value="AWB" sx={{ ...miniFieldSx, width: 72 }}>
              <MenuItem value="AWB">AWB</MenuItem>
            </TextField>
            <Button
              startIcon={<HiOutlineDownload size={12} />}
              sx={{
                minHeight: 32,
                px: 1,
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: '0.66rem',
                color: '#6b7280',
                border: '1px solid #eceff4',
              }}
            >
              Download Sample File
            </Button>
            <Button
              startIcon={<HiOutlineUpload size={12} />}
              sx={{
                minHeight: 32,
                px: 1,
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: '0.66rem',
                color: '#6b7280',
                border: '1px solid #eceff4',
              }}
            >
              Choose CSV File
            </Button>
            <Button
              sx={{
                minHeight: 32,
                px: 1.15,
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#FFFFFF',
                bgcolor: brand.accent,
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={0.8} alignItems="center">
          <TextField select value="COD Date" sx={{ ...miniFieldSx, width: 116 }}>
            <MenuItem value="COD Date">COD Date</MenuItem>
          </TextField>
          <TextField value="18 Mar 2026 12:00 am - 16 Apr 2026 09:31 pm" sx={{ ...miniFieldSx, width: 248 }} />
          <Button
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

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '0.72fr 2.1fr',
            gap: 1,
          }}
        >
          <Box
            sx={{
              ...panelSx,
              minHeight: 188,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Stack alignItems="center" spacing={0.6}>
              <Box
                sx={{
                  width: 52,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: '#f6f7f9',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#c5ccd6',
                  fontSize: 24,
                }}
              >
                □
              </Box>
              <Typography sx={{ fontSize: '0.66rem', color: '#a0a8b4' }}>No data available</Typography>
            </Stack>
          </Box>

          <Box sx={{ ...panelSx, p: 1.1, minHeight: 188 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.1}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#2f343c' }}>
                COD Remitted
              </Typography>
              <Stack direction="row" spacing={0.65}>
                {chartLegend.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      px: 1.05,
                      py: 0.5,
                      borderRadius: 999,
                      bgcolor: alpha(item.color, 0.16),
                      color: item.color,
                      border: `1px solid ${alpha(item.color, 0.34)}`,
                      fontSize: '0.62rem',
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Stack spacing={1.05}>
              {['₹10,000', '₹8,000', '₹6,000', '₹4,000', '₹2,000', '₹0'].map((label) => (
                <Typography key={label} sx={{ fontSize: '0.62rem', color: '#b1b8c2' }}>
                  {label}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ ...panelSx, p: 1.1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.1}>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#2f343c' }}>
              View COD History
            </Typography>
            <Stack direction="row" spacing={0.55}>
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
                All COD Export at AWB Level
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
                TRN COD Export
              </Button>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.8}>
            <TextField select value="Item Per Page 100" sx={{ ...miniFieldSx, width: 120 }}>
              <MenuItem value="Item Per Page 100">Item Per Page 100</MenuItem>
            </TextField>
            <Stack direction="row" spacing={0.4}>
              <Button sx={{ minWidth: 24, minHeight: 24, border: '1px solid #eceff4', borderRadius: '4px' }}>‹</Button>
              <Button sx={{ minWidth: 24, minHeight: 24, border: '1px solid #eceff4', borderRadius: '4px' }}>1</Button>
              <Button sx={{ minWidth: 24, minHeight: 24, border: '1px solid #eceff4', borderRadius: '4px' }}>›</Button>
            </Stack>
          </Stack>

          <Box sx={{ overflowX: 'auto' }}>
            <Box
              sx={{
                minWidth: 980,
                display: 'grid',
                gridTemplateColumns:
                  '34px repeat(9, minmax(78px, 1fr)) 70px',
                alignItems: 'center',
                borderTop: '1px solid #eef1f5',
                borderBottom: '1px solid #eef1f5',
              }}
            >
              <Box sx={{ py: 1.05, px: 0.6 }}>
                <Box sx={{ width: 12, height: 12, border: '1px solid #d5dbe4', borderRadius: '2px' }} />
              </Box>
              {[
                'COD ID / TRN',
                'COD Date',
                'AWB Count',
                'Amount',
                'Refund',
                'Delivered to RTO Reversal',
                'Adjust in Wallet',
                'Advance Paid/ Excess Paid',
                'Invoice Adjust',
                'Action',
              ].map((header) => (
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

          <Box
            sx={{
              minHeight: 182,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Stack alignItems="center" spacing={0.6}>
              <Box
                sx={{
                  width: 44,
                  height: 34,
                  borderRadius: 2,
                  bgcolor: '#f6f7f9',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#d0d6de',
                  fontSize: 22,
                }}
              >
                ▭
              </Box>
              <Typography sx={{ fontSize: '0.66rem', color: '#a0a8b4' }}>No data</Typography>
            </Stack>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <TextField select value="Item Per Page 100" sx={{ ...miniFieldSx, width: 120 }}>
              <MenuItem value="Item Per Page 100">Item Per Page 100</MenuItem>
            </TextField>
            <Stack direction="row" spacing={0.4}>
              <Button sx={{ minWidth: 24, minHeight: 24, border: '1px solid #eceff4', borderRadius: '4px' }}>‹</Button>
              <Button sx={{ minWidth: 24, minHeight: 24, border: '1px solid #eceff4', borderRadius: '4px' }}>1</Button>
              <Button sx={{ minWidth: 24, minHeight: 24, border: '1px solid #eceff4', borderRadius: '4px' }}>›</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
