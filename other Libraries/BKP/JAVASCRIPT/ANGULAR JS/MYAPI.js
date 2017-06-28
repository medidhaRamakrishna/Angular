var lowercase = function (string) {
	return isString(string) ? string.toLowerCase() : string;
};
var uppercase = function (string) {
	return isString(string) ? string.toUpperCase() : string;
};

var manualLowercase = function (s) {
	/* jshint bitwise: false */
	return isString(s)
	 ? s.replace(/[A-Z]/g, function (ch) {
		return String.fromCharCode(ch.charCodeAt(0) | 32);
	})
	 : s;
};
var manualUppercase = function (s) {
	/* jshint bitwise: false */
	return isString(s)
	 ? s.replace(/[a-z]/g, function (ch) {
		return String.fromCharCode(ch.charCodeAt(0) & ~32);
	})
	 : s;
};
function nextUid() {
	return ++uid;
}
function toInt(str) {
  return parseInt(str, 10);
}

function isDefined(value) {return typeof value !== 'undefined';}

function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}

/**
 * Determine if a value is an object with a null prototype
 *
 * @returns {boolean} True if `value` is an `Object` with a null prototype
 */
function isBlankObject(value) {
  return value !== null && typeof value === 'object' && !getPrototypeOf(value);
}
/* @returns {boolean} True if `value` is a `String`.
 */
function isString(value) {return typeof value === 'string';}
