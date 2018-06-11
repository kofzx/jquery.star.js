;
(function($, window, document, undefined) {

    var pluginName = "canvas";
    var canvas, ctx, width, height, canvasCssText;
    var stars = [];
    var num = 5;

    var lastTime;
    var deltaTime;

    var starPic = new Image();

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({
            colors: ["red", "green", "blue"]
        }, options);
        this.init();
    }
    Plugin.prototype = {
        init: function() {
            $(this.element).css("position", "relative");
            canvas = document.createElement("canvas");
            ctx = canvas.getContext('2d');
            width = $(this.element).outerWidth();
            height = $(this.element).outerHeight();
            canvasCssText = "position: absolute; top: 0; left: 0;";
            canvas.width = width;
            canvas.height = height;
            canvas.style.cssText = canvasCssText;
            $(this.element).append(canvas);

            starPic.src = "images/star.png";

            for (var i = 0; i < num; i++) {
                var obj = new Star(this.options);
                stars.push(obj);
                stars[i].init();
            }

            lastTime = Date.now();

            loop();

        }
    };
    $.fn[pluginName] = function(options) {
        new Plugin(this, options);
    };

    function Star(options) {
        this.x;
        this.y;
        this.xSpd;
        this.ySpd;
        this.scale;
        this.color;
        this.options = options;
    }
    Star.prototype.init = function() {
        var colors = this.options.colors;
        this.scale = Math.random() * 15 + 15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.x = Math.random() * (width - this.scale * 2) + this.scale;
        this.y = Math.random() * (height - this.scale * 2) + this.scale;
        this.xSpd = Math.random() * 1 - 0.5;
        this.ySpd = Math.random() * 1 - 0.5;
    };
    Star.prototype.update = function() {
        this.x += this.xSpd;
        this.y += this.ySpd;
    };
    Star.prototype.draw = function() {
        ctx.save();
        ctx.drawImage(starPic, this.x, this.y, this.scale, this.scale);
        // 添加颜色
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.scale, this.scale);
        ctx.restore();
    };

    function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }

    function drawStars() {
        for (var i = 0; i < num; i++) {
            stars[i].update();
            stars[i].draw();
        }
    }

    function loop() {
        var now = Date.now();
        deltaTime = now - lastTime;
        lastTime = now;

        clearCanvas();
        drawStars();
        window.requestAnimationFrame(loop);
    }

})(jQuery, window, document);