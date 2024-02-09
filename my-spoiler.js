document.addEventListener('DOMContentLoaded', () => {
    class MySpoilerElement extends HTMLElement {
        constructor() {
            super();

            // Create a shadow root
            const shadow = this.attachShadow({mode: 'open'});

            // Define CSS
            const style = document.createElement('style');
            style.textContent = `
                img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                }
                .content {
                    display: none;
                    border: 1px solid #ccc;
                    padding: 10px;
                }
                button {
                    cursor: pointer;
                }
            `;

            // Create elements
            const wrapper = document.createElement('div');
            const button = document.createElement('button');
            const content = document.createElement('div');
            content.classList.add('content');

            // Set attributes and styles
            const buttonName = this.getAttribute('name') || 'Reveal Spoiler';
            button.textContent = buttonName;

            // Append elements to the shadow root
            shadow.appendChild(style);
            wrapper.appendChild(button);
            wrapper.appendChild(content);
            shadow.appendChild(wrapper);

            // Add event listener
            button.addEventListener('click', () => {
                content.style.display = (content.style.display === 'block') ? 'none' : 'block';
            });
        }

        connectedCallback() {
            // Move the inner HTML to the content div after the element is attached to the DOM
            const contentDiv = this.shadowRoot.querySelector('.content');
            contentDiv.innerHTML = this.innerHTML;
            this.innerHTML = '';
        }
    }

    // Define the custom element
    customElements.define('my-spoiler', MySpoilerElement);
});