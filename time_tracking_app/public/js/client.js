window.client = (function() {

    function getTimers(success) {
        return fetch('/api/timers', {
            headers: {
                Accept: 'application/json'
            }
        }).then(checkStatus)
            .then(parseJSON)
            .then(success);
    }

    function startTimer(data) {
        return fetch('/api/timers/start', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(checkStatus);
    }

    function stopTimer(data) {
        return fetch('/api/timers/stop', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(checkStatus);
    }

    function checkStatus(response) {
        if(response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        return error;
    }

    function parseJSON(response) {
        return response.json();
    }

    return {
        getTimers,
        startTimer,
        stopTimer
    };
})();
