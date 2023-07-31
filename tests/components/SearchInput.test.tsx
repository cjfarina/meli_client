import React from "react";
import { render } from "@testing-library/react";
import Categories from "@/components/Categories";
import "@testing-library/jest-dom/extend-expect";

test("renders categories correctly", () => {
  const categories = ["Electronics", "Mobile Phones", "Smartphones"];

  const { container, getByLabelText } = render(
    <Categories categories={categories} />
  );

  const categorySpans = container.querySelectorAll("span");
  expect(categorySpans.length).toBe(categories.length);

  categorySpans.forEach((span, index) => {
    expect(span).toHaveTextContent(categories[index]);
    if (index === categories.length - 1) {
      expect(span).toHaveStyle("font-weight: bold;");
    } else {
      expect(span).not.toHaveStyle("font-weight: bold;");
      expect(span.textContent).toContain(" > ");
    }
  });
});
