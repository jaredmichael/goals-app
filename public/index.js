function displayGoals(responseJson) {
    console.log(responseJson);
    for (let I =0; i < responseJson.data.length; i++) {
        $("#goals-list").append(
            `<li>
                <h2>${responseJson.data[i].goal}</h2>
                <h3>${responseJson.data[i].mantra}</h3>
                <p>${responseJson.data[i].reflections}</p>
                <h4>${responseJson.data[i].status}</h4>
                <button>Edit Goal</button><button>Delete Goal</button>
            </li>`
    )};
};

function createGoal(goal, mantra) {
    console.log();     
    window.location='/home.html';
}

function userAuthentication(userName, password) {
    
  
    fetch(url)
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


function newGoal() {
    window.location='/new-goal.html';
}

function logOut() {
    window.location='/index.html';
}


function watchForm() {
    $('#log-in').submit(event => {
      event.preventDefault();
      const userName = $('#js-user-name').val();
      const password = $('#js-password').val();
      window.location='/home.html';
    });

    $('#register').submit(event => {
        event.preventDefault();
        const userName = $('#js-user-name').val();
        const password = $('#js-password').val();
        window.location='/home.html';
    });

    $("#new-goal").submit(event => {
        event.preventDefault();
        const goal = $('.js-goal-name').val();
        const mantra = $('.js-mantra').val();
        createGoal(goal, mantra);
    });
}
  
  $(watchForm);