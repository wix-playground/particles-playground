import {useContext, useState} from 'react';
import {AppContext} from '../contexts/AppContext';
import {
  COPIED_TEXT,
  COPY_SHAREABLE_LINK_TEXT,
  GENERATING_LINK_TEXT,
} from '../constants';
import {copySnippetUrlToClipboard, saveJsonToSnippet} from '../snippet';

export const ShareButton = () => {
  const appProps = useContext(AppContext);
  const [shareButtonText, setShareButtonText] = useState(
    COPY_SHAREABLE_LINK_TEXT
  );

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

  return (
    <button disabled={!appProps} onClick={handleShareClick}>
      {shareButtonText}
    </button>
  );
};
