import { UPDATE_BOUNDS,GET_PAGES,GET_PAGE,UPDATE_PAGE,DISPLAY_EDITOR,TEST_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
	
  switch (action.type) {
    case UPDATE_BOUNDS:
      return { ...state, bounds: action.payload };
    case GET_PAGES:
      return { ...state, pages: action.payload };
	case GET_PAGE:
      return { ...state, pagejson: action.payload, pageid:action.page_id , editor: 'Edit' };
	case UPDATE_PAGE:
      return { ...state, pagestatus: action.payload  };  
	case DISPLAY_EDITOR:
      return { ...state, editor: action.payload  };   
    case TEST_MESSAGE:
      return { ...state, testmessage: action.payload };	  
  }

  return state;
}
