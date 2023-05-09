import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
	useRouteMatch,
	useParams,
	NavLink,
} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<h1>App Layout</h1>
				<NavLink to="/users">Users List Page</NavLink>
				<Switch>
					<Route path="/users" component={UsersLotout} />
					<Route path="/" component={MainPage} />
					<Redirect to="/" />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

function MainPage() {
	return <h1>Main Page</h1>;
}

function UsersLotout() {
	const { path } = useRouteMatch();
	return (
		<div>
			<h1>Users Loyout</h1>
			<NavLink to="/">Main Page</NavLink>
			<Switch>
				<Route
					path={path + '/:userId/profile'}
					component={UserProfilePage}
				/>
				<Route path={path + '/:userId/edit'} component={EditUserPage} />
				<Route path={path} exact component={UserListPage} />
				<Redirect from={path + '/:userId'} to={path + '/:userId/profile'} />
			</Switch>
		</div>
	);
}

function UserListPage() {
	const { path } = useRouteMatch();
	return (
		<div>
			<h1>User List Page</h1>
			<ul>
				{new Array(5).fill('').map((_, index) => (
					<li key={'user_list_component_' + index}>
						<NavLink to={`${path}/${index}`}>User {index}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

function UserProfilePage() {
	const { userId } = useParams();
	return (
		<div>
			<h1>User Page</h1>
			<ul>
				<li>
					<NavLink to="/users">User List Page</NavLink>
				</li>
				<li>
					<NavLink to={`/users/${userId}/edit`}>Edit This User</NavLink>
				</li>
			</ul>
			<p>userId: {userId}</p>
		</div>
	);
}

function EditUserPage() {
	const { userId } = useParams();
	return (
		<div>
			<h1>Edit User Page</h1>
			<ul>
				<li>
					<NavLink to={'/users/' + userId}>User Profile Page</NavLink>
				</li>
				<li>
					<NavLink to={'/users/' + (+userId + 1)}>Anather User</NavLink>
				</li>
				<li>
					<NavLink to={'/users'}>Users List Page</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default App;
