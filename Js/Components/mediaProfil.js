//Ajout des media en fonction de leurs type

class MediaProfil {
    constructor(data, domTarget, callbacks) {
        this.DOM = document.createElement("article");
        this.DOM.setAttribute("class", 'photographerImg')
        domTarget.appendChild(this.DOM);
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }
        this.DOM.onclick = () => callbacks.lightbox(data);
        this.likeCallback = callbacks.likes;
        this.liked = false;
        this.render();
    }

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


    templateImage() {
        return `
            <div class='imgContainer'>
                <img class="photoImg contentMedia" src="Sample_Photos/${this.image}" alt="${this.title}"> 
            </div>
        `;
    }

    templateVideo() {
        return `
                <div class='videoContainer'>
                    <video autoplay loop> 
                        <source class='contentMedia' src="Sample_Photos/${this.video}" type=video/mp4 alt="${this.title}">
                    </video>
                </div>     
        `;
    }

    async showLikes(domTarget) {
        const container = document.createElement("div");
        container.className = "likeGlobal";
        container.innerHTML = `
                        <span class="likesImg">${this.likes}</span>
                        <i class="${this.liked ? "fas" : "far"} fa-heart"></i>
                        `;

        container.onclick = this.likeClick.bind(this);

        domTarget.appendChild(container);
    }

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