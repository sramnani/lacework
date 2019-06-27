function storeController($scope, apiService) {
    var URL = "http://demo7687977.mockable.io/inventory";
    $scope.cart = new cart("LaceworkApp");

    $scope.getProductList = function() {
        apiService.get(URL, "GET")
            .then(function (result) {
            if (result) {
                $scope.products = result.data;
            }
            })
    }
    $scope.getProductList();


}