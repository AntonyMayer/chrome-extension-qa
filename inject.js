var qabot = qabot ? qabot : new QAbot(),
    QActive = QActive ? true : false;

if (!QActive) {
    qabot.visability(1);
    QActive = true;
} else {
    qabot.visability(0);
    QActive = false;
}


