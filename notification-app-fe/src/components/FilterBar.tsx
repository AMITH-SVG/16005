/**
 * FilterBar Component
 * Allows filtering notifications by type
 */

import React from 'react';
import { Box, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { NotificationType } from '../types/notification';
import { logger } from '../middleware/logger';

interface FilterBarProps {
  currentFilter: NotificationType | 'All';
  onFilterChange: (filter: NotificationType | 'All') => void;
}

const FILTER_OPTIONS: Array<NotificationType | 'All'> = ['All', 'Placement', 'Result', 'Event'];

/**
 * Get color for filter chip
 */
function getFilterChipColor(
  filterType: NotificationType | 'All',
  isActive: boolean
): string {
  if (!isActive) return 'default';

  switch (filterType) {
    case 'Placement':
      return 'success';
    case 'Result':
      return 'info';
    case 'Event':
      return 'warning';
    default:
      return 'primary';
  }
}

/**
 * FilterBar component
 */
export const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterClick = (filter: NotificationType | 'All') => {
    if (filter !== currentFilter) {
      logger.filterChange('notification_type', filter);
      onFilterChange(filter);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        flexWrap: 'wrap',
      }}
    >
      <Typography variant={isSmall ? 'body2' : 'subtitle1'} sx={{ fontWeight: 'bold' }}>
        Filter by Type:
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onClick={() => handleFilterClick(filter)}
            color={getFilterChipColor(filter, filter === currentFilter)}
            variant={filter === currentFilter ? 'filled' : 'outlined'}
            clickable
            sx={{
              fontWeight: filter === currentFilter ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FilterBar;
