import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Layout from "./Layout"
import {
  HomePage,
  GamesPage,
  GameDetailPage,
  AboutPage,
  FavoritesPage,
  SearchResultsPage,
} from "./"

// Create router with all routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/games",
        element: <GamesPage />,
      },
      {
        path: "/games/:id",
        element: <GameDetailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/search",
        element: <SearchResultsPage />,
      },
    ],
  },
])

// Router provider component
export const Router = () => <RouterProvider router={router} />
