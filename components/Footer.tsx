import styles from "@/pages/index.module.css";
export default function Footer() {
  return (
    <footer className={`${styles.footer} space-x-2`}>
      <b>Powered by:</b>
      <span>Alexandre Fonseca</span>
    </footer>
  );
}
