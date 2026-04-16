import { Box, Container, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DRAWER_WIDTH } from '../../utils/constants'
import Navbar from '../Navbar/Navbar'
import KeyboardShortcuts from './keyboard/KeyboardShortcuts'
import FullScreenLoader from './loader/FullScreenLoader'
import ParcelXDesktopRail from './ParcelXDesktopRail'
import Sidebar from './Sidebar'

export default function Layout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleDrawerToggle = () => {
    if (isMobile) setMobileOpen(!mobileOpen)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#F5F7FA',
      }}
    >
      <KeyboardShortcuts />
      <ParcelXDesktopRail />

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: '#ffffff',
              color: '#171310',
              borderRight: '1px solid #ece9f1',
            },
          }}
        >
          <Sidebar
            hovered={hovered}
            setHovered={setHovered}
            pinned
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      ) : null}

      <Stack
        sx={{
          flexGrow: 1,
          minWidth: 0,
          position: 'relative',
          minHeight: '100vh',
          overflowX: 'hidden',
          bgcolor: 'transparent',
        }}
      >
        <Stack sx={{ flexGrow: 1, minHeight: 0, bgcolor: 'transparent' }}>
          <Navbar handleDrawerToggle={handleDrawerToggle} pinned={false} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              bgcolor: 'transparent',
              px: { xs: 0.7, md: 1.4 },
              pb: { xs: 1.6, md: 2.2 },
              minHeight: 0,
            }}
          >
            <Container
              maxWidth="xl"
              sx={{
                bgcolor: 'transparent',
                pt: 1.2,
                px: { xs: 0.2, md: 0.3 },
                overflowX: 'hidden',
              }}
            >
              <Suspense fallback={<FullScreenLoader />}>
                <Outlet />
              </Suspense>
            </Container>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
