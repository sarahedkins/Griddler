app.controller('MainCtrl', function($scope){
    $scope.title = "EasyGrid"
    $scope.tab = {};
    $scope.error = null;
    $scope.selectedHTML = null;
    $scope.showHTML = false;
    $scope.showError = true;

    $scope.onGrid = [];

    // send a message to bg on startup
    chrome.runtime.sendMessage({action: "start"},
        function (response) {
            console.log(response.msg);
        });

    // display messages
    function renderStatus(statusText) {
        document.getElementById('status').textContent = statusText;
    }

    // get HTML from background, put it on the pop-up scope
    chrome.runtime.sendMessage({action: "sendHTML"}, function(response){
        console.log("Response from sendHTML is", response);
        if(response.data) {
            $scope.selectedHTML = response.data;
            $scope.showHTML = true;
        } else {
            $scope.error = response.error;
        }
        $scope.$apply();
    });

    // get current tab info
    chrome.tabs.query({ 'active': true }, function(tabs){
        if (tabs.length > 0) {
            $scope.tab.title = tabs[0].title;
            $scope.tab.url = tabs[0].url;
            $scope.$apply();
        }
    });

}); // end of controller




