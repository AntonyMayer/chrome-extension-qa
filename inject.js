/**
 * First check if there's already an instance of QAbot
 * Second check if there's already a value for QAvisable
 * 
 * Else first instanciate a QAbot & secondly set QAvisible to false
 */
var qabot = qabot ? qabot : new QAbot(),
    QAvisible = QAvisible ? true : false;

/** 
 * Simple toggle logic based on QAvisible value
 */
if (!QAvisible) {
    qabot.visability(1);
    QAvisible = true;
} else {
    qabot.visability(0);
    QAvisible = false;
}