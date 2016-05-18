const React = require('react');
const marked = require('marked');
const $ = require('jquery');

let CommentBox = React.createClass({
	loadCommentFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleCommetnSubmit: function(comment) {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadCommentFromServer();
		setInterval(this.loadCommentFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
      <div className="commentBox">
				<h1>Comment</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommetnSubmit}/>
			</div>
    );
	}
});

let CommentList = React.createClass({
	render: function() {
		let commentNodes = this.props.data.map((comment) => {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

let CommentForm = React.createClass({
	getInitialState: function() {
		return {author: '', text: ''};
	},
	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		let author = this.state.author.trim();
		let text = this.state.text.trim();
		if (!text|| ! author) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="Your ame"
					value={this.state.author}
					onChange={this.handleAuthorChange}
				/>
				<input
					type="text"
					placeholder="Say something"
					value={this.state.text}
					onChange={this.handleTextChange}
				/>
				<input type="submit" value="Post"/>
			</form>
		);
	}
});

let Comment = React.createClass({
	rawMarkup: function() {
		let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup };
	},

	render: function () {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

module.exports = CommentBox;