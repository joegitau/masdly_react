import React from "react";
import Joi from "joi-browser";
import Form from "./universal/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre ID"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    // populate the genres
    const genres = getGenres();
    this.setState({ genres });

    // check if params matches /NEW -> abort to avoid duplication as that means movie exists
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    // fetch the NEW movie -> redirect to NotFound if missing
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    // update the state with a ViewModel of the Movies array
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = () => {
    // save the movie
    saveMovie(this.state.data);

    // return to movies page
    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title")}
          {this.renderSelect("Genre", "genreId", this.state.genres)}
          {this.renderInput("Number in Stock", "numberInStock", "number")}
          {this.renderInput("Rate", "dailyRentalRate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
