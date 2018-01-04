var qabot = qabot ? qabot : new QAbot(),
    active = active ? true : false;

if (!active) {
    qabot.visability(1);
    active = true;
} else {
    qabot.visability(0);
    active = false;
}


