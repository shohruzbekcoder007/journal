import { InputHTMLAttributes, useState } from 'react';

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
    value?: File | null;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const FileInput: React.FC<FileInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [file, setFile] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
    if (onChange) {
        onChange(event);
    //   onChange(file);
    }
  };

  return (
    <input
      type="file"
      value={file?.name ?? ""}
      onChange={handleChange}
      {...props}
    />
  );
};

export default FileInput;