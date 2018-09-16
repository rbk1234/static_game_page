
(function($){
    'use strict';

    $(document).foundation();

    Game.Constants.init();
    Game.Settings.init();
    Game.Clock.init();
    Game.Log.init($('#log'));
    Game.Keyboard.init();
    Game.ResourceEngine.init();
    Game.Statistics.init();

    Game.Clock.setInterval(
        'debug',
        function(/* iterations, period */) {
            var fps = (1000 / Game.Clock.delta).toFixed(1);
            var total = (Game.Clock.total / 1000).toFixed(0);

            $('#fps').text(fps);
            $('#total-time').text(total);
            $('#memory').text(Game.Util.roundToDecimal(Game.Util.getMemoryUsage(), 2));
        },
        1000
    );

    Game.Log.logMessage('Initializing 1...');
    Game.Log.logMessage('Initializing 2...');
    Game.Log.logMessage('Initializing 3...');

    var exampleCanvas = new Game.Display.Canvas(
        $('#main-canvas')
    );
    $('.canvas-container').width(exampleCanvas.width());

    var image = [
        '                                                                                   (90x25)',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                     [>                                                   ',
        '  XXXXXXXXXXXX                      /==;>                                                 ',
        '         X    XXXXXXXXXXXXX          /\\                                                   ',
        '         X                 XXXXXXXXXXXX                                                   ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                                                                                          ',
        '                         XXXXXX                                                           ',
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    ];
    exampleCanvas.drawImage(image);

    Game.Clock.run();

    Game.Log.logMessage('Game started!');

})(jQuery);
