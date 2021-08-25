// Import COMPONENTS
import {  Container,  } from "components";
import { Button } from "components";
import { Text } from "components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
// Import TEMPLATES

// Import STYLES
import styles from "./PAGE404.module.scss";

type Props = { className?: string; style?: React.CSSProperties };

const Page404: React.FC<Props> = ({ className, style }) => {
  const classNames = [styles.about, className].join(" ");

 const router = useRouter();
 
 useEffect(()=>{ 
setTimeout(() => {
   //auto redirecting 

   router.push("/")
}, 1000);

  })

  return (
    <div style={style} className={classNames}>
     
      <Container className={styles.forbidden__container}>
      <div className={styles.forbidden__content}>

     <img className={styles.forbidden__image} src="/smile.png " alt="" />
      <Text
                  color="hotpink"
                  size="xxlg"
                  className={styles.forbidden__404text}
                >
                  {"404"}
                </Text>
                <Text
                  color="hotpink"
                  size="sm"
                  className={styles.forbidden__404textsmall}
                >
                  {"Sorry. This section was not found or has been deleted!"}
                </Text>
             <Button
                className={styles.forbidden__formSubmitBtn}
                type="submit"
                theme="gradient"
              >
                <Text
                  color="white"
                  size="sm"
                  className={styles.auth__formSubmitBtnText}
                >
                  {<Link href = '/'>Home Page </Link>}
                </Text>
              </Button>
              </div>
      </Container>
    </div>
  );
};

export default Page404;
