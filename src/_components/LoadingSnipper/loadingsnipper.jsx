import styles from "./loading.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Carregando cardápio...</p>
    </div>
  );
}