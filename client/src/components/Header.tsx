import { Brush, ArrowBigUpDash } from "lucide-react";
import { toast } from "sonner";
import Login from "./Login";

type Props = {
  credits: number | null;
  updateCredits: () => void;
  logout: () => void;
  showRegister: () => void;
};

const Header = ({ credits, updateCredits, logout, showRegister }: Props) => {
  const topUp = () => {
    const token = localStorage.getItem("jwt");
    if (typeof token === "string") {
      try {
        fetch("/topup", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.log(err);
        toast.error("Authentication on topup failed");
      }
    }
  };

  return (
    <div className="border-b-1 border-border bg-white/50 backdrop-blur-sm">
      <div className="relative container mx-auto px-6 py-6">
        <div className="flex items-center gap-3 max-w-[100px] sm:max-w-[300px]">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brush className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-primary">GenSticker</h1>
            <p className="text-sm text-gray-500">
              Generate personalized Telegram stickers
            </p>
          </div>
        </div>
        <div className="absolute top-1/2 right-6 lg:block transform -translate-y-1/2">
          {credits !== null ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-semibold text-muted-foreground">
                You have <span className="text-primary">{credits}</span> credits
                left. (
                <span
                  className="cursor-pointer text-destructive"
                  onClick={() => logout()}
                >
                  Logout
                </span>
                )
              </p>
              <button
                className="min-w-[20px] flex rounded-lg cursor-pointer bg-primary hover:bg-primary/90 h12 text-lg text-input px-4  items-center pt-1 pb-1"
                onClick={topUp}
              >
                Top up
                <ArrowBigUpDash className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Login
              showRegister={() => showRegister()}
              updateCredits={() => updateCredits()}
            />
          )}
        </div>
      </div>
      <div className="absolute top-1/2 right-6 lg:block transform -translate-y-1/2">
        {credits !== null ? (
          <p className="text-sm font-semibold text-muted-foreground">
            You have <span className="text-primary">{credits}</span> credits
            left. (
            <span
              className="cursor-pointer text-destructive"
              onClick={() => logout()}
            >
              Logout
            </span>
            )
          </p>
        ) : (
          <Login
            showRegister={() => showRegister()}
            updateCredits={() => updateCredits()}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
