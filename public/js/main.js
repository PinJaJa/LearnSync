// Initialize the AI and UI components
document.addEventListener('DOMContentLoaded', () => {
    const ai = new LearnSyncAI();
    initializeUI();
});

function initializeUI() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Add click handlers to feature cards
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.querySelector('h2').textContent;
            handleFeatureClick(feature);
        });
    });

    // Add hover effects
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 12px 16px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

function handleFeatureClick(feature) {
    switch(feature) {
        case 'AI Tutor':
            showAITutor();
            break;
        case 'Smart Notes':
            showSmartNotes();
            break;
        case 'Auto Quiz Generator':
            showQuizGenerator();
            break;
        case 'Study Planner':
            showStudyPlanner();
            break;
        case 'Collaboration Hub':
            showCollaborationHub();
            break;
        case 'AI-powered Revision':
            showAIRevision();
            break;
    }
}

function showAITutor() {
    const mainContent = document.querySelector('.content-wrapper');
    mainContent.innerHTML = `
        <h1 class="main-title">AI Tutor</h1>
        <div class="tutor-interface">
            <div class="chat-container">
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input">
                    <input type="text" id="userInput" placeholder="Ask your question...">
                    <button onclick="sendMessage()">Send</button>
                </div>
            </div>
        </div>
    `;

    // Initialize chat functionality
    initializeChat();
}

function initializeChat() {
    const ai = new LearnSyncAI();
    const input = document.getElementById('userInput');
    const messages = document.getElementById('chatMessages');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    window.sendMessage = () => {
        const userInput = input.value.trim();
        if (userInput) {
            // Add user message
            addMessage('user', userInput);
            
            // Get AI response
            const response = ai.processInput(userInput);
            addMessage('ai', response.message);
            
            // Clear input
            input.value = '';
        }
    };

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }
}

function showSmartNotes() {
    const mainContent = document.querySelector('.content-wrapper');
    mainContent.innerHTML = `
        <h1 class="main-title">Smart Notes</h1>
        <div class="notes-interface">
            <div class="notes-sidebar">
                <button onclick="createNewNote()">New Note</button>
                <div id="notesList"></div>
            </div>
            <div class="notes-editor">
                <input type="text" id="noteTitle" placeholder="Note Title">
                <textarea id="noteContent" placeholder="Start typing your note..."></textarea>
                <button onclick="saveNote()">Save Note</button>
            </div>
        </div>
    `;

    // Initialize notes functionality
    initializeNotes();
}

function initializeNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const notesList = document.getElementById('notesList');

    window.createNewNote = () => {
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
    };

    window.saveNote = () => {
        const title = document.getElementById('noteTitle').value;
        const content = document.getElementById('noteContent').value;
        
        if (title && content) {
            notes.push({ title, content, date: new Date().toISOString() });
            localStorage.setItem('notes', JSON.stringify(notes));
            updateNotesList();
        }
    };

    function updateNotesList() {
        notesList.innerHTML = notes.map((note, index) => `
            <div class="note-item" onclick="loadNote(${index})">
                <h3>${note.title}</h3>
                <p>${new Date(note.date).toLocaleDateString()}</p>
            </div>
        `).join('');
    }

    window.loadNote = (index) => {
        const note = notes[index];
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
    };

    updateNotesList();
}

function showQuizGenerator() {
    const mainContent = document.querySelector('.content-wrapper');
    mainContent.innerHTML = `
        <h1 class="main-title">Auto Quiz Generator</h1>
        <div class="quiz-interface">
            <div class="quiz-setup">
                <select id="quizTopic">
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="literature">Literature</option>
                </select>
                <button onclick="generateQuiz()">Generate Quiz</button>
            </div>
            <div id="quizContent"></div>
        </div>
    `;

    // Initialize quiz functionality
    initializeQuiz();
}

function initializeQuiz() {
    const ai = new LearnSyncAI();

    window.generateQuiz = () => {
        const topic = document.getElementById('quizTopic').value;
        const quiz = ai.generateQuiz(topic);
        displayQuiz(quiz);
    };

    function displayQuiz(quiz) {
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = `
            <h2>${quiz.topic} Quiz</h2>
            <div class="questions">
                ${quiz.questions.map((q, i) => `
                    <div class="question">
                        <p>${i + 1}. ${q.question}</p>
                        <div class="options">
                            ${q.options.map((opt, j) => `
                                <label>
                                    <input type="radio" name="q${i}" value="${j}">
                                    ${opt}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <button onclick="checkAnswers()">Submit Quiz</button>
        `;
    }

    window.checkAnswers = () => {
        // Implement answer checking logic
        alert('Quiz submitted! Implementation pending for score calculation.');
    };
}