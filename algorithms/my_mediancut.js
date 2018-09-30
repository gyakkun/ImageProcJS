/* 
    mediancut (alter)
    By gyakkun
    2018.09.30 
*/

/* color obj{
    r: num,
    g: num,
    b: num
} */

/* src img obj {
    w: num, //width
    h: num, //height
    getPixel : function (x, y){
        return {
            color obj;
        }
    }
} */

//utility functions:

/* rbg2hex(color obj){
    return string(#rrggbb)
}
 */

/* hex2rgb(string hex){
    return color obj;
}
*/

// function sumColor

function getMeanColor(colorArray){
    var len = colorArray.length;
    var origLen = colorArray.length;
    var colorBack = {};
    while(len--) {
        colorBack.r += colorArray[len].r;
        colorBack.g += colorArray[len].g;
        colorBack.b += colorArray[len].b;
    }
    return color {
        r: colorBack.r/origLen,
        g: colorBack.g/origLen,
        b: colorBack.b/origLen
    }
    
}

function sleep(numMs) {
    var now = new Date();
    var exitTime = now.getTime() + numMs;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

// @param src : source image obj
// @param n   : target num of colors
// @return    : target color array obj

function mediancut(src, n) {
    var maxRangeColor="r";
    var palette = {};
    var colorBack = [];
    var max = {
        r: 0,
        g: 0,
        b: 0
    };
    
    var min = {
        r: 255,
        g: 255,
        b: 255
    };

    for (var outer = 0; outer < src.w; outer++) {
        for (var inner = 0; inner < src.h; inner++) {
            var tmpColor = src.getPixel(outer, inner);
            
            max.r = Math.max(tmpColor.r, max.r);
            max.g = Math.max(tmpColor.g, max.g);
            max.b = Math.max(tmpColor.b, max.b);
            
            min.r = Math.min(tmpColor.r, min.r);
            min.g = Math.min(tmpColor.g, min.g);
            min.b = Math.min(tmpColor.b, min.b);
            
            var tmpHex = rgb2hex(tmpColor);
            if (palette[tmpHex]) {
                palette[tmpHex]++;
            } else {
                palette[tmpHex] = 1;
            }
            //console.log(tmpHex);
            //sleep(100);
            //colorBack.push(tmpColor);
        }
    }
    //console.log(palette);
    
    range = {
        r: max.r - min.r,
        g: max.g - min.g,
        b: max.b - min.b
    };
    
    if(range.r < range.g){
        if(range.b < range.g)
            maxRangeColor = "g";
        else
            maxRangeColor = "b";
    }   else {
        if(range.r < range.b)
            maxRangeColor = "b";
        else
            maxRangeColor = "r";
    }
    
    switch
    
    colorBack.push(max);
    colorBack.push(min);
    
    
    return colorBack;

}
