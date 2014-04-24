# jQuerySourceReordering


## A jQuery plugin for source reordering.

### Why

The plugin is designed to be used in conjuction with css columns and mediaqueries to allow certain content to be pushed up the order into a better visual order without having to resort to overly complicated (or impossible) layouts. Let me explain with a (rubbish) diagram:

<img src="https://github.com/Designer023/jQuerySourceReordering/blob/master/reasoning-example.png">

In the first example is how the content is arranged in the source and how you would expect to see it in a mobile format. The second is once you move to a wider view and more columns enter the design. Note: there are many alternative layouts that could be used here. I have used content with a regular length, but if varying content lengths are used some of the alternatives turn out not to work. There are also many that were considered but dropped to to lack of browser support!

In the third example we reorder the content to present the more important content higher up the page.

## Setup

Include jQuery, the plugin and then call the plugin on document load. The plugin initialization takes 1 required argument which is the class of the item to reorder. The second argument is the option list which is optional. It currently has one vale you can change - resize. It controls whether the items should be reordered on a window size change. As this can be jarring for users it is defaulted to false. Ouside a range the order will default to the original source order.

It must be applied to a wrapper and have a class of item inside that can be reordered.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <script src="../dist/jquery.sourcereordering.min.js"></script>

	  <script>
    $(document).ready(function(){
      $(".wrapper").sourceReorder(".panel",{
        resize:true
      })
    });


 The plugin is now ready to work, but the wrapper class should make use of mediaqueries when 

     <div class="wrapper">
         ... panels that can be rearranged
     </div>

CSS:

    /* wrapped in a specific mediaquery */
    .wrapper{
    	-webkit-column-count:2;
    	-moz-column-count:2;
    	column-count:2;
    	-webkit-column-gap:0;
    	-moz-column-gap:0;
    	column-gap:0
    }

 On the content you want to rearrange add a data class to tell the plugin where to move it to. You can use just a number but this will always move it...

     <div class="panel"  data-order='2'>
         ... content...
     </div>

...so you should use a range. The range should be valid JSON. Use [jsonlint.com](http://jsonlint.com/) to check your JSON if you're not sure.

    <div class="panel" data-order='{ "468-720": 0, "1024-1200": 99 }'>
        ... content...
    </div>

CSS:

    /* wrapped in a specific mediaquery */
    .panel:nth-child(4){
    	-webkit-column-break-before:always;
    	-webkit-break-before:column;
    	-moz-break-before:column;
    	break-before:column
    }

 The CSS is very specific to the number of items. The above will split before the 4th item, meant for a 6 item layout. Omitting this will just wrap it to fit best and may split some content.

 The JSON object takes the form of a list of ranges and the orders for those ranges:

     {
         "468-720": 0,
         "1024-1200": 99
     }