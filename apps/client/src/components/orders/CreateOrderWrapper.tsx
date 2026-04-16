import {
  alpha,
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import {
  FiMapPin,
  FiPackage,
  FiPlusCircle,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from 'react-icons/fi'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { brand } from '../../theme/brand'

const panelSx = {
  bgcolor: '#FFFFFF',
  border: '1px solid #e7ebf0',
  borderRadius: '10px',
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    bgcolor: '#FFFFFF',
    fontSize: '0.73rem',
    minHeight: 34,
    '& fieldset': { borderColor: '#eceff4' },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.72rem',
    color: '#6b7280',
  },
}

const addOrderTabs = [
  { label: 'Forward', mode: 'forward' },
  { label: 'Reverse', mode: 'reverse' },
]

const typeRoutes = [
  { label: 'Single Order', path: '/addorders/forward/AddOrder' },
  { label: 'Bulk Order', path: '/addorders/forward/BulkOrder' },
]

const reverseRoutes = [
  { label: 'Single Pickup', path: '/addorders/reverse/SinglePickup' },
  { label: 'Quick Pickup', path: '/addorders/reverse/QuickPickup' },
]

const stepIcons = [<FiMapPin />, <FiUser />, <FiShoppingBag />, <FiTruck />, <FiPackage />]

const stepTitles = [
  'Warehouse Address',
  'Where are you sending it?',
  'Product Details',
  'Order Details',
  'Package Details',
]

const warehouseCards = [
  { title: 'Please Select A Pickup Address.', subtitle: 'No address available' },
  { title: 'Please Select A Return Address.', subtitle: 'No address available' },
]

const emptyCourierTiles = ['Courier Selection']

const isPath = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`)

export default function CreateOrderWrapper() {
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    pickupLocation: '',
    returnAddress: false,
    consigneeName: '',
    mobileNumber: '',
    altContact: '',
    email: '',
    address1: '',
    address2: '',
    addressType: 'Home',
    pinCode: '',
    city: '',
    state: '',
    country: 'India',
    invoiceId: '',
    preGeneratedWaybill: '',
    sddNdd: 'No',
    productName: '',
    quantity: '',
    value: '',
    sku: '',
    hsn: '',
    category: '',
    paymentMode: '',
    orderAmount: '0.00',
    gstAmount: '0.00',
    extraCharges: '',
    totalAmount: '0.00',
    codAmount: '0.00',
    mps: 'No',
    actualWeight: '',
    length: '',
    width: '',
    height: '',
    expressType: '',
    sortBy: '',
  })

  const isReverse = location.pathname.includes('/reverse/')
  const routeTabs = isReverse ? reverseRoutes : typeRoutes

  const activeMode = useMemo(() => (isReverse ? 'reverse' : 'forward'), [isReverse])

  const updateField = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <Box sx={{ pb: 2 }}>
      <Stack spacing={1.2}>
        <Stack direction="row" alignItems="center" spacing={0.8}>
          <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#2f343c' }}>
            Create New Order
          </Typography>
          {addOrderTabs.map((tab) => {
            const active = tab.mode === activeMode
            const to = tab.mode === 'forward' ? '/addorders/forward/AddOrder' : '/addorders/reverse/SinglePickup'
            return (
              <Button
                key={tab.mode}
                component={NavLink}
                to={to}
                sx={{
                  minWidth: 'auto',
                  px: 0.4,
                  py: 0.15,
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
                    mr: 0.55,
                    display: 'inline-grid',
                    placeItems: 'center',
                  }}
                >
                  {active ? (
                    <Box sx={{ width: 5, height: 5, borderRadius: 999, bgcolor: brand.accent }} />
                  ) : null}
                </Box>
                {tab.label}
              </Button>
            )
          })}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.45}>
            {routeTabs.map((tab) => {
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
                    '&:hover': {
                      bgcolor: active ? '#111111' : '#f3f4f6',
                    },
                  }}
                >
                  {tab.label}
                </Button>
              )
            })}
          </Stack>

          <Stack direction="row" spacing={0.6}>
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
              Warehouse/Seller List
            </Button>
            <Button
              onClick={() => navigate('/settings/manage_pickups')}
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
              + Add Warehouse
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1.82fr 0.96fr',
            gap: 1,
            alignItems: 'start',
          }}
        >
          <Box sx={{ ...panelSx, p: 1.1 }}>
            <Stack spacing={1.3}>
              <Stack direction="row" spacing={1.1} alignItems="stretch">
                <Stack spacing={1.45} sx={{ width: 30, pt: 0.15 }}>
                  {stepTitles.map((step, index) => (
                    <Stack key={step} alignItems="center" spacing={0.28}>
                      <Typography sx={{ fontSize: '0.54rem', color: '#88919d' }}>
                        Step {index + 1}
                      </Typography>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          border: '1px solid #d7dde5',
                          color: '#9aa3af',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: 10,
                          bgcolor: '#FFFFFF',
                        }}
                      >
                        {stepIcons[index]}
                      </Box>
                      {index < stepTitles.length - 1 ? (
                        <Box sx={{ width: 1, height: 32, bgcolor: '#e8ecf1' }} />
                      ) : null}
                    </Stack>
                  ))}
                </Stack>

                <Stack spacing={1.45} sx={{ flex: 1, minWidth: 0 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#2f343c' }}>
                      Warehouse Address
                    </Typography>
                    <Typography sx={{ fontSize: '0.62rem', color: '#8b93a1', mt: 0.25, mb: 0.8 }}>
                      Select Your Pickup *
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <TextField
                        fullWidth
                        select
                        value={form.pickupLocation}
                        onChange={(e) => updateField('pickupLocation', e.target.value)}
                        placeholder="Choose pickup location"
                        sx={fieldSx}
                      >
                        <MenuItem value="">Choose pickup location</MenuItem>
                      </TextField>
                      <Button
                        onClick={() => updateField('returnAddress', !form.returnAddress)}
                        sx={{
                          minWidth: 'auto',
                          px: 0.2,
                          color: '#8b93a1',
                          textTransform: 'none',
                          fontSize: '0.62rem',
                        }}
                      >
                        <Box
                          sx={{
                            width: 26,
                            height: 14,
                            borderRadius: 999,
                            bgcolor: form.returnAddress ? brand.accent : '#d7dde5',
                            position: 'relative',
                            mr: 0.55,
                          }}
                        >
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: 999,
                              bgcolor: '#FFFFFF',
                              position: 'absolute',
                              top: 2,
                              left: form.returnAddress ? 13 : 2,
                            }}
                          />
                        </Box>
                        Return Address (if any)
                      </Button>
                    </Stack>

                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: 1,
                      }}
                    >
                      {warehouseCards.map((card) => (
                        <Box key={card.title} sx={{ ...panelSx, p: 1.1, minHeight: 72 }}>
                          <Stack direction="row" spacing={0.6} alignItems="flex-start">
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: 999,
                                display: 'grid',
                                placeItems: 'center',
                                color: brand.accent,
                                bgcolor: alpha(brand.accent, 0.08),
                                fontSize: 10,
                                mt: 0.1,
                              }}
                            >
                              <FiMapPin />
                            </Box>
                            <Box>
                              <Typography sx={{ fontSize: '0.67rem', fontWeight: 700, color: '#2f343c' }}>
                                {card.title}
                              </Typography>
                              <Typography sx={{ fontSize: '0.58rem', color: '#99a1ad', mt: 0.3 }}>
                                {card.subtitle}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#2f343c', mb: 0.75 }}>
                      Where are you sending it?
                    </Typography>
                    <Stack
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: 0.8,
                      }}
                    >
                      <TextField
                        label="Consignee Name *"
                        value={form.consigneeName}
                        onChange={(e) => updateField('consigneeName', e.target.value)}
                        sx={fieldSx}
                      />
                      <TextField
                        label="Mobile Number *"
                        value={form.mobileNumber}
                        onChange={(e) => updateField('mobileNumber', e.target.value)}
                        sx={fieldSx}
                      />
                      <TextField
                        label="Enter alt contact"
                        value={form.altContact}
                        onChange={(e) => updateField('altContact', e.target.value)}
                        sx={fieldSx}
                      />
                      <TextField
                        label="Email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        sx={fieldSx}
                      />
                      <TextField
                        label="Address Line 1 *"
                        value={form.address1}
                        onChange={(e) => updateField('address1', e.target.value)}
                        multiline
                        rows={2}
                        sx={{ ...fieldSx, gridColumn: '1 / span 2' }}
                      />
                      <TextField
                        label="Address Line 2"
                        value={form.address2}
                        onChange={(e) => updateField('address2', e.target.value)}
                        sx={fieldSx}
                      />
                      <TextField
                        select
                        label="Address Type *"
                        value={form.addressType}
                        onChange={(e) => updateField('addressType', e.target.value)}
                        sx={fieldSx}
                      >
                        <MenuItem value="Home">Home</MenuItem>
                        <MenuItem value="Office">Office</MenuItem>
                      </TextField>
                      <TextField
                        label="PIN Code *"
                        value={form.pinCode}
                        onChange={(e) => updateField('pinCode', e.target.value)}
                        sx={fieldSx}
                      />
                      <TextField label="City *" value={form.city} onChange={(e) => updateField('city', e.target.value)} sx={fieldSx} />
                      <TextField label="State *" value={form.state} onChange={(e) => updateField('state', e.target.value)} sx={fieldSx} />
                      <TextField
                        select
                        label="Country *"
                        value={form.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        sx={fieldSx}
                      >
                        <MenuItem value="India">India</MenuItem>
                      </TextField>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#2f343c', mb: 0.75 }}>
                      {isReverse ? 'Pickup Details' : 'Invoice / Ref. ID'}
                    </Typography>
                    <Stack
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 0.8,
                      }}
                    >
                      <TextField label="Invoice / Ref. ID" value={form.invoiceId} onChange={(e) => updateField('invoiceId', e.target.value)} sx={fieldSx} />
                      <TextField
                        label="Pre-generated Waybill"
                        value={form.preGeneratedWaybill}
                        onChange={(e) => updateField('preGeneratedWaybill', e.target.value)}
                        sx={fieldSx}
                      />
                      <TextField
                        select
                        label="Is SDD/NDD?"
                        value={form.sddNdd}
                        onChange={(e) => updateField('sddNdd', e.target.value)}
                        sx={fieldSx}
                      >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                      </TextField>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#2f343c', mb: 0.75 }}>
                      Product Details
                    </Typography>
                    <Box sx={{ ...panelSx, p: 0.9 }}>
                      <Stack
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                          gap: 0.8,
                        }}
                      >
                        <TextField label="Product Name *" value={form.productName} onChange={(e) => updateField('productName', e.target.value)} sx={fieldSx} />
                        <TextField label="Quantity *" value={form.quantity} onChange={(e) => updateField('quantity', e.target.value)} sx={fieldSx} />
                        <TextField label="Value *" value={form.value} onChange={(e) => updateField('value', e.target.value)} sx={fieldSx} />
                        <TextField label="SKU" value={form.sku} onChange={(e) => updateField('sku', e.target.value)} sx={fieldSx} />
                        <TextField label="HSN" value={form.hsn} onChange={(e) => updateField('hsn', e.target.value)} sx={fieldSx} />
                        <TextField label="Category" value={form.category} onChange={(e) => updateField('category', e.target.value)} sx={fieldSx} />
                      </Stack>
                      <Button
                        startIcon={<FiPlusCircle size={12} />}
                        sx={{
                          mt: 0.8,
                          textTransform: 'none',
                          fontSize: '0.66rem',
                          color: brand.accent,
                          px: 0,
                          minWidth: 'auto',
                        }}
                      >
                        Add More
                      </Button>
                    </Box>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#2f343c', mb: 0.75 }}>
                      Order Details
                    </Typography>
                    <Stack
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 0.8,
                      }}
                    >
                      <TextField select label="Payment Mode *" value={form.paymentMode} onChange={(e) => updateField('paymentMode', e.target.value)} sx={fieldSx}>
                        <MenuItem value="">Select Payment Mode</MenuItem>
                        <MenuItem value="Prepaid">Prepaid</MenuItem>
                        <MenuItem value="COD">COD</MenuItem>
                      </TextField>
                      <TextField label="Order Amount *" value={form.orderAmount} onChange={(e) => updateField('orderAmount', e.target.value)} sx={fieldSx} />
                      <TextField label="GST Amount *" value={form.gstAmount} onChange={(e) => updateField('gstAmount', e.target.value)} sx={fieldSx} />
                      <TextField label="Extra Charges (if any)" value={form.extraCharges} onChange={(e) => updateField('extraCharges', e.target.value)} sx={fieldSx} />
                      <TextField label="Total Amount *" value={form.totalAmount} onChange={(e) => updateField('totalAmount', e.target.value)} sx={fieldSx} />
                      <TextField label="Collectible COD Amt." value={form.codAmount} onChange={(e) => updateField('codAmount', e.target.value)} sx={fieldSx} />
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.75}>
                      <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#2f343c' }}>
                        Package Details
                      </Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography sx={{ fontSize: '0.63rem', color: '#7c8592' }}>MPS</Typography>
                        <TextField
                          select
                          value={form.mps}
                          onChange={(e) => updateField('mps', e.target.value)}
                          sx={{ ...fieldSx, width: 90 }}
                        >
                          <MenuItem value="No">No</MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                        </TextField>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2.1} alignItems="center" mb={0.85}>
                      {['0.5 KG', '1 KG', '2 KG', '5 KG', 'Others'].map((weight) => {
                        const active = weight === 'Others'
                        return (
                          <Button
                            key={weight}
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
                                mr: 0.5,
                                display: 'inline-grid',
                                placeItems: 'center',
                              }}
                            >
                              {active ? (
                                <Box sx={{ width: 5, height: 5, borderRadius: 999, bgcolor: brand.accent }} />
                              ) : null}
                            </Box>
                            {weight}
                          </Button>
                        )
                      })}
                    </Stack>
                    <Stack
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                        gap: 0.8,
                      }}
                    >
                      <TextField label="Actual Wt (kg) *" value={form.actualWeight} onChange={(e) => updateField('actualWeight', e.target.value)} sx={fieldSx} />
                      <TextField label="Length (cm) *" value={form.length} onChange={(e) => updateField('length', e.target.value)} sx={fieldSx} />
                      <TextField label="Width (cm) *" value={form.width} onChange={(e) => updateField('width', e.target.value)} sx={fieldSx} />
                      <TextField label="Height (cm) *" value={form.height} onChange={(e) => updateField('height', e.target.value)} sx={fieldSx} />
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ ...panelSx, p: 1.1 }}>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#2f343c', mb: 0.75 }}>
              Select your courier partner
            </Typography>
            <Stack
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 0.8,
                mb: 1.15,
              }}
            >
              <TextField
                select
                value={form.expressType}
                onChange={(e) => updateField('expressType', e.target.value)}
                sx={fieldSx}
              >
                <MenuItem value="">Express</MenuItem>
                <MenuItem value="Express">Express</MenuItem>
                <MenuItem value="Surface">Surface</MenuItem>
              </TextField>
              <TextField select value={form.sortBy} onChange={(e) => updateField('sortBy', e.target.value)} sx={fieldSx}>
                <MenuItem value="">Sort : Rate</MenuItem>
                <MenuItem value="rate">Sort : Rate</MenuItem>
                <MenuItem value="tat">Sort : TAT</MenuItem>
              </TextField>
            </Stack>

            <Stack spacing={0.8} mb={11}>
              {emptyCourierTiles.map((tile) => (
                <Box key={tile} sx={{ ...panelSx, p: 1, minHeight: 46 }}>
                  <Stack direction="row" spacing={0.65} alignItems="center">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        border: '1px solid #d7dde5',
                        bgcolor: '#FFFFFF',
                      }}
                    />
                    <Typography sx={{ fontSize: '0.67rem', color: '#68707d' }}>{tile}</Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ borderColor: '#eceff4', mb: 0.8 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.6}>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#4b5563' }}>
                Total(Incl. GST)
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#2f343c' }}>
                ₹0.00
              </Typography>
            </Stack>
            <Button
              fullWidth
              sx={{
                minHeight: 32,
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: '0.72rem',
                fontWeight: 700,
                bgcolor: brand.accent,
                color: '#FFFFFF',
              }}
            >
              Create Order
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
