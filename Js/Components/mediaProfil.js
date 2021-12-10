//Ajout des media en fonction de leurs type

class MediaProfil {

    /**
     * [constructor description]
     *
     * @param   {Object}  data       Récuperation de la data pour l'affichages des images/videos 
     * @param   {HTMLElement}  domTarget  Endroit du DOM ou sera appelé la class
     * @param   {function}  callbacks  fonction de callBack au clisk sur les images pour l'affichage de la lightbox et sur les likes pour
     * l'incrémentation ou la décrémentation des likes
     *
     */
    constructor(data, domTarget, callbacks) {
        this.DOM = document.createElement("a");
        this.DOM.setAttribute("class", 'photographerImg')
        this.DOM.setAttribute("href", '#lightbox')
        domTarget.appendChild(this.DOM);
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }
        //Appel de la lightbox au click sur le dom 
        this.DOM.onclick = () => callbacks.lightbox(data);
        this.likeCallback = callbacks.likes;
        this.liked = false;
        this.render();
    }


    /**
     * Gestion de l'affichage de MediaProfil
     *
     * @return  {void}  [return description]
     */
    render() {
        this.DOM.innerHTML = this.image ? this.templateImage() : this.templateVideo();
        const bottom = document.createElement("div");
        bottom.setAttribute('class', 'bottomImg')
        this.DOM.appendChild(bottom);
        bottom.innerHTML = `
                    <div class="bottomLeft">
                        <span class="titleImg">${this.title}</span>
                        <span class="priceImg">${this.price}<span class="sigle">€</span></span>
                    </div>    
        `;
        this.showLikes(bottom);
    }



    /**
     * templete de l'ffichage des images si la data recu renvoie une image
     *
     */
    templateImage() {
        return `
            <div class='imgContainer'>
                <img class="photoImg contentMedia" src="Sample_Photos/${this.image}" alt="${this.descritpion}">  
            </div>
        `; 
    }


    /**
     * templete de l'ffichage des videos si la data recu renvoie une video
     */
    templateVideo() {
        return `
                <div class='videoContainer'>
                    <video autoplay loop> 
                        <source class='contentMedia' src="Sample_Photos/${this.video}" type=video/mp4 alt="${this.descritpion}"> 
                    </video>
                </div>     
        `; 
    }


    /**
     * Template d'affichage des likes sous les media et appel de la fonciton de callback 
     * likeClick bindé pour remettre dans le context 
     *
     * @param   {HTMLElement} domTarget  [domTarget description]
     *
     */
    async showLikes(domTarget) {
        const container = document.createElement("div");
        container.className = "likeGlobal";
        container.innerHTML = `
                        <span class="likesImg">${this.likes}</span>
                        <i class="${this.liked ? "fas" : "far"} fa-heart" text-aria="bouton pour aimer la photo"></i>
                        `;

        container.onclick = this.likeClick.bind(this);

        domTarget.appendChild(container);
    }


    /**
     * Ajout de la fonciton de callBack au click si this.liked = true 
     * et re-affichage du render au click
     *
     * @param   {Event}  event  [event description]
     *
     * @return  {void}         [return description]
     */
    likeClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.liked = !this.liked;
        event.target.className =  +" fa-heart";
        if (this.liked) {
           this.likes++;
        } else this.likes--;
        this.likeCallback(this.liked);
        this.render();
    }
}