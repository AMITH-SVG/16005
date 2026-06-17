/**
 * LocalStorage utilities for persisting viewed notifications
 */

const VIEWED_NOTIFICATIONS_KEY = 'campus_viewed_notifications';

/**
 * Get all viewed notification IDs
 */
export function getViewedNotifications(): Set<string> {
  try {
    const stored = localStorage.getItem(VIEWED_NOTIFICATIONS_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error('Error reading viewed notifications from localStorage:', error);
    return new Set();
  }
}

/**
 * Check if a notification is viewed
 */
export function isNotificationViewed(notificationId: string): boolean {
  return getViewedNotifications().has(notificationId);
}

/**
 * Mark a notification as viewed
 */
export function markNotificationAsViewed(notificationId: string): void {
  try {
    const viewed = getViewedNotifications();
    viewed.add(notificationId);
    localStorage.setItem(VIEWED_NOTIFICATIONS_KEY, JSON.stringify([...viewed]));
  } catch (error) {
    console.error('Error saving viewed notification to localStorage:', error);
  }
}

/**
 * Mark multiple notifications as viewed
 */
export function markNotificationsAsViewed(notificationIds: string[]): void {
  try {
    const viewed = getViewedNotifications();
    notificationIds.forEach((id) => viewed.add(id));
    localStorage.setItem(VIEWED_NOTIFICATIONS_KEY, JSON.stringify([...viewed]));
  } catch (error) {
    console.error('Error saving viewed notifications to localStorage:', error);
  }
}

/**
 * Clear all viewed notifications
 */
export function clearViewedNotifications(): void {
  try {
    localStorage.removeItem(VIEWED_NOTIFICATIONS_KEY);
  } catch (error) {
    console.error('Error clearing viewed notifications from localStorage:', error);
  }
}

/**
 * Get count of viewed notifications
 */
export function getViewedNotificationsCount(): number {
  return getViewedNotifications().size;
}

/**
 * Get count of unviewed notifications
 */
export function getUnviewedNotificationsCount(totalCount: number): number {
  return totalCount - getViewedNotificationsCount();
}
