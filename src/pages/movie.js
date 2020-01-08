import React, {useState, useEffect} from 'react';
import axios from 'axios'


const api = axios.create();


export default function Movie({match}) {
    
    const [movie, setMovie] = useState([])

    useEffect(()=>{
        async function loadMovie(){
            const response = await api.get('https://api.themoviedb.org/3/movie/'+match.params.id+'?api_key=fb06b73f61b75b9972d2e0b23063b0e6&language=pt-BR');
            if(response.data.release_date!==""){
            var a = response.data.release_date.split('-'); 
            response.data.release_date = a[2]+'/'+ a[1] + '/'+a[0];}
            setMovie(response.data);
           
        }
        loadMovie();
    },[match.params.id])

    

    return(

  

        <div className="container">
            <div className='header'>Movies</div>

            <div className="Bcontent">
                <div className="Btitle">
                    <div className="BmovieTitle"> {movie.original_title}</div>
                    <div className="BmovieDate"> {movie.release_date}</div>
                </div>
                <div className="Binfos">
                    <div className="Bdata">
                            <span>Sinopse</span>
                            <hr/>
                        <div className="Bsinopse">                            
                           
                            <p>
                            {movie.overview}
                            </p>
                        
                        </div>
                        <span>Informações</span>
                        <hr/>
                        <div className="Binformacoes">             
                            <div className="Bsit">
                                <span>Situação</span>
                                <span>{movie.status}</span></div>
                            <div className="Bidioma">
                                <span>Idioma</span>
                                <span>{movie.spoken_languages !== undefined ? movie.spoken_languages[0].name : ''}</span></div>
                            <div className="Bdura">
                                <span>Duração</span>
                                <span>{movie.runtime}</span></div>
                            <div className="Borc">
                                <span>Orçamento</span>
                                <span>{"$"+parseInt(movie.budget).toLocaleString('pt-BR')}</span></div>
                            <div className="Brecei">
                                <span>Receita</span>
                                <span>{"$"+parseInt(movie.revenue).toLocaleString('pt-BR')}</span></div>
                            <div className="Blucro">
                                <span>Lucro</span>
                                <span>{"$"+parseInt(movie.revenue-movie.budget).toLocaleString('pt-BR')}</span></div>
                        </div>

                        <div className="Btags">                              
                                   <div className="BlistTags">
                                {
                                    movie.genres!==undefined ? movie.genres.map(genre=>(<span key={genre.id}> {genre.name}</span>)) : ""
                                    
                                }
                                   </div>
                               
    
                                <div className="Bpopularity"><div> {parseInt(movie.popularity)+'%'}</div></div>                       
                        </div>
                       
                    </div>
                    <div className="Bcapa" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`, backgroundSize: 'cover',}}></div>
                </div>
            </div>
        </div>

    )

}