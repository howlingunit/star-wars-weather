export class DataElem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
    

        this.shadowRoot.innerHTML = `
        <div>
            <h2 class="title">${this.getAttribute('title')}</h2>
            <p class="data">${this.getAttribute('data')}</p>
        </div>
        `;

        // const linkElem = document.createElement("link");
        // linkElem.setAttribute("rel", "stylesheet");
        // linkElem.setAttribute("href", "./dataelem.css");
        // this.shadowRoot.appendChild(linkElem);


    }
} 

customElements.define('data-elem', DataElem);