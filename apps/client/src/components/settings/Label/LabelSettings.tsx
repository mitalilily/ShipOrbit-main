import {
  alpha,
  Box,
  Button,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { HiOutlineSave } from 'react-icons/hi'
import { NavLink, useLocation } from 'react-router-dom'
import { brand } from '../../../theme/brand'

export type LabelSettingsForm = {
  orderInfo: Record<string, boolean>
  shipperInfo: Record<string, boolean>
  productInfo: Record<string, boolean>
  charLimit: number
  maxItems: number
  printer: 'thermal' | 'inkjet'
}

const panelSx = {
  bgcolor: '#FFFFFF',
  border: '1px solid #e7ebf0',
  borderRadius: '10px',
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
}

const tabs = [
  { label: 'Label Setting', path: '/setting/labelsetting' },
  { label: 'Secure Your Shipment', path: '/setting/secureshipment' },
  { label: 'Manage Team', path: '/setting/manageteam' },
  { label: 'Invoice Settings', path: '/setting/invoicepage' },
  { label: 'API Docs', path: '/setting/apidocs' },
  { label: 'Unique QR Code', path: '/setting/uniqueqr' },
]

const labelRows = [
  'Hide Invoice Value',
  'Hide Return Address',
  'Hide Seller Contact Details',
  'Hide Products',
  'Hide Display Logo',
  'Hide Weight',
  'Hide consignee mobile',
  'Order Id/Invoice Number',
  'Hide Return Warehouse Name',
  'Hide Express Type (Air/Surface)',
  'Show Channel Order Number Barcode',
  'Hide GST Number',
]

const isPath = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`)

const previewLabel = {
  company: 'Kailash Company',
  barcode: '347846332613',
  shipTo: ['Kailash', '9876543211', 'noida, noida', 'Noida, Uttar pradeshPin - 201304'],
  orderId: '10879389',
  refInvoice: '5838799345922',
  orderNumber: '1001',
  date: '01-01-1970',
  invoiceValue: 'Rs',
  phone: '+91 - 8448952103',
}

export default function LabelSettingsPage() {
  const location = useLocation()
  const [displayName, setDisplayName] = useState('')
  const [logoFile, setLogoFile] = useState('')
  const [format, setFormat] = useState('Old Format')
  const [paper, setPaper] = useState('4 x 6')
  const [fileType, setFileType] = useState('HTML')
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(labelRows.map((row) => [row, false])),
  )

  const activeTab = useMemo(
    () => tabs.find((tab) => isPath(location.pathname, tab.path))?.path || '/setting/labelsetting',
    [location.pathname],
  )

  const toggleRow = (key: string) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <Box sx={{ pb: 2 }}>
      <Stack spacing={1.15}>
        <Stack direction="row" spacing={0.45} sx={{ flexWrap: 'wrap' }}>
          {tabs.map((tab) => {
            const active = activeTab === tab.path
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
                  color: active ? '#FFFFFF' : '#6b7280',
                  bgcolor: active ? '#111111' : '#f6f7f9',
                  border: active ? '1px solid #111111' : '1px solid #eceff4',
                }}
              >
                {tab.label}
              </Button>
            )
          })}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack spacing={0.8}>
            <Stack direction="row" spacing={1.4} alignItems="center">
              <Typography sx={{ fontSize: '0.66rem', fontWeight: 700, color: '#4b5563' }}>
                Label Size:
              </Typography>
              {['Old Format', '4 x 4', '4.5 x 6.25', '4 x 6', 'Product Symmetric', 'Hsn Label'].map((option) => {
                const active = option === format || option === paper
                return (
                  <Button
                    key={option}
                    onClick={() => {
                      if (option === 'Old Format') setFormat(option)
                      else setPaper(option)
                    }}
                    sx={{
                      minWidth: 'auto',
                      p: 0,
                      textTransform: 'none',
                      fontSize: '0.63rem',
                      color: active ? brand.accent : '#7b8390',
                    }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        borderRadius: 999,
                        border: `1px solid ${active ? brand.accent : '#c7ccd6'}`,
                        mr: 0.45,
                        display: 'inline-grid',
                        placeItems: 'center',
                      }}
                    >
                      {active ? <Box sx={{ width: 5, height: 5, borderRadius: 999, bgcolor: brand.accent }} /> : null}
                    </Box>
                    {option}
                  </Button>
                )
              })}
            </Stack>

            <Stack direction="row" spacing={1.4} alignItems="center">
              <Typography sx={{ fontSize: '0.66rem', fontWeight: 700, color: '#4b5563' }}>
                File Type:
              </Typography>
              {['HTML', 'PDF'].map((option) => {
                const active = option === fileType
                return (
                  <Button
                    key={option}
                    onClick={() => setFileType(option)}
                    sx={{
                      minWidth: 'auto',
                      p: 0,
                      textTransform: 'none',
                      fontSize: '0.63rem',
                      color: active ? brand.accent : '#7b8390',
                    }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        borderRadius: 999,
                        border: `1px solid ${active ? brand.accent : '#c7ccd6'}`,
                        mr: 0.45,
                        display: 'inline-grid',
                        placeItems: 'center',
                      }}
                    >
                      {active ? <Box sx={{ width: 5, height: 5, borderRadius: 999, bgcolor: brand.accent }} /> : null}
                    </Box>
                    {option}
                  </Button>
                )
              })}
            </Stack>
          </Stack>

          <Button
            startIcon={<HiOutlineSave size={12} />}
            sx={{
              minHeight: 30,
              px: 1.25,
              borderRadius: '4px',
              textTransform: 'none',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#FFFFFF',
              bgcolor: brand.accent,
            }}
          >
            Save
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.02fr 1fr',
            gap: 1,
          }}
        >
          <Box sx={{ ...panelSx, p: 1.1 }}>
            <Stack direction="row" spacing={0.8} alignItems="center" mb={1}>
              <TextField
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    minHeight: 34,
                    fontSize: '0.72rem',
                    borderRadius: '4px',
                    '& fieldset': { borderColor: '#eceff4' },
                  },
                  '& .MuiInputLabel-root': { fontSize: '0.72rem' },
                }}
              />
              <TextField
                label="Display Logo (png, jpg, jpeg)"
                value={logoFile}
                onChange={(e) => setLogoFile(e.target.value)}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    minHeight: 34,
                    fontSize: '0.72rem',
                    borderRadius: '4px',
                    '& fieldset': { borderColor: '#eceff4' },
                  },
                  '& .MuiInputLabel-root': { fontSize: '0.72rem' },
                }}
              />
              <Button
                sx={{
                  minHeight: 34,
                  px: 1.25,
                  borderRadius: '4px',
                  textTransform: 'none',
                  fontSize: '0.66rem',
                  color: '#6b7280',
                  border: '1px solid #eceff4',
                }}
              >
                Choose file
              </Button>
              <Button
                sx={{
                  minHeight: 34,
                  px: 1.25,
                  borderRadius: '4px',
                  textTransform: 'none',
                  fontSize: '0.66rem',
                  color: '#FFFFFF',
                  bgcolor: brand.accent,
                }}
              >
                Update
              </Button>
            </Stack>

            <Box sx={{ border: '1px solid #eef1f5', borderRadius: '8px', overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '38px 1.1fr 1.1fr 78px',
                  bgcolor: '#fafbfc',
                  borderBottom: '1px solid #eef1f5',
                }}
              >
                {['#', 'Title', 'Description', 'Action'].map((header) => (
                  <Typography
                    key={header}
                    sx={{
                      px: 1,
                      py: 0.9,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: '#5d6673',
                    }}
                  >
                    {header}
                  </Typography>
                ))}
              </Box>

              {labelRows.map((row, index) => (
                <Box
                  key={row}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '38px 1.1fr 1.1fr 78px',
                    alignItems: 'center',
                    borderBottom: index === labelRows.length - 1 ? 'none' : '1px solid #f1f4f7',
                  }}
                >
                  <Typography sx={{ px: 1, py: 0.85, fontSize: '0.63rem', color: '#5d6673' }}>
                    {index + 1}
                  </Typography>
                  <Typography sx={{ px: 1, py: 0.85, fontSize: '0.63rem', color: '#2f343c' }}>
                    {row}
                  </Typography>
                  <Typography sx={{ px: 1, py: 0.85, fontSize: '0.63rem', color: '#7b8390' }}>
                    {row}
                  </Typography>
                  <Box sx={{ px: 1, py: 0.4 }}>
                    <Switch
                      checked={toggles[row]}
                      onChange={() => toggleRow(row)}
                      size="small"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: brand.accent },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: alpha(brand.accent, 0.6),
                        },
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ ...panelSx, p: 0, minHeight: 412 }}>
            <Box
              sx={{
                m: 0.9,
                border: '1px solid #70757d',
                minHeight: 258,
                display: 'grid',
                gridTemplateColumns: '1.18fr 1fr',
              }}
            >
              <Box sx={{ borderRight: '1px solid #70757d' }}>
                <Box sx={{ minHeight: 60, p: 0.9, borderBottom: '1px solid #70757d' }}>
                  <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, color: '#28313b', mt: 0.35 }}>
                    {previewLabel.company}
                  </Typography>
                </Box>
                <Box sx={{ p: 0.8, borderBottom: '1px solid #70757d' }}>
                  <Box
                    sx={{
                      width: 95,
                      height: 18,
                      background:
                        'repeating-linear-gradient(90deg, #111 0 2px, #fff 2px 4px, #111 4px 6px, #fff 6px 8px)',
                      mb: 0.4,
                    }}
                  />
                  <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.16em', color: '#374151' }}>
                    {previewLabel.barcode}
                  </Typography>
                </Box>
                <Box sx={{ p: 0.72, borderBottom: '1px solid #70757d' }}>
                  <Typography sx={{ fontSize: '0.66rem', color: '#4b5563', mb: 0.25 }}>Deliver To:</Typography>
                  {previewLabel.shipTo.map((line) => (
                    <Typography key={line} sx={{ fontSize: '0.7rem', color: '#1f2937', lineHeight: 1.32 }}>
                      {line}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ p: 0.72 }}>
                  <Typography sx={{ fontSize: '0.66rem', fontWeight: 700, color: '#1f2937' }}>
                    If not delivered, Return to:
                  </Typography>
                  <Typography sx={{ fontSize: '0.66rem', color: '#4b5563', mt: 0.3 }}>-</Typography>
                  <Typography sx={{ fontSize: '0.68rem', color: '#4b5563', mt: 1.2 }}>
                    Phone: {previewLabel.phone}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={{ minHeight: 60, borderBottom: '1px solid #70757d' }} />
                <Box sx={{ minHeight: 56, p: 0.8, borderBottom: '1px solid #70757d' }}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#374151' }}>
                    (PREPAID)
                  </Typography>
                </Box>
                <Box sx={{ p: 0.72 }}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#1f2937', lineHeight: 1.44 }}>
                    Order Id: {previewLabel.orderId}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#1f2937', lineHeight: 1.44 }}>
                    Ref./Invoice#: {previewLabel.refInvoice}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#1f2937', lineHeight: 1.44 }}>
                    Order Number: {previewLabel.orderNumber}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#1f2937', lineHeight: 1.44 }}>
                    Date: {previewLabel.date}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#1f2937', lineHeight: 1.44 }}>
                    Invoice Value:{previewLabel.invoiceValue}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
