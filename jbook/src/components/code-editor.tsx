import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <MonacoEditor
      value={initialValue} // NB: this is only the initial value
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: true,
        automaticLayout: true,
      }}
      language="javascript"
      theme="dark"
      height="500px"
    />
  );
};
export default CodeEditor;
