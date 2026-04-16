import { Box, type BoxProps } from '@mui/material'
import BrandSurface from './BrandSurface'

interface BrandTopBarProps extends BoxProps {
  innerSx?: BoxProps['sx']
}

export default function BrandTopBar({
  children,
  sx,
  innerSx,
  ...rest
}: BrandTopBarProps) {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        px: { xs: 1, sm: 1.5 },
        py: 0,
        backgroundColor: '#F5F7FA',
        borderBottom: '1px solid rgba(26, 26, 26, 0.06)',
        ...sx,
      }}
      {...rest}
    >
      <BrandSurface
        variant="card"
        sx={{
          px: { xs: 1.2, sm: 1.6, lg: 2.1 },
          py: { xs: 0.95, sm: 1.05 },
          borderRadius: 0,
          border: 'none',
          boxShadow: 'none',
          background: '#FFFFFF',
          ...innerSx,
        }}
      >
        {children}
      </BrandSurface>
    </Box>
  )
}
