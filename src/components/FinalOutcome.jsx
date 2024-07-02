import React, { useState, useEffect, useRef } from "react";
import HtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { selectFinalResult } from "../store/dashboardSlice";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const FinalOutCome = () => {
  const finalData = useSelector(selectFinalResult);
  const [htmlContent, setHtmlContent] = useState("");
  const componentPDF = useRef();

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

  const downloadPdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "myPDF",
    pageStyle: `
    @page {
      size: ${
        (componentPDF?.current?.clientHeight || 0) + 1800
      }px 500mm !important;
      padding: 0; /* Adjust padding as needed */
      margin: 60px; /* Adjust margins as needed */
    }
    /* Additional styles for body, HTML, etc. if necessary */
    body {
      margin:  0;
      padding: 0;
    }
  `,
  });

  return (
    <>
      <div style={{ fontSize: "18px", lineHeight: "40px" }} ref={componentPDF}>
        {HtmlParser(htmlContent)}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 40,
          right: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          style={{ marginRight: "10px" }}
          onClick={downloadPdf}
        >
          <PictureAsPdfIcon sx={{ marginRight: "8px" }} /> Print PDF
        </Button>
      </div>
    </>
  );
};

export default FinalOutCome;
