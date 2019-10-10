import React, { Component } from "react";
import './style.css'
import searchIcon from '../../assets/icons/Search Icon.svg';
import { Redirect } from 'react-router-dom'


export default class Search extends Component {
    state = {
        redirect: false,
        user: ''
    }
    submit = (event) => {
        event.preventDefault();
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/details/${this.state.user}`} />;
        }
        return (
            < div className="content-search" >
                <div className="Github-Search">
                    Github <span className="text-style-1">Search</span>
                </div>
                <form onSubmit={this.submit}>
                    <div className="Search-div">
                        <input type="text" className="Search-Input search-text" value={this.state.user} onChange={event => this.setState({ user: event.target.value })} /><button type="submit"><img src={searchIcon} alt="Search Icon" /></button>
                    </div>
                </form>

            </div >
        )


    }

}
