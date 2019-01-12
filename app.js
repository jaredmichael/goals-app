var MOCK_STATUS_UPDATES = {
    "statusUpdates": [
        {
            "id": "1111111",
            "goal": "Quit Smoking",
            "goalId": "aaaaaaa",
            "reflections": "This week I had a breakthrough!",
            "affirmations": "I can quit smoking.  I control my urge to smoke and I know I don't need it",
            "status": "In Progress"
        },
        {
            "id": "2222222",
            "goal": "Lose 25lbs",
            "goalId": "bbbbbbb",
            "reflections": "It's been difficult to stay away from sweets but I've been killing it in the gym!",
            "affirmations": "I am fit.  I make healthy choices.  I will succeed!",
            "status": "In Progress"
        },
        {
            "id": "3333333",
            "goal": "Learn to code",
            "goalId": "ccccccc",
            "reflections": "I've come to love learning to code!",
            "affirmations": "I am a full-stack web developer.  I learn and overcome obstacles.",
            "status": "Achieved"
        },
        {
            "id": "4444444",
            "goal": "Give up soda, drink more water",
            "goalId": "ddddddd",
            "reflections": "I've transitioned from soda to juice and drink at least 1 glass of water a day",
            "affirmations": "I love water!  Water keeps me hydrated and happy!",
            "status": "In Progress"
        },
    ]
};

function getRecentStatusUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 1);
}

function displayStatusUpdates(data) {
    for (index in data.statusUpdates) {
        $('body').append(
            '<p>' + data.statusUpdates[index].text + '</p>');
    }
}

function getAndDisplayStatusUpdates() {
    getRecentStatusUpdates(displayStatusUpdates);
}

$(function() {
    getAndDisplayStatusUpdates();
})