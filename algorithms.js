/**
 * Created by Peihong Guo on 11/28/13.
 */
var algorithms = {};
require(["algorithms/my_mediancut"],

    function() {
        algorithms.mediancut = mediancut;
    }
);