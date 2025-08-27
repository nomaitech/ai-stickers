/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

type BannerContextType = {
  showBanner: (msg: string) => void;
  hideBanner: () => void;
};

type BannerProviderProps = {
  children: React.ReactNode;
}

export const BannerContext = createContext<BannerContextType | null>(null);

export const BannerProvider: React.FC<BannerProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showBanner = (msg: string) => setMessage(msg);
  const hideBanner = () => setMessage(null);

  return (
    <BannerContext.Provider value={{ showBanner, hideBanner }}>
      {children}

      {message && (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={hideBanner}
    >
      <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white p-8 rounded-lg shadow-xl border border-border w-full max-w-sm flex flex-col items-center">
          <h2 className="text-lg font-semibold text-destructive mb-4 text-center">
            Error
          </h2>
          <p className="text-foreground text-center mb-6">{message}</p>
          <button
            onClick={hideBanner}
            className="bg-destructive text-white font-semibold py-2 px-4 rounded-md hover:bg-destructive/90 transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
      )}
    </BannerContext.Provider>
  );
};
