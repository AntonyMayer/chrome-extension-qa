var qabot = qabot ? qabot : new QAbot(),
    active = active ? true : false;

if (!active) {
    qabot.show();
    active = true;
} else {
    qabot.hide();
    active = false;
}


