import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';

class Genres extends Component {
  state = { 
    genres: getGenres()
  }

  render() { 
    return ( 
      <ul className="list-group">
        {this.state.genres.map( genre => ( 
          <li key={ genre._id } className="list-group-item">{ genre.name }</li>
        ))}
        
      </ul>
    );
  }
}
 
export default Genres;