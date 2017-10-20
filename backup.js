						 	 <TableHeaderColumn dataField='site' width='150' dataSort={ true }>Site</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='job_name' tdStyle={ { whiteSpace: 'normal' } } width='200'>Job</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='status' dataSort={ true } width='150'>Status</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='create_date' dataFormat={ this.formatDate } dataSort={ true } width='125'>Create Date</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='comments' tdStyle={ { whiteSpace: 'normal' } } width='500'>Task Comments</TableHeaderColumn>
						 	 <TableHeaderColumn dataField='ds' width='500' tdStyle={ { whiteSpace: 'normal' } }>Task Description</TableHeaderColumn>


						 	 		          <TableHeaderColumn dataField='task_num' isKey={ true } width='100'>Task #</TableHeaderColumn>

		           <TableHeaderColumn dataField='comment_create_date' dataFormat={ this.formatDate } dataSort={ true } width='125'>Date</TableHeaderColumn>
		           <TableHeaderColumn dataField='all' dataFormat={ this.formatResource } tdStyle={ { whiteSpace: 'normal' } } width='200'>Resource</TableHeaderColumn>
		           <TableHeaderColumn dataField='all' dataFormat={ this.formatStage } tdStyle={ { whiteSpace: 'normal' } } width='200'>Stage</TableHeaderColumn>
		          <TableHeaderColumn dataField='all' tdStyle={ { whiteSpace: 'normal' } } dataFormat={ this.formatComments } width='500'>Task Comments</TableHeaderColumn>


		          
	formatDate(data, row) {
		if(data) {
	  		return (
	  			<Moment format="MM/DD/YYYY HH:mm">{data}</Moment>
	  		);
	  	}
	  	else {
	  		return (
	  			<div>-</div>
	  		);
	  	}
  	}

  	formatResource(data, row) {
  		if(row.resource_from && row.resource_to){
	  		if(row.resource_from[0] !== row.resource_to[0]) {
	  			return (
	  			 	<div>Resource changed from { row.resource_from } to { row.resource_to }</div>
	  			);
	  		}
	  		else {
		  		return (
		  			<div>{ row.resource_from[0] }</div>
		  		);
		  	}
		 }
  	}

  	formatStage(data, row) {
  		if(row.from_ls_nm && row.to_ls_nm){
	  		if(row.from_ls_nm[0] !== row.to_ls_nm[0]) {
	  			return (
	  			 	<div>Stage changed from { row.from_ls_nm } to { row.to_ls_nm }</div>
	  			);
	  		}
	  		else {
		  		return (
		  			<div>-</div>
		  		);
		  	}
		}
  	}

  	formatComments(data, row) {
  		if(row.commenter && row.wsp_internal_comments){
  			return (
  			 	<div><b>{ row.commenter[0] }</b> - { row.wsp_internal_comments[0] }</div>
  			);
		}
  	}