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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {simillarJobs.map((job) => (
                <MainCard job={job} key={job.id} />
            ))}
            {loading && <p>Chargement...</p>}
            <div ref={loaderRef} />
        </div>
    );
};
