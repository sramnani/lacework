'use strict'
storeApp
    .factory("apiService", function ($http,$q) {
        return {
            // Service to reset user's password
            get:function(url,method){
                var req = {
                    method: method,
                    url: url
                };

                var deferred = $q.defer();

                //Calling Web API to reset password

                $http(req).then(function(data){
                    //Passing data to deferred's resolve function on successful completion
                    deferred.resolve(data);
                },function(error){
                    //Sending a friendly error message in case of failure
                    deferred.reject(error);
                });

                return deferred.promise;

            }
        };
    });
