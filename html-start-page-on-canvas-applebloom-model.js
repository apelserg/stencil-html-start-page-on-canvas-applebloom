// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Ссылка
//===
APELSERG.MODEL.Link = function (linkUrl, linkName, linkX, linkY, lengthX, lengthY, linkColor) {
    this.Url = linkUrl;
    this.Name = linkName;
    this.X = linkX;
    this.Y = linkY;
    this.LengthX = lengthX;
    this.LengthY = lengthY;
    this.Color = linkColor;
    this.SelectColor = 'orange';
    this.SelectCnt = 0;
    this.SelectName = false;
    this.ShowBorder = false;
    this.FontHeight = 20;
}

//===
// Массив ссылок
//===
APELSERG.MODEL.MakeLinks = function () {

    var baseX = APELSERG.CONFIG.SET.BaseLinkX;
    var baseY = APELSERG.CONFIG.SET.BaseLinkY + 50;

    var links = [];

    var linksList = [
        { name: "GitHub - Шаблонетка Start page Applebloom", url: "https://github.com/apelserg/stencil-html-start-page-on-canvas-applebloom" },
    ];

    for (var n in linksList) {

        var color = "blue";
        var link = new APELSERG.MODEL.Link(linksList[n].url, linksList[n].name, baseX, baseY + 30 * n, linksList[n].name.length * 10 + 30, 30, color);

        links.push(link);
    }
    return links;
}



//===
// Лепесток
//===
APELSERG.MODEL.Flake = function (flakeX, flakeY, flakeSize, shiftDir, flipSize, flipDir, flakeColor) {
    this.BaseX = flakeX;    
    this.X = flakeX;
    this.Y = flakeY;
    this.Size = flakeSize;
    this.ShiftDir = shiftDir;
    this.FlipSize = flipSize;
    this.FlipDir = flipDir;
    this.FlipRotate = true;
    this.DeltaX = 3;
    this.DeltaR = 2;
    this.CntFlip = 0;
    this.CntRotate = 0;
    this.Color = flakeColor;
}

//===
// Массив лепестков
//===
APELSERG.MODEL.MakeApplebloom = function (flakeNum) {

    var Applebloom = [];
    var color = "white";

    for (var n = 0; n < flakeNum; n++) {

        var shiftDir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) shiftDir = -1;

        var flipDir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) {
            flipDir = -1;
            color = "#FFD8FF";
        }
        else {
            color = "#FFF0FF";
        }

        var x = Math.round(Math.random() * APELSERG.CONFIG.SET.PicWidth);
        var y = Math.round(Math.random() * APELSERG.CONFIG.SET.PicHeight);

        var flipSize = (Math.random() * 100) % 2.0;

        var flake = new APELSERG.MODEL.Flake(x, y, APELSERG.CONFIG.SET.ApplebloomSize, shiftDir, flipSize, flipDir, color);

        Applebloom.push(flake);
    }
    return Applebloom;
}

//===
// Проверка клика на кнопке
//===
APELSERG.MODEL.CheckClickFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseClickX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseClickX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseClickY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseClickY < frame.Y + frame.LengthY)){

        return true;
    }
    return false;
}

//===
// Проверка мыши над кнопкой
//===
APELSERG.MODEL.CheckMoveFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseMoveX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseMoveX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseMoveY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseMoveY < frame.Y + frame.LengthY)) {

        return true;
    }
    return false;
}

//===
// Нажатие кнопок
//===
APELSERG.MODEL.UpdateButtons = function () {

    for (var n in APELSERG.MODEL.DATA.Links) {

        var link = APELSERG.MODEL.DATA.Links[n];

        link.SelectName = APELSERG.MODEL.CheckMoveFrame(link);
        if (link.SelectCnt > 0) link.SelectCnt--;

        if (APELSERG.MODEL.CheckClickFrame(link)) {

            link.SelectCnt = APELSERG.CONFIG.SET.CntSelect;

            window.open(link.Url, "_blank");
        }
    }

    APELSERG.CONFIG.PROC.MouseClickX = -999;
    APELSERG.CONFIG.PROC.MouseClickY = -999;

    //APELSERG.CONFIG.PROC.MouseMoveX = -999;
    //APELSERG.CONFIG.PROC.MouseMoveY = -999;

}
//===
// Переместить лепестки
//===
APELSERG.MODEL.UpdateApplebloom = function () {

    for (var n in APELSERG.MODEL.DATA.Applebloom) {

        var flake = APELSERG.MODEL.DATA.Applebloom[n];

        var dir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) dir = -1;

        if (Math.abs(flake.BaseX - flake.X) > 200) {
            flake.ShiftDir *= -1;
        }
        flake.X += flake.ShiftDir * Math.round(Math.random() * 100) % 3;
        
        flake.Y += Math.round(Math.random() * 100) % 3;
        if (flake.Y > APELSERG.CONFIG.SET.PicHeight) flake.Y = 1;

        flake.CntFlip--;
        if (flake.CntFlip <= 0) {

            flake.CntFlip = Math.round(Math.random() * 5);

            flake.FlipSize += 0.05 * flake.FlipDir + 0.05 * dir;
            if (flake.FlipSize > 1.3) {
                flake.FlipSize = 1.3;
                flake.FlipDir *= -1;
            }
            if (flake.FlipSize < 0.7) {
                flake.FlipSize = 0.7;
                flake.FlipDir *= -1;
            }
        }

        flake.CntRotate--;
        if (flake.CntRotate <= 0) {

            flake.CntRotate = Math.round(Math.random() * 100);

            flake.DeltaX = Math.round(Math.random() * 100) % 7;

            if (dir > 0 && (flake.FlipSize <= 1.1 && flake.FlipSize >= 0.9)) flake.FlipRotate = !flake.FlipRotate;
        }
    }
}
