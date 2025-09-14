import { getDictionary } from '@/lib/dictionary'

export default async function Home() {
    const dict = await getDictionary()

    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
                <h1 className="text-3xl font-bold">{dict.page.home.title}</h1>
                <p className="text-muted-foreground text-lg">
                    {dict.page.home.description}
                </p>
            </main>
        </div>
    )
}
