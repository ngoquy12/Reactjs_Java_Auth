import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const routes = createBrowserRouter([...PublicRoutes, ...PrivateRoutes]);

export default routes;
