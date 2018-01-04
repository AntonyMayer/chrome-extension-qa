class QAbot {
    constructor() {
        this.selectors = {
            component: '[data-component]'
        }
        this.components = {
            elements: [...document.querySelectorAll(this.selectors.component)],
            overlays: []
        }
        this.buildOverlays();
        this.onScreenResize();
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
            overlay = document.createElement('div'),
            id = elm.dataset.component,
            scope = elm.dataset.scope || 'local';

        overlay.innerHTML = `<b>ID:</b> ${id}<br> <b>Scope:</b> ${scope}`;

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

    reset() {
        window.QActive = false;
        
        this.components.overlays.forEach(overlay => overlay.remove());
        this.components.overlays = [];

        if (!this.components.overlays.length) this.buildOverlays();
    }

    onScreenResize() {
        window.addEventListener('resize', _=> {
            this.visability(0);
            this.reset();
        })
    }
}