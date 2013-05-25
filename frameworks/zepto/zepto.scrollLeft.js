/**
 * This is jquery compatible method
 * Get the current horizontal position of the scroll bar for the first element in the set of matched elements or
 * set the horizontal position of the scroll bar for every matched element.
 * http://api.jquery.com/scrollLeft/
 */

(function( $ ) {

    $.fn.scrollLeft = function( value ) {

        if ( !this.length ) {
            return;
        }

        if ( !value ) {
            return this[ 0 ].scrollLeft;
        }

        this[ 0 ].scrollLeft = value;
        return this;

    };
    
}( Zepto ));