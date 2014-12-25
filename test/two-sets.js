;(function($){
    $(function(){

        $('#set1').children().css('border', '1px solid blue').joinInputs({
            debug : true
        });

        $('#set2').children().css('border', '1px solid green').joinInputs({
            debug : true
        });
    });
})(jQuery);

