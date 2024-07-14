import { client, urlFor } from "@/app/lib/sanity.client";
import { FullBlog } from "@/app/lib/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

async function getData(slug: string) {
	const query = `
    *[_type == "blog" && slug.current == "${slug}"] {
        _id,
        "currentSlug": slug.current,
        title,
        content,
        titleImage
    }[0]
    `;

	const data = await client.fetch(query);
	return data;
}

export default async function BlogArticle({
	params,
}: {
	readonly params: { slug: string };
}) {
	const data: FullBlog = await getData(params.slug);

	return (
		<div className="mt-8">
			<h1>
				<span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
					Prince Oncada - Blog
				</span>
				<span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
					{data.title}
				</span>
			</h1>

			<Image
				className="rounded-lg mt-8 border"
				priority
				src={urlFor(data.titleImage)}
				alt="TitleImage"
				width={1000}
				height={1000}
			/>

            <div className="mt-16 prose-blue prose-lg dark:prose-invert prose-h4:font-semibold prose-h4:text-3xl prose-h4:tracking-wider">
                <PortableText value={data.content} />
            </div>
		</div>
	);
}
