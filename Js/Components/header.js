// Header du index.html
class Header {
    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {HTMLElement}  img        [img description]
     * @param   {HTMLElement}  tag        [tag description]
     * @param   {Object}  title      [title description]
     *
     */
    constructor(domTarget, img, tag, title){
        this.DOM = document.createElement('header');
        this.DOM.setAttribute('id', 'top');
        domTarget.appendChild(this.DOM);
        this.img    = img;
        this.tag    = tag;
        this.title  = title;
        this.render();
    }

    /**
     * Création du HTML à afficher dans le DOM
     *
     */
    render (){
        return this.DOM.innerHTML = `
            <img class='logo' src="${this.img}" alt="logo du site fish eye">
            <div class='tagIn'></div>
            <h1>${this.title}</h1>
        `
    }
}