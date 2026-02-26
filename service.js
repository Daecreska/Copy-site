/**
 * Service page - dynamic content based on URL params
 */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('service') || 'kapcha';

    const services = {
        kapcha: {
            title: 'Накрутка голосов с капчей',
            features: [
                'Наши роботы работают офлайн на 2 СИМ-картах',
                'Повышенная безопасность и надёжность',
                'Поддержка любых типов капчи',
                'Быстрое выполнение заказов'
            ]
        },
        registraciya: {
            title: 'Накрутка с регистрацией',
            features: [
                'Полная имитация реальных пользователей',
                'Уникальные аккаунты для каждого голоса',
                'Низкий риск обнаружения',
                'Поддержка любых платформ'
            ]
        },
        'bez-registracii': {
            title: 'Накрутка без регистрации',
            features: [
                'Максимально быстрая доставка',
                'Минимальная стоимость',
                'Подходит для простых голосований',
                'Не требует данных аккаунта'
            ]
        },
        vk: {
            title: 'Накрутка голосов ВКонтакте',
            features: [
                'Голоса в опросах ВК',
                'Рейтинги и конкурсы',
                'Голосования в группах',
                'Быстрая накрутка за минут'
            ]
        },
        instagram: {
            title: 'Накрутка в Instagram и TikTok',
            features: [
                'Голоса в Stories и опросах',
                'Лайки и комментарии',
                'Участие в челленджах',
                'Повышение охватов'
            ]
        },
        oprosy: {
            title: 'Опросы и рейтинги',
            features: [
                'Любые форматы опросов',
                'Корпоративные рейтинги',
                'HR-голосования',
                'Маркетинговые исследования'
            ]
        },
        korporativnye: {
            title: 'Корпоративные голосования',
            features: [
                'Индивидуальный подход',
                'Крупные объёмы голосов',
                'Конфиденциальность',
                'Детальная отчётность'
            ]
        }
    };

    const service = services[serviceId] || services.kapcha;

    // Update page title
    document.title = `${service.title} — Накрутка голосов`;

    // Update hero title
    const titleEl = document.getElementById('serviceTitle');
    if (titleEl) titleEl.textContent = service.title;

    // Update features list
    const featuresEl = document.getElementById('serviceFeatures');
    if (featuresEl) {
        featuresEl.innerHTML = service.features
            .map(f => `<li>${f}</li>`)
            .join('');
    }

    // Update "Why" heading
    const whyHeading = document.getElementById('whyHeading');
    if (whyHeading) whyHeading.textContent = `Зачем нужна ${service.title.toLowerCase()}?`;

    // Update CTA title
    const ctaTitle = document.getElementById('ctaTitle');
    if (ctaTitle) ctaTitle.textContent = `Нужна ${service.title.toLowerCase()}? Мы можем вам помочь!`;
});
