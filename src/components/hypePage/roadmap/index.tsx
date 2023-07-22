import RoadmapBackground from './background/background';
import EndMessage from './endMessage';
import SectionOne from './sectionOne';
import SectionThree from './sectionThree';
import SectionTwo from './sectionTwo';

export default function Roadmap() {
    return (
        <>
            <SectionOne />
            <SectionTwo />
            <SectionThree />

            <EndMessage />

            <RoadmapBackground />
        </>
    );
}

