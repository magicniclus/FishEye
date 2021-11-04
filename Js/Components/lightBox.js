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
     * [findIndex description]
     *
     * @return  {Index}  [return description]
     */
    findIndex(){
        for (let i=0, size = this.list.length; i<size; i++){
            if (this.list[i].id === this.id) return i;
        }
    }


    /**
     * [makeContainer description]
     *
     * @return  {HTMLElement}  [return description]
     */
    makeContainer() {        
        const container = document.createElement("div");
        container.className = "lightbox__container";
        this.DOM.appendChild(container);
        return container;
    }


    /**
     * [render description]
     *
     * @return  {HTMLElement}  [return description]
     */
    render(){
        this.container.innerHTML = this.image ? this.templateImg() : this.templateVideo();

    }


    /**
     * [templateImg description]
     *
     * @return  {ReturnType}  [return description]
     */
    templateImg () {
        return `
            <div class='lightbox__container__in'>
                <img class='contents contentInn' src="Sample_Photos/${this.image}" title=${this.title} alt="${this.descritpion}"> 
                <span class='lightbox__title'>${this.title}</span>
            </div>    
        `
    }



    /**
     * [templateVideo description]
     *
     * @return  {ReturnType}  [return description]
     */
    templateVideo () {
        return ` 
            <div class='lightbox__container__in'>
                <video class='contents lightbox__container' autoplay loop> 
                    <source class='contentInn' src="Sample_Photos/${this.video}" type=video/mp4 alt="${this.descritpion}">
                </video>
                <span class='lightbox__title'>${this.title}</span>
            </div>    
        `
    }


 /**
  * [makeButton description]
  *
  * @param   {String}  classname  [classname description]
  * @param   {String}  icon       [icon description]
  * @param   {Function}  callback   [callback description]
  *
  * @return  {[type]}             [return description]
  */
    makeButton(classname,icon, callback){
        this.button = document.createElement("button");
        this.button.className = "lightbox__"+classname;
        this.button.innerHTML=`<i class="fas fa-${icon}"></i>`;
        this.button.onclick = callback.bind(this);
        this.DOM.appendChild(this.button);
        return this.button;
    }


    /**
     * [keyBoardEvent description]
     *
     * @return  {void}  [return description]
     */
    keyBoardEvent(){
        document.addEventListener('keyup', (key) => {
            if(key.key === 'ArrowRight' && this.index < this.list.length){
                this.next();
                this.render()
            }else if (key.key ==='ArrowLeft' && this.index >= 0){
                this.prev();
                this.render()
            }else if (key.key === 'Escape'){
                this.DOM.style.display='none';
                this.render();
            }
        })
    }


    /**
     * [closeModal description]
     *
     * @param   {HTMLElement}  element  [element description]
     * @param   {HTMLElement}  parent   [parent description]
     *
     * @return  {Event}           [return description]
     */
    closeModal(element, parent){
        element.addEventListener('click', () => {
            parent.style.display = 'none';
        })
    }


    /**
     * [next description]
     *
     * @return  {Boolean}  [return description]
     */
    next(){
        this.showNewMedia(true);
    }


    /**
     * [prev description]
     *
     * @return  {Boolean}  [return description]
     */
    prev(){
        this.showNewMedia(false);
    }


    /**
     * [showNewMedia description]
     *
     * @param   {Boolean}  next  [next description]
     *
     * @return  {HTMLElement}        [return description]
     */
    showNewMedia(next){
        this.index += next ? 1 : -1;
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



