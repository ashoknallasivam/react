import React, { Fragment }from 'react';


export default class DasboardSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showResults: false };
        this.handleDropdownclick = this.handleDropdownclick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  
    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
      this.wrapperRef = node;
    }
  
    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({ showResults: false });
      }
    }
    handleDropdownclick(e){
      this.setState(prevState => ({
        showResults: !prevState.showResults
      }));
    }
    selectionDone(){
        this.setState({ showResults: false });
    }
    render(){
        return(
            <div className="search-project">
                {/* {this.props.filter ? <span className="removeFilter" onClick={this.props.filterCards.bind(null, 'All')}>remove filter</span> : null } */}
                <h6 className="dd-header" onClick={this.handleDropdownclick}>{this.props.selectedSort}</h6>
                {this.state.showResults ? 
                <ul>
                    <li onClick={this.props.filterCards.bind(null, 'All')}>All</li>
                    <li onClick={this.props.filterCards.bind(null, 'published')}>Published</li>
                    <li onClick={this.props.filterCards.bind(null, 'unpublished')}>Unpublished</li>
                </ul> 
                : null}
            </div>
        )
    }  
}