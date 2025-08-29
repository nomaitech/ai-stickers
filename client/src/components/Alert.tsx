import { X } from 'lucide-react';

type Props = {
  msg: string;
  show: boolean;
  onClose: () => void;
};

const Alert = ({ msg, show, onClose }: Props) => {
  if (!show) return null;

  return (
    <div className="w-full h-40px bg-red-500 text-muted flex justify-between p-2">
      <span>{msg}</span>
      <button onClick={onClose}><X /></button>
    </div>
  );
};

export default Alert;