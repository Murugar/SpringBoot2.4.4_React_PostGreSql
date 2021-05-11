
import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService';
import AppNavbar from '../AppNavbar'
class LoginComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			hasLoginFailed: false,
			showSuccessMessage: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.loginClicked = this.loginClicked.bind(this)
	}
	handleChange(event) {
		this.setState(
			{
				[event.target.name]
					: event.target.value
			}
		)
	}
	loginClicked() {

		AuthenticationService

			.executeJwtAuthenticationService(this.state.username, this.state.password)
			.then((response) => {
				AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
				this.props.history.push(`/orders/`)
			}).catch(() => {
				this.setState({ showSuccessMessage: false })
				this.setState({ hasLoginFailed: true })
			})

	}
	render() {
		return (
			<div>
				<AppNavbar />
				
				<div className="container">

					<div className="col col-md-9">
						<div className="card">
							<div className="card-header text-primary bg-warning">
								<h4>Sign On</h4>

							</div>
							<div class="card-body">

								{this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
								{this.state.showSuccessMessage && <div>Login Successful</div>}
								User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />


								&nbsp; Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

								&nbsp; <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
							</div>
						</div>
					</div>
					</div>
				</div>
				)
			}
			}
export default LoginComponent