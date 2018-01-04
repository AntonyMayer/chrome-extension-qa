class QAbot {
    constructor() {
        this.selectors = {
            component: '[data-component]',
            btn: 'qa__btn'
        }

        this.components = [...document.querySelectorAll(this.selectors.component)];

        console.log(this.components);
    }

    show() {
        console.log('show');
    }

    hide() {
        console.log('hide');
    }
}