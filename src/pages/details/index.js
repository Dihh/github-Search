import React, { Component } from "react";
import { Link } from 'react-router-dom'
import api from '../../services/api';
import './style.css'
import searchIcon from '../../assets/icons/Search Icon.svg';
import followersIcon from '../../assets/icons/followers icon.svg';
import locationIcon from '../../assets/icons/location icon.svg';
import organizationIcon from '../../assets/icons/organization icon.svg';
import repositorieIcon from '../../assets/icons/repositorie icon.svg';
import starIcon from '../../assets/icons/star icon.svg';


export default class details extends Component {
    state = {
        usuario: {
            repositories: []
        },
        user: '',
        notFound: false
    }
    submit = (event) => {
        event.preventDefault();
        this.props.history.push(`/details/${this.state.user}`);
    }
    getData = async () => {
        const { user } = this.props.match.params;
        this.setState({ user: user })
        try {
            let userApi = await api.get(`/users/${user}`);
            let userOrgs = await api.get(`/users/${user}/orgs`);
            let repositories = await api.get(`/users/${user}/repos`);
            let star = { stars: 0 }
            repositories.data.forEach((el) => {
                star.stars += el.stargazers_count;
            })
            repositories = { repositories: repositories.data };
            repositories.repositories.sort((a, b) => {
                if (a.stargazers_count > b.stargazers_count) return -1;
                if (a.stargazers_count < b.stargazers_count) return 1;
                return 0;
            })
            userOrgs = userOrgs.data.length > 1 ? { organization: userOrgs.data[0].login } : { organization: null };
            userApi = { ...userApi.data, ...userOrgs, ...star, ...repositories }
            this.setState({ usuario: userApi })
            this.setState({ notFound: false })
        } catch (e) {
            this.setState({ notFound: true })
            console.log(e)
        }

    }
    async componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getData()
        }
    }

    getHeader() {
        return (
            <div className="content-details">
                <div className="Github-Search row-1">
                    <Link to="/">Github <span className="text-style-1">Search</span></Link>
                </div>
                <form onSubmit={this.submit} className="Search-div row-2">
                    <input type="text" className="Search-Input search-text" value={this.state.user} onChange={event => this.setState({ user: event.target.value })} /><button type="submit"><img src={searchIcon} alt="search Icon" /></button>
                </form>
            </div>
        )
    }

    render() {
        const user = this.state.usuario;
        if (this.state.notFound) {
            return (
                <div>
                    {this.getHeader()}
                    <div className="content-details"><div className="Not-found-message">User not found :(</div></div>
                </div>
            )
        }
        return (
            <div>
                {this.getHeader()}
                <div className="content-details">
                    <div className="row-1">
                        <div className="user-avatar">
                            <img src={user.avatar_url} alt="user avatar" />
                        </div>
                        <div className="user-name">
                            {user.name}
                        </div>
                        <div className="user-login">
                            {user.login}
                        </div>
                        <div className="user-details">
                            <div className="organization-name"><img src={organizationIcon} alt="organization Icon" /> {user.organization}</div>
                            <div className="location-name"><img src={locationIcon} alt="location Icon" /> {user.location}</div>
                            <div className="star-count"><img src={starIcon} alt="star Icon" /> {user.stars}</div>
                            <div className="repositories-count"><img src={repositorieIcon} alt="repositorie Icon" /> {user.public_repos}</div>
                            <div className="followers-count"><img src={followersIcon} alt="followers Icon" /> {user.followers}</div>
                        </div>


                    </div>
                    <div className="row-2">
                        {
                            user.repositories.map((el) => {
                                return (
                                    <div className="repo" key={el.id}>
                                        <div className="repo-name">
                                            {el.name}
                                        </div>
                                        <div className="repo-description">
                                            {el.description}
                                        </div>
                                        <div className="star-count">
                                            <img src={starIcon} alt="star Icon" /> {el.stargazers_count}
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
            </div >
        )
    }

}