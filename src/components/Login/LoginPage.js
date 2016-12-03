import React, {Component} from 'react'
import LoginForm from './LoginForm'
import User from '../../models/userModel'
let user = new User();

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', submitDisabled: false }
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({ username: event.target.value })
                break
            case 'password':
                this.setState({ password: event.target.value })
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        this.setState({ submitDisabled: true })
        user.login(this.state.username, this.state.password, this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/allPosts')
        } else {
            // Something went wrong, let the user try again
            this.setState({ submitDisabled: true })
        }
    }

    render() {
        return (
            <main>
            <div>
                <span>Login Page</span>
                <LoginForm
                    username={this.state.username}
                    password={this.state.password}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
            </main>
        )
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object
}