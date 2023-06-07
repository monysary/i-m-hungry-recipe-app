import { useState } from 'react'
import FeedComponent from "@/features/feed/feed"
import PageHeading from '@/features/feed/headings/pageHeading'
import PostContainer from '@/features/feed/postContainer'

export default function FeedPage() {
    return (
        <div className="flex justify-center h-full pb-24">
            <div className="max-w-[1280px] w-full h-full px-2 md:px-4 py-6 ">
                <PageHeading />
                <PostContainer />

                <section className='mt-24'>
                </section>
            </div>
        </div>

    )
}

