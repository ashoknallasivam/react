export function authHeaderInitial() {
    // return authorization header with Rapter final token
	let token = localStorage.getItem('token');
    //alert(finaltoken);
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}

export function authHeaderFinal() {
    // return authorization header with Rapter final token
	let token = localStorage.getItem('token');
    let finaltoken = localStorage.getItem('finaltoken');
    //alert(finaltoken);
    if (token && finaltoken) {
        return { 'Authorization': 'Bearer ' + finaltoken };
    } else {
        return {};
    }
}

export function xrapterBounds() {
    // return x-rapter-bounds token
	let bounds = localStorage.getItem('bounds');
    //alert(bounds);
    if (bounds) {
        return { 'x-rapter-bounds': localStorage.getItem('bounds') };
    } else {
        return {};
    }
}

export function finalToken() {
    // return x-rapter-bounds token
	let finaltoken = localStorage.getItem('finaltoken');
    //alert(bounds);
    if (finaltoken) {
        return finaltoken;
    } else {
        return {};
    }
}