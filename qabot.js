/**
 * Creates a new QAbot
 * @class
 * @classdesc Find all 'components' on current page and create overlays
 */
class QAbot {
    constructor() {
        this.components = {
            elements: [...document.querySelectorAll('[data-component]')],
            overlays: [] // overlay nodes, will be updated after 'this.buildOverlays' 
        }
        this.buildOverlays();
        this.onScreenResize();
    }

    /**
     * Set components visability based on 'state' value
     * Using setTimeout to place it to the very end of queue => smooth css transition
     * 
     * @param {number} state visability value, "0" for invisible, "1" for visible
     */
    visability(state) {
        setTimeout(_ => {
            this.components.overlays.forEach(overlay => {
                overlay.style.opacity = state;
                overlay.style.pointerEvents = state ? 'all' : 'none';
            });
        }, 0);
    }

    /**
     * Creates overlays for each 'component' and append them to body
     */
    buildOverlays() {
        this.components.elements.forEach(elm => this.components.overlays.push(this.singleOverlay(elm)));
        this.components.overlays.forEach(overlay => document.body.appendChild(overlay));
    }

    /**
     * Creates an overlay with necessary properties
     * 
     * @param {object} elm node
     * @return {object} node
     */
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

    /**
     * Destroys all overlays and builds new ones
     */
    reset() {
        window.QAvisible = false;
        
        this.components.overlays.forEach(overlay => overlay.remove());
        this.components.overlays = [];
        this.buildOverlays();
    }

    /**
     * Handle window resize event
     * First hide all overlays, then initiate reset
     */
    onScreenResize() {
        window.addEventListener('resize', _=> {
            this.visability(0);
            this.reset();
        })
    }
}