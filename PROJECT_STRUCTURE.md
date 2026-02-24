# Project Architecture

This document describes the professional, scalable structure of the Game Hub project.

## Directory Structure

```
src/
├── api/
│   └── client.ts                 # Axios HTTP client instance configured with RAWG API
├── config/
│   └── queryClient.ts            # React Query configuration and defaults
├── features/                      # Feature-based module organization
│   ├── games/                     # Game browsing feature
│   │   ├── components/            # Game-related UI components
│   │   │   ├── GameGrid.tsx       # Main game list grid with pagination/loading
│   │   │   ├── GameCard.tsx       # Individual game card display
│   │   │   ├── GenreList.tsx      # Genre filtering sidebar
│   │   │   ├── PlatformSelector.tsx # Platform filtering UI
│   │   │   ├── PlatformIconList.tsx # Platform icon rendering
│   │   │   └── index.ts           # Barrel export for components
│   │   ├── hooks/                 # Game-specific React Query hooks
│   │   │   ├── useData.ts         # Generic data fetching hook
│   │   │   ├── useGames.ts        # Fetch games with filters
│   │   │   ├── useGenres.ts       # Fetch genres
│   │   │   ├── usePlatforms.ts    # Fetch platforms
│   │   │   └── index.ts           # Barrel export for hooks
│   │   └── index.ts               # Feature module export
│   ├── ui/                        # Shared UI feature
│   │   ├── common/                # Common UI components
│   │   │   ├── CriticScore.tsx    # Score display component
│   │   │   ├── Emoji.tsx          # Rating emoji component
│   │   │   ├── SearchInput.tsx    # Game search input
│   │   │   ├── ThemeToggle.tsx    # Light/dark mode toggle
│   │   │   └── index.ts           # Barrel export
│   │   ├── layout/                # Layout components
│   │   │   ├── NavBar.tsx         # Application header/navigation
│   │   │   └── index.ts           # Barrel export
│   │   └── index.ts               # Feature module export
│   └── index.ts                   # All features export
├── lib/                           # Utility functions and helpers
├── shared/                        # Shared code across features
│   └── types/
│       └── index.ts               # Centralized TypeScript type definitions
├── App.tsx                        # Root application component
├── main.tsx                       # Application entry point with providers
├── theme.ts                       # Chakra UI theme configuration
├── index.css                      # Global styles and CSS variables
└── vite-env.d.ts                  # Vite environment type definitions
```

## Architecture Principles

### 1. Feature-Based Organization
- Code is organized by feature (games, ui) rather than by type (components, hooks)
- Each feature is self-contained and can be developed/tested independently
- Easy to add new features (e.g., features/favorites, features/wishlist)

### 2. Barrel Exports
Every module has an `index.ts` barrel export for clean imports:
```tsx
// Bad
import { useGames } from '../hooks/useGames'
import { GameGrid } from '../components/GameGrid'

// Good
import { useGames, GameGrid } from '../features/games'
```

### 3. Data Flow Architecture
```
API Client (axios) 
  ↓
React Query Hooks (useGames, useGenres)
  ↓
Components (GameGrid, GenreList)
  ↓
App.tsx (state management with GameQuery)
```

### 4. Separation of Concerns
- **API Layer** (`api/client.ts`): HTTP client configuration
- **Data Layer** (`features/games/hooks`): React Query hooks for data fetching
- **UI Layer** (`features/ui` + `features/games/components`): React components
- **Config** (`config/queryClient.ts`): Third-party configurations

## Key Technologies

- **React Query (@tanstack/react-query)**: Server state management, caching, synchronization
- **Chakra UI v3**: Component library for styling
- **TypeScript**: Type safety throughout the application
- **Axios**: HTTP client with interceptor support
- **Lucide React**: Icon library

## Importing Pattern

### From Features
```tsx
// App.tsx
import { GameGrid, GenreList } from './features/games'
import { NavBar } from './features/ui'
import { GameQuery } from './shared/types'
```

### From API/Config
```tsx
import apiClient from './api/client'
import { queryClient } from './config/queryClient'
```

## Adding New Features

To add a new feature (e.g., user favorites):

1. Create `src/features/favorites/`
2. Add subdirectories: `components/`, `hooks/`, `types/`
3. Create barrel exports (`index.ts`)
4. Update `src/features/index.ts` to export new feature
5. Import in App.tsx

Example:
```
features/
├── favorites/
│   ├── components/
│   │   ├── FavoritesList.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useFavorites.ts
│   │   └── index.ts
│   ├── types.ts
│   └── index.ts
```

## React Query Integration

React Query is configured in `config/queryClient.ts` with:
- **staleTime**: 5 minutes (how long data is considered fresh)
- **gcTime**: 10 minutes (how long unused data is kept in cache)
- **retry**: 1 (retry failed requests once)

All data fetching uses the `useData` generic hook in `features/games/hooks/useData.ts`, which wraps `useQuery`.

## Performance Considerations

1. **Memoization**: Components use `React.memo` where appropriate
2. **Query Caching**: React Query automatically caches responses
3. **Lazy Evaluation**: Data is only fetched when components mount
4. **Tree Shaking**: Barrel exports enable proper tree shaking

## Future Improvements

- Add `features/favorites` for wishlist functionality
- Create `lib/` utilities for common operations
- Add `features/auth` for user authentication
- Create `shared/components` for truly shared UI components
- Add error boundary layer in `features/ui`
