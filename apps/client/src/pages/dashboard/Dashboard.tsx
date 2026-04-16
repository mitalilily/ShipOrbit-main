import { alpha, Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { FiFilter, FiInfo } from 'react-icons/fi'
import { HiOutlineDownload } from 'react-icons/hi'
import {
  MdCheckCircleOutline,
  MdKeyboardArrowDown,
  MdLocalShipping,
  MdOutlineCancel,
  MdOutlineCheckCircle,
  MdOutlineInventory2,
  MdOutlineRotateRight,
  MdOutlineWarningAmber,
  MdPendingActions,
} from 'react-icons/md'
import { TbTruckDelivery, TbTruckReturn } from 'react-icons/tb'
import { useMerchantDashboardStats } from '../../hooks/useDashboard'
import { brand } from '../../theme/brand'

type MetricCard = {
  label: string
  icon: ReactNode
  color: string
  borderColor?: string
  value: number
}

const panelSx = {
  borderRadius: 1.6,
  bgcolor: '#FFFFFF',
  border: `1px solid ${alpha('#d7dde5', 0.9)}`,
  boxShadow: '0 1px 2px rgba(17, 24, 39, 0.04)',
}

const numberFrom = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const countFromStatus = (
  items: Array<{ status?: string; count?: number }> | undefined,
  matches: string[],
) =>
  (items || []).reduce((total, item) => {
    const status = String(item.status || '').toLowerCase()
    return matches.some((match) => status.includes(match)) ? total + numberFrom(item.count) : total
  }, 0)

const TinyStatCard = ({ item }: { item: MetricCard }) => (
  <Box
    sx={{
      ...panelSx,
      p: 1.15,
      minHeight: 76,
      borderColor: item.borderColor || alpha(item.color, 0.22),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Typography sx={{ fontSize: '0.66rem', color: '#697281', fontWeight: 600, lineHeight: 1.25 }}>
        {item.label}
      </Typography>
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: 999,
          display: 'grid',
          placeItems: 'center',
          color: item.color,
          bgcolor: alpha(item.color, 0.08),
          fontSize: 12,
        }}
      >
        {item.icon}
      </Box>
    </Stack>
    <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: brand.ink, lineHeight: 1 }}>
      {item.value}
    </Typography>
  </Box>
)

const LegendItem = ({ color, label, value }: { color: string; label: string; value: string }) => (
  <Stack direction="row" alignItems="center" spacing={0.5}>
    <Box sx={{ width: 6, height: 6, borderRadius: 999, bgcolor: color }} />
    <Typography sx={{ fontSize: '0.58rem', color: '#7a8391' }}>{label}</Typography>
    <Typography sx={{ fontSize: '0.58rem', color: '#111827' }}>{value}</Typography>
  </Stack>
)

const EmptyCanvas = ({ height = 138 }: { height?: number }) => (
  <Box
    sx={{
      height,
      borderRadius: 1.4,
      background:
        'linear-gradient(180deg, rgba(249,250,251,0.95) 0%, rgba(255,255,255,1) 100%)',
      border: '1px solid rgba(229,231,235,0.72)',
    }}
  />
)

const Gauge = ({ value }: { value: number }) => (
  <Box sx={{ position: 'relative', width: 164, height: 96, mx: 'auto' }}>
    <svg width="164" height="96" viewBox="0 0 164 96">
      <path
        d="M12 84 A70 70 0 0 1 152 84"
        fill="none"
        stroke="#edf1f5"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M12 84 A70 70 0 0 1 152 84"
        fill="none"
        stroke="#68c174"
        strokeDasharray="4 4"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M82 84 L82 32" fill="none" stroke="#d7dde5" strokeWidth="1.5" />
    </svg>
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        bottom: 11,
        transform: 'translateX(-50%)',
        width: 34,
        height: 18,
        borderRadius: '18px 18px 0 0',
        bgcolor: '#68c174',
      }}
    />
    <Typography
      sx={{
        position: 'absolute',
        left: '50%',
        top: 42,
        transform: 'translateX(-50%)',
        fontSize: '1rem',
        fontWeight: 700,
        color: '#4b5563',
      }}
    >
      {value}%
    </Typography>
  </Box>
)

