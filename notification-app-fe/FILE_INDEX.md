# Campus Notification System - File Index

## 📖 Documentation Files

| File | Description |
|------|-------------|
| **README.md** | Complete feature documentation, API details, troubleshooting |
| **QUICKSTART.md** | 5-minute setup and quick reference guide |
| **SETUP.md** | Detailed installation, configuration, and debugging guide |
| **PROJECT_SUMMARY.md** | Comprehensive project overview and architecture |
| **FILE_INDEX.md** | This file - index of all files |

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| **package.json** | Dependencies, scripts, and project metadata |
| **tsconfig.json** | TypeScript compiler configuration (strict mode) |
| **tsconfig.node.json** | TypeScript config for Vite |
| **vite.config.js** | Build tool configuration |
| **eslint.config.js** | Code quality linting rules |
| **.gitignore** | Git ignore patterns |
| **.env.example** | Environment variables template |

---

## 🎯 Entry Points

| File | Purpose |
|------|---------|
| **index.html** | HTML template and app root |
| **src/main.tsx** | React DOM render entry point |
| **src/App.tsx** | Main app component with routing |

---

## 📁 Source Code Structure

### API Layer (`src/api/`)

| File | Purpose |
|------|---------|
| **notificationService.ts** | API client with Axios, request/response interceptors, error handling |

**Key Classes/Functions**:
- `NotificationService` class (singleton)
- `fetchNotifications(params)` - Get paginated notifications
- `fetchAllNotifications(type)` - Get all notifications for priority calculation

---

### Middleware (`src/middleware/`)

| File | Purpose |
|------|---------|
| **logger.ts** | Centralized logging system with console output |

**Key Classes/Functions**:
- `Logger` class (singleton)
- `api()` - Log API calls
- `error()` - Log errors
- `interaction()` - Log user interactions
- `navigation()` - Log page navigation
- `filterChange()` - Log filter changes
- `paginationChange()` - Log pagination changes
- `debug()` - Debug logs

---

### Hooks (`src/hooks/`)

| File | Purpose |
|------|---------|
| **useNotifications.ts** | Custom React hook for notification state management |

**Key Exports**:
- `useNotifications()` - Main hook returning notifications, pagination, filter states

**Returns**:
```typescript
{
  notifications,
  loading,
  error,
  page,
  limit,
  totalNotifications,
  filter,
  setPage,
  setLimit,
  setFilter,
  retry
}
```

---

### Utilities (`src/utils/`)

| File | Purpose |
|------|---------|
| **priorityCalculator.ts** | Priority ranking algorithm and utilities |
| **localStorage.ts** | LocalStorage management for viewed notifications |

**priorityCalculator exports**:
- `calculatePriorityScore(notification)` - Calculate single score
- `addPriorityScores(notifications)` - Add scores to array
- `sortByPriority(notifications)` - Sort by priority
- `getTopNNotifications(notifications, n)` - Get top N
- `getNotificationTypeColor(type)` - Get color hex
- `getPriorityLabel(type)` - Get priority text label

**localStorage exports**:
- `getViewedNotifications()` - Get Set of IDs
- `isNotificationViewed(id)` - Check if viewed
- `markNotificationAsViewed(id)` - Mark as viewed
- `markNotificationsAsViewed(ids)` - Mark multiple
- `clearViewedNotifications()` - Clear all
- `getViewedNotificationsCount()` - Get count
- `getUnviewedNotificationsCount(total)` - Get unviewed count

---

### Components (`src/components/`)

| File | Purpose | Key Props |
|------|---------|-----------|
| **NotificationCard.tsx** | Display single notification | `notification`, `onNotificationClick` |
| **FilterBar.tsx** | Filter by type controls | `currentFilter`, `onFilterChange` |
| **PaginationBar.tsx** | Pagination and items/page controls | `page`, `limit`, `totalItems`, `onPageChange`, `onLimitChange` |
| **LoadingSpinner.tsx** | Loading state display | `message` |
| **ErrorState.tsx** | Error display with retry | `message`, `onRetry` |

**Features**:
- NotificationCard: Color-coded by type, viewed/unviewed styling
- FilterBar: Chips for All, Placement, Result, Event
- PaginationBar: Dropdown for items/page, pagination controls
- LoadingSpinner: Animated spinner with message
- ErrorState: Error alert with retry button

---

### Pages (`src/pages/`)

| File | Purpose | Route |
|------|---------|-------|
| **AllNotifications.tsx** | Display all notifications with pagination | `/` |
| **PriorityNotifications.tsx** | Display top N prioritized notifications | `/priority` |

**AllNotifications Features**:
- Full pagination support
- Filtering by type
- Automatic API fetching
- Loading/error states

