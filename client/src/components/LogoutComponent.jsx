import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'
import AppNavbar from '../AppNavbar'

class LogoutComponent extends Component {

	render() {
		AuthenticationService.logout()
		return (
			<>
				<AppNavbar />

				<div className="container">

					<div className="col col-md-9">

						<div className="card">
							<div className="card-header text-primary bg-warning">
								<h3>Thank You</h3>

							</div>


							<div class="card-body">
							      <h5 className="text-danger">You are logged out</h5>
							</div>
						</div>
					</div>
				</div>

			</>
		)
	}
}

export default LogoutComponent