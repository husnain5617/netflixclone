import React, { useEffect, useState } from 'react';
import "./home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = "https://api.themoviedb.org/3/discover/movie?api_key=4a5003e886041225bad7622a07a18ca8";
const url2 = "https://api.themoviedb.org/3/discover/tv?api_key=4a5003e886041225bad7622a07a18ca8";
const url3 = "https://api.themoviedb.org/3/movie/upcoming?api_key=4a5003e886041225bad7622a07a18ca8&page=5";
const url4 = "https://api.themoviedb.org/3/genre/movie/list?api_key=4a5003e886041225bad7622a07a18ca8";

// Card component
const Card = ({ img }) => (
    <img className='card' src={img} alt="cover" />
);

// Cards row
const Row = ({ title, arr = [] }) => (
    <div className='row'>
        <h2>{title}</h2>
        {arr?.map((item, index) => (
            <Card key={index} img={item.img} />
        ))}
    </div>
);

// Home main component
const Home = () => {
    const [movies, setMovies] = useState([]);
    const [tvshows, settvshows] = useState([]);
    const [upcoming, setupcoming] = useState([]);
    const [genres, setgenres] = useState([]);
    const [banner, setbanner] = useState({});

    // api request
    useEffect(() => {
        const fetchmovie = async () => {
            try {
                const { data } = await axios.get(url);
                const results = data.results.map(movie => ({
                    img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }));
                setMovies(results);
                if (data.results.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    setbanner({
                        img: `https://image.tmdb.org/t/p/w500${data.results[randomIndex].backdrop_path || data.results[randomIndex].poster_path}`,
                        title: data.results[randomIndex].name || data.results[randomIndex].title,
                        overview: data.results[randomIndex].overview || data.results[randomIndex].overview
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchtv = async () => {
            try {
                const { data } = await axios.get(url2);
                const results = data.results.map(tvshow => ({
                    img: `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`
                }));
                settvshows(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchupcoming = async () => {
            try {
                const { data } = await axios.get(url3);
                const results = data.results.map(upcoming => ({
                    img: `https://image.tmdb.org/t/p/w500${upcoming.poster_path}`
                }));
                setupcoming(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchgenres = async () => {
            try {
                const { data } = await axios.get(url4);
                const results = data.genres;
                setgenres(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchmovie();
        fetchtv();
        fetchupcoming();
        fetchgenres();
    }, []);

    return (
        <section className='home'>
            <div className="banner" style={{
                backgroundImage: `url(${banner.img})`
            }} >
                {banner.title && <h1>{banner.title}</h1>}
                {banner.overview && <p>{banner.overview}</p>}
                <div className="banner-buttons">
                    <button className="site-button">Play !</button>
                    <button className="site-button">Watch More</button>
                </div>
            </div>

            <Row title={"Top Movies"} arr={movies} />
            <Row title={"TV Shows"} arr={tvshows} />
            <Row title={"Upcoming"} arr={upcoming} />
            <div className='generbox'>
                {/* {genres?.map((item, key) => (
                    <Link key={key} to={`/genres/${item.id}`}>{item.name}</Link>
                ))} */}
            </div>
        </section>
    );
};

export default Home;
