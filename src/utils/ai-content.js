// utils/ai-content.js
export default async function AIContent({ text, customInstructions = "", contentGen = true }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai-content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text, instructions: customInstructions, contentGen }),
  });

  if (!res.ok) {
    console.log( "AI Content Generation Error:", res.statusText);
    throw new Error("Failed to generate content");
  }

  const { content } = await res.json();
  return content;
}
