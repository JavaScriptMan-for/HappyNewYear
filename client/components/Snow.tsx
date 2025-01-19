import React, { FC, useEffect } from 'react';

React.version;
const Snow: FC = () => {
    useEffect(() => {
        const snowContainer: HTMLDivElement | null = document.querySelector('.snow-container');
        const numSnowflakes: number = 80; 
        const snowflakeImages: string[] = [
            `${import.meta.env.BASE_URL}/img/snow.png`,
            `${import.meta.env.BASE_URL}/img/snow2.png`, 
            `${import.meta.env.BASE_URL}/img/snow3.png`
        ];
        if (snowContainer) {
            for (let i = 0; i < numSnowflakes; i++) {
                const snowflake = document.createElement('div');
                snowflake.classList.add('snowflake');
                snowflake.style.left = `${Math.random() * 100}%`;
                snowflake.style.top = `${Math.random() * -100}px`;
                snowContainer.appendChild(snowflake);

                // Случайное изображение снежинки
                const randomIndex = Math.floor(Math.random() * snowflakeImages.length)
                snowflake.style.backgroundImage = `url('${snowflakeImages[randomIndex]}')`;

                // Задержка анимации
                const delay = Math.random() * -14; 
                snowflake.style.animationDelay = `${delay}s`

                // Задаем размер
                const size = Math.random() * 17 + 8; 
                snowflake.style.width = `${size}px`
                snowflake.style.height = `${size}px`

                const duration = Math.random() * 15 + 8;
                snowflake.style.animationDuration = `${duration}s`
            }
        }
    }, [])
    return (
        <>
            <div className="snow-container"></div>
        </>
    )
}

export default Snow;