document.addEventListener('DOMContentLoaded', () => {
class MySpoilerElement extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create elements
        const wrapper = document.createElement('div');
        const button = document.createElement('button');
        const content = document.createElement('div');

        // Set attributes and styles
        const buttonName = this.getAttribute('name') || 'Reveal Spoiler';
        button.textContent = buttonName;
        content.innerHTML = this.innerHTML;
        content.style.display = 'none';
        content.style.border = '1px solid #ccc';
        content.style.padding = '10px';
        button.style.cursor = 'pointer';

        // Append elements to the shadow root
        wrapper.appendChild(button);
        wrapper.appendChild(content);
        shadow.appendChild(wrapper);

        // Add event listener
        button.addEventListener('click', () => {
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        });
    }
}

// Define the custom element
customElements.define('my-spoiler', MySpoilerElement);
});
