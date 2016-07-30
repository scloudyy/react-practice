const React = require('react');

let TestRest = React.createClass({
	getInitialState: function() {
		return ({
			value: 'Hello!'
		});
	},
	handleChange: function (e) {
		this.setState({value: e.target.value});
	},
	render: function() {
		var text = this.props.checked ? 'True' : 'False';
		return(
			<div>
				<p>{text}</p>
				<input type="text" value={this.state.value} onChange={this.handleChange}/>
			</div>
		);
	}
});

let HelloWorld = React.createClass({
	render: function() {
		var {date, ...others} = this.props;
		return(
			<div>
				<p>
				Helllo, <input type="text" placeholder="Your name" value="Can't input,bacause it is an controled component"/>!<br/>
				It is {date.toTimeString()}
				</p>
				<div>First &middot; Second</div>
				<TestRest checked={false} {...others} />
			</div>
		);
	}
});

module.exports = HelloWorld;
