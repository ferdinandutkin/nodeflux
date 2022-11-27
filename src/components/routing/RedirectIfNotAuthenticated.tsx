import {ReactNode} from "react";
import {Navigate} from 'react-router-dom';

import {useIsAuthenticated} from "../../state/store";
import {Role} from "../../models/Role";

export const RedirectIfNotAuthenticated = ({children, to} : {children : ReactNode, to : string}) => {
    const isAuthenticated = useIsAuthenticated()

    if (!isAuthenticated) {
        return <Navigate to={to} replace />;
    }

    return <>{children}</>;
}
