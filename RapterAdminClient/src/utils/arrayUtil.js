class ArrayUtil {
	contains(arr, x) {
		var result = false;
		if (!this.isArray(arr)) {
			return result;
		}
		var length = arr.length;
		if (length == 0) {
			return result;
		}
		for (var i = 0; i < length; i++) {
			if (arr[i] == x) {
				return true;
			}
		}
		return result;
	}

	isArray(arr) {
		return arr != undefined && arr.constructor == Array
	}

	length(arr) {
		var result = 0;
		if (!this.isArray(arr)) {
			return result;
		}
		result = arr.length;
		return result;
	}

	hasNext(arr) {
		var result = false;
		if (!this.isArray(arr)) {
			return result;
		}
		result = arr.length > 0 ? true : false;
		return result;
	}

	shuffle(arr) {
		if (!this.isArray(arr)) {
			return arr;
		}
		var length = arr.length;
		for (var i = 0; i < length; i++) {
			var pos = parseInt(Math.random() * (length - i));
			var save = arr[i];
			arr[i] = arr[pos];
			arr[pos] = save;
		}
		return arr;
	}

	 checkPropExists (arr, prop, newVal){
		
	   return arr.some(function(e) {
		 return e[prop] ? e[prop] === newVal : false;
	   });
	 }

	unique(arr) {
		if (!this.isArray(arr)) {
			return arr;
		}
		var u = [];
		var length = arr.length;
		for (var i = 0; i < length; i++) {
			var o = arr[i];
			if (!this.contains(u, o)) {
				u.push(o);
			}
		}
		return u;
	}

	

	min(arr) {
		var result = 0;
		if (!this.isArray(arr)) {
			return result;
		}
		var length = arr.length;
		if (length == 0) {
			return result;
		}
		result = arr[0];
		for (var i = 1; i < length; i++) {
			var o = arr[i];
			if (o < result) {
				result = o;
			}
		}
		return result;
	}

	max(arr) {
		var result = 0;
		if (!this.isArray(arr)) {
			return result;
		}
		var length = arr.length;
		if (length == 0) {
			return result;
		}
		result = arr[0];
		for (var i = 1; i < length; i++) {
			var o = arr[i];
			if (o > result) {
				result = o;
			}
		}
		return result;
	}

}

const arrayUtil = new ArrayUtil();
export default arrayUtil;