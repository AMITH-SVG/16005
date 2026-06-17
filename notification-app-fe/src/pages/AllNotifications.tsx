/**
 * AllNotifications Page
 * Displays all notifications with filtering and pagination
 */

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import PaginationBar from '../components/PaginationBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { useNotifications } from '../hooks/useNotifications';
import { Notification, NotificationType } from '../types/notification';
import { logger } from '../middleware/logger';

/**
 * AllNotifications page component
 */
export const AllNotifications: React.FC = () => {
  const { notifications, loading, error, page, limit, totalNotifications, filter, setPage, setLimit, setFilter, retry } =
    useNotifications();

  const handleNotificationClick = (notification: Notification) => {
    logger.interaction('notification_viewed', {
      id: notification.id,
      type: notification.type,
    });
  };

  const handleFilterChange = (newFilter: NotificationType | 'All') => {
    setFilter(newFilter);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  // Show loading state
  if (loading && notifications.length === 0) {
    return <LoadingSpinner message="Loading notifications..." />;
  }

  // Show error state
  if (error && notifications.length === 0) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  // Show no results
  if (notifications.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
        <Typography variant="h6" sx={{ color: '#666' }}>
          No notifications found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        All Notifications
      </Typography>

      {/* Filter Bar */}
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

      {/* Error Alert */}
      {error && (
        <Box sx={{ mb: 2 }}>
          <ErrorState message={error} onRetry={retry} />
        </Box>
      )}

      {/* Notifications Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {notifications.map((notification) => (
          <Grid item xs={12} sm={6} md={4} key={notification.id}>
            <NotificationCard
              notification={notification}
              onNotificationClick={handleNotificationClick}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination Bar */}
      <PaginationBar
        page={page}
        limit={limit}
        totalItems={totalNotifications}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

      {/* Loading indicator overlay */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <LoadingSpinner message="Updating notifications..." />
        </Box>
      )}
    </Box>
  );
};

export default AllNotifications;