const SectionHead = ({ title, right }: { title: string; right?: React.ReactNode }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.1}>
    <Stack direction="row" spacing={0.55} alignItems="center">
      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#1f2937' }}>{title}</Typography>
      <FiInfo size={12} color="#9aa3af" />
    </Stack>
    {right}
  </Stack>
)

export default function Dashboard() {
  const { data: stats, isLoading } = useMerchantDashboardStats()

  const statusSeries = stats?.charts?.ordersByStatus || []
  const processed = numberFrom(stats?.operational?.totalOrders)
  const picked = countFromStatus(statusSeries, ['picked'])
  const inTransit = numberFrom(stats?.todayOperations?.inTransit)
  const outForDelivery = countFromStatus(statusSeries, ['out for delivery'])
  const delivered = numberFrom(stats?.operational?.deliveredOrders)
  const rto = numberFrom(stats?.operational?.rtoCount)
  const notPicked = numberFrom(stats?.todayOperations?.pending)
  const cancelled = countFromStatus(statusSeries, ['cancel'])
  const failed = countFromStatus(statusSeries, ['fail'])
  const ndrCount = numberFrom(stats?.operational?.ndrCount)
  const cod = numberFrom(stats?.metrics?.totalCodOrders)
  const prepaid = numberFrom(stats?.metrics?.totalPrepaidOrders)
  const reverse = countFromStatus(statusSeries, ['reverse'])
  const withinTat = Math.max(0, delivered - rto)
  const tatPercent = delivered > 0 ? Math.round((withinTat / delivered) * 100) : 0

  const metrics: MetricCard[] = [
    { label: 'Total Processed', value: processed, icon: <MdOutlineInventory2 />, color: '#ff8b38' },
    { label: 'Picked', value: picked, icon: <MdCheckCircleOutline />, color: '#ff8b38' },
    { label: 'In-Transit', value: inTransit, icon: <MdLocalShipping />, color: '#ff8b38' },
    { label: 'Out for Delivery', value: outForDelivery, icon: <TbTruckDelivery />, color: '#ff8b38' },
    { label: 'Delivered', value: delivered, icon: <MdOutlineCheckCircle />, color: '#ff8b38' },
    { label: 'RTO', value: rto, icon: <TbTruckReturn />, color: '#ff8b38' },
    {
      label: 'Not Picked',
      value: notPicked,
      icon: <MdPendingActions />,
      color: '#f59e0b',
      borderColor: alpha('#f59e0b', 0.32),
    },
    {
      label: 'Cancelled',
      value: cancelled,
      icon: <MdOutlineCancel />,
      color: '#ef4444',
      borderColor: alpha('#ef4444', 0.35),
    },
    {
      label: 'Failed',
      value: failed,
      icon: <MdOutlineWarningAmber />,
      color: '#d97706',
      borderColor: alpha('#d97706', 0.32),
    },
  ]

  if (isLoading && !stats) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          ...panelSx,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <CircularProgress size={28} sx={{ color: brand.accent }} />
          <Typography sx={{ fontSize: '0.86rem', color: '#6b7280' }}>Loading dashboard</Typography>
        </Stack>
      </Box>
    )
  }

  return (
    <Box sx={{ pb: 3 }}>
      <Stack spacing={1.2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 0.2 }}>
          <Box />
          <Stack direction="row" spacing={0.9} alignItems="center">
            <Typography sx={{ fontSize: '0.58rem', color: '#7b8492' }}>
              16-Mar-2026 12:00 am - 16-Apr-2026 11:59 pm
            </Typography>
            <Button
              variant="outlined"
              startIcon={<FiFilter size={12} />}
              sx={{
                minHeight: 28,
                px: 1.1,
                borderRadius: 1,
                textTransform: 'none',
                fontSize: '0.7rem',
                color: '#4b5563',
                borderColor: '#e5e7eb',
              }}
            >
              Filters
            </Button>
            <Button
              variant="outlined"
              startIcon={<HiOutlineDownload size={12} />}
              sx={{
                minHeight: 28,
                px: 1.1,
                borderRadius: 1,
                textTransform: 'none',
                fontSize: '0.7rem',
                color: '#4b5563',
                borderColor: '#e5e7eb',
              }}
            >
              Export
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
            gap: 1,
          }}
        >
          {metrics.map((item) => (
            <TinyStatCard key={item.label} item={item} />
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.08fr 1.9fr',
            gap: 1,
          }}
        >
          <Box sx={{ ...panelSx, p: 1.1 }}>
            <SectionHead title="Shipment Status" />
            <EmptyCanvas height={156} />
            <Stack direction="row" spacing={1.1} justifyContent="space-between" sx={{ mt: 0.9 }}>
              <LegendItem color="#61c46d" label="Delivered" value={`${delivered}`} />
              <LegendItem color="#f5b44a" label="Live Shipments" value={`${inTransit}`} />
              <LegendItem color="#f05b5b" label="RTO" value={`${rto}`} />
            </Stack>
            <Stack direction="row" spacing={1.7} sx={{ mt: 0.35 }}>
              <Typography sx={{ fontSize: '0.58rem', color: '#7b8492' }}>0%</Typography>
              <Typography sx={{ fontSize: '0.58rem', color: '#7b8492' }}>0%</Typography>
              <Typography sx={{ fontSize: '0.58rem', color: '#7b8492' }}>0%</Typography>
            </Stack>
          </Box>

          <Box sx={{ ...panelSx, p: 1.1 }}>
            <SectionHead
              title="Shipment Count"
              right={
                <Stack direction="row" spacing={0.35} alignItems="center">
                  <Typography sx={{ fontSize: '0.62rem', color: '#7b8492' }}>Days</Typography>
                  <MdKeyboardArrowDown size={14} color="#9aa3af" />
                </Stack>
              }
            />
            <EmptyCanvas height={191} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.08fr 1.08fr 1.84fr',
            gap: 1,
          }}
        >
          <Box sx={{ ...panelSx, p: 1.1 }}>
            <SectionHead title="Shipment Type" />
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: brand.ink, mb: 1.1 }}>
              {cod + prepaid + reverse}
            </Typography>
            <EmptyCanvas height={118} />
            <Stack direction="row" spacing={1.05} justifyContent="space-between" sx={{ mt: 0.9 }}>
              <LegendItem color="#5a85f5" label="COD" value={`${cod} 0%`} />
              <LegendItem color="#0f172a" label="Prepaid" value={`${prepaid} 0%`} />
              <LegendItem color="#7c5cff" label="Reverse" value={`${reverse} 0%`} />
            </Stack>
          </Box>

          <Box sx={{ ...panelSx, p: 1.1 }}>
            <SectionHead title="TAT" />
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: brand.ink, mb: 0.4 }}>
              {tatPercent}
            </Typography>
            <Gauge value={tatPercent} />
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.45 }}>
              <LegendItem color="#61c46d" label="WITHIN TAT" value={`${withinTat}`} />
              <LegendItem color="#f4b148" label="OUTSIDE TAT" value={`${Math.max(0, delivered - withinTat)}`} />
            </Stack>
          </Box>

          <Box sx={{ ...panelSx, p: 1.1 }}>
            <SectionHead
              title="NDR Report"
              right={
                <Stack direction="row" spacing={1.1} alignItems="center">
                  <LegendItem color="#61c46d" label="Delivered" value="" />
                  <LegendItem color="#f05b5b" label="RTO" value="" />
                </Stack>
              }
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 1,
                mb: 1,
              }}
            >
              <Box sx={{ ...panelSx, p: 1, boxShadow: 'none' }}>
                <Typography sx={{ fontSize: '0.63rem', color: '#7b8492', mb: 0.6 }}>NDR Count</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: brand.ink }}>
                    {ndrCount}
                  </Typography>
                  <Box sx={{ color: brand.accent, fontSize: 14 }}>
                    <MdOutlineInventory2 />
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ ...panelSx, p: 1, boxShadow: 'none' }}>
                <Typography sx={{ fontSize: '0.63rem', color: '#7b8492', mb: 0.6 }}>
                  NDR Initiated
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: brand.ink }}>
                    {ndrCount}
                  </Typography>
                  <Box sx={{ color: brand.accent, fontSize: 14 }}>
                    <MdOutlineRotateRight />
                  </Box>
                </Stack>
              </Box>
            </Box>
            <EmptyCanvas height={106} />
            <Stack direction="row" spacing={1.4} sx={{ mt: 0.7 }}>
              <Typography sx={{ fontSize: '0.58rem', color: '#7b8492' }}>RTO</Typography>
              <Typography sx={{ fontSize: '0.58rem', color: '#7b8492' }}>Delivered</Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
