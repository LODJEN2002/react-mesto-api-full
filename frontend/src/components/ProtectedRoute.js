import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    // этот компонент принимает другой компонент в качестве пропса
    // он также может взять неограниченное число пропсов и передать их новому компоненту

    // console.log(<Component/>)

    return (
        <Route>
            {() =>
                props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
            }
        </Route>
    );

}

export default ProtectedRoute