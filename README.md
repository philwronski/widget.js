# widget.js


Widget is a minimalist JavaScript library for create widget element in your page.
it has no dependancy exept font awesome and Roboto.

#### Use

Just import javascript and css files :


    <link rel="stylesheet" type="text/css" href="widget.min.css">
    <script type="text/javascript" src="widget.min.js"></script>

Use element structure like that :


    <div class="widget sm-height" id="widget">
        <div class="widget-header bg-orange">
            <i class="widget-icon fa fa-area-chart"></i>
            <span class="widget-title">Mon widget</span>
            <div class="widget-buttons">
                <a href="#" data-toggle="config"><i class="fa fa-cog"></i></a>
                <a href="#" data-toggle="maximize"><i class="fa fa-expand"></i></a>
                <a href="#" data-toggle="collapse"><i class="fa fa-minus"></i></a>
                <a href="#" data-toggle="close"><i class="fa fa-times"></i></a>
            </div>
        </div>
        <div class="widget-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus est et cursus volutpat.
                Nam dignissim tristique tortor, vitae blandit erat malesuada ut. Integer aliquam tempus venenatis.
                Nulla metus purus, ultricies sed nibh nec, pharetra consectetur sem. Phasellus mollis malesuada
                consectetur. Pellentesque turpis augue, ultrices eget volutpat eget, dapibus a nibh. Nullam egestas
                libero laoreet, sagittis lorem nec, mattis ipsum.</p>
        </div>
    </div>

Don't forget to give a size to the element :


    <style>
        #widget {
            width: 30%;
        }
    </style>

To finish, create the widget :


    <script>
        var id = document.querySelector('#widget');
        var widget = new Widget(id, {});
    </script>