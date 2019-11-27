import React from 'react';
import {Section} from 'rbx';
import {optimisticAuthFetch} from '../utils/auth';
import UpcomingMovies from '../../components/movies-upcoming';
import ArchivedMovies from '../../components/movies-archived';
import './styles/all-movies.scss';

class AllMovies extends React.Component {
  static async getInitialProps(ctx) {
    const movies = await optimisticAuthFetch('/api/movies?limit=20', {}, ctx);

    const upcoming = [];
    const archived = [];

    const now = new Date();

    movies.forEach(movie => {
      let isStillShowing = false;

      movie.Showtimes.forEach(showtime => {
        if (new Date(showtime.time).getTime() > now.getTime()) {
          isStillShowing = true;
        }
      });

      if (isStillShowing) {
        upcoming.push(movie);
      } else {
        archived.push(movie);
      }
    });

    return {movies, upcoming, archived};
  }

  render() {
    return (
      <div>
        <Section>
          {this.props.upcoming.length > 0 ? (<UpcomingMovies movies={this.props.upcoming}/>) : ''}
        </Section>
        <Section>
          {this.props.archived.length > 0 ? (<ArchivedMovies movies={this.props.archived}/>) : ''}
        </Section>
      </div>
    );
  }
}

export default AllMovies;
