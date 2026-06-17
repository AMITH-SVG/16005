/**
 * Centralized logging middleware
 * Logs API calls, navigation, errors, and user interactions
 */

import { LogLevel, LogEntry } from '../types/notification';

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  /**
   * Log a message with specified level
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output for development
    const style = this.getConsoleStyle(level);
    console.log(`%c[${level.toUpperCase()}]`, style, message, data || '');
  }

  /**
   * Get console styling based on log level
   */
  private getConsoleStyle(level: LogLevel): string {
    const styles: Record<LogLevel, string> = {
      info: 'color: #0288d1; font-weight: bold;',
      warn: 'color: #f57c00; font-weight: bold;',
      error: 'color: #d32f2f; font-weight: bold;',
      debug: 'color: #7b1fa2; font-weight: bold;',
    };
    return styles[level];
  }

  /**
   * Log API calls
   */
  api(method: string, url: string, params?: unknown, response?: unknown): void {
    this.log('info', `[API] ${method} ${url}`, { params, response });
  }

  /**
   * Log navigation
   */
  navigation(from: string, to: string): void {
    this.log('info', `[NAVIGATION] ${from} → ${to}`, {});
  }

  /**
   * Log errors
   */
  error(message: string, error?: unknown): void {
    this.log('error', message, error);
  }

  /**
   * Log user interactions
   */
  interaction(action: string, details?: unknown): void {
    this.log('info', `[INTERACTION] ${action}`, details);
  }

  /**
   * Log filter changes
   */
  filterChange(filterType: string, filterValue: string): void {
    this.log('info', `[FILTER] ${filterType} changed to ${filterValue}`, {});
  }

  /**
   * Log pagination changes
   */
  paginationChange(page: number, limit: number): void {
    this.log('info', `[PAGINATION] Page ${page}, Limit ${limit}`, {});
  }

  /**
   * Log notification click
   */
  notificationClick(notificationId: string): void {
    this.log('info', `[NOTIFICATION_CLICK] Notification ${notificationId} clicked`, {});
  }

  /**
   * Debug logging
   */
  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  /**
   * Get all logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Create singleton instance
export const logger = new Logger();
