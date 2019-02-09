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