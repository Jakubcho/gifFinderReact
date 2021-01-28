import React from 'react';

class Search extends React.Component {
	constructor(){
		super();
		this.state ={
			searchingText:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}
	handleChange(e){
		const searchingText = e.target.value;
		this.setState({
			searchingText: searchingText
		})
		if(searchingText.length>3){
			this.props.onSearch(searchingText)
		}
	}
	handleKeyUp(e){
		if(e.keyCode === 13){
			this.props.onSearch(this.state.searchingText)
		}
	}
	render(){
		return (
			<input 
			className="container-elem"
			value={this.state.searchingText}
			placeholder='what are you looking for'
			type="text"
			onChange={this.handleChange}
			onKeyUp = {this.onKeyUp}
		/>
		)
	}
}

export default Search;