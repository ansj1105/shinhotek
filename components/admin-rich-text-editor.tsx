"use client";

import { useRef, useState } from "react";

import { hasRichTextMarkup, plainTextToResourceHtml } from "@/lib/resource-rich-text";

function initialEditorHtml(value: string) {
  return hasRichTextMarkup(value) ? value : plainTextToResourceHtml(value);
}

export function AdminRichTextEditor({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [initialHtml] = useState(initialEditorHtml(defaultValue ?? ""));
  const [html, setHtml] = useState(initialHtml);

  function syncFromEditor() {
    setHtml(editorRef.current?.innerHTML ?? "");
  }

  function runCommand(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    syncFromEditor();
  }

  function insertLink() {
    const href = window.prompt("링크 URL을 입력하세요.");

    if (!href) {
      return;
    }

    runCommand("createLink", href);
  }

  function insertImage() {
    const src = window.prompt("이미지 또는 지도 이미지 URL을 입력하세요.");

    if (!src) {
      return;
    }

    const widthInput = window.prompt("이미지 너비(px)를 입력하세요.", "720");
    const width = Math.min(1400, Math.max(160, Number(widthInput) || 720));
    const alt = window.prompt("이미지 설명(alt)을 입력하세요.", "") ?? "";
    const escapedSrc = src.replace(/"/g, "&quot;");
    const escapedAlt = alt.replace(/"/g, "&quot;");

    runCommand("insertHTML", `<p><img src="${escapedSrc}" alt="${escapedAlt}" width="${width}"></p>`);
  }

  return (
    <div className="field lumosAdminEditorField lumosAdminRichEditorField">
      <span>{label}</span>
      <input type="hidden" name={name} value={html} />
      <div className="lumosAdminRichToolbar" aria-label={`${label} toolbar`}>
        <button type="button" onClick={() => runCommand("formatBlock", "p")}>
          P
        </button>
        <button type="button" onClick={() => runCommand("formatBlock", "h3")}>
          H3
        </button>
        <button type="button" onClick={() => runCommand("bold")}>
          B
        </button>
        <button type="button" onClick={() => runCommand("italic")}>
          I
        </button>
        <button type="button" onClick={() => runCommand("insertUnorderedList")}>
          List
        </button>
        <button type="button" onClick={insertLink}>
          Link
        </button>
        <button type="button" onClick={insertImage}>
          Image/Map
        </button>
      </div>
      <div
        ref={editorRef}
        className="lumosAdminRichEditor"
        contentEditable
        suppressContentEditableWarning
        onInput={syncFromEditor}
        onBlur={syncFromEditor}
        dangerouslySetInnerHTML={{ __html: initialHtml }}
      />
    </div>
  );
}
