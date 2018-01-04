var bot = new QAbot(),
    active = active ? true : false;

if (!active) {
    bot.show();
    active = true;
} else {
    bot.hide();
    active = false;
}


