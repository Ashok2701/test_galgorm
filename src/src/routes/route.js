import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	...rest
}) => (
		<Route
			{...rest}
			// console.log("T1 inside route ,",props);
			render={props => {
			  console.log("T1 insdie route-localstorage", localStorage.getItem("authUser"));

				if (isAuthProtected && !localStorage.getItem("authUser")) {
				    console.log("T1 inside route - not localstorage ,",isAuthProtected);
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}

				return (
					<Layout>
						<Component {...props} />
					</Layout>
				);
			}}
		/>
	);

export default AppRoute;

