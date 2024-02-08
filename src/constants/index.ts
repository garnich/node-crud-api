const HEADER_TYPE = {
    JSON: { 'Content-Type': 'application/json' }
};

const httpMethods = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
}

const MESSGES = {
    ERROR_500: 'Sorry! Something went wrong on our side.',
    ERROR_404: 'Sorry! Looks like I can\'t resolve this route.',
    ERROR_400: 'Sorry! Data is invalid. Note: username(sting), age(number), hobbies([] or [] of strings) are REQUIRED!)',
}

export { HEADER_TYPE, httpMethods, MESSGES }