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
    }

    show() {
        setTimeout(_=> {
            this.components.overlays.forEach(overlay => overlay.style.opacity = 1);
        }, 0);
    }

    hide() {
        this.components.overlays.forEach(overlay => overlay.style.opacity = 0);
    }

    buildOverlays() {
        this.components.elements.forEach(elm => this.components.overlays.push(this.singleOverlay(elm)));
        this.components.overlays.forEach(overlay => document.body.appendChild(overlay));
    }

    singleOverlay(elm) {
        let params = elm.getBoundingClientRect(),
            correction = window.pageYOffset,
            overlay = document.createElement('div');

        overlay.setAttribute('style', `
            background: rgba(0,0,0,.05);
            border: 1px solid red;
            left: ${params.left}px;
            min-height: ${params.height}px;
            opacity: 0;
            pointer-events: none;
            position: absolute;
            top: ${params.top + correction}px;
            transition: all .4s;
            width: ${params.width}px;
            z-index: 999;
        `);

        return overlay;
    }
}