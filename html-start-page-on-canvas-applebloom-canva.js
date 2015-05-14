"use strict";

//===
// Отрисовка на канве
//===
APELSERG.CANVA.Rewrite = function () {

    var ctx = APELSERG.CONFIG.PROC.Ctx;

    // фон
    ctx.drawImage(APELSERG.CONFIG.PROC.Img, 0, 0, APELSERG.CONFIG.PROC.CanvaID.width, APELSERG.CONFIG.PROC.CanvaID.height);

    // часы
    var dateCurrent = new Date();
    var hours = dateCurrent.getHours();
    var hoursStr =  hours < 10 ? "0" + hours.toString() : hours.toString();
    var minutes = dateCurrent.getMinutes();
    var minutesStr =  minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    var seconds = dateCurrent.getSeconds();
    var secondsStr =  seconds < 10 ? "0" + seconds.toString() : seconds.toString();

    var dateCurrentStr = hoursStr  + ":" + minutesStr + ":" + secondsStr;

    ctx.font = "30px Arial";
    ctx.textAlign = "left";
    ctx.strokeStyle = "blue";
    ctx.strokeText(dateCurrentStr, 20, 30);

    // ссылки
    for (var n = 0 in APELSERG.MODEL.DATA.Links) {

        var link = APELSERG.MODEL.DATA.Links[n];

        if (link.ShowBorder) {
            if (link.SelectCnt == 0) ctx.strokeStyle = link.Color;
            else ctx.strokeStyle = link.SelectColor; 
            ctx.strokeRect(link.X, link.Y, link.LengthX, link.LengthY);
        }

        ctx.font = link.FontHeight.toString() + "px Arial";
        ctx.textAlign = "left";

        if (link.SelectName) ctx.fillStyle = link.SelectColor;
        else ctx.fillStyle = link.Color;

        ctx.fillText(link.Name, link.X + 5, link.Y + link.FontHeight);
    }

    // лепестки (поверх контента)
    for (var n = 0 in APELSERG.MODEL.DATA.Applebloom) {

        var flake = APELSERG.MODEL.DATA.Applebloom[n];

        ctx.beginPath();
        ctx.arc(flake.X - flake.DeltaX, flake.Y, flake.Size / 2 - flake.DeltaR, 0, flake.FlipSize * Math.PI, flake.FlipRotate);
        ctx.arc(flake.X, flake.Y, flake.Size / 2, 0, flake.FlipSize * Math.PI, flake.FlipRotate);
        ctx.arc(flake.X + flake.DeltaX, flake.Y, flake.Size / 2 - flake.DeltaR, 0, flake.FlipSize * Math.PI, flake.FlipRotate);
        ctx.fillStyle = flake.Color;
        ctx.fill();
    }
}