**PriorityNotifications Features**:
- Top N selector (5, 10, 15, 20)
- Priority ranking display
- Rank badges (#1, #2, etc.)
- Type filtering
- Highest/medium/lowest indicators

---

### Layouts (`src/layouts/`)

| File | Purpose |
|------|---------|
| **MainLayout.tsx** | Main app layout wrapper with AppBar, navigation, footer |

**Features**:
- AppBar with app title and icon
- Navigation tabs (All / Priority)
- Unviewed badge counter
- Content container
- Footer with statistics

---

### Types (`src/types/`)

| File | Purpose |
|------|---------|
| **notification.ts** | TypeScript interfaces and types |

**Key Types**:
- `NotificationType` - 'Placement' | 'Result' | 'Event'
- `Notification` - Single notification data
- `NotificationResponse` - API response
- `PaginationParams` - Pagination parameters
- `FilterParams` - Filter parameters
- `PriorityNotification` - Notification with priority score
- `LogLevel` - Log level types
- `LogEntry` - Log entry structure

---

## 🔗 Data Flow

```
main.tsx
  ↓
App.tsx (Router setup, Theme)
  ↓
MainLayout.tsx (AppBar, Tabs, Navigation)
  ↓
AllNotifications.tsx OR PriorityNotifications.tsx
  ↓
useNotifications.ts (fetch, filter, paginate)
  ↓
notificationService.ts (API call)
  ↓
HTTP → 4.224.186.213/evaluation-service/notifications
  ↓
Components (render notifications)
```

---

## 📊 File Statistics

| Category | Count | Files |
|----------|-------|-------|
| **TypeScript/TSX** | 21 | Components, pages, hooks, utilities |
| **Configuration** | 7 | Config files |
| **Documentation** | 5 | MD files |
| **Assets** | 1 | HTML |
| **Total** | 34 | All files |

---

## 🚀 Key Imports Map

### Using Logger
```typescript
import { logger } from './middleware/logger';
logger.api('GET', '/api/notifications');
```

### Using Priority Calculator
```typescript
import { sortByPriority, getTopNNotifications } from './utils/priorityCalculator';
const sorted = sortByPriority(notifications);
```

### Using Storage Utilities
```typescript
import { markNotificationAsViewed, isNotificationViewed } from './utils/localStorage';
markNotificationAsViewed('notif_001');
```

### Using API Service
```typescript
import { notificationService } from './api/notificationService';
const data = await notificationService.fetchNotifications({ page: 1, limit: 10 });
```

### Using Custom Hook
```typescript
import { useNotifications } from './hooks/useNotifications';
const { notifications, loading, error } = useNotifications();
```

### Using Components
```typescript
import NotificationCard from './components/NotificationCard';
import FilterBar from './components/FilterBar';
import PaginationBar from './components/PaginationBar';
```

---

## 🎯 Development Workflow

### 1. **Start Development**
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### 2. **Make Changes**
- Edit any file in `src/`
- Changes auto-reload
- Errors show in browser

### 3. **Check Quality**
```bash
npm run lint
npm run lint:fix
```

### 4. **Build for Production**
```bash
npm run build
npm run preview
```

---

## 📋 Testing Checklist

- [ ] App loads at http://localhost:3000
- [ ] Notifications fetch from API
- [ ] All page displays all notifications
- [ ] Priority page shows ranked notifications
- [ ] Filtering works on both pages
- [ ] Pagination changes items/page
- [ ] Clicking notification marks as viewed
- [ ] Viewed counter updates in header
- [ ] Visited notifications show as viewed
- [ ] Error state displays with retry
- [ ] Mobile layout is responsive
- [ ] Console logs show API calls
- [ ] Build completes without errors
- [ ] Production build runs at http://localhost:4173

---

## 🔍 File Size Overview

| File Type | Typical Size | Compression |
|-----------|------------|------------|
| Components | 1-3 KB | Bundled |
| Hooks | 2-4 KB | Bundled |
| Utils | 1-2 KB | Bundled |
| Pages | 2-4 KB | Bundled |
| **Total (gzipped)** | ~30 KB | Production |

---

## 🎓 Learning Path

### For Beginners
1. Start with README.md for features
2. Check QUICKSTART.md for setup
3. Explore components in `src/components/`
4. Review main App.tsx

### For Developers
1. Study `src/hooks/useNotifications.ts` - State management
2. Review `src/api/notificationService.ts` - API integration
3. Check `src/utils/priorityCalculator.ts` - Algorithm
4. Examine pages structure

### For DevOps/Deploy
1. Check vite.config.js - Build configuration
2. Review SETUP.md - Installation steps
3. Check package.json - Dependencies
4. See PROJECT_SUMMARY.md - Deployment options

---

## 🆘 Quick Reference

### Adding a New Notification Type
1. Update `NotificationType` in `src/types/notification.ts`
2. Add weight in `src/utils/priorityCalculator.ts`
3. Add color in `getTypeColor()` in components
4. Update API filter logic

### Changing API Endpoint
1. Edit `src/api/notificationService.ts`
2. Update baseURL variable

### Modifying Logging
1. Edit `src/middleware/logger.ts`
2. Add new method to Logger class

### Customizing Styling
1. Edit colors in `getTypeColor()` functions
2. Update Material UI theme in `src/App.tsx`

---

**File Index Version**: 1.0
**Last Updated**: 2024
**Status**: ✅ Complete
