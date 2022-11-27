import {ReactNode} from "react";
import {Role} from "../../models/Role";
import {useIsAuthenticated, useRoles} from "../../state/store";
import {Navigate} from "react-router-dom";

export const RedirectIfHasNoRole = ({children, to, role} : {children : ReactNode, to : string, role : Role}) => {
    const roles : Role[] = useRoles()

    if (!roles.some(userRole => userRole === role)) {
        return <Navigate to={to} replace />;
    }

    return <>{children}</>;
}
