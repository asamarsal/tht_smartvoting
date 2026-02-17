import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lottie/loading.json";
import Card from "@/components/common/Card";

interface LoadingCardProps {
  overlay?: boolean;
}

export default function LoadingCard({ overlay = false }: LoadingCardProps) {
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <Card className="text-center bg-white/50 border border-white/20 shadow-xl rounded-2xl">
          <Lottie
            animationData={loadingAnimation}
            loop
            autoplay
            style={{ width: 200, height: 200, margin: "0 auto" }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-indigo-600/20">
      <Card className="text-center bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          style={{ width: 200, height: 200, margin: "0 auto" }}
        />
      </Card>
    </div>
  );
}
