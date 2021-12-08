// Header du index.html
class Header {
    constructor(domTarget, img, tag, title){
        this.DOM = document.createElement('header');
        this.DOM.setAttribute('id', 'top');
        domTarget.appendChild(this.DOM);
        this.img    = img;
        this.tag    = tag;
        this.title  = title;
        this.render();
    }

    render (){
        return this.DOM.innerHTML = `
            <img class='logo' src="${this.img} alt='logo du site fish eye">
            <div class='tagIn'></div>
            <h1>${this.title}</h1>
        `
    }
}