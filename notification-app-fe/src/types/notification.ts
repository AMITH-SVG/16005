/**
 * Notification types and interfaces
 */

export type NotificationType = 'Placement' | 'Result' | 'Event';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  viewed?: boolean;
}

export interface NotificationResponse {
  success: boolean;
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams extends PaginationParams {
  notification_type?: NotificationType | 'All';
}

export interface PriorityNotification extends Notification {
  priority_score: number;
}

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}
