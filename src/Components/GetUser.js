import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserActions from '../Redux/user'
import HomePage from '../Containers/HomePage'
import AuthPage from '../Containers/AuthPage'
import ProfilePage from '../Containers/ProfilePage'
import VerifyCode from './VerifyCode'
import ConnectChat from '../Containers/ConnectChat'
import ChatsPage from '../Containers/ChatsPage'
import { Route, Switch } from 'react-router-dom'

class GetUser extends Component {
	componentDidMount() {
		console.log('Get USER')
		this.getUser()
	}

	getUser = () => {
		axios.get('/user/').then(response => {
			if (response.data.user) {
				this.props.createUser(response.data.user)
			}
		})
	}

	render() {
		if (this.props.user.authorize)
			return (
				<div>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/profile" component={ProfilePage} />
						<Route exact path="/chat/:user" component={ConnectChat} />
						<Route exact path="/chats" component={ChatsPage} />
					</Switch>
				</div>
			)
		else
			return (
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/auth" component={AuthPage} />
					<Route path="/signup/mail_verify/:code" component={VerifyCode} />
					<Route render={() => <div>Not Found</div>} />
				</Switch>
			)
	}
}

const mapStateToProps = state => ({
	user: state.user,
})

const mapDispatchToProps = dispatch => {
	return {
		createUser: payload => dispatch(UserActions.createUserSuccess(payload)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(GetUser)
)
