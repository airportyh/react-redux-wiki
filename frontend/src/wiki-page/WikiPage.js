import React from 'react';
import './WikiPage.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function wikiLinkify(contents) {
  return contents.replace(/([A-Z][a-z]+){2,}/g, function(match) {
    return `<a href="#/page/${match}">${match}</a>`;
  });
}


class WikiPage extends React.Component {
  componentDidMount() {
    this.props.fetchPage(this.props.params.title);
  }
  componentWillReceiveProps(newProps) {
    if (this.props.params.title !== newProps.params.title) {
      this.props.fetchPage(newProps.params.title);
    }
  }
  render() {
    let buttonLabel = this.props.doesntExist ? 'Create this page' :
      (this.props.editing ? 'Done editing' : 'Edit');
    return (
      <div>
        <h1>{this.props.params.title}
          &nbsp;
          <button onClick={this.props.toggleEdit}>{buttonLabel}</button>
        </h1>
        <div className="wiki-body">
          <CSSTransitionGroup
            transitionName="switch"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {!this.props.editing ?
              <ViewWikiPage key="view" {...this.props}/> :
              <EditWikiPage key="edit" {...this.props}/>}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default WikiPage;

const ViewWikiPage = ({ contents, doesntExist }) => {
  let html = doesntExist ? 'This page doesn\'t exist...yet!' : wikiLinkify(contents);
  return <p dangerouslySetInnerHTML={{__html: html}}></p>;
};

const EditWikiPage = ({ params, contents, updatePage, updateContents, toggleEdit }) => {
  let save = () => {
    updatePage(params.title, contents);
    toggleEdit();
  };
  return (
    <div>
      <textarea className="contents"
        value={contents}
        rows="10"
        onChange={event => updateContents(event.target.value)}/>
      <button onClick={save}>Save</button>
    </div>
  );
};
