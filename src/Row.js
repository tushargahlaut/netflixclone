import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
const base_url = "https://image.tmdb.org/t/p/original/"

const Row = ({title,fetchUrl,isLargeRow}) => {
    const [movies,setMovies] = useState([]);  
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(  ()=> {
        async function fetchData(){
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
                return request;
        }
        fetchData();
    },[fetchUrl]);
    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
          autoplay: 0,
        }
      }
    
      const handleClick = (movie) => {
      
        if (trailerUrl) {
          setTrailerUrl('')
        } else {
          movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
            .then(url => {
              const urlParams = new URLSearchParams(new URL(url).search)
              setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
      }

    return ( 
    <div>
            <h2>{title}</h2>
            <div className="row__posters">
                    {
                            movies.map(movie => (
                                <img
                                onClick={() => handleClick(movie)}
                                 key={movie.id}
                                 className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                            ))
                    }
            </div>
            <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
     );
}
 
export default Row;