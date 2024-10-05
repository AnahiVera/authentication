const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			access_token: null,
			signupStatus: null,
		},
		actions: {
			checkCurrentUser: () => {
				if (sessionStorage.getItem('access_token')) {
					const user = JSON.parse(sessionStorage.getItem('user'));
					const access_token = sessionStorage.getItem('access_token');
					setStore({ user, access_token });
				}
			},
			login: async (credentials) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						body: JSON.stringify(credentials),
						headers: {
							'Content-Type': 'application/json',
						},
					});

					const responseJson = await response.json();
					console.log(responseJson)
					if (responseJson.status === 'success') {
						const { user, access_token } = responseJson;

						setStore({ user, access_token });
						sessionStorage.setItem('access_token', access_token);
						sessionStorage.setItem('user', JSON.stringify(user));
					}
				} catch (error) {
					console.error('Login error:', error);
				}
			},
			signup: async (credentials) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(credentials),
					});
					const responseJson = await response.json();

					if (responseJson.status === 'success') {
						setStore({ signupStatus: responseJson.message });
						return true;
					} else {
						setStore({ signupStatus: responseJson.message });
						return false;
					}
				} catch (error) {
					console.error('Signup error:', error);
					setStore({ signupStatus: 'Please try again later' });
					return false;
				}
			},
			private: async (access_token) => {
				try {
					console.log(access_token)
					const response = await fetch(process.env.BACKEND_URL + '/api/private', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${access_token}`
						}
					})
	
					const responseJson = await response.json()
	
					setStore({ profile: responseJson?.user })
	
				} catch (error) {
					console.log(error.message)
				}
			},
			logout: () => {
				setStore({ user: null, access_token: null })
				sessionStorage.removeItem('user')
				sessionStorage.removeItem('access_token')
			},
		},
	};
};


export default getState;
