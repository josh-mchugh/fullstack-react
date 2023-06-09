function search(query, cb) {
    return fetch(`/api/food/q=${query}`, {
        accept: 'application/json',
    }).then(checkStatus)
      .then((resp) => resp.json())
      .then(cb);
}

function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

const Client = { search };
export default Client;
