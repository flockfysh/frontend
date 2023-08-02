import HomePage from '@/components/hypePage';
import { DefaultSeo } from 'next-seo';

export default function Home() {
    return (
        <>
            <DefaultSeo
                title = "flockfysh | An open platform to build, large scale AI"
                description="flockfysh is an open platform that can be used to build and transact large scale AI. Come onto our platform 
                and build your dream dataset, or acquire the training data you need directly from the sources themselves. Clearly define roles through roles
                through enforceable licenses, or create your own custom license! The tomorrow for AI systems, ranging from LLMs to computer vision object detection, segmentation and autonomous driving"

                twitter={ {
                    handle: '@flockfysh',
                    cardType: 'summary_large_image',
                    site: '@site'
                } }

                openGraph={ {
                    type: 'website',
                    locale: 'en_IE',
                    url: 'https://www.linkedin.com/company/flockfysh',
                    siteName: 'linkedin'
                } }


            />

            <HomePage />
        </>
    );
}
