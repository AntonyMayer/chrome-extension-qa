var bot = new QAbot(),
    active = !!JSON.parse(localStorage.getItem('QAbot'));

if (!active) {
    bot.show();
    localStorage.setItem('QAbot', true);
} else {
    bot.hide();
    localStorage.setItem('QAbot', false);
}


