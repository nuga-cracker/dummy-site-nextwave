function scrollToSignup() {
    document.getElementById('signup-section').scrollIntoView({ behavior: 'smooth' });
}

function nextStep(step) {
    // 모든 스텝 숨기기
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));

    // 해당 스텝 보이기
    document.getElementById(`step-${step}`).classList.add('active');

    // 타이틀 변경
    document.getElementById('step-title').innerText = `회원가입 (단계 ${step}/3)`;
}

// 폼 제출 이벤트 (가상의 완료)
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('가입 신청이 완료되었습니다. (하지만 데이터상 71.9%는 여기까지 오지 못했습니다.)');
});