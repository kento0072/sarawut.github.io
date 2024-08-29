document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const gameSection = document.getElementById('game-section');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const alertBox = document.getElementById('alert');
    const categoryLinks = document.querySelectorAll('nav ul li a');
    const gameList = document.getElementById('game-list');

    function isLoggedIn() {
        return localStorage.getItem('loggedInUser') !== null;
    }

    function updateUI() {
        if (isLoggedIn()) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
            loginSection.style.display = 'none';
            signupSection.style.display = 'none';
        } else {
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            loginSection.style.display = 'none';
            signupSection.style.display = 'none';
        }
        gameSection.style.display = 'block'; // Ensure the game section is always shown
        loadGames('all'); // Load all games by default
    }

    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.style.backgroundColor = type === 'error' ? '#d81b60' : '#4caf50';
        alertBox.style.display = 'block';
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000);
    }

    function showLoginSection() {
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
        gameSection.style.display = 'none';
    }

    function showSignupSection() {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
        gameSection.style.display = 'none';
    }

    loginButton.addEventListener('click', showLoginSection);

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        updateUI();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const storedUser = localStorage.getItem(username);
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.password === password) {
                localStorage.setItem('loggedInUser', username);
                showAlert("ล็อกอินสำเร็จ!", "success");
                updateUI();
            } else {
                showAlert("รหัสผ่านไม่ถูกต้อง!", "error");
            }
        } else {
            showAlert("บัญชีผู้ใช้ไม่พบ!", "error");
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;
        if (localStorage.getItem(newUsername)) {
            showAlert("ชื่อผู้ใช้นี้มีอยู่แล้ว!", "error");
        } else {
            localStorage.setItem(newUsername, JSON.stringify({ password: newPassword }));
            showAlert("สมัครสมาชิกสำเร็จ!", "success");
            showLoginSection();
        }
    });

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupSection();
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginSection();
    });

    function loadGames(category) {
        const games = {
            all: [
            { title: 'cryzen', category: 'action', url: 'https://poki.com/th/g/cryzen-io', imageUrl: 'img/a1.jpg' },
            { title: 'tribals', category: 'action', url: 'https://poki.com/th/g/tribals-io', imageUrl: 'img/a2.jpg' },
            { title: 'punch-legend-simulator', category: 'action', url: 'https://poki.com/th/g/punch-legend-simulator', imageUrl: 'img/a3.jpg' },
            { title: 'escape-from-school', category: 'action', url: 'https://poki.com/th/g/escape-from-school', imageUrl: 'img/a4.jpg' },
            { title: 'spot-the-differences', category: 'puzzle', url: 'https://poki.com/th/g/spot-the-differences', imageUrl: 'img/p1.jpg' },
            { title: 'nuts-and-bolts-screwing-puzzle', category: 'puzzle', url: 'https://poki.com/th/g/nuts-and-bolts-screwing-puzzle', imageUrl: 'img/p2.jpg' },
            { title: 'water-color-sort', category: 'puzzle', url: 'https://poki.com/th/g/water-color-sort', imageUrl: 'img/p3.jpg' },
            { title: 'brain-test-tricky-puzzles', category: 'puzzle', url: 'https://poki.com/th/g/brain-test-tricky-puzzles', imageUrl: 'img/p4.jpg' },
            { title: 'bubble-shooter', category: 'arcade', url: 'https://games.aarp.org/games/bubble-shooter?intcmp=AM-A5GAM-AGC-ACP-FEA', imageUrl: 'img/ar1.jpg' },
            { title: 'atari-asteroids', category: 'arcade', url: 'https://games.aarp.org/games/atari-asteroids?intcmp=AM-A5GAM-AGC-ACP-FEA', imageUrl: 'img/ar2.jpg' },
            { title: '10-by-10', category: 'arcade', url: 'https://games.aarp.org/games/10-by-10?intcmp=AM-A5GAM-AGC-ACP-FEA', imageUrl: 'img/ar3.jpg' },
            { title: '5-roll', category: 'arcade', url: 'https://games.aarp.org/games/5-roll?intcmp=AM-A5GAM-AGC-ACP', imageUrl: 'img/ar4.jpg' },
            { title: 'ping-pong-go', category: 'sports', url: 'https://poki.com/th/g/ping-pong-go', imageUrl: 'img/s1.jpg' },
            { title: 'penalty-shooters-2', category: 'sports', url: 'https://poki.com/th/g/penalty-shooters-2', imageUrl: 'img/s2.jpg' },
            { title: 'pool-club', category: 'sports', url: 'https://poki.com/th/g/pool-club', imageUrl: 'img/s3.jpg' },
            { title: 'football-legends', category: 'sports', url: 'https://poki.com/th/g/football-legends', imageUrl: 'img/s4.jpg' }
        ],
            
            action: [
                { title: 'cryzen', category: 'action', url: 'https://poki.com/th/g/cryzen-io', imageUrl: 'img/a1.jpg' },
                { title: 'tribals', category: 'action', url: 'https://poki.com/th/g/tribals-io', imageUrl: 'img/a2.jpg' },
                { title: 'punch-legend-simulator', category: 'action', url: 'https://poki.com/th/g/punch-legend-simulator', imageUrl: 'img/a3.jpg' },
                { title: 'escape-from-school', category: 'action', url: 'https://poki.com/th/g/escape-from-school', imageUrl: 'img/a4.jpg' },
            ],
            puzzle: [
                { title: 'spot-the-differences', category: 'puzzle', url: 'https://poki.com/th/g/spot-the-differences', imageUrl: 'img/p1.jpg' },
                { title: 'nuts-and-bolts-screwing-puzzle', category: 'puzzle', url: 'https://poki.com/th/g/nuts-and-bolts-screwing-puzzle', imageUrl: 'img/p2.jpg' },
                { title: 'water-color-sort', category: 'puzzle', url: 'https://poki.com/th/g/water-color-sort', imageUrl: 'img/p3.jpg' },
                { title: 'brain-test-tricky-puzzles', category: 'puzzle', url: 'https://poki.com/th/g/brain-test-tricky-puzzles', imageUrl: 'img/p4.jpg' }
            ],
            arcade: [
                { title: 'bubble-shooter', category: 'arcade', url: 'https://games.aarp.org/games/bubble-shooter?intcmp=AM-A5GAM-AGC-ACP-FEA', imageUrl: 'img/ar1.jpg' },
                { title: 'atari-asteroids', category: 'arcade', url: 'https://games.aarp.org/games/atari-asteroids?intcmp=AM-A5GAM-AGC-ACP-FEA', imageUrl: 'img/ar2.jpg' },
                { title: '10-by-10', category: 'arcade', url: 'https://games.aarp.org/games/10-by-10?intcmp=AM-A5GAM-AGC-ACP-FEA', imageUrl: 'img/ar3.jpg' },
                { title: '5-roll', category: 'arcade', url: 'https://games.aarp.org/games/5-roll?intcmp=AM-A5GAM-AGC-ACP', imageUrl: 'img/ar4.jpg' },
            ],
            sports: [
                { title: 'ping-pong-go', category: 'sports', url: 'https://poki.com/th/g/ping-pong-go', imageUrl: 'img/s1.jpg' },
                { title: 'penalty-shooters-2', category: 'sports', url: 'https://poki.com/th/g/penalty-shooters-2', imageUrl: 'img/s2.jpg' },
                { title: 'pool-club', category: 'sports', url: 'https://poki.com/th/g/pool-club', imageUrl: 'img/s3.jpg' },
                { title: 'football-legends', category: 'sports', url: 'https://poki.com/th/g/football-legends', imageUrl: 'img/s4.jpg' }
            ]
        };
    
        gameList.innerHTML = ''; // Clear the game list
        const filteredGames = games[category] || [];
        filteredGames.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.className = 'game-item';
            gameItem.innerHTML = `
                <img src="${game.imageUrl}" alt="${game.title}" class="game-image">
                <h3>${game.title}</h3>
                <a href="${game.url}" class="game-link" ${!isLoggedIn() ? 'onclick="showAlert(\'กรุณาล็อกอิน\', \'error\'); return false;"' : ''}>Play Now</a>
            `;
            gameList.appendChild(gameItem);
        });
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn()) {
                const category = link.getAttribute('data-category');
                loadGames(category);
                categoryLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            } else {
                showAlert("กรุณาล็อกอิน", "error");
            }
        });
    });

    updateUI(); // Initial UI update based on current login state
});
