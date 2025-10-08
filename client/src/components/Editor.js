import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onChange }) {
  return (
    <Editor
      height="80vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value)}
      options={{ fontSize: 14, minimap: { enabled: false } }}
    />
  );
}
