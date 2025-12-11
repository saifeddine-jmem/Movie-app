# 🎬 Movie App - TMDB Integration

A comprehensive Angular 18 movie application that integrates with The Movie Database (TMDB) API to display, search, and manage movies with a modern, responsive UI.

## 🌟 Features

- **Movie List Display**: Browse currently playing movies from TMDB
- **Search Functionality**: Find movies by title with paginated results
- **Movie Details**: View comprehensive information about selected movies including:
  - Plot overview
  - Release date and runtime
  - Budget and revenue information
  - Production companies and countries
  - User ratings and reviews
- **Wish List**: Add movies to a persistent wish list (stored in localStorage)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Font Awesome Icons**: Enhanced UI with modern icon support
- **Pagination**: Navigate through multiple pages of movie results

## 📋 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── head-bar/           # Header with wish list button
│   │   ├── search-bar/         # Movie search input component
│   │   ├── movie-list/         # Main movie list display
│   │   ├── movie-detail/       # Movie details page
│   │   └── wish-list/          # Wish list management
│   ├── services/
│   │   ├── movie.service.ts    # TMDB API service
│   │   └── wish-list.service.ts # Wish list management
│   ├── models/
│   │   └── movie.model.ts      # TypeScript interfaces
│   ├── environments/
│   │   ├── environment.ts      # Development configuration
│   │   └── environment.prod.ts # Production configuration
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts           # Application routing
│   └── app.config.ts           # Application configuration
├── index.html                   # Main HTML file
├── main.ts                      # Application entry point
└── styles.css                   # Global styles
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI installed globally (optional)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get TMDB API Key**
   - Visit [TMDB API](https://www.themoviedb.org/settings/api)
   - Create an account or sign in
   - Request an API key
   - Copy your API key

3. **Configure API Key**
   - Open `src/app/environments/environment.ts`
   - Replace `YOUR_TMDB_API_KEY_HERE` with your actual TMDB API key
   ```typescript
   export const environment = {
     production: false,
     tmdbApiKey: 'YOUR_ACTUAL_API_KEY_HERE',
     tmdbBaseUrl: 'https://api.themoviedb.org/3'
   };
   ```
   - Do the same for `src/app/environments/environment.prod.ts`

4. **Start Development Server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

5. **Open in Browser**
   - Navigate to `http://localhost:4200`
   - The application will automatically reload when you make changes

## 🏗️ Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/movie-app` directory.

## 📱 Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | MovieListComponent | Home page with all movies |
| `/movie/:id` | MovieDetailComponent | Detailed view for a specific movie |
| `/wish-list` | WishListComponent | User's wishlist |

## 🔧 Core Services

### MovieService
Handles all TMDB API interactions:
- `getMovieList(page)` - Fetch currently playing movies
- `getMovieById(id)` - Get detailed information for a movie
- `getMovieByTitle(title, page)` - Search movies by title
- `getPosterUrl(path)` - Format poster image URLs
- `getBackdropUrl(path)` - Format backdrop image URLs

### WishListService
Manages the wish list with localStorage persistence:
- `addToWishList(movie)` - Add a movie to wish list
- `removeFromWishList(movieId)` - Remove a movie from wish list
- `clearWishList()` - Clear the entire wish list
- `getWishList()` - Get current wish list
- `isInWishList(movieId)` - Check if a movie is in wish list
- `wishList$` - Observable stream of wish list updates

## 🎨 UI Components

### HeadBar Component
- Displays "Movie List" title
- Shows wish list button with heart icon
- Displays count of items in wish list
- Sticky header with gradient background

### SearchBar Component
- Text input for movie titles
- Clear button for search input
- Search button with enter key support
- Dynamic focus styling

### MovieList Component
- Grid display of movie cards
- Hover effects with ratings
- Add/remove from wish list buttons
- Pagination controls
- Error handling and loading states

### MovieDetail Component
- Large movie backdrop image
- Poster image
- Comprehensive movie information
- Financial information (budget and revenue)
- Production companies
- Genre tags
- Rating display
- Add/remove wish list button

### WishList Component
- Grid display of wish list items
- Remove individual items
- Clear entire list with confirmation
- Empty state message
- Responsive card layout

## 🔐 Security Considerations

- API key is stored in environment files (should use proper environment management in production)
- Consider implementing a backend proxy for API requests in production
- localStorage is used for wish list (suitable for client-side storage)

## 🚀 Technologies Used

- **Angular 18** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **FontAwesome 6** - Icon library
- **TMDB API** - Movie data source
- **CSS3** - Styling with gradients and animations

## 📚 TMDB API Integration

The application integrates with TMDB API v3 endpoints:

- **Now Playing Movies**: `/movie/now_playing`
- **Movie Details**: `/movie/{id}`
- **Search Movies**: `/search/movie`

Image base URL: `https://image.tmdb.org/t/p/w500`

## 🎯 Future Enhancements

- User authentication
- Movie reviews and ratings
- Favorite actors/directors
- Movie recommendations
- Social sharing features
- Dark/Light theme toggle
- Movie trailers integration
- Advanced filtering options

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests for bug fixes or new features.

## 📞 Support

For issues or questions, please refer to the TMDB API documentation or create an issue in the project repository.

---

**Made with ❤️ using Angular 18 and TMDB API**
