//Création de la lightbox

class Lightbox {


    date;
    id;
    likes;
    list;
    photographerId;
    price;
    tags;
    title;
    video;
    image;
    descritpion;



    /**
     * @type {HTMLElement}
     */
    prevButton;

    /**
     * @type {HTMLElement}
     */
    nextButton;

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {Object}  props      [props description]
     *
     */
    constructor(domTarget, props) {
        this.DOM = document.createElement("div");
        this.DOM.setAttribute('class', 'lightbox')
        domTarget.appendChild(this.DOM);
        this.props = props;
        for (const [key, value] of Object.entries(props)) {
            this[key] = value;
        }
        this.index = this.findIndex();
        this.closeButton = document.createElement('i');
        this.closeButton.setAttribute('class', 'lightbox__close fas fa-times');
        this.closeModal(this.closeButton, this.DOM)
        this.DOM.appendChild(this.closeButton);
        this.container = this.makeContainer();
        this.nextButton = this.makeButton("next", "chevron-right", this.next);
        this.prevButton = this.makeButton("prev", "chevron-left", this.prev);
        this.keyBoardEvent();

        //Gestion de l'affichage des flèches directionnelles à l'initialisation de la lightBox
        if (this.index === 0){
            this.nextButton.classList.add("visible"); 
            this.prevButton.classList.remove("visible"); 
            this.render();
        }
        else if (this.index >= this.list.length -1){
            this.nextButton.classList.remove("visible"); 
            this.prevButton.classList.add("visible"); 
            this.render();
        }
        else {
            this.prevButton.classList.add("visible");
            this.nextButton.classList.add("visible"); 
            this.render();
        }
    }


    /**
     * Gestion de l'index des images a l'initialisation
     *
     * @return  {void}  
     */
    findIndex(){
        for (let i=0, size = this.list.length; i<size; i++){
            if (this.list[i].id === this.id) return i;
        }
    }


    /**
     * [makeContainer]
     *
     * @return  {HTMLElement}  
     */
    makeContainer() {        
        const container = document.createElement("div");
        container.className = "lightbox__container";
        this.DOM.appendChild(container);
        return container;
    }


    /**
     * Gestion de l'affichage des élément en fonction de si le data nous retourn une image ou une video 
     *
     * @return  {void}  [return description]
     */
    render(){
        this.container.innerHTML = this.image ? this.templateImg() : this.templateVideo();

    }


    /**
     * templete de l'ffichage des images si la data recu renvoie une image
     *
     */
    templateImg () {
        return `
            <div class='lightbox__container__in'>
                <img tabindex="1" class='contents contentInn' src="Sample_Photos/${this.image}" title=${this.title} alt="${this.descritpion}"> 
                <span class='lightbox__title'>${this.title}</span>
            </div>    
        `
    }



    /**
     * templete de l'ffichage des videos si la data recu renvoie une video
     *
     */
    templateVideo () {
        return ` 
            <div class='lightbox__container__in'>
                <video class='contents lightbox__container' autoplay loop> 
                    <source tabindex="1" class='contentInn' src="Sample_Photos/${this.video}" type=video/mp4 alt="${this.descritpion}">
                </video>
                <span class='lightbox__title'>${this.title}</span>
            </div>    
        `
    }


 /**
  * Création des boutton en fonction de leurs noms
  * Modification de l'image au click sur le boutton 
  *
  * @param   {String}  classname  [classname description]
  * @param   {String}  icon       [icon description]
  * @param   {Function}  callback   [callback description]
  *
  * @return  {HTMLElement}             [return description]
  */
    makeButton(classname, icon, callback){
        this.button = document.createElement("button");
        this.button.className = "lightbox__"+classname;
        this.button.innerHTML=`<i class="fas fa-${icon}"></i>`;
        this.button.onclick = callback.bind(this);
        this.DOM.appendChild(this.button);
        return this.button;
    }


    /**
     * Event au click du clavier droite gauche ou échape 
     *
     * @return  {void}  [return description]
     */
    keyBoardEvent(){
        document.addEventListener('keyup', (key) => {
            if(key.key === 'ArrowRight' && this.index < this.list.length){
                this.next();
            }else if (key.key ==='ArrowLeft' && this.index >= 0){
               this.prev();
            }else if (key.key === 'Escape'){
                this.DOM.style.display='none';
                this.render();
            }
        })
    }


    /**
     * Fermeture de la modale au click sur la croix 
     *
     * @param   {HTMLElement}  element  le bouton close
     * @param   {HTMLElement}  parent   la lightbox
     *
     * @return  {void}           [return description]
     */
    closeModal(element, parent){
        element.addEventListener('click', () => {
            parent.style.display = 'none';
        })
    }


    /**
     *
     * @return  {void}  [return description]
     */
    next(){
        this.showNewMedia(true);
    }


    /**
     *
     * @return  {void}  [return description]
     */
    prev(){
        this.showNewMedia(false);
    }


    /**
     * Gestion de l'affichage des media suivant ou précédent 
     * si c'est une video on supprome la template image et on ajout celle des videos et si c'est une image on fait l'inverse
     * Ajout aussi de l'affichage des éléments de direction en fonction de la position de next dans le tableau et on 
     * appel render pour afficher les nouvelles données
     *
     * @param   {Boolean}  next  [next description]
     *
     * @return  {HTMLElement}        [return description]
     */
    showNewMedia(next){
        const newIndex = this.index +  (next ? 1 : -1);
        if (newIndex < 0 || newIndex >= this.list.length) return;
        this.index = newIndex;

        const {
            image, video, descritpion, title, name, id
        } = this.list[this.index];
        this.id = id;
        this.name = name;
        this.title = title;
        this.descritpion = descritpion;
        if (video){
            delete this.image;
            this.video = video;
        }
        else {
            delete this.video;
            this.image = image;
        }
        if (this.index === 0) {
            this.prevButton.classList.remove("visible");
            this.nextButton.classList.add("visible"); 
            this.render();
        }else if (this.index === this.list.length -1){
            this.nextButton.classList.remove("visible");
            this.prevButton.classList.add("visible"); 
            this.render();
        } else {
            this.prevButton.classList.add("visible");
            this.nextButton.classList.add("visible"); 
            this.render();
        }
    }

}



