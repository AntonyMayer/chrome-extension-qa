/**
 * Check if components are already selected
 * Then check if there's already an instance of QAbot
 * Finally check if there's already a value for QAvisable
 */
var components = components ? components : [...document.querySelectorAll('[data-component]')],
    qabot = qabot ? qabot : new QAbot(components),
    QAvisible = QAvisible ? true : false;

/** 
 * Simple toggle logic based on QAvisible value
 */
if (!QAvisible) {
    qabot.visability(1);
    QAvisible = true;
} else {
    qabot.reset();
    QAvisible = false;
}

