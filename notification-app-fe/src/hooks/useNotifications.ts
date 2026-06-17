/**
 * Custom hook for managing notifications
 * Handles fetching, filtering, and state management
 */

import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationType, FilterParams } from '../types/notification';
import { notificationService } from '../api/notificationService';
import { logger } from '../middleware/logger';

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalNotifications: number;
  filter: NotificationType | 'All';
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilter: (filter: NotificationType | 'All') => void;
  retry: () => void;
}

/**
 * Hook to manage notifications fetching and filtering
 */
export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<NotificationType | 'All'>('All');
  const [totalNotifications, setTotalNotifications] = useState(0);

  /**
   * Fetch notifications based on current filters and pagination
   */
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: FilterParams = {
        page,
        limit,
        notification_type: filter,
      };

      logger.paginationChange(page, limit);
      if (filter !== 'All') {
        logger.filterChange('notification_type', filter);
      }

      const data = await notificationService.fetchNotifications(params);

      setNotifications(data);
      // Estimate total based on response
      setTotalNotifications(data.length > 0 ? (page - 1) * limit + data.length + 100 : 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch notifications';
      setError(errorMessage);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter]);

  /**
   * Fetch notifications on mount and when dependencies change
   */
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  /**
   * Handle page change
   */
  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  /**
   * Handle limit change
   */
  const handleSetLimit = useCallback((newLimit: number) => {
    setPage(1);
    setLimit(newLimit);
  }, []);

  /**
   * Handle filter change
   */
  const handleSetFilter = useCallback((newFilter: NotificationType | 'All') => {
    setPage(1);
    setFilter(newFilter);
  }, []);

  /**
   * Retry fetching notifications
   */
  const handleRetry = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    page,
    limit,
    totalNotifications,
    filter,
    setPage: handleSetPage,
    setLimit: handleSetLimit,
    setFilter: handleSetFilter,
    retry: handleRetry,
  };
}
