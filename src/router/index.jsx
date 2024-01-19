import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "game",
				element: <GamePage />,
			},
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
