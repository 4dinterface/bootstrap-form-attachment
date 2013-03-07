/**
 * This is jquery compatible method
 * Store arbitrary data associated with the specified element and/or return the value that was set.
 * http://api.jquery.com/jQuery.data/
 */
(function( $ ) {

    $.fn.data = function( elem, key, value ) {

        if ( !elem.cache ) {
            elem.cache = {};
        }

        if ( arguments.length === 2 ) {
            return elem.cache[ key ];
        } else {
            elem.cache[ key ] = value;
            return value;
        }

    };

}( Zepto ));
