import clsx from "clsx";
import { ArrowRight, ArrowDown } from "lucide-react";

type Props = {
  enableButton: boolean;
  generateSticker: () => void;
};

const GenButton = ({ enableButton, generateSticker }: Props) => {
  return (
    <div
      className={clsx("flex items-center justify-center", {
        "pointer-events-none opacity-50": !enableButton,
      })}
    >
      <button
        className="min-w-[160px] rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-8 flex items-center gap-2 pt-4 pb-4"
        onClick={generateSticker}
      >
        Generate Sticker
        <ArrowDown className="w-5 h-5 lg:hidden" />
        <ArrowRight className="w-5 h-5 hidden lg:inline" />
      </button>
    </div>
  );
};

export default GenButton;
