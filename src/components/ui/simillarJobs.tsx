"use client"
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, Job } from "@/redux/job/jobSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { MainCard } from "@/components/ui/mainCard";
import { useEffect, useRef } from "react";

export const SimillarJobs = ({ job }: { job: Job }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { jobs, page, loading, hasMore } = useSelector(
        (state: RootState) => state.job
    );

    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchJobs({ page: 1 }))
    }, [dispatch])

    useEffect(() => {
        if (!loaderRef.current || !hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    dispatch(fetchJobs({ page }));
                }
            },
            { threshold: 1 }
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loaderRef, hasMore, loading]);

    const simillarJobs = jobs.filter(
        (item) => item.primaryTag === job.primaryTag && item.id !== job.id
    );
    if (!job || !job.primaryTag) return null;
    return (
        <div className="">
            {simillarJobs.length > 0 ? simillarJobs.map((job) => (
                <MainCard job={job} key={job.id} />
            )): (<p className="text-center text-gray-500">No simillar jobs</p>)}
            {loading && <p>Chargement...</p>}
            <div ref={loaderRef} />
        </div>
    );
};
