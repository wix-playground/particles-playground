import {useCallback, useContext, useState} from 'react';
import {WorkerContext} from '../../contexts/WorkerContext';
import {getUpdateSelectedMovementFunctionMessage} from '../../interfaces';
import MonacoEditor from '@monaco-editor/react';
import {editor} from 'monaco-editor';
import {AppContext} from '../../contexts/AppContext';
import {CopyPromptButton} from './CopyPromptButton';
import {
  COPIED_TEXT,
  COPY_SHAREABLE_LINK_TEXT,
  DEFAULT_MOVEMENT_FUNCTION_KEY,
  EXAMPLE_CODE,
  GENERATING_LINK_TEXT,
} from '../../constants';
import {copySnippetUrlToClipboard, saveJsonToSnippet} from '../../snippet';

export const Editor = ({
  onMount,
}: {
  onMount: (editor: editor.IStandaloneCodeEditor) => Promise<void>;
}) => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);
  const [shareButtonText, setShareButtonText] = useState(
    COPY_SHAREABLE_LINK_TEXT
  );

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (worker) {
        worker.postMessage(
          getUpdateSelectedMovementFunctionMessage({
            movementFunctionCode: value ?? '',
          })
        );
      }
    },
    [worker]
  );

  const handleResetCode = useCallback(() => {
    if (worker) {
      worker.postMessage(
        getUpdateSelectedMovementFunctionMessage({
          key: DEFAULT_MOVEMENT_FUNCTION_KEY,
          movementFunctionCode: EXAMPLE_CODE,
        })
      );
    }
  }, [worker]);

  const handleShareClick = async () => {
    if (appProps) {
      setShareButtonText(GENERATING_LINK_TEXT);
      const id = await saveJsonToSnippet(appProps);
      await copySnippetUrlToClipboard(id).then(() => {
        setShareButtonText(COPIED_TEXT);
        setTimeout(() => {
          setShareButtonText(COPY_SHAREABLE_LINK_TEXT);
        }, 2000);
      });
    }
  };

  const handleClearClick = useCallback(() => {
    if (worker) {
      worker.postMessage(
        getUpdateSelectedMovementFunctionMessage({
          key: appProps?.selectedMovementFunction,
          movementFunctionCode: '',
        })
      );
    }
  }, [worker, appProps?.selectedMovementFunction]);

  return (
    <div
      className="card layout editorContainer"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <span className="cardTitle">Movement function editor</span>
        <div style={{display: 'flex', gap: '4px'}}>
          <CopyPromptButton />
          <button disabled={!appProps} onClick={handleShareClick}>
            {shareButtonText}
          </button>
          <button
            disabled={appProps?.movementFunctionCode === EXAMPLE_CODE}
            onClick={handleResetCode}
          >
            Reset code to example
          </button>
          <button onClick={handleClearClick}>Clear code</button>
        </div>
      </div>
      <MonacoEditor
        onMount={onMount}
        height="40vh"
        defaultLanguage="javascript"
        value={appProps?.movementFunctionCode}
        onChange={handleEditorChange}
      />
    </div>
  );
};
