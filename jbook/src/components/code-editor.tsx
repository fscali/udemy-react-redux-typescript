import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };
  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
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
