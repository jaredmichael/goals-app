function displayGoals(responseJson) {
    for (let I = 0; i < responseJson.data.length; i++) {
        $("#goals-list").append(
            `<li>
                <h2>${responseJson.data[i].goal}</h2>
                <h3>${responseJson.data[i].mantra}</h3>
                <p>${responseJson.data[i].reflections}</p>
                <h4>${responseJson.data[i].status}</h4>
                <button>Edit Goal</button><button>Delete Goal</button>
            </li>`
        )
    };
};

function getGoals() {
    fetch('/api/goals/', {
        method: 'GET',
        headers: { 'Authorization': 'bearer ' + localStorage.authToken }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayGoals(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}

function createGoal(goalName, mantraText) {
    const data = {
        goal: goalName,
        mantra: mantraText,
        status: "inprogress"
    }

    return fetch('/api/goals',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.authToken
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => window.location = '/home.html')
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}



function login(username, password) {
    const data = {
        username, password
    }

    fetch("/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.authToken
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            localStorage.authToken = responseJson.authToken;
            window.location = '/home.html';
        })
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}

function signUp(username, password) {
    const data = {
        username, password
    }

    fetch("/api/users", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.authToken
        }
    })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if (responseJson.message) {
                throw new Error(responseJson.message)
            }

            login(username, password);
        })
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}

function newGoal() {
    window.location = '/new-goal.html';
}

function logOut() {
    window.location = '/index.html';
}


function watchForm() {
    $('#log-in').submit(event => {
        event.preventDefault();
        const userName = $('.js-user-name-login').val();
        const password = $('.js-password-login').val();
        login(userName, password);
    });

    $('#register').submit(event => {
        event.preventDefault();
        const userName = $('.js-user-name').val();
        const password = $('.js-password').val();
        signUp(userName, password);
    });

    $("#new-goal").submit(event => {
        event.preventDefault();
        const goalName = $('.js-goal-name').val();
        const mantraText = $('.js-mantra').val();
        createGoal(goalName, mantraText);
    });



    $(".js-delete").submit(event => {
        event.preventDefault();
        delete this.data;
    });

    $(".js-edit").submit(event => {
        event.preventDefault();
        editGoal(goalId, goalName, mantraText);
    });
}

$(watchForm);