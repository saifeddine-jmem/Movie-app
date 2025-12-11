# 🚀 Quick Reference Guide

## Start Here! ⭐

This is your quick reference guide to get up and running with the Movie App.

---

## ⚡ 5-Minute Quick Start

### Step 1: Install (1 minute)
```bash
cd Movie-app
npm install
```

### Step 2: Get API Key (2 minutes)
1. Visit: https://www.themoviedb.org/settings/api
2. Sign in or create account
3. Request API key
4. Copy the key

### Step 3: Configure (1 minute)
Edit `src/app/environments/environment.ts`:
```typescript
tmdbApiKey: 'paste_your_key_here'
```

### Step 4: Run (1 minute)
```bash
npm start
```

### Step 5: Open Browser
```
http://localhost:4200
```

**Done!** 🎉 Your app is running!

---

## 📂 Important Files at a Glance

| File | Purpose | Edit When |
|------|---------|-----------|
| `src/app/environments/environment.ts` | API Configuration | Setting up API key |
| `src/styles.css` | Global Styles | Changing app colors |
| `src/app/app.routes.ts` | Routes | Adding new pages |
| `src/app/services/movie.service.ts` | API Calls | Adding new API endpoints |

---

## 🎮 Commands Cheatsheet

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Watch mode (build on changes)
npm run watch

# Run tests
npm test
```

---

## 🧭 Navigation Guide

### Pages Available
- **Home** (`/`) - Browse all movies
- **Movie Details** (`/movie/:id`) - View movie info
- **Wish List** (`/wish-list`) - Your saved movies

### How to Navigate
- Click movie card → View details
- Click heart button → Add to wishlist
- Click "Wish List" in header → View saved movies
- Click "Back" → Return to previous page

---

## 🎨 Quick Styling Tips

### Change Primary Color
Edit `src/styles.css` and `component.css` files:
```css
/* Change from cyan to another color */
color: #00d4ff;  /* Change this */
```

### Change Background
Edit `src/styles.css`:
```css
html, body {
  background-color: #0f3460;  /* Change this */
}
```

### Change Grid Layout
Edit `src/app/components/movie-list/movie-list.component.css`:
```css
.movies-grid {
  grid-template-columns: repeat(4, 1fr);  /* 4 columns instead of auto */
}
```

---

## 📱 Test Responsiveness

Press F12 in browser and use Device Toolbar:
- **Mobile**: 375px width
- **Tablet**: 768px width  
- **Desktop**: 1200px+ width

App is optimized for all sizes!

---

## 🐛 Common Issues

### Issue: "API returns 401"
**Solution**: Check API key in `environment.ts`

### Issue: "Images not loading"
**Solution**: Check internet connection, TMDB server might be down

### Issue: "Port 4200 in use"
**Solution**: Use different port:
```bash
ng serve --port 4201
```

### Issue: "Module not found"
**Solution**: Reinstall packages:
```bash
rm -rf node_modules
npm install
```

---

## 🚀 Deployment Ready

Your app can be deployed to:
- **Vercel** - Recommended
- **Netlify** - Good option
- **Firebase Hosting** - Google's solution
- **GitHub Pages** - Free static hosting

Build command:
```bash
npm run build
```

Output in: `dist/movie-app/`

---

## 🔑 API Key Safety

⚠️ **Important**: Never commit `environment.ts` with real API key!

For production:
1. Use environment variables
2. Set API key on deployment platform
3. Use backend proxy for security

---

## 📚 Documentation Links

- **Full Setup**: Read `SETUP.md`
- **Components**: Read `COMPONENTS.md`
- **Full Details**: Read `README.md`
- **File Structure**: Read `FILE_STRUCTURE.md`

---

## 💡 Pro Tips

1. **Use React DevTools**: Install Angular DevTools extension
2. **Debug Network**: F12 → Network tab to see API calls
3. **Check Console**: F12 → Console for errors
4. **Keyboard Shortcut**: Ctrl+Shift+I opens DevTools
5. **Mobile Emulation**: Ctrl+Shift+M in Chrome

---

## 🎯 What Each Component Does

| Component | What It Does |
|-----------|------------|
| **HeadBar** | Shows title & wish list button |
| **SearchBar** | Finds movies by title |
| **MovieList** | Shows all movies in grid |
| **MovieDetail** | Shows full movie info |
| **WishList** | Shows your saved movies |

---

## 🔄 Data Flow

```
1. User opens app
   ↓
2. HeadBar loads (shows header)
   ↓
3. MovieList component loads
   ↓
4. MovieService fetches movies from TMDB
   ↓
5. Movies display in grid
   ↓
6. User can search, view details, or add to wishlist
   ↓
7. WishListService saves to localStorage
```

---

## ✨ Features Summary

| Feature | How to Use |
|---------|-----------|
| **Browse** | Just scroll through movies |
| **Search** | Type in search bar, press Enter |
| **View Details** | Click any movie card |
| **Add to Wishlist** | Click heart icon |
| **View Wishlist** | Click heart in header |
| **Pagination** | Use Previous/Next buttons |

---

## 🎁 Bonus Commands

### View Package Size
```bash
npm list
```

### Check for Updates
```bash
npm outdated
```

### Security Audit
```bash
npm audit
```

### Clean Cache
```bash
npm cache clean --force
```

---

## 🤔 FAQ

**Q: Can I use this for production?**
A: Yes! It's production-ready.

**Q: Do I need a backend?**
A: No, TMDB API is called directly from Angular.

**Q: Is my data safe?**
A: Movies are stored in localStorage locally, no server.

**Q: Can I modify the colors?**
A: Yes, edit CSS files and colors change immediately.

**Q: How many movies can I save?**
A: As many as your browser localStorage allows (usually unlimited).

---

## 📞 Need Help?

1. **Check the docs** - Start with README.md
2. **Search console** - F12 for error messages
3. **TMDB API docs** - https://developers.themoviedb.org/
4. **Angular docs** - https://angular.io/docs

---

## 🎉 You're Ready!

Everything is set up and working. Just:
1. Add your API key
2. Run `npm start`
3. Start exploring movies!

**Happy coding!** 🚀

---

*Last Updated: January 2024*
*Movie App v1.0.0*
