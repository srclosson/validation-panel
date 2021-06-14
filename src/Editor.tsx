import React, { useEffect } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor } from '@grafana/ui';
import { VerificationOptions, defaults } from 'types';
import ReactJson from 'react-json-view'
//import { Console, Hook, Unhook } from 'console-feed';

export const Editor: React.FC<StandardEditorProps<VerificationOptions>> = ({ value, onChange }) => {
  const options = value || defaults;

  const commitContent = (tests: string) => {
    onChange({
      ...value,
      tests,
    });
  };

  const onSave = (content: string) => {
    commitContent(content);
  };

  useEffect(() => {
    // on start
    return () => {
      /* on end */
    };
  });

  return (
    <>
      <CodeEditor language="json" width="100%" height="50vh" value={options.tests} onSave={onSave} />
      <ReactJson src={options.data} theme="twilight" />
    </>
  );
};
