import React, { useState, useEffect } from "react";
import Hero from '../components/Hero';
import MovieGalleryFetch from "../components/MovieGalleryFetch";
import Footer from "../components/Footer";
//import movieData from '../scripts/movieData.json';


/*
Home returns a section which contains hero, moviegallery and footer components.
The MovieGallery component recives moviedata as data param and 20 as itemsPerPage.
data is what is displayed to user, and itemsPerPage param decides how many items to show on one page.
movieData is the data about movies that is already scraped from tmdb site.
*/

let Home = () => {
    return(
        <section className="h-full">
            <Hero />
            <MovieGalleryFetch />
            <Footer />
        </section>
    )
}

export default Home;