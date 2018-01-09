/**
 * Creates a new QAbot
 * @class
 * @classdesc Find all 'components' on current page and create overlays
 */
class QAbot {
    constructor() {
        // html elements
        this.components = {
            elements: [...document.querySelectorAll('[data-component]')],
            overlays: [] // overlay nodes, will be updated after 'this.buildOverlays' 
        }

        // basic params
        this.palette = ['red', 'DarkBlue', 'OrangeRed', 'green', 'brown', 'FireBrick', 'GoldenRod'];
        this.animationTiming = 400;

        // building initial overlays
        this.onViewPortChange();
    }

    /**
     * Build and set components visability based on 'state' value
     * Using setTimeout to place it to the very end of queue => smooth css transition
     * 
     * @param {number} state visability value, "0" for invisible, "1" for visible
     */
    visability(state) {
        if (state) this.buildOverlays();
        
        setTimeout(_ => {
            this.components.overlays.forEach(overlay => {
                overlay.style.opacity = state;
                overlay.style.transform = `scale(${state})`;
                overlay.style.pointerEvents = state ? 'all' : 'none';
            });
        }, 0);
    }

    /**
     * Creates overlays for each 'component' and append them to body
     */
    buildOverlays() {
        this.components.elements.forEach((elm, index) => this.components.overlays.push(this.overlay(elm, index)));
        this.components.overlays.forEach(overlay => document.body.appendChild(overlay));
    }

    /**
     * Creates an overlay with necessary properties
     * 
     * @param {object} elm node
     * @return {object} node
     */
    overlay(elm, index) {
        let params = elm.getBoundingClientRect(),
            overlay = document.createElement('div'),
            description = document.createElement('div'),            
            btn = document.createElement('div'),            
            id = elm.dataset.component,
            scope = elm.dataset.scope || 'local';

        // normalize palette index
        if (index >= this.palette.length) index = index % this.palette.length;

        // add hide functionality to btn
        btn.onclick = _=> { overlay.remove() };

        // add content
        description.innerHTML = `<b>ID:</b> ${id}<br> <b>Scope:</b> ${scope}`;
        btn.textContent = 'x';

        // compound overlay
        description.appendChild(btn);
        overlay.appendChild(description);

        /*********************\
        < * Overlay Styling * >
        \*********************/

        btn.setAttribute('style', `
            color: ${this.palette[index]};
            cursor: pointer;
            font-weight: 900;
            padding: 1.1rem .25rem 0 .25rem;
            position: absolute;
            height: calc(100% - 3px);
            background: #fff;
            top: 0;
            left: 0;
        `);

        description.setAttribute('style', `
            background: ${this.palette[index]};
            color: #fff;
            display: inline-block;
            font-size: 1rem;
            margin-bottom: -3px;
            padding: .5rem .5rem .5rem 1.5rem;
            position: relative;
            transition: all .4s;
            vertical-align: middle;
        `);

        overlay.setAttribute('style', `
            background: rgba(0,0,0,.1);        
            border: 3px solid ${this.palette[index]};
            left: ${params.left}px;
            min-height: ${params.height}px;
            opacity: 0;
            pointer-events: none;
            position: fixed;
            top: ${params.top}px;
            transform: scale(1.2);
            transition: all ${this.animationTiming/1000}s;
            min-width: ${params.width}px;
            z-index: 999;
        `);

        return overlay;
    }

    /**
     * Destroys all overlays and builds new ones
     * Set timeout used to let animation finish before destroying overlays 
     */
    reset() {
        this.visability(0);

        setTimeout(_=> {
            window.QAvisible = false;
            this.components.overlays.forEach(overlay => overlay.remove());
            this.components.overlays = [];
        }, this.animationTiming);
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