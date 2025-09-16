import { getDictionary } from '@/lib/dictionary'
import { ModeToggle } from '@/components/theme-toggle'

export default async function Home() {
    const dict = await getDictionary()

    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            {dict.page.home.description}

            <ModeToggle />
        </div>
    )
}
