/**
 * PriorityNotifications Page
 * Displays top N notifications by priority with filtering
 */

import React, { useState, useMemo } from 'react';
import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { useNotifications } from '../hooks/useNotifications';
import { getTopNNotifications, sortByPriority } from '../utils/priorityCalculator';
import { Notification, NotificationType } from '../types/notification';
import { logger } from '../middleware/logger';

const TOP_N_OPTIONS = [5, 10, 15, 20];

/**
 * PriorityNotifications page component
 */
export const PriorityNotifications: React.FC = () => {
  const [topN, setTopN] = useState(10);
  const [filter, setFilter] = useState<NotificationType | 'All'>('All');

  // Use hook but ignore pagination
  const { notifications: allNotifications, loading, error, retry } = useNotifications();

  /**
   * Filter and prioritize notifications
   */
  const prioritizedNotifications = useMemo(() => {
    let filtered = allNotifications;

    // Apply type filter
    if (filter !== 'All') {
      filtered = filtered.filter((n) => n.type === filter);
    }

    // Sort by priority
    const sorted = sortByPriority(filtered);

    // Get top N
    return getTopNNotifications(sorted, topN);
  }, [allNotifications, filter, topN]);

  const handleNotificationClick = (notification: Notification) => {
    logger.interaction('priority_notification_viewed', {
      id: notification.id,
      type: notification.type,
      rank: prioritizedNotifications.findIndex((n) => n.id === notification.id) + 1,
    });
  };

  const handleTopNChange = (event: React.MouseEvent<HTMLElement>, newValue: number | null) => {
    if (newValue !== null) {
      logger.interaction('top_n_changed', { value: newValue });
      setTopN(newValue);
    }
  };

  const handleFilterChange = (newFilter: NotificationType | 'All') => {
    setFilter(newFilter);
  };

  // Show loading state
  if (loading && allNotifications.length === 0) {
    return <LoadingSpinner message="Loading priority notifications..." />;
  }

  // Show error state
  if (error && allNotifications.length === 0) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        Priority Notifications
      </Typography>

      {/* Priority Info Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Priority Ranking:</strong> Placement (Highest) → Result (Medium) → Event (Lowest)
          | Within same type: Newest first
        </Typography>
      </Alert>

      {/* Top N Selector */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 3,
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Show Top:
        </Typography>
        <ToggleButtonGroup
          value={topN}
          exclusive
          onChange={handleTopNChange}
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
        >
          {TOP_N_OPTIONS.map((n) => (
            <ToggleButton
              key={n}
              value={n}
              sx={{
                textTransform: 'none',
                fontWeight: topN === n ? 'bold' : 'normal',
              }}
            >
              {n} Notifications
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Filter Bar */}
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

      {/* Error Alert */}
      {error && (
        <Box sx={{ mb: 2 }}>
          <ErrorState message={error} onRetry={retry} />
        </Box>
      )}

      {/* No Results */}
      {prioritizedNotifications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ color: '#666' }}>
            No priority notifications found
          </Typography>
        </Box>
      ) : (
        <>
          {/* Info */}
          <Alert severity="success" sx={{ mb: 3 }}>
            Showing {prioritizedNotifications.length} of {allNotifications.length} notifications
          </Alert>

          {/* Notifications Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {prioritizedNotifications.map((notification, index) => (
              <Grid item xs={12} sm={6} md={4} key={notification.id}>
                {/* Rank Badge */}
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: `"#${index + 1}"`,
                      position: 'absolute',
                      top: '-12px',
                      left: '8px',
                      backgroundColor: '#1976d2',
                      color: 'white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      zIndex: 10,
                    },
                  }}
                >
                  <NotificationCard
                    notification={notification}
                    onNotificationClick={handleNotificationClick}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default PriorityNotifications;
