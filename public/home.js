$(function() {
    getGoals();
    watchForm();
})

function getGoals() {
    fetch('/api/goals/', {
        method: 'GET',
        headers: {'Authorization': 'bearer ' + localStorage.authToken}
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

function displayGoals(responseJson) {
    console.log(responseJson);
    for (let i =0; i < responseJson.goals.length; i++) {
        $("#goals-list").append(
            `<li>
                <h2><span class="red-dot-title">&bull; </span>${responseJson.goals[i].goal}
                <span class="red-dot-title"> &bull;</span></h2>
                <p class="mantra-header">Mantra:</p>
                <p class="mantras">${responseJson.goals[i].mantra}</p>
                <p class="status-header">Status:</p>
                <form id="status">
                    <div class="radios">
                        <input class="in-progress" type="radio" name="goal-status" value="in-progress" 
                        ${responseJson.goals[i].status === 'inprogress' ? 'checked' : ''} 
                        data-id="${responseJson.goals[i].id}"> In-Progress</input>
                        </br>
                        <input class="achieved"  type="radio" name="goal-status" value="achieved" 
                        ${responseJson.goals[i].status === 'achieved' ? 'checked' : ''} 
                        data-id="${responseJson.goals[i].id}"> Achieved</input></br>
                    </div>
                    <button class="js-edit" type="button" data-id="${responseJson.goals[i].id}">Edit Goal</button>
                    <button class="js-delete" type="button" data-id="${responseJson.goals[i].id}">Delete Goal</button>
                </form>
            </li>`
    )};
};

function editGoalForm(id) {
    window.location='/edit-goal.html?id=' + id;
    
}

function editGoal(goalId, status) {
    const data = {
        id: goalId,
        status: status
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

function deleteGoal(id) {
    fetch('/api/goals/' + id, {
        method: 'DELETE',
        headers: {'Authorization': 'bearer ' + localStorage.authToken}
    })
        .then(response => {
            if (response.ok) {
            location.reload();
            }
            throw new Error(response.statusText);
        })
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}


function watchForm() {
    $('body').on('click', '.js-edit', event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        editGoalForm(id);
    });

    $('body').on('click', '.js-delete', event => {
        event.preventDefault();
        const id = $(event.target).data("id");       
        deleteGoal(id);
    });

    $('body').on('change', '.in-progress', event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        editGoal(id, "inprogress")
    });

    $('body').on('change', '.achieved', event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        editGoal(id, "achieved")
    });
}

