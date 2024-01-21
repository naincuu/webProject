import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/contexts";
import { getFrom, cutToLength, postTo } from "../utils/utils";
import { TOKEN_NAME } from "../utils/global";


//TODO if user is not logged in and performs an action that requires login then bring user to login page

let Hero = () => {

  const [movieSpecs, setMovieSpecs] = useState({});
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
 
  useEffect( async () => {

    const movie = await getFrom('/movie');
    setMovieSpecs(movie);

  }, []);

  const addToWatch = async ({ movieId }) => {
        
    const resData = await postTo('/watchlist/add', { token: window.localStorage.getItem(TOKEN_NAME), movie_id: movieId}, true, setUser);

    if(!user.isLogged){
        navigate('/login');
    }

  }

  return (
    <section className="container relative p-4 h-full">
      <div className="flex flex-col-reverse sm:flex-row justify-around sm:justify-between items-center text-center h-full font-poppins">
        <div className="sm:w-1/2 sm:text-left sm:ml-10">
          <p className="text-gray-400 sm:text-xl lg:text-2xl ">Help us find you the</p>
          <h1 className="text-purple-600 font-bold text-4xl xs:text-5xl lg:text-7xl my-2">
            Perfect Movie
          </h1>
          <p className="hidden sm:block text-gray-500 lg:text-xl mb-4 max-w-xl sm:text-lg">
            Hustle through tons of movies of every category, giving you a lot of movies to choose from,
            or if you are confused watch one of our choosen here.
          </p>
          {/*TODO add functionality for this button */}
          <a href="#movies-cont">
          <button className="round_btn text-white bg-purple-600">
            Find Movie
          </button>
          </a>
        </div>
        <div className="flex flex-col items-center sm:w-1/2 lg:w-2/5">
          <p className="text-gray-400 sm:text-lg">You may like</p>
          <h3 className="font-bold text-lg xs:text-xl sm:text-2xl lg:text-3xl text-purple-600">
            {movieSpecs.name ? cutToLength(movieSpecs.name, 25) : 'Loading'}
          </h3>
          <img
            className="w-1/2 xs:w-2/5 sm:w-1/2 my-3 sm:my-6 mx-auto rounded shadow-lg"
            src={movieSpecs.img_url || 'images/hero-img-load.jpg'}
            alt=""
          />
          <button className="round_btn text-white bg-purple-600" onClick={() => addToWatch({movieId: movieSpecs.id})}>
            Add to Watchlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;