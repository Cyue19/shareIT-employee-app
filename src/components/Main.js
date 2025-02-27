import React, { Component } from 'react';
import './Main.css';


import Card from './Card';
import Firebase from "../firebase/Firebase";
import PropsRoute from "./PropsRoute";

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;
    
        this.state = {
          users: [],
          search: "",
          matches: [],
          isSearching: false,
        };
    }

    /**Get all users from firebase and pull certain information */
    async componentDidMount() {
        try {
            const snapShot = await this.db.collection("profiles").get();
            const docs = snapShot.docs;
            console.log(docs[0].data());
            const users = docs.map(doc => {return {userId: doc.data().userId, firstName: doc.data().firstName, lastName: doc.data().lastName, 
                job: doc.data().job, manager: doc.data().manager.fullName, picture: doc.data().picture}})
            console.log(docs[0].data().picture);
            this.setState({users})
        } catch(err) {
            console.log(err);
        }
    }

    /**On change handler for the search bar */
    onSearchChanged(e) {
        this.setState({
            search: e.target.value,
        });
    }

    /**Look through all users and find those that match the search bar input */
    onSearch() {
        const {search, users} = this.state;
        const matches = [];

        for (const user of users) {
            const fullName = user.firstName + " " + user.lastName;
            if (fullName.toLowerCase().includes(search.toLowerCase())) {
                matches.push(user);
            }
        }

        this.setState({
            matches,
            isSearching: true
        });
    }

  render() {
    const styleBackground = {
        color: "white",
        fontFamily: "Gilroy-Light",
    }
    const { users, search, isSearching, matches } = this.state;

    return (
        <div style={{position: "absolute", height: "100vh", width: "100%", backgroundImage: "linear-gradient(to left, #3c817a, #19033d)", padding: "0% 12%"}}>
            <h2 className ="my-3" style={styleBackground}>Employees</h2>

            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text">Name</span>
                    <input type="text" onChange={(e) => this.onSearchChanged(e)} value={search} class="form-control" placeholder="Search..." />
                    <button onClick={() => this.onSearch()} className="btn btn-primary" type="button">Search</button>
                </div>
            </form>

            { !isSearching ?
                <div className="row" style={{display: "flex", justifyContent: "space-around"}}>
                    { users.map(user => 
                        <PropsRoute employee={user} component={Card}/>
                    )}
                </div>
                :
                <div className="row" style={{display: "flex", justifyContent: "space-around"}}>
                    { matches.map(user => 
                        <PropsRoute employee={user} component={Card}/>
                    )}
                </div>
            }
            <p style={{position: "absolute", bottom: "0%"}} className="mt-5 mb-3 text-muted">Copyright © 2011-2021, Share IT and its related companies. All rights reserved.</p>
        </div>
    );
  }
}

