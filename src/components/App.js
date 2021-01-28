import React from 'react';
import Gif from './Gif';
import Search from './Search';

const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = 'gHy5Gu0YwoDX9w1EnvMrYfxY3WFwwT4Y';

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			loading: false,
			searchingText: '',
			gif: {}
		}
		this.handleSearch = this.handleSearch.bind(this);
		this.getGif = this.getGif.bind(this);
	}
	handleSearch(searchingText){
		this.setState({
			loading: true
		})
		this.getGif(searchingText).then(
			function(gif){
				this.setState({
					loading: false,
					gif:gif,
					searchingText: searchingText
				})
			}.bind(this))
	}

getGif(searchingText) {
	const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;    
		return new Promise(
			function(resolve, reject) {
				const req = new XMLHttpRequest();
				req.onload = function(){
					if(this.status === 200){
						const data = JSON.parse(req.responseText).data;
						const gif = {
							url: data.fixed_width_downsampled_url,
							sourceUrl: data.url
						};
						resolve(gif);
					} else {
						reject(new Error(this.statusText));
					}
				}
				req.onerror = function(){
					reject(new Error(
						`XMLHttpRequest Error: ${this.statusText}`));
					};
				req.open('GET', url);
				req.send();
			}
		)
	}

	render(){
		return (
			<div className="container">
				<div>
					<h1 className="container-elem">Welcome in Gif search</h1>
					<Search onSearch={this.handleSearch} />
				</div>
				<Gif loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
					/>
			</div>
		)
	}
}
export default App;
