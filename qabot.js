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

    visability(state) {
        setTimeout(_ => {
            this.components.overlays.forEach(overlay => {
                overlay.style.opacity = state;
                overlay.style.pointerEvents = state ? 'all' : 'none';
            });
        }, 0);
    }

    buildOverlays() {
        this.components.elements.forEach(elm => this.components.overlays.push(this.singleOverlay(elm)));
        this.components.overlays.forEach(overlay => document.body.appendChild(overlay));
    }

    singleOverlay(elm) {
        let params = elm.getBoundingClientRect(),
            correction = window.pageYOffset,
            overlay = document.createElement('div');

        overlay.innerHTML = `<b>ID:</b> ${elm.dataset.component}<br> <b>Scope:</b> ${elm.dataset.scope}`;

        overlay.setAttribute('style', `
            background: rgba(0,0,0,.8);
            border: 1px solid red;
            color: #fff;
            font-size: 1rem;
            left: ${params.left}px;
            min-height: ${params.height}px;
            opacity: 0;
            padding-left: .5rem;
            padding-top: .5rem;
            position: absolute;
            top: ${params.top + correction}px;
            transition: all .4s;
            width: ${params.width}px;
            z-index: 999;
        `);

        return overlay;
    }
}