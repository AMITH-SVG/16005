# Campus Notification System - Frontend

A production-quality React + TypeScript + Material UI notification management application.

## 🎯 Features

### 1. All Notifications Page (`/`)
- Fetch and display notifications from API
- Responsive Material UI cards with notification details
- Display: ID, Type, Message, Timestamp
- Pagination support with configurable items per page
- Loading and error states with retry functionality
- Mobile responsive design

### 2. Priority Notifications Page (`/priority`)
- User-selectable top N notifications (5, 10, 15, 20)
- Smart priority ranking system:
  - **Placement** (Weight: 3) - Highest Priority
  - **Result** (Weight: 2) - Medium Priority
  - **Event** (Weight: 1) - Lowest Priority
  - Within same type: Newest first
- Real-time ranking with visual rank badges

### 3. Filtering System
- Filter by notification type:
  - All
  - Placement (Green)
  - Result (Blue)
  - Event (Orange)
- Works on both pages
- Instant filter application

### 4. Viewed/Unviewed System
- Click notification to mark as viewed
- Persistent state using browser localStorage
- Visual distinction between viewed and unviewed
- Unviewed counter in AppBar badge
- Strikethrough styling for viewed notifications

### 5. Logging Middleware
- Centralized logger for all events
- Logs API calls, navigation, errors, interactions
- Log levels: info, warn, error, debug
- Export logs functionality
- Browser console output with color coding

### 6. Error Handling
- Graceful API failure handling
- Empty response management
- Invalid data validation
- Network issue recovery
- Material UI Alert components
- Retry mechanism for failed requests

## 🏗️ Project Structure

```
notification-app-fe/
├── src/
│   ├── api/
│   │   └── notificationService.ts       # API client with interceptors
│   ├── middleware/
│   │   └── logger.ts                    # Centralized logging system
│   ├── hooks/
│   │   └── useNotifications.ts          # Custom hook for notifications
│   ├── utils/
│   │   ├── priorityCalculator.ts        # Priority ranking logic
│   │   └── localStorage.ts              # Persistent storage utilities
│   ├── components/
│   │   ├── NotificationCard.tsx         # Individual notification display
│   │   ├── FilterBar.tsx                # Filter controls
│   │   ├── PaginationBar.tsx            # Pagination controls
│   │   ├── LoadingSpinner.tsx           # Loading state
│   │   └── ErrorState.tsx               # Error display with retry
│   ├── pages/
│   │   ├── AllNotifications.tsx         # All notifications page
│   │   └── PriorityNotifications.tsx    # Priority notifications page
│   ├── layouts/
│   │   └── MainLayout.tsx               # Main app layout with AppBar
│   ├── types/
│   │   └── notification.ts              # TypeScript interfaces
│   ├── App.tsx                          # Main app router
│   └── main.tsx                         # Entry point
├── index.html                           # HTML template
├── vite.config.js                       # Vite configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies and scripts
├── .gitignore                           # Git ignore rules
└── eslint.config.js                     # ESLint configuration
```

## 📋 Requirements

- **Framework**: React 18
- **Language**: TypeScript (Strict mode)
- **UI Library**: Material UI (MUI)
- **Router**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Node.js**: v16 or higher
- **npm**: v8 or higher

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
cd notification-app-fe
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will run on `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder

### 4. Preview Production Build

```bash
npm run preview
```

## 📝 Environment Configuration

API endpoint is configured in `src/api/notificationService.ts`:

```typescript
private baseURL = 'http://4.224.186.213/evaluation-service';
```

### API Details

**Base URL**: `http://4.224.186.213/evaluation-service`

**Endpoint**: `GET /notifications`

**Query Parameters**:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `notification_type` - Filter by type: 'Placement', 'Result', 'Event'

**Response Format**:
```json
{
  "success": true,
  "data": [
    {
      "id": "notification_id",
      "type": "Placement",
      "message": "notification message",
      "timestamp": "2024-01-01T12:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

## 🎨 UI Color Scheme

- **Placement**: Green (#4caf50)
- **Result**: Blue (#2196f3)
- **Event**: Orange (#ff9800)
- **Viewed**: Light Gray (#fafafa)
- **Primary**: Blue (#1976d2)

## 💾 LocalStorage

### Viewed Notifications Key
- Key: `campus_viewed_notifications`
- Value: JSON array of viewed notification IDs
- Usage: Automatically managed by `src/utils/localStorage.ts`

## 🔍 Logging

Access logs in browser console:

```javascript
// In browser DevTools Console:
import { logger } from './middleware/logger';

// Get all logs
logger.getLogs();

// Export logs as JSON
logger.exportLogs();

// Clear logs
logger.clearLogs();
```

## 🧪 Code Quality

- **ESLint**: `npm run lint`
- **ESLint Fix**: `npm run lint:fix`
- **TypeScript**: Strict mode enabled
- **Reusable Components**: Clean architecture
- **No Code Duplication**: DRY principles
- **Production Comments**: Well-documented code

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Small (xs): < 600px
  - Medium (sm): ≥ 600px
  - Large (md): ≥ 960px
  - Extra Large (lg): ≥ 1280px

## 🔐 Security Features

- Axios request/response interceptors
- Error boundary handling
- Input validation
- XSS protection through React
- CORS handling via API server

## 📦 Dependencies

### Production
- `react@^18.2.0` - UI library
- `react-dom@^18.2.0` - React DOM rendering
- `react-router-dom@^6.14.0` - Routing
- `@mui/material@^5.14.0` - Material UI components
- `@mui/icons-material@^5.14.0` - Material UI icons
- `@emotion/react@^11.11.0` - CSS-in-JS solution
- `@emotion/styled@^11.11.0` - Styled components
- `axios@^1.4.0` - HTTP client

### Development
- `typescript@^5.1.0` - TypeScript compiler
- `vite@^4.4.0` - Build tool
- `@vitejs/plugin-react@^4.0.0` - React plugin for Vite
- `eslint@^8.45.0` - Linting
- `@typescript-eslint/*` - TypeScript ESLint support
- `eslint-plugin-react*` - React ESLint rules

## 🎓 Architecture Highlights

### Separation of Concerns
- **API Layer**: `notificationService.ts` handles all backend communication
- **Business Logic**: `useNotifications.ts` hook manages state and data flow
- **Utilities**: Isolated functions for priority calculation and storage
- **Components**: Reusable, focused UI components
- **Middleware**: Centralized logging system

### Type Safety
- Full TypeScript coverage
- Strict mode enabled
- Interface definitions for all data structures
- Type-safe component props

### Performance
- React hooks for efficient rendering
- Memoization of computed values
- Lazy loading capability
- Optimized re-renders

### Maintainability
- Clean, self-documenting code
- Comprehensive JSDoc comments
- Consistent naming conventions
- Single Responsibility Principle

## 🐛 Troubleshooting

### API Connection Issues
```bash
# Check if API is accessible
curl http://4.224.186.213/evaluation-service/notifications?page=1&limit=10
```

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3001
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npx tsc --noEmit
```

### Cache Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- API Documentation: See API Details section above
- Type Definitions: `src/types/notification.ts`
- Logger Usage: `src/middleware/logger.ts`
- Priority Algorithm: `src/utils/priorityCalculator.ts`

## 🤝 Contributing

- Follow ESLint rules
- Maintain TypeScript strict mode
- Add JSDoc comments
- Use descriptive variable names
- Keep components focused and reusable

## 📄 License

See LICENSE file in project root

## 📞 Support

For issues or questions, check:
1. Browser console for error logs
2. Network tab in DevTools for API issues
3. Application tab for localStorage state
4. Exported logs for debugging

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
