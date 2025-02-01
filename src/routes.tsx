import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout/layout'
import { AuthPage } from './pages/auth'
import { CreateTestPage } from './pages/crud/create'
import { UpdateTestPage } from './pages/crud/update'
import { HomePage } from './pages/home'
import { NotFoundPage } from './pages/not-found'
import { TestPage } from './pages/tests/test'

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/auth',
				element: <AuthPage />,
			},
			{
				path: '/tests/:slug',
				element: <TestPage />,
			},
			{
				path: '/create',
				element: <CreateTestPage />,
			},
			{
				path: '/update',
				element: <UpdateTestPage />,
			},
			{
				path: '/*',
				element: <NotFoundPage />,
			},
		],
	},
])
