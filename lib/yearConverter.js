export function yearConverter(UNIX_rating) {
  var a = new Date(UNIX_rating * 1000);
  var year = a.getFullYear();
  return year;
}
