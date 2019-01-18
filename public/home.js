$(function() {
    for (let i = 0; i < MOCK_STATUS_UPDATES.data.length; i++) {
        $("#goals-list").append(
            `<li>
                <h2>${MOCK_STATUS_UPDATES.data[i].goal}</h2>
                <h3>${MOCK_STATUS_UPDATES.data[i].mantra}</h3>
                <form id="status">
                    <input class="in-progress" type="radio" name="goal-status" value="in-progress" ${MOCK_STATUS_UPDATES.data[i].status === 'inprogress' ? 'checked' : ''} data-id="${MOCK_STATUS_UPDATES.data[i].goalId}"> In-Progress</br>
                    <input class="achieved" type="radio" name="goal-status" value="achieved" ${MOCK_STATUS_UPDATES.data[i].status === 'achieved' ? 'checked' : ''} data-id="${MOCK_STATUS_UPDATES.data[i].goalId}"> Achieved</br>
                    <button class="edit" type="button" data-id="${MOCK_STATUS_UPDATES.data[i].goalId}">Edit Goal</button>
                    <button class="delete" type="button" data-id="${MOCK_STATUS_UPDATES.data[i].goalId}">Delete Goal</button>
                </form>
            </li>`
        )
    }
    watchForm();
})

function watchForm() {
    $('.edit').click(event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        console.log(id, "edit");
    });

    $('.delete').click(event => {
        event.preventDefault();
        const id = $(event.target).data("id");       
        console.log(id, "delete");
    });

    $('.in-progress').change(event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        console.log(id, "in progress")
    });

    $('.achieved').change(event => {
        event.preventDefault();
        const id = $(event.target).data("id");
        console.log(id, "achieved world")

    });
}

