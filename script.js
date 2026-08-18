let linesOfCode = 0;
let linesPerSecond = 0;

const items = {
    intern: { cost: 15, cps: 1, count: 0, icon: '👨‍💻', name: 'Intern' },
    gpt: { cost: 100, cps: 8, count: 0, icon: '🤖', name: 'AI' },
    senior: { cost: 1100, cps: 47, count: 0, icon: '🧙‍♂️', name: 'Senior' }
};

const linesDisplay = document.getElementById('lines-count');
const cpsDisplay = document.getElementById('cps-count');
const clickBtn = document.getElementById('click-btn');
const terminalBody = document.getElementById('terminal-body');

clickBtn.addEventListener('click', () => {
    linesOfCode += 1;
    addLog(`> git commit -m "manual click (+1 line)"`, 'log-commit');
    updateUI();
});

function buyItem(itemName) {
    const item = items[itemName];
    
    if (linesOfCode >= item.cost) {
        linesOfCode -= item.cost;
        item.count += 1;
        item.cost = Math.floor(item.cost * 1.15);
        
        const iconContainer = document.getElementById(`${itemName}-icons`);
        const newIcon = document.createElement('span');
        newIcon.className = 'char-icon';
        newIcon.textContent = item.icon;
        iconContainer.appendChild(newIcon);

        addLog(`[BUY] Hired/Upgraded ${item.name}! (+${item.cps} lines/s)`, 'log-system');
        
        calculateCPS();
        updateUI();
    } else {
        addLog(`[ERROR] Not enough lines of code to buy ${item.name}!`, 'log-system');
    }
}

function calculateCPS() {
    linesPerSecond = 0;
    for (let key in items) {
        linesPerSecond += items[key].count * items[key].cps;
    }
}

function addLog(message, className = '') {
    const p = document.createElement('p');
    p.textContent = message;
    if (className) p.className = className;
    
    terminalBody.appendChild(p);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    if (terminalBody.childNodes.length > 30) {
        terminalBody.removeChild(terminalBody.firstChild);
    }
}

setInterval(() => {
    if (linesPerSecond > 0) {
        linesOfCode += linesPerSecond;
        addLog(`> Auto-generated +${linesPerSecond} lines of code`, 'log-auto');
        updateUI();
    }
}, 1000);

function updateUI() {
    linesDisplay.textContent = Math.floor(linesOfCode);
    cpsDisplay.textContent = linesPerSecond;

    for (let key in items) {
        document.getElementById(`cost-${key}`).textContent = items[key].cost;
        document.getElementById(`count-${key}`).textContent = items[key].count;
    }
}