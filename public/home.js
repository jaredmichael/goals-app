$(function() {
    getGoals();
    // for (let i = 0; i < MOCK_STATUS_UPDATES.data.length; i++) {
    //     $("#goals-list").append(
    //         `<li>
    //             <h2>${MOCK_STATUS_UPDATES.data[i].goal}</h2>
    //             <h3>${MOCK_STATUS_UPDATES.data[i].mantra}</h3>
    //             <form id="status">
    //                 <input class="in-progress" type="radio" name="goal-status" value="in-progress" ${MOCK_STATUS_UPDATES.data[i].status === 'inprogress' ? 'checked' : ''} data-id="${MOCK_STATUS_UPDATES.data[i].goalId}"> In-Progress</br>
    //                 <input class="achieved" type="radio" name="goal-status" value="achieved" ${MOCK_STATUS_UPDATES.data[i].status === 'achieved' ? 'checked' : ''} data-id="${MOCK_STATUS_UPDATES.data[i].goalId}"> Achieved</br>
    //                 <button class="js-edit" type="button" data-id="${MOCK_STATUS_UPDATES.data[i].goalId}">Edit Goal</button>
    //                 <button class="js-delete" type="button" data-id="${MOCK_STATUS_UPDATES.data[i].goalId}">Delete Goal</button>
    //             </form>
    //         </li>`
    //     )
    // }
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
                <h2><span class="red-star">★ </span>${responseJson.goals[i].goal}<span class="red-star"> ★</span></h2>
                <p class="mantra-header">Mantra:</p>
                <p class="mantras">${responseJson.goals[i].mantra}</p>
                <p class="status-header">Status:</p>
                <form id="status">
                    <div class="radios">
                        <input class="in-progress" type="radio" name="goal-status" value="in-progress" ${responseJson.goals[i].status === 'inprogress' ? 'checked' : ''} data-id="${MOCK_STATUS_UPDATES.data[i].goalId}"> In-Progress</input>
                        </br>
                        <input class="achieved" type="radio" name="goal-status" value="achieved" ${responseJson.goals[i].status === 'achieved' ? 'checked' : ''} data-id="${MOCK_STATUS_UPDATES.data[i].goalId}"> Achieved</input></br>
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
        console.log(id, "edit");
        editGoalForm(id);
    });

    $('body').on('click', '.js-delete', event => {
        event.preventDefault();
        const id = $(event.target).data("id");       
        console.log(id, "delete");
        deleteGoal(id);
    });

    $('body').on('change', '.in-progress', event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        console.log(id, "in progress")
    });

    $('body').on('change', '.achieved', event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        console.log(id, "achieved")

    });
}

