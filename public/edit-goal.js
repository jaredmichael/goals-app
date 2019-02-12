function watchForm() {
    const goalId = window.location.search.split('=')[1];

    $("#edit-goal").submit(event => {
        event.preventDefault();
        const goalName = $('.js-goal-name').val();
        const mantraText = $('.js-mantra').val();
        editGoal(goalName, mantraText);
    });

    return fetch('/api/goals/' + goalId,
        {
            method: 'GET',
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
        .then(response => {
            $('.js-goal-name').val(response.goal);
            $('.js-mantra').val(response.mantra);
        })
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}

function editGoal(goalName, mantraText) {
    const goalId = window.location.search.split('=')[1];
    const data = {
        id: goalId,
        goal: goalName,
        mantra: mantraText
    }

    return fetch('/api/goals/' + goalId,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.authToken
            }
        })

        .then(response => {
            if (response.ok) {
                window.location = '/home.html'
            }
            throw new Error(response.statusText);
        })
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}

$(watchForm);