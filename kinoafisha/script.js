const url_Key = '&api_key=19ef559db54dcb2ffd5fbf8531ad3ff1';
const ApiKey ='19ef559db54dcb2ffd5fbf8531ad3ff1'
const ApiCore ='https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500' 
const popularUrl = ApiCore+'/discover/movie?sort_by=popularity.desc' +url_Key;
const searchUrl = ApiCore+'/search/movie?'+url_Key+'&query='

const genres=[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];




 function getMovies(url){
	fetch(url).then(res=>res.json()).then(data=>{
		lastUrl=url;
		console.log(data);
		if(data.results.length!==0){
			drowMovies(data.results);
			totalpages = data.total_pages;
			if(currentPage<=1){
				prev.classList.add('disabled')
			}
			console.log(data)
		}else{
			container.innerHTML=`<h1>No Results Found</h1>`
		}
		
	})
}

//console.log(getMovies(ApiUrl));
let currentPage = 1;
let nextPage = 2;
let prevPage=0;
let lastUrl='';
let totalpages= 100;

const container = document.querySelector('.container');
const form = document.getElementById('form');
const search = document.querySelector('.search')

const tagsCon = document.querySelector('.tags');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const page = document.getElementById('current');
console.log(next);



function drowMovies(data){
	container.innerHTML='';

	data.forEach(
		movie =>{
			const {poster_path, vote_average,title, release_date, genre_ids}=movie;
			const movieElem = document.createElement('div');
			movieElem.classList.add('afisha');
			movieElem.innerHTML =
			`<div class="darkened">
			<img src="${poster_path? IMG_URL+poster_path:'emptyposter.jpg'}" alt="${title}">
			<div class="rating ${getRatingColor(vote_average)}">${vote_average}</div>
			<div class="afisha-text">
				<h4>${title}</h4> <p>Жанр: ${getGanres(genre_ids)}</p>
				<p>Год: ${getYear(movie)}</p>
			</div>
			</div>`;

			container.appendChild(movieElem);
			
		}
	)
}

var selectedGenre=[];
drawTags()
function drawTags(){
	tagsCon.innerHTML='';
	genres.forEach(genre=>{
		const tag= document.createElement('div');
		tag.classList.add('tag');
		tag.id=genre.id
		tag.innerText = genre.name;

		tag.addEventListener('click', ()=>{
			if(selectedGenre.length==0){
				selectedGenre.push(tag.id);
				tag.classList.add('tag-selectet');
			}else
				if(selectedGenre.includes(tag.id)){
					selectedGenre.forEach(
						(id, indx)=>{
							if(id==tag.id){
								selectedGenre.splice(indx, 1)
								tag.classList.remove('tag-selectet');
							}

						}
					)
				}else{
					selectedGenre.push(tag.id);
					tag.classList.add('tag-selectet');
				}
			
			console.log(selectedGenre)
			getMovies(popularUrl+'&with_genres='+ encodeURI(selectedGenre.join(',')))
		})
		tagsCon.appendChild(tag);
	});
}

function getYear(movie){
	return movie.release_date.slice(0,4);
}

function getGanres(arr){
	let ganges_str=''
	
		genres.forEach(genre=>{
			for(i=0;i<arr.length;i++){
				if(genre.id==arr[i]){
					if(ganges_str){ganges_str=ganges_str+', '+genre.name}
					else
					ganges_str=ganges_str+genre.name
					//console.log(genre.name)
					console.log(lastUrl); 
				}
			}
		})
		
	return ganges_str;	
	}

function getRatingColor(rate){
	if(rate<=6){
		return 'red';
	} else
	if(rate>=8){
		return 'green';
	}
	else if(rate>6){
		return 'yellow'
	}
}

form.addEventListener('submit', (e)=>{
	 e.preventDefault()
	 currentPage=1;
	 const ask=search.value;

	if(ask){
		getMovies(searchUrl+ask)
	}
	else{
		getMovies(popularUrl)
	}
})

next.addEventListener('click', ()=>{
	if(currentPage<=totalpages){
		currentPage++;
		pageCall(currentPage);
	}else{console.log('eventlistener else');}
	console.log(lastUrl); 
});

prev.addEventListener('click', ()=>{
	if(currentPage>=2){
		currentPage--;
		pageCall(currentPage);
	}else{console.log('eventlistener else');}
	console.log(lastUrl); 
});

function pageCall(page){
	console.log(lastUrl); 
	let actualurl=0;
	let urlSplit=lastUrl.split('?')
	let Qparams=urlSplit[1].split('&')
	let param= Qparams[Qparams.length-1].split('=');
	if(param[0]!='page'){
		actualurl=lastUrl+`&page=`+page;
	}else{
		param[1]=page.toString();
		let a=param.join('=');
		Qparams[Qparams.length-1]=a;
		let c=Qparams.join('&');
		actualurl= urlSplit[0]+'?'+c;
	}
	getMovies(actualurl)
	page_redrow();
	
}


function page_redrow(){
	page.innerText=currentPage;
}

drowMovies(getMovies(popularUrl));

console.log(getGanres([28,35,80,53]));