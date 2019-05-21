'use strict';

let { RAPTER_URL_DEV,RAPTER_URL_TEST,RAPTER_URL_UAT,RAPTER_URL_DEMO,RAPTER_URL_Training,RAPTER_URL_RAPTER } = require('../config/config');

exports.apiUrl = (env) => {
	
	  let api_url='';
	  if(env == 'DEV'){
		api_url= `${RAPTER_URL_DEV}`;
	  }
	  else if(env == 'TEST'){
		api_url = `${RAPTER_URL_TEST}`;
	  }
	  else if(env == 'UAT'){
		api_url = `${RAPTER_URL_UAT}`;
	  }
	  else if(env == 'DEMO'){
		api_url = `${RAPTER_URL_DEMO}`;
	  }
	  else if(env == 'Training'){
		api_url = `${RAPTER_URL_Training}`;
	  }
	  else if(env == 'RAPTER'){
		api_url = `${RAPTER_URL_RAPTER}`;
	  }
	 
	  return api_url;
	
}

