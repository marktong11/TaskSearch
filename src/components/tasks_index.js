import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions';
import _ from 'lodash';
import SearchBar from './search_bar';
import { BootstrapTable, TableHeaderColumn  } from 'react-bootstrap-table';
import { Grid, Col, Row, PageHeader } from 'react-bootstrap';
import Moment from 'react-moment';
import TaskDetails from './task_details';


class TasksIndex extends Component {
	constructor(props){
		super(props);

		this.expandComponent = this.expandComponent.bind(this);
	}

 	componentDidMount() {
 		this.props.fetchTasks();
 	}


 	taskSearch(terms) {
 		this.props.fetchTasks(terms);
 	}

 	 isExpandableRow(row) {
	    return true;
	 }

	expandComponent(row) {
		//I double parse to pass by val instead of reference. It basically tricks the compiler into creating a new object.
	    return (
	      <TaskDetails taskList={ JSON.parse(JSON.stringify(this.props.tasks)) } taskNum={ row.task_num } />
	    );
	 }


  	formatDate(data, row) {
  		return (
  			<Moment format="MM/DD/YYYY">{ data }</Moment>
  		);
  	}

	render() {
	    const options = {
	      page: 1,  // which page you want to show as default
	      sizePerPageList: [ {
	        text: '5', value: 5
	      }, {
	        text: '10', value: 10
	      }, {
	        text: 'All', value: _.map(_.mapKeys(this.props.tasks, 'task_num')).length
	      } ], // you can change the dropdown list for size per page
	      sizePerPage: 10,  // which size per page you want to locate as default
	      pageStartIndex: 1, // where to start counting the pages
	      paginationSize: 3,  // the pagination bar size.
	      prePage: 'Prev', // Previous page button text
	      nextPage: 'Next', // Next page button text
	      firstPage: 'First', // First page button text
	      lastPage: 'Last', // Last page button text
	      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
	      paginationPosition: 'both'  // default is bottom, top and both is all available
	      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
	      // alwaysShowAllBtns: true // Always show next and previous button
	      // withFirstAndLast: false > Hide the going to First and Last page button
	    };

		return(
			<div>
				 <PageHeader>Task Search</PageHeader>

				<Grid>
					<SearchBar onSearchSubmit={ this.taskSearch.bind(this) } />

					<div style={{"paddingTop" : "20px"}}>
						<BootstrapTable data={ _.map(_.mapKeys(this.props.tasks, 'task_num')) } 
										pagination={ true }
										options={ options }  
										expandableRow={ this.isExpandableRow }
       									expandComponent={ this.expandComponent }
       									expandColumnOptions={ { expandColumnVisible: true } }>

						 	 <TableHeaderColumn dataField='task_num' isKey width='125'>Task #</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='site' width='150' dataSort={ true }>Site</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='job_name' tdStyle={ { whiteSpace: 'normal' } } width='200'>Job</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='status' dataSort={ true } width='150'>Status</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='create_date' dataFormat={ this.formatDate } dataSort={ true } width='125'>Create Date</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='comments' tdStyle={ { whiteSpace: 'normal' } } width='500'>Task Comments</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='ds' width='500' tdStyle={ { whiteSpace: 'normal' } }>Task Description</TableHeaderColumn>
						 </BootstrapTable>
					</div>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { tasks: state.tasks };
}

export default connect( mapStateToProps, { fetchTasks })(TasksIndex);