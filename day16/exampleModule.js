 var exampleModule = (function(){
    var thePrivateVariable = 5;
    return {
        thePublicFunction: function(){
            alert(thePrivateVariable);
        }
    };     
})();

exampleModule.thePublicFunction();
/**
 var x = 5;
 function speak(){
    alert(x);     
}*/