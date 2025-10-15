import { useState, useEffect } from "react";
import { toast } from "sonner";
import ImageGenInput from "../components/ImageGenInput";
import GenButton from "../components/GenButton";
import ImageGenOutput from "../components/ImageGenOutput";
import { useGenerateStickerMutation } from "../store/generation/genApi";
import { userApi } from "../store/userInfo/userApi";

import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import LandingSection from "../components/LandingSection";
import Proposal from "../components/Proposal";

const LandingPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [enableButton, setEnableButton] = useState(false);
  const [stickerResult, setStickerResult] = useState<string | null>(null);

  const [generateSticker, { isLoading }] = useGenerateStickerMutation();
  const [triggerGetUserInfo] = userApi.useLazyGetUserInfoQuery();
  useEffect(() => {
    setEnableButton(!!imageFile && !isLoading);
  }, [imageFile, isLoading]);

  const startGeneration = async () => {
    try {
      const formData = new FormData();
      if (imageFile instanceof Blob) {
        formData.append("file", imageFile);
      }
      formData.append("emoji", "😃");
      formData.append("prompt", "");
      const result = await generateSticker(formData).unwrap();
      setStickerResult(result.generated_img_url);
      triggerGetUserInfo();
    } catch (err) {
      if (err && typeof err === "object" && "status" in err) {
        if ((err as { status: number }).status === 402) {
          toast("Not enough credits");
        } else {
          console.log(err);
          toast("Generation failed");
        }
      }
    }
  };

  return (
    <>
      <div className="h-full w-full container mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6 items-stretch sm:py-3">
        <ImageGenInput setImageFileHandler={setImageFile} />
        <GenButton
          enableButton={enableButton}
          startGeneration={startGeneration}
        />
        <ImageGenOutput isLoading={isLoading} stickerResult={stickerResult} />
      </div>
      <Proposal/>
      <LandingSection>
        <Features />
      </LandingSection>
      <LandingSection>
        <FAQ />
      </LandingSection>
      <LandingSection>
        <Reviews />
      </LandingSection>
      <LandingSection>
        <Gallery />
      </LandingSection>
      <LandingSection>
        <Footer />
      </LandingSection>
    </>
  );
};

export default LandingPage;
