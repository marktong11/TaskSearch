import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Moment from 'react-moment';
import { Panel, Well } from 'react-bootstrap';

export default class TaskDetails extends Component {
	constructor(props) {
		super(props);
	}

  	formatTaskLog(data, row) {
  		var resourceFrom;
  		var resourceTo;
  		var commentDate;
  		var internalComments;
  		var stageFrom;
  		var stageTo;
  		var stageContainer;
  		var resourceContainer;

  		if(row.resource_from) {
  			resourceFrom = row.resource_from[0];
  		}

  		if(row.resource_to) {
  			resourceTo = row.resource_to[0];
  		}

  		if(row.comment_create_date) {
  			commentDate = <Moment format="LLLL">{ row.comment_create_date }</Moment>;
  		}

  		if(row.wsp_internal_comments) {
  			internalComments = row.wsp_internal_comments[0];
  		}

  		if(row.from_ls_nm) {
  			stageFrom = row.from_ls_nm[0];
  		}

  		if(row.to_ls_nm) {
  			stageTo = row.to_ls_nm[0];
  		}

  		if(stageTo && stageFrom) {
	  		if(stageTo !== stageFrom) {
		  		stageContainer = <Well bsSize="small">Stage changed from <b>{ stageFrom }</b> to <b>{ stageTo }</b></Well>;
		  	}
		}

		if(resourceTo && resourceFrom) {
	  		if(resourceTo !== resourceFrom) {
		  		resourceContainer = <Well bsSize="small">Resource changed from <b>{ resourceFrom }</b> to <b>{ resourceTo }</b></Well>;
		  	}
		 }

  		var header = <div><b>{ resourceFrom }</b> - { commentDate }</div>;

		return (
			<div>
		 		<Panel header={ header } bsStyle="primary">
			 		<div style={ { whiteSpace: 'normal' } }>
				    	{ internalComments }
				    </div>
				    <div style={{"paddingTop" : "20px"}}>
				    	{ stageContainer }
				    	{ resourceContainer }
				    </div>
			    </Panel>
		 	</div>
		);
  	}

	render() {
		var taskKey = this.props.taskNum;

		var taskLines = _.map(_.sortBy(_.pick(this.props.taskList, function(task) { 
			return task.task_num[0] == taskKey[0]; 
		}), 'comment_create_date'));

		return (
			<div>
				<BootstrapTable data={ taskLines }>
					<TableHeaderColumn dataField='all' dataFormat={ this.formatTaskLog } isKey={true}></TableHeaderColumn>
		        </BootstrapTable>
	        </div>
		);

	}
}