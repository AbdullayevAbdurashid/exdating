import React from 'react'
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import { useRouter } from 'next/router';

function Example() {

    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : ru;



    const changeLanguage = (e) => {
        const locale = e.target.value;
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <div>
            <select
                onChange={changeLanguage}
                defaultValue={locale}
            >
                <option className="text-black" value="ru">RU</option>
                <option className="text-black" value="en">EN</option>
            </select>
            <hr />

            <div>{t.main}</div>
            <h1>{t.default}</h1>
        </div>
    )
}

export default Example
