"use client";
import styles from "./Categories.module.scss";

const Categories = ({ categories }: any) => {
  return (
    <section
      className={(styles.categories)}
      aria-label="Categorías"
    >
      {categories.map((c: string, i: number) => {
        if (i === categories.length - 1) {
          return (
            <span key={i} style={{ fontWeight: "bold" }}>
              {c}
            </span>
          );
        } else {
          return <span key={i}>{c + " > "}</span>;
        }
      })}
    </section>
  );
};

export default Categories;
