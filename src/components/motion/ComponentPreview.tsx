import * as React from 'react'
import { Registry } from '../registry'
interface ComponentPreviewProps {
  name: string
}

export default function ComponentPreview({ name }: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0)

  const Preview = React.useMemo(() => {
    const Component = Registry[name]?.component
    if (!Component) {
      throw new Error(`Component ${name} not found in registry`)
    }
    return <Component key={key} />
  }, [name, key])

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <div className='border border-neutral-300 h-96 w-full bg-white rounded-lg overflow-auto shadow-sm flex justify-center items-center relative'>
        {Preview}
        <button
          onClick={() => {
            setKey(key + 1)
          }}
          className='absolute top-2 right-2 w-8 h-8 border border-neutral-300 rounded flex items-center justify-center rotate-0 hover:rotate hover:bg-neutral-100 hover:animate-spin'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 -960 960 960'
            width='24'
          >
            <path d='M483.077-200q-117.25 0-198.625-81.339-81.375-81.34-81.375-198.539 0-117.199 81.375-198.661Q365.827-760 483.077-760q71.308 0 133.538 33.884 62.231 33.885 100.308 94.577V-760h40v209.231H547.692v-40h148q-31.231-59.846-87.884-94.539Q551.154-720 483.077-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h42.462Q725.077-310.154 651-255.077T483.077-200Z' />
          </svg>
        </button>
      </div>
    </React.Suspense>
  )
}
