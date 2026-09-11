import { AutoForm } from '@vitnode/core/components/form/auto-form'
import { AutoFormColor } from '@vitnode/core/components/form/fields/color'
import { z } from 'zod'

export default function ColorExample() {
  const formSchema = z.object({
    color: z.string().default('oklch(0.58 0.19 258)'),
  })

  return (
    <AutoForm
      fields={[
        {
          id: 'color',
          component: (props) => (
            <AutoFormColor
              description="Pick a color. The value is stored as an oklch string."
              label="Color"
              {...props}
            />
          ),
        },
      ]}
      formSchema={formSchema}
      onSubmit={(values) => {
        // eslint-disable-next-line no-console
        console.log(values.color)
      }}
    />
  )
}
