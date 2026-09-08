import type { EmojiIconValue } from '@vitnode/core/lib/emoji-icon'

import { EmojiIcon } from '@vitnode/core/components/ui/emoji-icon'
import { EmojiIconPicker } from '@vitnode/core/components/ui/emoji-icon-picker'
import { serializeEmojiIcon } from '@vitnode/core/lib/emoji-icon'
import { useState } from 'react'

export default function EmojiIconPickerExample() {
  const [prefix, setPrefix] = useState<EmojiIconValue | undefined>({
    type: 'emoji',
    value: '🚀',
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <EmojiIconPicker allowRemove onChange={setPrefix} value={prefix} />

      <div className="bg-muted/50 flex flex-col gap-2 rounded-md border p-3">
        <span className="text-muted-foreground text-xs font-medium uppercase">
          Preview
        </span>

        <span className="inline-flex items-center gap-1.5 font-medium">
          <EmojiIcon value={prefix} />
          Ada Lovelace
        </span>

        <code className="text-muted-foreground text-xs">
          {prefix
            ? `{ type: "${prefix.type}", value: "${prefix.value}" }`
            : 'undefined'}
        </code>

        <code className="text-muted-foreground text-xs">
          stored as {serializeEmojiIcon(prefix) || '""'}
        </code>
      </div>
    </div>
  )
}
