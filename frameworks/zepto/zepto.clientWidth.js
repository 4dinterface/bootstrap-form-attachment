/**
 *
 */

(function( $ ) {

    $.fn.clientWidth = function() {

        if ( !this.length ) {
            return;
        }

        return this[ 0 ].clientWidth;
    };

}( Zepto ));