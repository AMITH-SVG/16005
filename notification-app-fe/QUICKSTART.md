# 🚀 Campus Notification System - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Install Dependencies (2 min)
```bash
cd notification-app-fe
npm install
```

### 2. Start Development Server (1 min)
```bash
npm run dev
```

### 3. Open in Browser (1 min)
```
http://localhost:3000
```

### 4. Start Using! (1 min)
- View all notifications: http://localhost:3000/
- View priority notifications: http://localhost:3000/priority
- Click notifications to mark viewed
- Filter by type
- Change pagination

---

## 📦 What's Included

✅ **All Features Implemented**
- ✓ All Notifications page with pagination
- ✓ Priority Notifications page with ranking
- ✓ Filtering by type (Placement, Result, Event)
- ✓ Viewed/Unviewed system with localStorage
- ✓ Logging middleware for debugging
- ✓ Error handling with retry
- ✓ Mobile responsive design
- ✓ Material UI components only
- ✓ TypeScript strict mode
- ✓ Production ready code

✅ **Production Quality**
- ESLint configured
- TypeScript strict mode enabled
- Comprehensive JSDoc comments
- Clean architecture
- Reusable components
- Error boundaries
- Logging system

---

## 🎯 Available Commands

```bash
# Development
npm run dev              # Start dev server on port 3000

# Production
npm run build            # Build optimized version
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check for code issues
npm run lint:fix         # Auto-fix code issues
```

---

## 🌐 API Configuration

API is already configured to: `http://4.224.186.213/evaluation-service/notifications`

The API supports:
- `page` - Page number
- `limit` - Items per page
- `notification_type` - Filter by type (Placement, Result, Event)

---

## 💡 Key Features Explained

### Priority Algorithm
- **Placement** notifications get weight 3
- **Result** notifications get weight 2
- **Event** notifications get weight 1
- Sorted by: (weight DESC, timestamp DESC)

### Viewed Tracking
- Click any notification to mark as viewed
- Data persists in localStorage
- Visual indicator shows viewed status
- Badge in header shows unviewed count

### Logging System
Access logs in browser console:
```javascript
import { logger } from './src/middleware/logger.ts';
logger.getLogs();        // Get all logs
logger.exportLogs();     // Export as JSON
```

---

## 📱 Responsive Breakpoints

- **Mobile** (xs): < 600px
- **Tablet** (sm): ≥ 600px  
- **Laptop** (md): ≥ 960px
- **Desktop** (lg): ≥ 1280px

---

## 🎨 Color Scheme

| Type | Color | Hex |
|------|-------|-----|
| Placement | 🟢 Green | #4caf50 |
| Result | 🔵 Blue | #2196f3 |
| Event | 🟠 Orange | #ff9800 |
| Primary | 🔷 Blue | #1976d2 |

---

## 📁 Project Structure

```
notification-app-fe/
├── src/
│   ├── api/                      # API service
│   │   └── notificationService.ts
│   ├── middleware/               # Logging
│   │   └── logger.ts
│   ├── hooks/                    # Custom hooks
│   │   └── useNotifications.ts
│   ├── utils/                    # Utilities
│   │   ├── priorityCalculator.ts
│   │   └── localStorage.ts
│   ├── components/               # UI components
│   │   ├── NotificationCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── PaginationBar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorState.tsx
│   ├── pages/                    # Pages
│   │   ├── AllNotifications.tsx
│   │   └── PriorityNotifications.tsx
│   ├── layouts/                  # Layouts
│   │   └── MainLayout.tsx
│   ├── types/                    # TypeScript types
│   │   └── notification.ts
│   ├── App.tsx                   # Main app
│   └── main.tsx                  # Entry point
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js                # Build config
├── tsconfig.json                 # TypeScript config
├── eslint.config.js              # Linter config
└── README.md                     # Documentation
```

---

## 🔍 Debugging Tips

### View API Logs
```javascript
// In browser console:
logger.getLogs().filter(l => l.level === 'info')
```

### Check Viewed Notifications
```javascript
localStorage.getItem('campus_viewed_notifications')
```

### Monitor Network Requests
- Open DevTools (F12)
- Go to Network tab
- Look for `/notifications` requests

### Check Component State
- Use React DevTools extension
- Inspect component props and state

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npm run dev -- --port 3001` |
| npm install fails | `npm cache clean --force && rm -rf node_modules && npm install` |
| API not loading | Check if `http://4.224.186.213` is accessible |
| Build fails | Run `npm run lint:fix` first |
| TypeScript errors | Run `npx tsc --noEmit` |

---

## 📚 Documentation Files

- **README.md** - Full feature documentation
- **SETUP.md** - Detailed installation guide
- **src/types/notification.ts** - Data structure definitions
- **src/middleware/logger.ts** - Logging system docs
- **src/utils/priorityCalculator.ts** - Priority algorithm

---

## ✨ Next Steps

1. **Install dependencies** - `npm install`
2. **Start dev server** - `npm run dev`
3. **Explore features** - Click around the app
4. **Review code** - Check src/ folder structure
5. **Build for production** - `npm run build`
6. **Deploy** - Upload dist/ folder to your server

---

## 🎓 Learning Resources

### React 18
- Official Docs: https://react.dev

### TypeScript
- Official Docs: https://www.typescriptlang.org

### Material UI
- Component Library: https://mui.com
- Icons: https://mui.com/material-icons/

### Vite
- Official Docs: https://vitejs.dev

---

## 📞 Support

For issues:
1. Check browser console (F12)
2. Review DevTools Network tab
3. Check localStorage (Application tab)
4. Review README.md for detailed docs
5. Check individual file comments for implementation details

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Setup Time**: ~5 minutes  
**Dependencies**: 10 production, 15 dev  

**Enjoy building!** 🚀
