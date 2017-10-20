import React, { Component } from 'react';
import { Grid, Col, Row, Form, FormGroup, ControlLabel, Checkbox, Button } from 'react-bootstrap';

export default class SearchBar extends Component {
	constructor(props){
		super(props);

		this.state = { task_num: '',
					   site: '',
					   job_name: '',
					   comments: '',
					   ds: '',
					   status_open: '',
					   status_closed: '',
					   status_dead: ''
					 };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		if(event.target.type === "checkbox") {
			this.setState({[event.target.id] : event.target.checked});
		}
		else {
			this.setState({[event.target.id] : event.target.value});
		}
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.onSearchSubmit(this.state);
	}

	render() {
		return(
				<Form onSubmit={this.onFormSubmit}>
					<Grid>
						<Row style={{"paddingTop" : "10px"}}>
							<Col lg={4}>
			      				<ControlLabel>Task #</ControlLabel>
								<input type="text" className="form-control" placeholder="Task #" id="task_num" value={this.state.task_num} onChange={this.onInputChange} />
							</Col>

							<Col lg={4}>
			      				<ControlLabel>Site Name</ControlLabel>
								<input type="text" className="form-control" placeholder="Site" id="site" value={this.state.site} onChange={this.onInputChange} />
							</Col>

							<Col lg={4}>
			      				<ControlLabel>Job Name</ControlLabel>
								<input type="text" className="form-control" placeholder="Job" id="job_name" value={this.state.job_name} onChange={this.onInputChange} />
							</Col>
						</Row>
						
						<Row style={{"paddingTop" : "10px"}}>
							<Col lg={4}>
			      				<ControlLabel>Comments</ControlLabel>
								<input type="text" className="form-control" placeholder="Comments" id="comments" value={this.state.comments} onChange={this.onInputChange} />
							</Col>

							<Col lg={4}>
			      				<ControlLabel>Description</ControlLabel>
								<input type="text" className="form-control" placeholder="Description" id="ds" value={this.state.ds} onChange={this.onInputChange} />
							</Col>

							<Col lg={4}>
			      				<div><ControlLabel>Task Status</ControlLabel></div>
								<Checkbox id="status_open" value={this.state.status} onChange={this.onInputChange} inline>Open</Checkbox>
								<Checkbox id="status_closed" value={this.state.status} onChange={this.onInputChange} inline>Closed-Completed</Checkbox>
								<Checkbox id="status_dead" value={this.state.status} onChange={this.onInputChange} inline>Closed-Dead</Checkbox>
							</Col>
						</Row>

						<Row style={{"paddingTop" : "10px"}}>
							<Col lg={4}>
						      	<Button type="submit" bsStyle="primary">Search</Button>
						    </Col>
					    </Row>
				    </Grid>
				</Form>
		);
	}
}