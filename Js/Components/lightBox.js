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



    /**
     * @type {HTMLElement}
     */
    prevButton;

    /**
     * @type {HTMLElement}
     */
    nextButton;

    constructor(domTarget, props) {
        console.log(props)
        //this.DOM = domTarget;
        this.DOM = document.createElement("div");
        this.DOM.setAttribute('class', 'lightbox')
        domTarget.appendChild(this.DOM);
        this.props = props;
        for (const [key, value] of Object.entries(props)) {
            this[key] = value;
        }
        this.index = this.findIndex();
        this.closeButton = this.makeButton("close", "times", this.closeModal);
        this.nextButton = this.makeButton("next", "chevron-right", this.next);
        this.prevButton = this.makeButton("prev", "chevron-left", this.prev);
        this.nextButton.classList.add("visible");
        this.prevButton.classList.add("visible");
        this.container = this.makeContainer();
        this.render();
    }

    findIndex(){
        for (let i=0, size = this.list.length; i<size; i++){
            if (this.list[i].id === this.id) return i;
        }
    }
    makeContainer() {        
        const container = document.createElement("div");
        container.className = "lightbox__container";
        this.DOM.appendChild(container);
        return container;
    }

    render(){
        this.container.innerHTML = this.image ? this.templateImg() : this.templateVideo();

    }

    templateImg () {
        return `
            <div class='lightbox__container__in'>
                <img class='contents contentInn' src="Sample_Photos/${this.image}" title=${this.title} alt="${this.title}">
                <span class='lightbox__title'>${this.title}</span>
            </div>    
        `;
    }


    templateVideo () {
        return ` 
            <div class='lightbox__container__in'>
                <video class='contents lightbox__container' autoplay loop> 
                    <source class='contentInn' src="Sample_Photos/${this.video}" type=video/mp4 alt="${this.title}">
                </video>
                <span class='lightbox__title'>${this.title}</span>
            </div>    
        `;
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
        const button = document.createElement("button");
        button.className = "lightbox__"+classname;
        button.innerHTML=`<i class="fas fa-${icon}"></i>`;
        button.onclick = callback.bind(this);
        this.DOM.appendChild(button);
        return button;
    }

    closeModal(){
        const close = document.querySelector('.lightbox__close');
        close.addEventListener('click', function() {
            console.log('ok');
        })
    }

    next(){
        this.showNewMedia(true);
    }

    prev(){
        this.showNewMedia(false);
    }

    showNewMedia(next){
        this.index += next ? 1 : -1;
        const {
            image, video, description, title, name, id
        } = this.list[this.index];
        this.id = id;
        this.name = name;
        this.title = title;
        if (video){
            delete this.image;
            this.video = video;
        }
        else {
            delete this.video;
            this.image = image;
        }
        console.log(this.index);
        if (this.index === 0) this.prevButton.classList.remove("visible");
        if (this.index === this.list.length) this.nextButton.classList.remove("visible");
        //TODO : ajouter title, dfescritpion
        this.render();
    }

}



