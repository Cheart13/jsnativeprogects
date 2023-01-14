const Key='19ef559db54dcb2ffd5fbf8531ad3ff1';

const Url='https://api.themoviedb.org/3';

const url_search='/discover/movie?primary_release_year=2021&sort_by=vote_average.desc';



getResource = async () => {
	const res = await fetch(`${Url}${url_search}?api_key=${Key}`);

	if (!res.ok) {
		throw new Error(`Could not fetch ${this.Url}` +
			`, received ${res.status}`)
	}

	return await res.json()
};

getTotalPage = async (sort_by, page) => {
	const data = await this.getResource(sort_by, page);

	return data.total_pages;
};

getMovies = async (sort_by, page) => {
	const data = await this.getResource(sort_by, page);

	return data.results
}


console.log(getResource());

