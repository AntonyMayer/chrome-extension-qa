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
        this.palette = ['red', 'DarkBlue', 'OrangeRed', 'green', 'brown', 'FireBrick', 'GoldenRod'];
        this.buildOverlays();
        this.onViewPortChange();
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
        this.components.elements.forEach((elm, index) => this.components.overlays.push(this.singleOverlay(elm, index)));
        this.components.overlays.forEach(overlay => document.body.appendChild(overlay));
    }

    /**
     * Creates an overlay with necessary properties
     * 
     * @param {object} elm node
     * @return {object} node
     */
    singleOverlay(elm, index) {
        let params = elm.getBoundingClientRect(),
            overlay = document.createElement('div'),
            description = document.createElement('div'),            
            id = elm.dataset.component,
            scope = elm.dataset.scope || 'local';

        // normalize palette index
        if (index >= this.palette.length) index = index % this.palette.length;

        // append description to overlay
        overlay.appendChild(description);

        description.innerHTML = `<b>ID:</b> ${id}<br> <b>Scope:</b> ${scope}`;

        // styling 
        description.setAttribute('style', `
            background: ${this.palette[index]};
            color: #fff;
            display: inline-block;
            font-size: 1rem;
            padding: .5rem;
            transition: all .4s;
            vertical-align: middle;
        `);

        overlay.setAttribute('style', `
            background: rgba(0,0,0,.1);        
            border: 3px solid ${this.palette[index]};
            left: ${params.left}px;
            min-height: ${params.height}px;
            opacity: 0;
            position: fixed;
            top: ${params.top}px;
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
        this.visability(0);

        window.QAvisible = false;
        
        this.components.overlays.forEach(overlay => overlay.remove());
        this.components.overlays = [];

        this.buildOverlays();
    }

    /**
     * Handle window resize event
     * First hide all overlays, then initiate reset
     */
    onViewPortChange() {
        window.addEventListener('resize', this.reset.bind(this));
        window.addEventListener('scroll', this.reset.bind(this));
    }
}