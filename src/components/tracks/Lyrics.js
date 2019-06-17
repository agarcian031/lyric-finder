import React, { Component } from 'react';
import axios from 'axios'; 
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom'; 

export class Lyrics extends Component {
  // MAKING TWO REQUESTS FROM ONE COMPONENT 
  // Only using component state instead of context because we only need this state in this component and won't be retrieving it from anywhere else. 
  state = {
    track: {}, 
    lyrics: {}
  }

  // will get the id params from the URL because we linked it through axios and those props became available. 
  componentDidMount() {
   axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
    .then( res => {
      // console.log(res.data);
      this.setState({lyrics: res.data.message.body.lyrics})

      return  axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then( rest => {
        this.setState({track: res.data.message.body.track})
      })

      
    })
    .catch(err => console.log(err))




  }

  // will check the object of state for the key value pairs of track and lyrics, search the length of those objects and execute the spinner if they are empty. 

  render() {
    const {track, lyrics} = this.state; 
    if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
      return <Spinner/>
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Lyrics
