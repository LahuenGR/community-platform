import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Provider } from 'mobx-react'
import { vi } from 'vitest'

import { useCommonStores } from '../../common/hooks/useCommonStores'
import { FactoryHowto } from '../../test/factories/Howto'

vi.mock('../../common/hooks/useCommonStores', () => {
  return {
    useCommonStores: () => ({
      stores: {
        categoriesStore: {
          allCategories: [],
        },
        howtoStore: {
          uploadStatus: {
            Start: false,
            Cover: false,
            'Step Images': false,
            Files: false,
            Database: false,
            Complete: false,
          },
          validateTitleForSlug: vi.fn(),
          uploadHowTo: vi.fn(),
        },
        tagsStore: {
          allTags: [
            {
              label: 'test tag 1',
              image: 'test img',
            },
          ],
        },
      },
    }),
  }
})

export const HowtoProvider = ({ children }) => {
  const formProps = {
    formValues: FactoryHowto(),
    onSubmit: vi.fn(),
    mutators: { ...arrayMutators },
    component: () => children,
  }
  return (
    <Provider {...useCommonStores().stores}>
      <Form {...formProps} />
    </Provider>
  )
}
