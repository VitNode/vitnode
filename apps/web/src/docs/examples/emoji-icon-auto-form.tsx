import { AutoForm } from '@vitnode/core/components/form/auto-form'
import { AutoFormEmojiIcon } from '@vitnode/core/components/form/fields/emoji-icon'
import { AutoFormInput } from '@vitnode/core/components/form/fields/input'
import { EMOJI_ICON_MAX_LENGTH } from '@vitnode/core/lib/emoji-icon'
import { z } from 'zod'

export default function EmojiIconAutoFormExample() {
  const formSchema = z.object({
    name: z.string().min(1).max(255).default('Administrator'),
    prefix: z
      .string()
      .max(EMOJI_ICON_MAX_LENGTH)
      .default('icon:shield-check')
      .describe('Shown in front of the name of every member of this role.'),
  })

  return (
    <AutoForm
      fields={[
        {
          component: (props) => <AutoFormInput label="Name" {...props} />,
          id: 'name',
        },
        {
          component: (props) => (
            <AutoFormEmojiIcon allowRemove label="Prefix" {...props} />
          ),
          id: 'prefix',
        },
      ]}
      formSchema={formSchema}
      onSubmit={(values) => {
        // eslint-disable-next-line no-console
        console.log(values)
      }}
    />
  )
}
