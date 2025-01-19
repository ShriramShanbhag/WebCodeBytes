class EditableTextContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <div class="parent-div">
                <div class="editable-div" contenteditable="true">Editable Text 1</div>
                <div class="editable-div" contenteditable="true">Editable Text 2</div>
                <div class="editable-div" contenteditable="true">Editable Text 3</div>
            </div>
            <slot></slot>
        `;
        
        // Apply styles from the external stylesheet
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .editable-div {
                border: 1px solid #ccc;
                padding: 10px;
                margin: 5px;
                cursor: text;
                min-height: 30px;
            }

            .editable-div:focus {
                outline: none;
                border-color: #007BFF;
            }
        `;
        this.shadowRoot.appendChild(styleSheet);
        const parentDiv = this.shadowRoot.querySelector('.parent-div')

        const observer = new MutationObserver((mutations) => {
            console.log(mutations);
        });

        const lightDOMObserver = new MutationObserver((mutations) => {
            console.log(mutations);
        })

        observer.observe(parentDiv, {
            childList: true,
            characterData: true, 
            subtree: true
        })

        lightDOMObserver.observe(this, {
            childList: true,
            subtree: true,
            characterData: true
        })
    }
}

// Define the new element
customElements.define('editable-text-container', EditableTextContainer);
