# 📚 Component Documentation

## Overview

This document provides detailed information about each component in the Movie App.

---

## 🎯 Component Hierarchy

```
AppComponent (Root)
├── HeadBarComponent (Sticky Header)
└── RouterOutlet
    ├── MovieListComponent (Home Page)
    │   └── SearchBarComponent (Child)
    ├── MovieDetailComponent (Detail Page)
    └── WishListComponent (Wishlist Page)
```

---

## HeadBarComponent

### Purpose
Displays the application header with title and wishlist button.

### Location
`src/app/components/head-bar/`

### Features
- Fixed sticky header
- "Movie List" title with emoji
- Wish list button with heart icon
- Badge showing number of movies in wishlist
- Responsive design

### Inputs
None

### Outputs
None

### Services Used
- `WishListService` - for wishlist count updates

### Template
```html
<header class="header">
  <h1>🎬 Movie List</h1>
  <a routerLink="/wish-list" class="wish-list-btn">
    <fa-icon [icon]="faHeart"></fa-icon>
    <span class="wish-count">{{ wishListCount }}</span>
  </a>
</header>
```

### Styling
- Gradient background (#00d4ff to #0099ff)
- Heart icon animation on hover
- Badge displays in red (#ff6b6b)
- Box shadow for depth

---

## SearchBarComponent

### Purpose
Allows users to search for movies by title.

### Location
`src/app/components/search-bar/`

### Features
- Text input field with placeholder
- Search and clear buttons
- Font Awesome icons
- Enter key to submit search
- Dynamic focus state styling
- Clear button only appears when text is entered

### Inputs
None

### Outputs
- `search` - Emits search query string
- `clear` - Emits when search is cleared

### Usage Example
```html
<app-search-bar
  (search)="onSearch($event)"
  (clear)="onClear()"
></app-search-bar>
```

### Styling
- Blue border (#00d4ff) with glow effect on focus
- Search icon on left, clear button on right
- Responsive layout (stacks on mobile)

---

## MovieListComponent

### Purpose
Displays a grid of movies with search and pagination functionality.

### Location
`src/app/components/movie-list/`

### Features
- Displays movies in responsive grid
- Integrated SearchBarComponent
- Movie cards with hover effects
- Rating display with star icon
- Add/Remove from wishlist button
- Pagination with Previous/Next buttons
- Loading spinner
- Error message handling
- Page indicator

### Inputs
None

### Outputs
None

### Services Used
- `MovieService` - for fetching movies
- `WishListService` - for wishlist management

### Template Structure
```
Section
├── SearchBar (child component)
├── Error Message (conditional)
├── Loading Spinner (conditional)
├── Movies Grid
│   └── Movie Cards (with overlay rating)
└── Pagination Controls
```

### Movie Card Features
- Poster image with 3:2 aspect ratio
- Movie title and release year
- Star rating on hover
- Heart button for wishlist

### Styling
- Grid layout (auto-fill, minmax)
- Card hover animation (translateY, scale)
- Image zoom effect on hover
- Pagination buttons with gradient

### Methods
- `loadMovies()` - Fetch movie list from API
- `onSearch(query)` - Handle search query
- `onClear()` - Clear search and reload list
- `toggleWishList(movie, event)` - Add/remove from wishlist
- `nextPage()` / `previousPage()` - Pagination

---

## MovieDetailComponent

### Purpose
Displays comprehensive information about a selected movie.

### Location
`src/app/components/movie-detail/`

### Features
- Large backdrop image header
- Movie poster on left
- Detailed information on right
- Release date, runtime, rating
- Genre tags
- Plot overview
- Budget and revenue information
- Production company details
- Add/Remove from wishlist button
- Back button to return to list

### Inputs
- Route parameter: `id` (from URL)

### Outputs
None

### Services Used
- `MovieService` - for fetching movie details
- `WishListService` - for wishlist management
- `ActivatedRoute` - for route parameters

### Template Structure
```
Div
├── Backdrop Image (background)
├── Detail Container
│   ├── Back Button
│   └── Detail Content
│       ├── Poster Section
│       │   ├── Poster Image
│       │   └── Wishlist Button
│       └── Info Section
│           ├── Title
│           ├── Meta Information
│           ├── Genres
│           ├── Overview
│           ├── Financial Information
│           └── Production Companies
```

### Styling
- Backdrop image with darkened overlay
- Poster has blue border (#00d4ff)
- Info sections have light blue background
- Financial data highlighted
- Responsive grid layout

### Methods
- `loadMovieDetail(id)` - Fetch movie by ID
- `toggleWishList()` - Add/remove from wishlist
- `getBackdropUrl()` - Format backdrop image URL
- `getPosterUrl()` - Format poster image URL
- `formatCurrency(amount)` - Format financial data

---

## WishListComponent

### Purpose
Displays user's saved movies from wishlist.

### Location
`src/app/components/wish-list/`

### Features
- Grid display of wishlist movies
- Remove individual movies
- Clear entire wishlist with confirmation
- Empty state message when no movies
- Back button to home
- Movie information in cards
- Responsive card layout
- Clickable cards to view details

### Inputs
None

### Outputs
None

### Services Used
- `WishListService` - for wishlist management
- `MovieService` - for image URLs

### Template Structure
```
Section
├── Header
│   ├── Back Button
│   ├── Title
│   └── Clear All Button
├── Empty State (conditional)
│   ├── Icon
│   ├── Message
│   └── Explore Button
└── Wishlist Grid (conditional)
    └── Wishlist Items
        ├── Poster + Info Link
        └── Remove Button
```

### Wishlist Item Card
- Poster image on left (120px width)
- Movie info on right
  - Title
  - Release year
  - Overview snippet
- Remove button (trash icon)

### Styling
- Horizontal card layout
- Hover effect with scale and shadow
- Red remove button (#ff6b6b)
- Empty state centered layout
- Responsive grid

### Methods
- `removeFromWishList(movieId, event)` - Remove single movie
- `clearWishList()` - Clear all with confirmation
- `getPosterUrl(path)` - Format poster URL

---

## Service Documentation

### MovieService

**File**: `src/app/services/movie.service.ts`

**Methods**:
```typescript
getMovieList(page: number): Observable<MovieResponse>
getMovieById(id: number): Observable<MovieDetail>
getMovieByTitle(title: string, page: number): Observable<MovieResponse>
getPosterUrl(posterPath: string | null): string
getBackdropUrl(backdropPath: string | null): string
```

**API Endpoints Used**:
- `GET /movie/now_playing`
- `GET /movie/{id}`
- `GET /search/movie?query={title}`

### WishListService

**File**: `src/app/services/wish-list.service.ts`

**Observable**:
```typescript
wishList$: Observable<Movie[]>
```

**Methods**:
```typescript
addToWishList(movie: Movie): void
removeFromWishList(movieId: number): void
clearWishList(): void
getWishList(): Movie[]
isInWishList(movieId: number): boolean
```

**Storage**: Uses localStorage with key `movieWishList`

---

## Reactive Patterns Used

### Observable Subscriptions
All components use RxJS `takeUntil` for proper cleanup:

```typescript
this.wishListService.wishList$
  .pipe(takeUntil(this.destroy$))
  .subscribe(wishList => {
    this.wishList = wishList;
  });
```

### HTTP Error Handling
Services handle errors gracefully with error callbacks:

```typescript
.subscribe({
  next: (data) => { /* process data */ },
  error: (err) => { /* handle error */ }
})
```

---

## Communication Patterns

### Parent to Child
- SearchBarComponent receives output events from parent

### Child to Parent
- SearchBarComponent emits search and clear events
- Parent (MovieListComponent) listens to these events

### Service-based Communication
- All components communicate through RxJS observables
- WishListService uses BehaviorSubject for state management

---

## Styling Architecture

### Global Styles
- Located in `src/styles.css`
- Defines body background, fonts, scrollbar styling
- Base link and button styles

### Component Scoped Styles
- Each component has its own `.css` file
- Encapsulated styles using component view encapsulation
- Responsive design with media queries for:
  - Tablets (max-width: 1024px)
  - Mobile (max-width: 768px)

### Color Scheme
- Primary: #00d4ff (cyan)
- Secondary: #0099ff (blue)
- Background: #0f3460 (dark blue)
- Accent: #ff6b6b (red for wishlist/remove)
- Text: #ffffff (white)

### Typography
- Font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Sizes: Range from 0.85rem to 2.5rem
- Font weights: 400, 500, 600, 700

---

## Error Handling

### MovieService
- API errors caught and logged
- Error message displayed to user
- Graceful fallback for missing images

### WishListService
- localStorage errors handled silently
- Array operations safe with filtering

### Components
- Loading states shown during API calls
- Error messages displayed when API fails
- Fallback UI for missing data

---

## Performance Considerations

1. **Memory Management**: All subscriptions unsubscribed in ngOnDestroy
2. **Change Detection**: Using OnPush strategy not required (default works)
3. **Lazy Loading**: Routes configured for lazy loading potential
4. **Image Optimization**: Uses TMDB's w500 width for poster images
5. **Pagination**: Only loads 20 items per page

---

## Accessibility Features

- Semantic HTML elements
- Alt text on images
- Button aria-labels
- Keyboard navigation support (Enter for search)
- Color contrast meets WCAG standards
- Focus states on interactive elements

---

## Testing Considerations

### Unit Tests Needed
- MovieService HTTP calls
- WishListService CRUD operations
- Component input/output events
- Search filtering logic
- Pagination logic

### Integration Tests Needed
- Parent-child component communication
- Service integration in components
- Router navigation
- localStorage interactions

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Future Enhancement Ideas

1. Add movie reviews and user ratings
2. Implement user authentication
3. Add movie recommendations
4. Movie trailer integration
5. Advanced filtering (genre, year, rating)
6. Movie comparison feature
7. Share wishlist functionality
8. Dark/Light theme toggle

---

**Last Updated**: January 2024
