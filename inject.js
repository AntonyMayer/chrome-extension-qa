var bot = new QAbot(),
    active = !!JSON.parse(localStorage.getItem('QAbot'));

if (!active) {
    bot.displayAllBtns();
    localStorage.setItem('QAbot', 1);
} else {
    bot.hideAllBtns();
    localStorage.setItem('QAbot', 0);
}


