import React from "react";
import "./styles/App.css";
class App extends React.Component {
  state = { typing: "", username: "", userData:[] };
  handleChange = (event) => { this.setState({typing: event.target.value}) }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ username: this.state.typing }, () => {
      let username= this.state.username
        const url = `https://api.github.com/users/${username}/repos`
        fetch(url)
        .then(resp => resp.json())
          .then(data => {
          let allData=[]
          for (const repo of data) {
            let dataObj = {}
            dataObj.name=repo.name;
            dataObj.stargazers=repo.stargazers_count;
            dataObj.forks=repo.forks_count;
            allData.push(dataObj)
          }
          this.setState({userData: allData})
        })
          .catch(err => {
            this.setState({userData:[]})
          console.warn('Oh dear...', err)
        })
    })
  }

  render() {
    return (
      <>
        <h1>GitHub Clone</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Enter GitHub Username </label>
          <input type="text" value={this.state.typing} onChange={this.handleChange}></input>
          <input type="submit" value="Submit"></input>
        </form>
        <h2>Username: {this.state.username}</h2>
        {this.state.userData.length> 0 && <>
        <div id="data"> 
        <h2>Repositories</h2> 
        {this.state.userData.map((item, idx) => {
          return <div key={idx}>
            <h2>{idx}: {item.name}</h2>
            <hr/>
          </div>})}
        </div>
        </>}

        {this.state.username.length > 0 && this.state.userData.length == 0 && <h2>GitHub User "{this.state.username}" does not exist!</h2>}
        
      </>
    );
  }
}
export default App;
