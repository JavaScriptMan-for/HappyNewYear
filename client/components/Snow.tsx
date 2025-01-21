import React, { FC, useEffect, useState } from 'react';

React.version;

interface WindowSize {
    width: number;
    height: number;
}

const Snow: FC = () => {
    const [size, setSize] = useState<number>(Math.random() * 17 + 8)
    const [duration, setDuration] = useState<number>(Math.random() * 15 + 8)
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      useEffect(() => {
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      useEffect(()=> {
        if(windowSize.width <= 680) {
            setSize(Math.random() * 10 + 5);
            setDuration(Math.random() * 20 + 8)
        }
        
      }, [windowSize])

    useEffect(() => {
        const snowContainer: HTMLDivElement | null = document.querySelector('.snow-container');
        const numSnowflakes: number = 80; 
        const snowflakeImages: string[] = [
            `/img/snow.png`,
            `/img/snow2.png`, 
            `/img/snow3.png`
        ];
        if (snowContainer) {
            for (let i: number = 0; i < numSnowflakes; i++) {
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
                snowflake.style.width = `${size}px`
                snowflake.style.height = `${size}px`

                //Задержка
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