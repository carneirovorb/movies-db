import React, {useState} from 'react';
import axios from 'axios'

const api = axios.create();

export default function Home({history}) {

    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [pagination, setPagination] = useState([])
    const [pagesNumber, setPagesNumber] = useState([])
    const genreName = {"28" : "Ação","12" : "Aventura","16" : "Animação","35" : "Comédia","80" : "Crime","99" : "Documentário","18" : "Drama","10751" : "Família","14" : "Fantasia","36" : "História","27" : "Terror","10402" : "Música","9648" : "Mistério","10749" : "Romance","878" : "Ficção científica","10770" : "Cinema TV","53" : "Thriller","10752" : "Guerra","37" : "Faroeste","acao": "28" ,"aventura": "12" ,"animacao": "16" ,"comedia": "35" ,"crime": "80" ,"documentario": "99" ,"drama": "18" ,"familia": "10751" ,"fantasia": "14" ,"historia": "36" ,"terror": "27" ,"musica": "10402" ,"misterio": "9648" ,"romance": "10749" ,"ficcao cientifica": "878" ,"cinema TV": "10770" ,"thriller": "53" ,"guerra": "10752" ,"faroeste": "37" ,}

    async function handleSubmit(e){        
        e.preventDefault();
        if(search===''){
            setMovies([]);
            setPagination([]);
            setPagesNumber([]);
            return 0;
        }
        var response;
        var a = search.toLowerCase().replace(/[ç]/,"c").replace(/[àáâãäå]/,"a").replace(/[eéèëê]/,"e").replace(/[iíìïî]/,"i").replace(/[oóòõöô]/,"o").replace(/[uúùüû]/,"u");
        if(a in genreName){
            response = await api.get('https://api.themoviedb.org/3/discover/movie?api_key=fb06b73f61b75b9972d2e0b23063b0e6&with_genres='+genreName[a]);
        
        }else{
            response = await api.get('https://api.themoviedb.org/3/search/movie?api_key=fb06b73f61b75b9972d2e0b23063b0e6&language=pt-BR&query='+search);
        
        }
        setPagination(response.data.results.slice(0, 5));
        const n = parseInt(response.data.results.length/5);
        const pages = [];
        for (var i = 1; i <= n; i++) {
            pages.push(i);
        }
        setPagesNumber(pages);
 
        for (i = 0; i < response.data.results.length; i++) {
            if(response.data.results[i].release_date!==undefined){
            a = response.data.results[i].release_date.split('-'); 
            response.data.results[i].release_date = a[2]+'/'+ a[1] + '/'+a[0];}
        }
        

        setMovies(response.data.results);
    }
   
    function setPage(page){
        setPagination(movies.slice(page, page+5));
        window.scrollTo(0, 0);
    }

  return (
    <div className="container">
        <div className='header'>Movies</div>

        
        <form onSubmit={handleSubmit}>
            <input 
            className="search" 
            type="text" 
            placeholder="Busque um filme por nome ou genero..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
            <input type="submit" hidden={true} />
        </form>
      
        {pagination.map(movie=>(      

            <div onClick={() => history.push(`/movie/${movie.id}`)} key={movie.id} className="movie">
                <div className="poster" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`, backgroundSize: 'cover',}}>
                </div>
                <div className="infos">
                    <div  className="title">
                        <div className="popularity"><div>{parseInt(movie.popularity)+"%"}</div></div>
                        <p>{movie.original_title}</p>
                    </div>
                    <div className="date">{movie.release_date}</div>
                    <div className="sinopse">{movie.overview.length>500 ? movie.overview.substring(0, 500)+"..." : movie.overview}</div>
                    <div className="tags">
                   
                        {
                            movie.genre_ids.map(genre=>(
                                <span key={genre}>{genreName[genre]}</span>
                            ))
                        }
                        </div>
                    
                </div>
            </div>

        ))}

        <div className="buttons">
            {pagesNumber.map(page=>(
                <button key={page} onClick={() => setPage((page-1)*5)}>{page}</button>
            ))}

        </div>
       
       

    </div>
  );
}

