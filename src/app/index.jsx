const React = require('react');
const ReactDom = require('react-dom');

const CommentBox = require('./components/CommentBox');

ReactDom.render(<CommentBox/>, document.getElementById('content'));