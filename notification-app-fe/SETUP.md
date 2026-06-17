# Campus Notification System - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v8+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Verify installations:
```bash
node --version    # Should be v16 or higher
npm --version     # Should be v8 or higher
git --version     # Should be installed
```

## 🔧 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd notification-app-fe
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18
- Material UI (MUI)
- React Router DOM
- Axios
- TypeScript
- Vite
- ESLint
- And other development dependencies

**Estimated time**: 2-5 minutes

### Step 3: Verify Installation

```bash
npm list react react-router-dom @mui/material axios
```

Should show all packages installed without errors.

## 🚀 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

Output will show:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

**Open in browser**: `http://localhost:3000/`

The application will:
- Auto-reload on file changes (Hot Module Replacement)
- Show errors in the browser
- Display console logs in DevTools

### Access the Pages

- **All Notifications**: http://localhost:3000/
- **Priority Notifications**: http://localhost:3000/priority

## 🏗️ Building for Production

### Create Optimized Build

```bash
npm run build
```

This will:
- Run TypeScript type checking
- Minify and bundle all code
- Optimize assets
- Generate optimized output in `dist/` folder

**Build time**: 1-2 minutes

### Preview Production Build

Before deploying, test the production build locally:

```bash
npm run preview
```

Open `http://localhost:4173/` in your browser to test the production build.

## 🔍 Code Quality

### Check for Linting Issues

```bash
npm run lint
```

Shows all ESLint violations without fixing them.

### Auto-Fix Linting Issues

```bash
npm run lint:fix
```

Automatically fixes fixable ESLint violations.

## 📁 File Structure Overview

```
notification-app-fe/
├── src/
│   ├── api/                    # API communication
│   ├── middleware/             # Logging system
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Page components
│   ├── layouts/                # Layout components
│   ├── types/                  # TypeScript types
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── public/                     # Static assets (if any)
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── eslint.config.js            # ESLint rules
├── .gitignore                  # Git ignore rules
├── .env.example                # Environment variables template
└── README.md                   # Project documentation
```

## 🔌 API Configuration

The application connects to:
- **Base URL**: `http://4.224.186.213/evaluation-service`
- **Endpoint**: `/notifications`

API is already configured in `src/api/notificationService.ts`

### Testing API Connection

```bash
# Test in terminal/PowerShell
curl "http://4.224.186.213/evaluation-service/notifications?page=1&limit=10"

# Or use browser
# Open: http://4.224.186.213/evaluation-service/notifications?page=1&limit=10
```

## 💾 Browser Storage

The application uses browser localStorage to persist:
- **Viewed notifications**: `campus_viewed_notifications`

This data persists even after closing the browser.

### Clear Storage (if needed)

Open browser DevTools Console and run:
```javascript
localStorage.clear();
// Then refresh the page
```

## 🎨 Customization

### Change API Base URL

Edit `src/api/notificationService.ts`:
```typescript
private baseURL = 'http://your-api-url/evaluation-service';
```

### Change Theme Colors

Edit `src/App.tsx`:
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#your-color' },
    // ... other colors
  },
});
```

### Change Default Pagination

Edit `src/hooks/useNotifications.ts`:
```typescript
const [limit, setLimit] = useState(10); // Change default
```

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

```bash
# Use different port
npm run dev -- --port 3001
```

### Issue: Dependencies Installation Failed

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript Errors After Changes

```bash
# Rebuild TypeScript without emitting
npx tsc --noEmit
```

### Issue: API Connection Error

1. Check if API server is running:
   ```bash
   curl http://4.224.186.213/evaluation-service/notifications?page=1&limit=10
   ```

2. Check browser Network tab in DevTools
3. Check browser console for CORS errors
4. Verify API URL in `src/api/notificationService.ts`

### Issue: Notifications Not Loading

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API requests
4. Check if API returns valid data

## 📝 Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Edit `.env.local` to customize:
- API URL
- App name
- Logging level
- Default pagination settings

## ✅ Verification Checklist

Before considering setup complete:

- [ ] npm install completed without errors
- [ ] npm run dev starts server successfully
- [ ] Browser opens http://localhost:3000
- [ ] Notifications load from API
- [ ] Filtering works correctly
- [ ] Pagination works correctly
- [ ] Viewed/unviewed marking works
- [ ] Priority page shows ranked notifications
- [ ] npm run lint shows no critical errors
- [ ] npm run build completes successfully

## 🔐 Security Notes

- All API requests go through axios interceptors
- Request/response logging is enabled
- Sensitive data should not be logged
- LocalStorage data is not encrypted (don't store secrets)
- Enable HTTPS in production

## 🚀 Deployment

### Build Artifacts

Production-ready files are in `dist/` folder after `npm run build`

### Deployment Options

1. **Static Hosting** (GitHub Pages, Netlify, Vercel):
   - Upload contents of `dist/` folder

2. **Docker**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY . .
   RUN npm install && npm run build
   EXPOSE 3000
   CMD ["npm", "run", "preview"]
   ```

3. **Nginx**:
   ```nginx
   server {
     listen 80;
     location / {
       root /path/to/dist;
       try_files $uri /index.html;
     }
   }
   ```

## 📞 Getting Help

1. **Browser DevTools**:
   - Console tab: Check for errors
   - Network tab: Check API requests
   - Application tab: Check localStorage

2. **VSCode Extensions** (Recommended):
   - ESLint
   - Prettier
   - Thunder Client (for API testing)

3. **Documentation**:
   - See `README.md` for detailed features
   - Check individual files for JSDoc comments
   - Review `src/types/notification.ts` for data structures

## ✨ Next Steps

After successful setup:

1. Explore the application features
2. Review the code structure
3. Check the logging system in browser console
4. Customize colors and themes if desired
5. Deploy to production using your preferred method

---

**Setup Status**: ✅ Complete
**Version**: 1.0.0
**Last Updated**: 2024
