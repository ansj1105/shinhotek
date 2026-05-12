const allowedTags = new Set(["p", "br", "strong", "b", "em", "i", "u", "h3", "h4", "ul", "ol", "li", "a", "img"]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

export function hasRichTextMarkup(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function plainTextToResourceHtml(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function safeUrl(value: string) {
  const trimmed = value.trim();

  if (/^(https?:\/\/|\/(?!\/))/i.test(trimmed)) {
    return trimmed;
  }

  return "";
}

function readAttribute(attributes: string, name: string) {
  const match = attributes.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"));
  return match?.[2] ?? match?.[3] ?? match?.[4] ?? "";
}

export function sanitizeResourceHtml(value: string) {
  const withoutDangerousBlocks = value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|svg|math)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed|svg|math)\b[^>]*\/?>/gi, "");

  return withoutDangerousBlocks.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (fullTag, rawTagName, rawAttributes) => {
    const tagName = String(rawTagName).toLowerCase();
    const isClosing = fullTag.startsWith("</");

    if (!allowedTags.has(tagName)) {
      return "";
    }

    if (isClosing) {
      return tagName === "br" || tagName === "img" ? "" : `</${tagName}>`;
    }

    if (tagName === "br") {
      return "<br>";
    }

    if (tagName === "a") {
      const href = safeUrl(readAttribute(rawAttributes, "href"));
      return href ? `<a href="${escapeAttribute(href)}" target="_blank" rel="noreferrer">` : "<a>";
    }

    if (tagName === "img") {
      const src = safeUrl(readAttribute(rawAttributes, "src"));
      if (!src) {
        return "";
      }

      const alt = readAttribute(rawAttributes, "alt");
      const width = readAttribute(rawAttributes, "width");
      const widthAttribute = /^\d{2,4}$/.test(width) ? ` width="${width}"` : "";
      return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}"${widthAttribute}>`;
    }

    return `<${tagName}>`;
  });
}

export function resourceBodyToHtml(value: string) {
  return sanitizeResourceHtml(hasRichTextMarkup(value) ? value : plainTextToResourceHtml(value));
}
