var oddLengthArray = [1, 2, 3, 4, 5, 5, 7];
var evenLengthArray = [4, 4, 5, 5, 6, 6, 6, 7];
var total = 0;
 
var sum = function(array) {
	for ( var i = 0; i < array.length ; i++) {
		total += array[i];
	}
	return total;
}
 
var mean = function(array) {
	for ( var i = 0; i < array.length ; i++) {
		total += array[i];
	}
	return total/array.length;
}
 
var median = function(array) {
	if (array.length % 2 === 0) {
		return (array[array.length/2] + array[(array.length/2) - 1]) / 2;
	}
	else {
		return array[Math.floor(array.length/2)];
	}
}
console.log(sum(oddLengthArray))
console.log(sum(evenLengthArray))
console.log(mean(oddLengthArray))
console.log(mean(evenLengthArray))
console.log(median(oddLengthArray))
console.log(median(evenLengthArray))