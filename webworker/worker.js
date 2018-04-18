var url = 'https://jsonplaceholder.typicode.com/posts' ;

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

self.onmessage = function(event) { 
    if(event.data == "start"){
		fetch(url)
		  .then(status)
		  .then(json)
		  .then(function(data) {
			console.log('Request succeeded with JSON response', data);
			postMessage(data);
		  }).catch(function(error) {
			console.log('Request failed', error);
		  });
	}
}



