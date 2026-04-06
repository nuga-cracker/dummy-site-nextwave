// 회원가입 섹션으로 스크롤 이동
function scrollToSignup() {
    document.getElementById('signup-section').scrollIntoView({ behavior: 'smooth' });
}

// 단계 전환 함수
function nextStep(stepNumber) {
    // 1. 모든 스텝에서 active 클래스 제거
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });

    // 2. 선택한 스텝만 active 클래스 추가
    const targetStep = document.getElementById(`step-${stepNumber}`);
    if (targetStep) {
        targetStep.classList.add('active');
        
        // 3. 제목 업데이트
        document.getElementById('step-title').innerText = `회원가입 (단계 ${stepNumber}/3)`;
    }
}

// 초기 로딩 시 1단계 보이기 (만약 HTML에서 안 보인다면)
document.addEventListener('DOMContentLoaded', () => {
    nextStep(1);
});

// 폼 제출 완료 메시지
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('죄송합니다. 현재 시스템 점검 중으로 가입이 제한됩니다. (71.9%의 사용자가 여기서 나갔습니다.)');
});
