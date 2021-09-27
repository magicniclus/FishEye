// Création des tags pour le header

class Tags {
    /**
     * [constructor description]
     *
     * @param   {String}  props      nom du tag
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {Function}  callback
     */
    constructor (props, domTarget, callback) {
        this.DOM = document.createElement('button');
        this.DOM.setAttribute('class', 'tag');
        domTarget.appendChild(this.DOM);

        this.DOM.innerHTML = `#${props}`;
        this.DOM.onclick= function(){
            callback(props);
        };
    }
}