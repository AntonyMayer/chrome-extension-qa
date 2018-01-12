/**
 * Check if QAbot declared
 * Then check if there's already an instance of QAbot
 * Finally check if there's already a value for QAvisable
 */
var qabot = qabot ? qabot : new QAbot([...document.querySelectorAll('[data-component]')]),
    QAvisible = QAvisible ? true : false;

// Simple toggle logic based on QAvisible value
if (!QAvisible) {
    qabot.visability(1);
    QAvisible = true;
} else {
    qabot.reset();
    QAvisible = false;
}

