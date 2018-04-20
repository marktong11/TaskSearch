import axios from 'axios';
import SolrQueryBuilder from 'solr-query-builder';

export const FETCH_TASKS = 'fetch_tasks';

const ROOT_URL = 'http://localhost:8983/solr/tasks/select';

export function fetchTasks(searchTerms) {
	var qb = new SolrQueryBuilder();

	if(typeof searchTerms !== 'undefined' && searchTerms !== '') {
		// building the query 
		if (searchTerms.task_num) qb.where('task_num').in(searchTerms.task_num);
		if (searchTerms.site) qb.where('site').in(searchTerms.site);

		if (searchTerms.job_name) {
			qb.any({ 
				job_name: searchTerms.job_name 
			},{ contains: true });
		}	

		if (searchTerms.comments) {
			qb.any({ 
				comments: searchTerms.comments 
			},{ contains: true });
		}	

		if (searchTerms.task_logs) {
			qb.any({ 
				wsp_internal_comments: searchTerms.task_logs 
			},{ contains: true });
		}

		if (searchTerms.ds) {
			qb.any({ 
				ds: searchTerms.ds 
			},{ contains: true });
		}

		if (searchTerms.status_open) {
			qb.where('status').equals('open');
		}

		if (searchTerms.status_closed) {
			qb.where('status').equals('closed - completed');
		}

		if (searchTerms.status_dead) {
			qb.where('status').equals('closed - dead');
		}
	}

	// parses the query object to query string 
	var queryResult = qb.build();

	const request = axios.get(`${ROOT_URL}?q=${queryResult}&sort=create_date DESC&rows=1000`);

	return {
		type: FETCH_TASKS,
		payload: request
	};
}