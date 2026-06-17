/**
 * NotificationCard Component
 * Displays individual notification with type-based styling
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CardActionArea,
} from '@mui/material';
import { Notification, NotificationType } from '../types/notification';
import { isNotificationViewed, markNotificationAsViewed } from '../utils/localStorage';
import { logger } from '../middleware/logger';

interface NotificationCardProps {
  notification: Notification;
  onNotificationClick?: (notification: Notification) => void;
}

/**
 * Get color for notification type
 */
function getTypeColor(type: NotificationType): {
  background: string;
  text: string;
  border: string;
} {
  const colors: Record<
    NotificationType,
    { background: string; text: string; border: string }
  > = {
    Placement: { background: '#e8f5e9', text: '#2e7d32', border: '#4caf50' },
    Result: { background: '#e3f2fd', text: '#1565c0', border: '#2196f3' },
    Event: { background: '#fff3e0', text: '#e65100', border: '#ff9800' },
  };
  return colors[type];
}

/**
 * Get priority label for type
 */
function getPriorityLabel(type: NotificationType): string {
  const labels: Record<NotificationType, string> = {
    Placement: 'Highest',
    Result: 'Medium',
    Event: 'Lowest',
  };
  return labels[type];
}

/**
 * Format timestamp to readable date
 */
function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return timestamp;
  }
}

/**
 * NotificationCard component
 */
export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onNotificationClick,
}) => {
  const typeColor = getTypeColor(notification.type);
  const viewed = isNotificationViewed(notification.id);

  const handleClick = () => {
    if (!viewed) {
      markNotificationAsViewed(notification.id);
      logger.notificationClick(notification.id);
    }
    onNotificationClick?.(notification);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: viewed ? '#fafafa' : typeColor.background,
        border: `2px solid ${typeColor.border}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flex: 1 }}>
        <CardContent>
          {/* Header with Type and Priority Badge */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'space-between' }}>
            <Chip
              label={notification.type}
              sx={{
                backgroundColor: typeColor.border,
                color: 'white',
                fontWeight: 'bold',
              }}
            />
            <Chip
              label={getPriorityLabel(notification.type)}
              variant="outlined"
              size="small"
              sx={{ color: typeColor.text, borderColor: typeColor.border }}
            />
          </Box>

          {/* Message */}
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              lineHeight: 1.6,
              color: viewed ? '#999' : '#333',
              textDecoration: viewed ? 'line-through' : 'none',
              fontWeight: viewed ? 'normal' : 500,
            }}
          >
            {notification.message}
          </Typography>

          {/* Footer with ID and Timestamp */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#999' }}>
              ID: {notification.id}
            </Typography>
            <Typography variant="caption" sx={{ color: typeColor.text, fontWeight: 'bold' }}>
              {formatTimestamp(notification.timestamp)}
            </Typography>
          </Box>

          {/* Viewed Indicator */}
          {viewed && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                color: '#999',
                fontStyle: 'italic',
              }}
            >
              ✓ Viewed
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NotificationCard;
