class QAbot {
    constructor() {
        this.selectors = {
            component: '[data-component]',
            btn: 'qa__btn',
            overlay: 'qa__overlay'
        }
        this.components = {
            elements: [...document.querySelectorAll(this.selectors.component)],
            overlays: []
        }

        this.buildOverlays();

        console.log(this.components);
    }

    show() {
        this.components.overlays.forEach(overlay => document.body.appendChild(overlay));
        console.log('show11');
    }

    hide() {
        console.log('hide');
    }

    buildOverlays() {
        this.components.elements.forEach(elm => this.components.overlays.push(this.singleOverlay(elm)));
    }

    singleOverlay(elm) {
        let params = elm.getBoundingClientRect(),
            correction = window.pageYOffset,
            overlay = document.createElement('div');

        overlay.setAttribute('style', `
            border: 1px solid red;
            height: ${params.height}px;
            left: ${params.left}px;
            position: absolute;
            top: ${params.top + correction}px;
            width: ${params.width}px;
            z-index: 999;
        `);

        return overlay;
    }
}