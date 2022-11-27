import {ReactNode} from "react";
import {useIsAuthenticated} from "../../state/store";
import {Navigate} from "react-router-dom";

export const RedirectIfAuthenticated = ({children, to} : {children : ReactNode, to : string}) => {
    const isAuthenticated = useIsAuthenticated()

    if (isAuthenticated) {
        return <Navigate to={to} replace />;
    }

    return <>{children}</>;
}