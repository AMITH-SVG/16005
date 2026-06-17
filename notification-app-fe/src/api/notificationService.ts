/**
 * Notification API Service
 * Handles all API communication with the backend
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { Notification, NotificationResponse, FilterParams, NotificationType } from '../types/notification';
import { logger } from '../middleware/logger';

// Mock data for demonstration/fallback
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_001',
    type: 'Placement',
    message: 'Google is recruiting software engineers! Apply now to work with cutting-edge technology.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_002',
    type: 'Result',
    message: 'Your midterm exam results are now available. Check the student portal.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_003',
    type: 'Event',
    message: 'Campus tech meetup tomorrow at 6 PM in the auditorium. Free pizza!',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_004',
    type: 'Placement',
    message: 'Microsoft internship positions now open. Last day to apply is Friday.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_005',
    type: 'Result',
    message: 'Final project submission deadline extended to next week.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_006',
    type: 'Event',
    message: 'Annual hackathon registration is now open! Register your team.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_007',
    type: 'Placement',
    message: 'Amazon AWS certification training program for students - Free!',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_008',
    type: 'Result',
    message: 'Your GPA has been updated. View your transcript here.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_009',
    type: 'Event',
    message: 'Guest lecture: AI in healthcare by Dr. Smith. RSVP required.',
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_010',
    type: 'Placement',
    message: 'Goldman Sachs is hosting a networking session for finance students.',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_011',
    type: 'Result',
    message: 'Your assignment has been graded. Grade: A (95/100)',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_012',
    type: 'Event',
    message: 'Annual alumni meet scheduled for next month. Registrations open.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

class NotificationService {
  private api: AxiosInstance;
  private baseURL = 'http://4.224.186.213/evaluation-service';
  private useMockData = true; // Toggle to use mock data

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    // Add request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        logger.api(config.method?.toUpperCase() || 'GET', config.url || '', config.params);
        return config;
      },
      (error) => {
        logger.error('API Request Error', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.api.interceptors.response.use(
      (response) => {
        logger.debug('API Response', { status: response.status, data: response.data });
        return response;
      },
      (error) => {
        logger.error('API Response Error', error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetch notifications with filtering and pagination
   */
  async fetchNotifications(params?: FilterParams): Promise<Notification[]> {
    try {
      // Use mock data for development (CORS issue with backend)
      if (this.useMockData) {
        logger.debug('Using mock data for notifications');
        let filtered = [...MOCK_NOTIFICATIONS];

        // Apply type filter if specified
        if (params?.notification_type && params.notification_type !== 'All') {
          filtered = filtered.filter((n) => n.type === params.notification_type);
        }

        // Apply pagination
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedData = filtered.slice(startIndex, endIndex);
        logger.api('MOCK GET', '/notifications', params, { count: paginatedData.length });
        return paginatedData;
      }

      const queryParams: Record<string, unknown> = {
        page: params?.page || 1,
        limit: params?.limit || 10,
      };

      // Add notification type filter if specified and not 'All'
      if (params?.notification_type && params.notification_type !== 'All') {
        queryParams.notification_type = params.notification_type;
      }

      const response = await this.api.get<NotificationResponse>('/notifications', {
        params: queryParams,
      });

      if (!response.data.success) {
        throw new Error('API response indicates failure');
      }

      // Ensure all notifications have id, type, message, timestamp
      const validatedNotifications = response.data.data.filter(
        (notif) => notif.id && notif.type && notif.message && notif.timestamp
      );

      return validatedNotifications;
    } catch (error) {
      const errorMessage = error instanceof AxiosError ? error.message : 'Failed to fetch notifications';
      logger.error(`Failed to fetch notifications: ${errorMessage}`, error);
      
      // Fallback to mock data on error
      if (!this.useMockData) {
        logger.debug('Falling back to mock data due to API error');
        return this.fetchNotifications(params);
      }
      
      throw error;
    }
  }

  /**
   * Fetch all notifications without pagination (for priority calculations)
   */
  async fetchAllNotifications(type?: NotificationType): Promise<Notification[]> {
    try {
      // Use mock data for development (CORS issue with backend)
      if (this.useMockData) {
        logger.debug('Using mock data for all notifications');
        let filtered = [...MOCK_NOTIFICATIONS];

        if (type) {
          filtered = filtered.filter((n) => n.type === type);
        }

        logger.api('MOCK GET', '/notifications', { limit: 1000 }, { count: filtered.length });
        return filtered;
      }

      const params: Record<string, unknown> = {
        page: 1,
        limit: 1000, // Fetch large batch for priority calculation
      };

      if (type) {
        params.notification_type = type;
      }

      const response = await this.api.get<NotificationResponse>('/notifications', { params });

      if (!response.data.success) {
        throw new Error('API response indicates failure');
      }

      return response.data.data.filter(
        (notif) => notif.id && notif.type && notif.message && notif.timestamp
      );
    } catch (error) {
      const errorMessage = error instanceof AxiosError ? error.message : 'Failed to fetch all notifications';
      logger.error(`Failed to fetch all notifications: ${errorMessage}`, error);
      
      // Fallback to mock data on error
      if (!this.useMockData) {
        logger.debug('Falling back to mock data due to API error');
        return this.fetchAllNotifications(type);
      }
      
      throw error;
    }
  }

  /**
   * Get base URL for API (useful for testing)
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Toggle between mock data and real API
   */
  setUseMockData(useMock: boolean): void {
    this.useMockData = useMock;
    logger.debug(`Switched to ${useMock ? 'mock' : 'real'} data mode`);
  }

  /**
   * Check if using mock data
   */
  isUsingMockData(): boolean {
    return this.useMockData;
  }
}

// Create singleton instance
export const notificationService = new NotificationService();
