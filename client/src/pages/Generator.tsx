import GeneratorHeader from "../components/GeneratorHeader";
import ImageUploaderChakra from "../components/ImageUploaderChakra";
import GenerationOptions from "../components/GenerationOptions";
import Example from "@/components/Example";
import History from "../components/History";

const Generator = () => {

    return (
        <>
            <GeneratorHeader />
            <ImageUploaderChakra />
            <GenerationOptions />
            <Example />
            <History />
        </>
    )
}

export default Generator;