import styles from "./PageNotFound.module.css"
import { GoHomeButton } from "@/common/Components"

export const PageNotFound = () => {

  return (
    <>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>page not found</h2>
      <GoHomeButton/>
    </>
  )
}
