import React, { useState, useEffect } from "react";
import HtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { selectFinalResult } from "../store/dashboardSlice";

const FinalOutCome = () => {
  const finalData = useSelector(selectFinalResult);
  const [htmlContent, setHtmlContent] = useState("");
  console.log(finalData);

  useEffect(() => {
    const processMarkdown = async () => {
      const processedMarkdown = await remark()
        .use(remarkHtml)
        .process(finalData);

      // Convert the processed Markdown to HTML string
      let htmlString = processedMarkdown.toString();

      // Replace code blocks with normal text
      htmlString = htmlString.replace(
        /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
        (match, p1) => {
          return `<div>${p1
            .replace(/\n/g, "<br>")
            .replace(/ /g, "&nbsp;")}</div>`;
        }
      );

      setHtmlContent(htmlString);
    };

    processMarkdown();
  }, [finalData]);

  return (
    <div style={{ fontSize: "18px", lineHeight: "40px" }}>
      {HtmlParser(htmlContent)}
    </div>
  );
};

export default FinalOutCome;
