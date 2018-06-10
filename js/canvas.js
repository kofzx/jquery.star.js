;(function($, window, document, undefined){

    var pluginName = "canvas";
    var canvas, ctx, width, height, canvasCssText;
    var star;
    function Plugin(element) {
        this.element = element;
        this.init();
    }
    Plugin.prototype = {
        init: function() {
            $(this.element).css("position", "relative");
            canvas  = document.createElement("canvas");
            ctx     = canvas.getContext('2d');
            width   = $(this.element).outerWidth();
            height  = $(this.element).outerHeight();
            canvasCssText = "position: absolute; top: 0; left: 0;";
            canvas.width   = width;
            canvas.height  = height;
            canvas.style.cssText = canvasCssText;
            $(this.element).append(canvas);

            star = new Star();
            star.init();

            loop();

        }
    };
    $.fn[pluginName] = function() {
        new Plugin(this);
    };

    function Star() {
        this.x;
        this.y;
    }
    Star.prototype.init = function() {
        this.x = 5;
        this.y = 10;
    };
    Star.prototype.draw = function() {
        // 绘制星星、星星偏移、星星消失
        ctx.moveTo(0,0);
        ctx.lineTo(this.x,this.y);
        ctx.lineTo(15,10);
        ctx.stroke();
    };

    function loop() {
        star.draw();
        window.requestAnimationFrame(loop);
    }

})(jQuery, window, document);