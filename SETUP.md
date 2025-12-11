# 🚀 Getting Started with Movie App

## Quick Start Guide

This guide will help you set up and run the Movie App locally.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A **TMDB API Key** - [Get it here](https://www.themoviedb.org/settings/api)

Verify installation:
```bash
node --version
npm --version
```

## Step-by-Step Setup

### 1. Navigate to Project Directory
```bash
cd path/to/Movie-app
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Angular 18 framework
- FontAwesome for icons
- RxJS for reactive programming
- TypeScript compiler

### 3. Get Your TMDB API Key

1. Go to [TMDB API Settings](https://www.themoviedb.org/settings/api)
2. Sign in or create an account
3. Click on "Create" to request an API key
4. Select "Developer" and accept the terms
5. Fill in the required information
6. Copy your API Key (it will look like a long alphanumeric string)

### 4. Configure the API Key

Open `src/app/environments/environment.ts` and replace the placeholder:

**Before:**
```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'YOUR_TMDB_API_KEY_HERE',
  tmdbBaseUrl: 'https://api.themoviedb.org/3'
};
```

**After:**
```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'your_actual_api_key_here_12345abcde',
  tmdbBaseUrl: 'https://api.themoviedb.org/3'
};
```

Also update `src/app/environments/environment.prod.ts` for production builds.

### 5. Start the Development Server
```bash
npm start
```

Or using Angular CLI directly:
```bash
ng serve
```

You'll see output like:
```
✔ Compiled successfully.
Applications bundle generation complete.

Initial Chunk Files | Names         | Size
main.js             | main          | 234 kB |

Build at: 2024-01-15T10:30:00.000Z - Hash: abc123def456
```

### 6. Open in Your Browser

Navigate to:
```
http://localhost:4200
```

The application will automatically reload when you make changes to files.

## 📊 Application Features

Once the app loads, you'll see:

### Home Page (/)
- List of currently playing movies from TMDB
- Search bar to find movies by title
- Movie cards with posters, ratings, and quick add to wishlist
- Pagination controls

### Movie Details (/movie/:id)
- Full movie information and synopsis
- Budget and revenue information
- Production company details
- Release date and rating
- Add to/remove from wishlist

### Wishlist (/wish-list)
- Your saved movies
- Persistent storage (saved in browser)
- Quick remove buttons
- Empty state message

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode (build on file changes)
npm run watch
```

## 📝 Project Structure

```
Movie-app/
├── src/
│   ├── app/
│   │   ├── components/        # Angular components
│   │   ├── services/          # Services (API, Wishlist)
│   │   ├── models/            # TypeScript interfaces
│   │   ├── environments/       # Configuration files
│   │   ├── app.component.ts    # Root component
│   │   ├── app.routes.ts       # Routes configuration
│   │   └── app.config.ts       # App configuration
│   ├── main.ts                 # Entry point
│   ├── index.html              # HTML template
│   └── styles.css              # Global styles
├── angular.json                # Angular configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## 🔧 Customization

### Change API Base URL
Edit `src/app/environments/environment.ts`:
```typescript
tmdbBaseUrl: 'https://api.themoviedb.org/3'
```

### Customize Theme Colors
Edit `src/styles.css` to change the color scheme:
```css
/* Change primary color */
--primary-color: #00d4ff;
--dark-bg: #0f3460;
```

### Modify Grid Layout
In `src/app/components/movie-list/movie-list.component.css`:
```css
.movies-grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

## 🐛 Troubleshooting

### Issue: "Cannot find module '@angular/core'"
**Solution:** Run `npm install` again

### Issue: "API returns 401 Unauthorized"
**Solution:** Check that your API key is correctly configured in `environment.ts`

### Issue: "Port 4200 already in use"
**Solution:** Use a different port:
```bash
ng serve --port 4201
```

### Issue: "Module not found" errors
**Solution:** Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Useful Resources

- [Angular 18 Documentation](https://angular.io/docs)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [RxJS Documentation](https://rxjs.dev/)
- [FontAwesome Documentation](https://fontawesome.com/docs/web/use-with/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🚀 Next Steps

1. **Customize Styling**: Modify CSS files to match your brand
2. **Add More Features**: Implement user authentication, reviews, etc.
3. **Deploy**: Use Angular's build command and deploy to hosting service
4. **Optimize**: Use Angular's production build for better performance

## 💡 Tips

- Use **Chrome DevTools** for debugging (F12)
- Check the **Console** for error messages
- Use **Angular DevTools** extension for debugging components
- Keep API key secure - never commit it to version control

## 🎉 You're All Set!

Your Movie App is now running! Start exploring movies and building your wishlist.

For questions or issues, refer to the main [README.md](./README.md) or the component documentation.

---

**Happy coding! 🎬**
