// angular.module("services").provider("jqGenerateCloseKeyService", function() {

//     var url = undefined; 
//     return {
//         setUrl: function(newUrl) {
//             if(angular.isDefined(newUrl)) {
//                 url = newUrl;
//             }
//             return this;
//         },
//         $get: function(jqBaseService) {

//             return {
//                 getB: function(obj) {
//                     return jqBaseService.getPromise({
//                         type: "POST",
//                         url: url,
//                         dataType: 'json',
//                         data: "param="+JSON.stringify(obj)
//                     });
//                 }
//             };
//         }
//     }
// });

angular.module("services").factory("jqGenerateCloseKeyService", function(jqBaseService) {

    return {
        getB: function(obj) {
            return jqBaseService.getPromise({
                type: "POST",
                url: "php/generateCloseKey.php",
                dataType: 'json',
                data: "param="+JSON.stringify(obj)
            });
        }
    }
});
