function DrawArrow(p1, p2, theta, length) {
    theta = Math.PI * theta / 180;

    var Px, Py, P1x, P1y, P2x, P2y;

    Px = p1.x - p2.x;
    Py = p1.y - p2.y;

    P1x = Px * Math.cos(theta) - Py * Math.sin(theta);
    P1y = Px * Math.sin(theta) + Py * Math.cos(theta);

    P2x = Px * Math.cos(-theta) - Py * Math.sin(-theta);
    P2y = Px * Math.sin(-theta) + Py * Math.cos(-theta);

    var x1, x2;
    x1 = Math.sqrt(P1x * P1x + P1y * P1y);
    P1x = P1x * length / x1;
    P1y = P1y * length / x1;
    x2 = Math.sqrt(P2x * P2x + P2y * P2y);
    P2x = P2x * length / x2;
    P2y = P2y * length / x2;

    P1x = P1x + p2.x;
    P1y = P1y + p2.y;
    P2x = P2x + p2.x;
    P2y = P2y + p2.y;
    var points = [
        [P1x, P1y],
        [P2x, P2y],
        [p2.x, p2.y]
    ];
    return points;
}

function DrawArrowS(p1, p2, theta, length) {
    theta = Math.PI * theta / 180;

    var Px, Py, P1x, P1y, P2x, P2y;

    Px = p1.x - p2.x;
    Py = p1.y - p2.y;

    P1x = Px * Math.cos(theta) - Py * Math.sin(theta);
    P1y = Px * Math.sin(theta) + Py * Math.cos(theta);

    P2x = Px * Math.cos(-theta) - Py * Math.sin(-theta);
    P2y = Px * Math.sin(-theta) + Py * Math.cos(-theta);

    var x1, x2;
    x1 = Math.sqrt(P1x * P1x + P1y * P1y);
    P1x = P1x * length / x1;
    P1y = P1y * length / x1;
    x2 = Math.sqrt(P2x * P2x + P2y * P2y);
    P2x = P2x * length / x2;
    P2y = P2y * length / x2;

    P1x = P1x + p1.x;
    P1y = P1y + p1.y;
    P2x = P2x + p1.x;
    P2y = P2y + p1.y;
    var points = [
        [P1x, P1y],
        [P2x, P2y],
        [p1.x, p1.y]
    ];
    return points;
}