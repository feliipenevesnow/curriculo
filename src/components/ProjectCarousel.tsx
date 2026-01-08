import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import type { ProjectItem } from '../data/translations';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

// Import Swiper styles
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-coverflow';
// @ts-ignore
import 'swiper/css/pagination';

import './ProjectCarousel.css';

interface ProjectCarouselProps {
    projects: ProjectItem[];
    btnText: string;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, btnText }) => {
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300); // Wait for fade out
    };

    return (
        <>
            <div className="project-carousel-container">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={1}
                    coverflowEffect={{
                        rotate: 35,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <ProjectCard project={project} onClick={() => handleCardClick(project)} btnText={btnText} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};
