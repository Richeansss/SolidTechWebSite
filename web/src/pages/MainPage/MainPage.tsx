import { FC } from 'react'
import styles from './MainPage.module.css'
import {ImageCarousel} from "../../components/ImageContainer/ImageCarousel.tsx";
import {PCList} from "../../components/PCList/PCList.tsx";


const MainPage: FC = () => {
    const images = [
        { src: "./images/main-page/IMG20231022194925.jpg", caption: 'Современные компьютеры для любых задач — от учёбы и работы до игр и творчества' },
        { src: "./images/main-page/IMG20231022195007.jpg", caption: 'Надёжные и производительные решения для дома и офиса. Качество, проверенное временем.' },
        { src: "./images/main-page/IMG_20250503_174842.jpg", caption: 'Всё для тех, кто ценит скорость, стабильность и стиль в одном корпусе' },

    ];

    return (
        <div>
            <div className={styles.main}>
                <ImageCarousel images={images} interval={10000}/>
            </div>
            <div>
                <PCList/>
            </div>
        </div>
    )
}

export {MainPage}