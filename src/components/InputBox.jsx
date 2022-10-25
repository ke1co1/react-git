export default function InputBox(props) {
  const {
    id,
    label,
    type,
    placeholder,
    onChange,
    error
  } = props;

  return (
    <>
      <label
        data-testid="textInputLabel"
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 mb-3"
        onChange={(e) =>
          onChange
            ? onChange(e?.target?.value, e?.target?.name)
            : null
        }
      />
      {error &&
        <p
          data-testid="textInputError"
          className="text-red-900 mb-3"
        >
          {error}
        </p>
      }
    </>
  )
}