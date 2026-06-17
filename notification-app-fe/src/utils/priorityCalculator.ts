/**
 * Priority calculation utilities
 * Calculates priority scores for notifications based on type and timestamp
 */

import { Notification, NotificationType, PriorityNotification } from '../types/notification';

// Priority weights for each notification type
const PRIORITY_WEIGHTS: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

/**
 * Calculate priority score for a single notification
 * Formula: (weight * 1000) + (timestamp converted to score descending)
 * Higher score = higher priority
 */
export function calculatePriorityScore(notification: Notification): number {
  const weight = PRIORITY_WEIGHTS[notification.type];
  
  // Convert timestamp to score (newer = higher score)
  // Invert timestamp so newer notifications have higher scores
  const timestamp = new Date(notification.timestamp).getTime();
  const maxTimestamp = new Date().getTime();
  const timeFactor = (maxTimestamp - timestamp) / 1000; // Normalize to seconds
  
  // Priority score = (weight * large multiplier) - (time in seconds)
  // This ensures type weight is primary sort, timestamp is secondary
  return weight * 1000000 - timeFactor;
}

/**
 * Add priority score to notifications
 */
export function addPriorityScores(notifications: Notification[]): PriorityNotification[] {
  return notifications.map((notification) => ({
    ...notification,
    priority_score: calculatePriorityScore(notification),
  }));
}

/**
 * Sort notifications by priority (highest first)
 */
export function sortByPriority(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => {
    const scoreA = calculatePriorityScore(a);
    const scoreB = calculatePriorityScore(b);
    return scoreB - scoreA;
  });
}

/**
 * Get top N notifications by priority
 */
export function getTopNNotifications(notifications: Notification[], n: number): Notification[] {
  return sortByPriority(notifications).slice(0, n);
}

/**
 * Get color for notification type
 */
export function getNotificationTypeColor(type: NotificationType): string {
  const colors: Record<NotificationType, string> = {
    Placement: '#4caf50', // green
    Result: '#2196f3', // blue
    Event: '#ff9800', // orange
  };
  return colors[type];
}

/**
 * Get priority label
 */
export function getPriorityLabel(type: NotificationType): string {
  const labels: Record<NotificationType, string> = {
    Placement: 'Highest',
    Result: 'Medium',
    Event: 'Lowest',
  };
  return labels[type];
}
