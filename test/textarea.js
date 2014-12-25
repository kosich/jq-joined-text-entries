;(function($){
    $(function(){

        function handler ( p, n ){
            var $p = $( p ),
                $n = $( n );

            console.log(p, n);
            $p.css('border-color', 'gray');
            $n.css('border-color', 'green');
            $n.focus();
        }

        $('body').children().css('border', '1px solid black').joinInputs({
            debug : true
            // focusHandler : handler
        });

    });
})(jQuery);

