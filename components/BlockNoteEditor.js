'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

export default function BlockNoteEditor({ onChange, initialContent }) {
  const editor = useCreateBlockNote();

  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
      <BlockNoteView 
        editor={editor} 
        theme="light"
        onChange={async () => {
          const html = await editor.blocksToHTMLLossy(editor.topLevelBlocks);
          onChange(html);
        }}
      />
    </div>
  );
}