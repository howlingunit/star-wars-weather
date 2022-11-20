export class DataElem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
    

        this.shadowRoot.innerHTML = `
        <link rel='stylesheet' href='./styles/dataelem.css'>
        <div>
            <h2 class="title">${this.getAttribute('title')}</h2>
            <p class="data">${this.getAttribute('data')}</p>
        </div>
        `;


    }
} 

customElements.define('data-elem', DataElem);