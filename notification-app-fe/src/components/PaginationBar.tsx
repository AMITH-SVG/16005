/**
 * PaginationBar Component
 * Handles pagination and items per page selection
 */

import React from 'react';
import {
  Box,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { logger } from '../middleware/logger';

interface PaginationBarProps {
  page: number;
  limit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

/**
 * Calculate total pages
 */
function calculateTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

/**
 * PaginationBar component
 */
export const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  limit,
  totalItems,
  onPageChange,
  onLimitChange,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const totalPages = calculateTotalPages(totalItems, limit);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    logger.paginationChange(value, limit);
    onPageChange(value);
  };

  const handleLimitChange = (event: any) => {
    const newLimit = event.target.value;
    logger.paginationChange(1, newLimit);
    onLimitChange(newLimit);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mt: 4,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
      }}
    >
      {/* Items per page selector */}
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel>Items per page</InputLabel>
        <Select value={limit} label="Items per page" onChange={handleLimitChange}>
          <MenuItem value={5}>5 items</MenuItem>
          <MenuItem value={10}>10 items</MenuItem>
          <MenuItem value={20}>20 items</MenuItem>
          <MenuItem value={50}>50 items</MenuItem>
        </Select>
      </FormControl>

      {/* Info text */}
      <Typography variant="body2" sx={{ color: '#666' }}>
        Showing {Math.min((page - 1) * limit + 1, totalItems)}-
        {Math.min(page * limit, totalItems)} of {totalItems} items
      </Typography>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size={isSmall ? 'small' : 'medium'}
      />
    </Box>
  );
};

export default PaginationBar;
