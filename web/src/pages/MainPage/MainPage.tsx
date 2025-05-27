import { FC } from 'react'
import styles from './MainPage.module.css'
import {ImageCarousel} from "../../components/ImageContainer/ImageCarousel.tsx";
import {PCList} from "../../components/PCList/PCList.tsx";

const MainPage: FC = () => {
    const images = [
        { src: "./images/main-page/IMG20231022194925.jpg", caption: 'Внутренний аудит — деятельность направленная на представление ' + 'Совету директоров и руководству Общества независимых ' + 'и объективных гарантий и консультаций, направленных на совершенствование деятельности Общества.' },
        { src: "./images/main-page/IMG20231022195007.jpg", caption: 'Миссия внутреннего аудита — сохранение и повышение стоимости Общества и Организаций посредством проведения объективных внутренних аудиторских проверок на основе риск-ориентированного подхода, предоставления рекомендаций и обмена знаниями' },
        { src: "./images/main-page/IMG_20250503_174842.jpg", caption: 'Стратегическая цель ПАО «Газпром»  — укрепление статуса лидера среди глобальных энергетических компаний посредством диверсификации рынков сбыта, обеспечения энергетической безопасности и устойчивого развития, роста эффективности деятельности.' },

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