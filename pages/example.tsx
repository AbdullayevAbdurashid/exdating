import React from 'react'
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { fetcher } from "utils";

// const { put, get, post } = fetcher;

function Example() {
    const router = useRouter();
    // const { locale } = router;
    // const t = locale === 'en' ? en : ru;



    // const changeLanguage = (e) => {
    //     const locale = e.target.value;
    //     router.push(router.pathname, router.asPath, { locale });
    // };





    return (
        <div>
        </div>
    )
}

export default Example
