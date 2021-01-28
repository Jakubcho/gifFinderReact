import React from 'react';

const GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';

class Gif extends React.Component {
	constructor(){
		super();
		this.getUrl = this.getUrl.bind(this);
	}
	getUrl(){
		return this.props.sourceUrl || GIPHY_LOADING_URL;
	}
	render(){	
		const url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;
		return (
			<div className='gif-elem'>
				<a href={this.getUrl()} target="new">
					<img src={url} />
				</a> 
			</div>
		)
	}
}


export default Gif;