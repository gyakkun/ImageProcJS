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

function getColorArrayFromImage(srcImg){
    var max = {r: 0, g: 0, b: 0};
    var min = {r: 255, g: 255, b: 255};
    var colorBack = [];
    var palette = [];

    for (var outer = 0; outer < srcImg.w; outer++) {
        for (var inner = 0; inner < srcImg.h; inner++) {
            var tmpColor = srcImg.getPixel(outer, inner);
            
            max.r = Math.max(tmpColor.r, max.r);
            max.g = Math.max(tmpColor.g, max.g);
            max.b = Math.max(tmpColor.b, max.b);
            
            min.r = Math.min(tmpColor.r, min.r);
            min.g = Math.min(tmpColor.g, min.g);
            min.b = Math.min(tmpColor.b, min.b);
            
            colorBack.push(tmpColor);
        }
    }
    
    return colorBack;
}

function getMeanColor(colorArray){
    var len = colorArray.length;
    var origLen = colorArray.length;
    var colorBack = {r:0, g:0, b:0};
    while(len--) {
        colorBack.r += colorArray[len].r;
        colorBack.g += colorArray[len].g;
        colorBack.b += colorArray[len].b;
    }
    
    return {
        r: parseInt(colorBack.r/origLen),
        g: parseInt(colorBack.g/origLen),
        b: parseInt(colorBack.b/origLen)
    }
}

function split(colorArray){
    var maxRangeColor="r";
    var colorBack = [];
    var max = {r: 0,g: 0,b: 0};
    var min = {r: 255,g: 255,b: 255};
    
    colorArray.forEach(function(tmpColor){
        
            max.r = Math.max(tmpColor.r, max.r);
            max.g = Math.max(tmpColor.g, max.g);
            max.b = Math.max(tmpColor.b, max.b);
            
            min.r = Math.min(tmpColor.r, min.r);
            min.g = Math.min(tmpColor.g, min.g);
            min.b = Math.min(tmpColor.b, min.b);
            
            colorBack.push(tmpColor);
    })
    
    range = {
        r: max.r - min.r,
        g: max.g - min.g,
        b: max.b - min.b
    };
    
    console.log("Range: ", range);
    
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
    
    console.log("MaxRangeColor is ", maxRangeColor);
    
    colorBack.sort(function(color1, color2){
            return color1[maxRangeColor] - color2[maxRangeColor];
        }
    )
    
    var colorLeft = colorBack.slice(0,colorBack.length/2);
    var colorRight = colorBack.slice(colorBack.length/2);
    
    return {
        left : colorLeft,
        right: colorRight
    }
}

// @param src : source image obj
// @param n   : target num of colors
// @return    : target color array obj

function mediancut(src, n) {
    var numLoop = parseInt(Math.log(n)/Math.log(2));
    var trueN = Math.pow(2,numLoop);
    var colorMap = [];
    var colorBack = [];
    var twoBox = {};
    var colorQueue = [];
    
    colorBack = getColorArrayFromImage(src);
    colorQueue.push(colorBack);
    
    while(colorQueue.length < trueN ) {

        var top = colorQueue[0];
        colorQueue.shift();  //remove the top element from array

        var children = split(top);

        colorQueue.push(children.left);
        colorQueue.push(children.right);
    }

    colorQueue.forEach(function(ele){
        colorMap.push(getMeanColor(ele));
    });
    
    console.log(colorMap);
    return colorMap;

}
