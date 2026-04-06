let currentType = '';

// 1. 초기 실행: 로그인 여부 확인
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('nextwave_user');
    if (savedUser) {
        showMyPage(JSON.parse(savedUser));
    }
});

// 2. 유형 선택 로직
function selectType(type) {
    currentType = type;
    document.querySelectorAll('.type-input').forEach(el => el.style.display = 'none');
    
    if (type === 'student') document.getElementById('input-student').style.display = 'block';
    if (type === 'worker') document.getElementById('input-worker').style.display = 'block';
    
    goToStep(2);
}

// 3. 단계 이동
function goToStep(n) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${n}`).classList.add('active');
    const titles = ["유형 선택", "상세 정보", "거의 다 됐어요!"];
    document.getElementById('step-title').innerText = `${titles[n-1]} (${n}/3)`;
}

// 4. 가입 제출 및 저장
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
        type: currentType,
        name: document.getElementById('user-name').value,
        email: document.getElementById('user-email').value,
        org: currentType === 'student' ? document.getElementById('input-student').value : 
             currentType === 'worker' ? document.getElementById('input-worker').value : '프리랜서'
    };
    localStorage.setItem('nextwave_user', JSON.stringify(user));
    showMyPage(user);
});

// 5. 마이페이지 렌더링
function showMyPage(user) {
    document.getElementById('guest-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';
    document.getElementById('display-name').innerText = user.name;
    document.getElementById('auth-btn').innerText = '로그아웃';
    
    const badge = document.getElementById('user-badge');
    const dash = document.getElementById('dashboard-content');
    
    if (user.type === 'student') {
        badge.innerText = '대학생';
        dash.innerHTML = `<div class="card"><h3>📅 과제 일정</h3><p>${user.org} 과제 마감 D-3</p></div>
                          <div class="card"><h3>🤖 AI 요약</h3><p>전공 서적 PDF를 업로드해보세요.</p></div>`;
    } else if (user.type === 'worker') {
        badge.innerText = '직장인';
        dash.innerHTML = `<div class="card"><h3>📊 프로젝트 칸반</h3><p>${user.org} 업무 현황</p></div>
                          <div class="card"><h3>🤝 팀 미팅</h3><p>오후 2시 주간 회의 요약 대기 중</p></div>`;
    } else {
        badge.innerText = '프리랜서';
        dash.innerHTML = `<div class="card"><h3>💰 정산 관리</h3><p>이번 달 정산 예정 건 : 0건</p></div>
                          <div class="card"><h3>📝 개인 워크스페이스</h3><p>나만의 집중 모드를 시작하세요.</p></div>`;
    }

    document.querySelectorAll('.guest-only').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.user-only').forEach(el => el.style.display = 'block');
}

// 6. 로그인/로그아웃 처리
function handleAuthClick() {
    if (localStorage.getItem('nextwave_user')) {
        localStorage.removeItem('nextwave_user');
        location.reload();
    } else {
        scrollToSignup();
    }
}

function scrollToSignup() {
    document.getElementById('signup-container').scrollIntoView({ behavior: 'smooth' });
}
