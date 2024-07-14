import { SimpleBlogCard } from "./lib/types";
import { client, urlFor } from "./lib/sanity.client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 30;

async function getData() {
	const query = `
    *[_type=="blog"] | order(_createdAt desc) {
        _id,
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage
    }`;

	const data = await client.fetch(query);
	return data;
}

export default async function Home() {
	const data: SimpleBlogCard[] = await getData();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-5">
			{data.map((blog) => (
				<Card key={blog._id}>
					<Image
						className="rounded-t-lg h-[200px] object-cover"
						src={urlFor(blog.titleImage)}
						alt="image"
						width={1000}
						height={1000}
					></Image>
                    <CardContent className="mt-5">
                        <h3 className="text-lg line-clamp-2 font-bold">{blog.title}</h3>
                        <p className="text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300">{blog.smallDescription}</p>
                        <Button asChild className="w-full mt-7">
                            <Link href={`/blog/${blog.currentSlug}`}>Read More</Link>
                        </Button>
                    </CardContent>
				</Card>
			))}
		</div>
	);
}
