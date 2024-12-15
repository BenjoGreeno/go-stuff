document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const messages = await response.json();
        const container = document.getElementById('messages-container');
        
        if (messages.length === 0) {
            container.innerHTML = '<p>No messages found.</p>';
            return;
        }

        const messageElements = messages.map(message => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            // Using template literal with HTML escaping for security
            const escapedContent = message.content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
            
            messageDiv.innerHTML = `
                <h3>Message #${message.id}</h3>
                <p>${escapedContent}</p>
            `;
            return messageDiv;
        });

        container.append(...messageElements);

    } catch (error) {
        console.error('Error fetching messages:', error);
        const container = document.getElementById('messages-container');
        container.innerHTML = `
            <p style="color: red;">
                Error fetching messages. Please try again later.
                ${error.message ? `<br>Details: ${error.message}` : ''}
            </p>`;
    }
});
